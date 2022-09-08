import { FC } from 'react';
import { Circle, Group, Layer, Rect, Stage, Text } from 'react-konva';
import useImage from 'use-image';
import { Match, MatchState } from 'types';
import { CANVAS_HEIGHT, CANVAS_WIDTH, PADDLE_HEIGHT, PADDLE_WIDTH } from 'src/contexts/game';

const Component: FC<{ match: Match, frameRate: number; }> = ({ match, frameRate }) => {

    const [p1, p2] = match.players;

    const [bgP1] = useImage(p1.background);
    const [bgP2] = useImage(p2.background);

    return (
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>

        <Layer>

          <Rect x={0} y={0} width={CANVAS_WIDTH / 2} height={CANVAS_HEIGHT} fillPatternImage={bgP1} />
          <Rect x={CANVAS_WIDTH / 2} y={0} width={CANVAS_WIDTH / 2} height={CANVAS_HEIGHT} fillPatternImage={bgP2}
                fillPatternScale={{ x: -1, y: 1 }} />

          <Rect x={CANVAS_WIDTH / 2 - 3} y={0} width={3} height={576} fill='white' />
          <Circle x={512} y={288} radius={96} stroke='white' strokeWidth={3} />

        </Layer>

        <Layer>

          <Circle x={match.ball.renderPosX} y={match.ball.renderPosY} radius={match.ball.radius} fill='#1c1c1c' />

          <Rect x={p1.paddle.posX} y={p1.paddle.posY} width={PADDLE_WIDTH}
                height={PADDLE_HEIGHT} fill='white' cornerRadius={5} />
          <Rect x={p2.paddle.posX} y={p2.paddle.posY} width={PADDLE_WIDTH}
                height={PADDLE_HEIGHT} fill='white' cornerRadius={5} />

        </Layer>

        {match.state == MatchState.STARTING && (

          <Layer>

            <Group x={CANVAS_WIDTH / 2 - 150} y={CANVAS_HEIGHT / 2 - 75}>
              <Rect x={0} y={0} width={300} height={150} fill='#1c1c1c' cornerRadius={20} />
              <Text x={0} y={0} width={300} height={150} align='center' verticalAlign='middle'
                    fill='#4cc38a' wrap='char' fontStyle='bold' fontSize={60}
                    text={match.timings.countdown < 0 ? 'FIGHT' : Math.ceil(match.timings.countdown).toString()} />
            </Group>

          </Layer>

        )}

      </Stage>
    );
  }
;

export default Component;
