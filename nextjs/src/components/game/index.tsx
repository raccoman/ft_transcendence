import { FC } from 'react';
import { Circle, Line, Layer, Stage, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';

const Component: FC = () => {

  const [me] = useImage('https://images.all-free-download.com/images/graphiclarge/cartoon_pattern_background_05_vector_180955.jpg');
  const [opponent] = useImage('https://static.vecteezy.com/system/resources/thumbnails/000/692/310/small/seamless-pattern-of-cute-cartoon-planets-in-space-background.jpg');

  return (
    <Stage width={1024} height={576}>
      <Layer>

        <Rect
          x={0}
          y={0}
          width={512}
          height={576}
          fillPatternImage={me}
        />
        <Rect
          x={512}
          y={0}
          width={512}
          height={576}
          fillPatternImage={opponent}
        />
      </Layer>
    </Stage>
  );
};

export default Component;
