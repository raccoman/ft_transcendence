import { FC } from 'react';
import { Circle, Layer, Stage, Rect, Image } from 'react-konva';
import useImage from 'use-image';

const Component: FC<{ posY: number, oPosY: number }> = ({ posY, oPosY }) => {

  const [me] = useImage('https://images.all-free-download.com/images/graphiclarge/cartoon_pattern_background_05_vector_180955.jpg');
  const [opponent] = useImage('https://static.vecteezy.com/system/resources/thumbnails/000/692/310/small/seamless-pattern-of-cute-cartoon-planets-in-space-background.jpg');


  return (
    <Stage width={1024} height={576}>

      <Layer>

        <Rect x={0} y={0} width={512} height={576} fillPatternImage={me} />
        <Rect x={512} y={0} width={512} height={576} fillPatternImage={opponent} />

        {/*<Rect x={0} y={0} width={1024} height={576} stroke='white' strokeWidth={6} />*/}
        <Rect x={509} y={0} width={3} height={576} fill='white' />
        <Circle x={512} y={288} radius={96} stroke='white' strokeWidth={3} />

      </Layer>

      <Layer>

        <Rect x={20} y={posY} width={20} height={192} fill='white' cornerRadius={5} />
        <Rect x={984} y={oPosY} width={20} height={192} fill='white' cornerRadius={5} />

      </Layer>

    </Stage>
  );
};

export default Component;
