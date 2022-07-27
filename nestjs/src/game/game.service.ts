import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Match, MatchState, MatchType, QueuedProfile } from 'types';
import { Server, Socket } from 'socket.io';
import * as cuid from 'cuid';

@Injectable()
export class GameService {

  private queues = new Map<MatchType, QueuedProfile[]>();
  private matches = new Map<string, Match>();

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public tickMatches(server: Server) {
    for (const match of this.matches.values()) {

      const timestamp = Date.now();
      match.timings.elapsed = timestamp - match.timings.started_at;

      match.players[0].position += 3;

      server.in(match.id).emit('MATCH-UPDATE', match);
    }
  }

  private getRequiredPlayers(type: MatchType) {
    if (type.toString().endsWith('4vs4'))
      return 4;

    return 2;
  }

  private tickQueue(server: Server, type: MatchType) {

    const queue = this.queues.get(type);
    const required = this.getRequiredPlayers(type);

    console.debug('Ticking queue... (' + queue.length + '/' + required + ')');
    if (queue.length < required)
      return;

    this.startGame(server, type, queue);
  }

  private startGame(server: Server, type: MatchType, queue: QueuedProfile[]) {

    const match: Match = {
      id: cuid(),
      players: [],
      spectators: [],
      settings: { lives: 5, type },
      state: MatchState.STARTING,
      timings: { started_at: Date.now(), elapsed: 0 },
    };

    for (const queued of queue) {
      match.players.push({
        profile: queued.profile,
        background: 'https://static.vecteezy.com/system/resources/previews/001/907/544/original/flat-design-background-with-abstract-pattern-free-vector.jpg',
        lives: match.settings.lives,
        input: {
          up: false,
          down: false,
        },
        position: 10,
      });

      queued.socket.join(match.id);
    }

    this.matches.set(match.id, match);
    server.in(match.id).emit('MATCH-FOUND', match);
    console.debug('Match (' + match.id + ') has been created.');
  }

  public async enqueue(server: Server, client: Socket, id: number, type: MatchType) {

    const queue = this.queues.get(type) || [];

    for (let i = 0; i < queue.length; i++) {
      const queued = queue.at(i);
      if (queued.profile.id != id)
        continue;

      console.debug('ID: ' + id + ' already in queue...');

      if (queued.socket === client)
        return;

      queue[i].socket = client;
      console.debug('ID: ' + id + ' already in queue, but socket instance has changed.');
      return;
    }

    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
      },
    });

    if (!profile)
      throw new Error('Profile was not found!');

    queue.push({ profile, socket: client });
    queue.push({ profile, socket: client }); //TODO: Remove after test
    this.queues.set(type, queue);
    console.debug('ID: ' + id + ' added to the queue.');

    this.tickQueue(server, type);
  }

}