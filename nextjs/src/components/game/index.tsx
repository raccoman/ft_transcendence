import { FC } from 'react';
import { Circle, Group, Layer, Rect, Stage, Text } from 'react-konva';
import useImage from 'use-image';
import { Match, MatchState } from 'types';
import { CANVAS_HEIGHT, CANVAS_WIDTH, PADDLE_HEIGHT, PADDLE_WIDTH } from 'src/contexts/game';

const Component: FC<{ match: Match, frameRate: number; }> = ({ match, frameRate }) => {

    const [imageP1] = useImage('https://as1.ftcdn.net/v2/jpg/02/98/83/56/1000_F_298835677_qp9DhjpPxKnuEunLPWrsSgOvjvyx4aFl.jpg');
    const [imageP2] = useImage('https://as1.ftcdn.net/v2/jpg/02/98/83/56/1000_F_298835677_qp9DhjpPxKnuEunLPWrsSgOvjvyx4aFl.jpg');

    return (
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>

        <Layer>

          <Rect x={0} y={0} width={CANVAS_WIDTH / 2} height={CANVAS_HEIGHT} fillPatternImage={imageP1} />
          <Rect x={CANVAS_WIDTH / 2} y={0} width={CANVAS_WIDTH / 2} height={CANVAS_HEIGHT} fillPatternImage={imageP2}
                fillPatternScale={{ x: -1, y: 1 }} />

          {/*<Rect x={0} y={0} width={1024} height={576} stroke='white' strokeWidth={6} />*/}
          <Rect x={CANVAS_WIDTH / 2 - 3} y={0} width={3} height={576} fill='white' />
          <Circle x={512} y={288} radius={96} stroke='white' strokeWidth={3} />

        </Layer>

        <Layer>

          <Circle x={match.ball.renderPosX} y={match.ball.renderPosY} radius={match.ball.radius} fill='#1c1c1c' />

          <Rect x={match.players[0].paddle.posX} y={match.players[0].paddle.posY} width={PADDLE_WIDTH}
                height={PADDLE_HEIGHT} fill='white' cornerRadius={5} />
          <Rect x={match.players[1].paddle.posX} y={match.players[1].paddle.posY} width={PADDLE_WIDTH}
                height={PADDLE_HEIGHT} fill='white' cornerRadius={5} />

        </Layer>

        {match.state == MatchState.STARTING && (

          <Layer>

            <Group x={CANVAS_WIDTH / 2 - 150} y={CANVAS_HEIGHT / 2 - 150}>
              <Rect x={0} y={0} width={300} height={300} fill='#1c1c1c' cornerRadius={150} />
              <Text x={0} y={0} width={300} height={300} align='center' verticalAlign='middle'
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
