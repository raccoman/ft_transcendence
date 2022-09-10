import { Injectable } from '@nestjs/common';
import { GameService } from 'src/game/services/game.service';
import { Server } from 'socket.io';

import {
  MatchmakingDequeueInput,
  MatchmakingEnqueueInput,
  MatchType, QueuedProfile,
} from 'types';


@Injectable()
export class MatchmakingService {

  private queues = new Map<MatchType, QueuedProfile[]>();

  constructor(
    private readonly gameService: GameService,
  ) {
  }

  public tick(server: Server) {
    for (const [type, queue] of this.queues.entries()) {

      if (queue.length < 2)
        continue;

      this.gameService.start({
        server,
        type,
        challengers: [queue.shift(), queue.shift()],
      });
    }
  }

  public enqueue({ socket, profile, type }: MatchmakingEnqueueInput): boolean {

    const queue = this.queues.get(type) || [];

    for (let index = 0; index < queue.length; index++) {

      const queued = queue.at(index);

      if (queued.profile.id !== profile.id) {
        continue;
      }

      if (queued.socket === socket) {
        console.debug('Profile (id=' + profile.id + ') already in queue...');
        return false;
      }

      queued.socket.disconnect(true);
      queue[index].socket = socket;
      console.debug('Profile (id=' + profile.id + ') already in queue, but socket instance has changed.');
      return true;
    }

    queue.push({ socket, profile });
    queue.push({ socket, profile }); //TODO: Delete this line

    this.queues.set(type, queue);
    console.debug('Profile (id=' + profile.id + ') successfully added to ' + MatchType[type] + ' queue. (' + queue.length + '/2)');
    return true;
  }

  public dequeue({ socket, id }: MatchmakingDequeueInput): boolean {

    for (let [type, queue] of this.queues.entries()) {

      for (let index = 0; index < queue.length; index++) {

        const queued = queue.at(index);

        if (queued.socket !== socket && queued.profile.id !== id) {
          continue;
        }

        queue = queue.splice(index, 1);
        console.debug('Profile (id=' + id + ') successfully removed from ' + type + ' queue. (' + queue.length + '/2)');
        return true;
      }
    }

    //console.debug('Profile (id=' + id + ') was not in queue.');
    return true;
  }

}



