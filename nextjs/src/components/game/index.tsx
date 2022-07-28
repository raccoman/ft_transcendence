import { FC } from 'react';
import { Circle, Layer, Stage, Rect } from 'react-konva';
import useImage from 'use-image';
import { Match } from 'types';
import { CANVAS_HEIGHT, CANVAS_WIDTH, PADDLE_HEIGHT, PADDLE_WIDTH } from 'src/contexts/game';

const Component: FC<{ match: Match }> = ({ match }) => {

  const [imageP1] = useImage(match.players[0].background);
  const [imageP2] = useImage(match.players[1].background);

  return (
    <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>

      <Layer>

        <Rect x={0} y={0} width={CANVAS_WIDTH / 2} height={CANVAS_HEIGHT} fillPatternImage={imageP1} />
        <Rect x={CANVAS_WIDTH / 2} y={0} width={CANVAS_WIDTH / 2} height={CANVAS_HEIGHT} fillPatternImage={imageP2} />

        {/*<Rect x={0} y={0} width={1024} height={576} stroke='white' strokeWidth={6} />*/}
        <Rect x={CANVAS_WIDTH / 2 - 3} y={0} width={3} height={576} fill='white' />
        <Circle x={512} y={288} radius={96} stroke='white' strokeWidth={3} />

      </Layer>

      <Layer>

        <Rect x={match.players[0].paddle.posX} y={match.players[0].paddle.posY}  width={PADDLE_WIDTH} height={PADDLE_HEIGHT} fill='white' cornerRadius={5} />
        <Rect x={match.players[1].paddle.posX} y={match.players[1].paddle.posY}  width={PADDLE_WIDTH} height={PADDLE_HEIGHT} fill='white' cornerRadius={5} />

      </Layer>

    </Stage>
  );
};

export default Component;
