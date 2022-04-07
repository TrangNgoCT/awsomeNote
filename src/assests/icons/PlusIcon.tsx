import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color: string;
  size: number;
}

function PlusIcon(props: Props) {
  return (
    <Svg width={props.size} height={props.size} fill={props.color} viewBox="0 0 16 16">
      <Path
        strokeWidth={32}
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
      />
    </Svg>
  );
}

export default PlusIcon;
