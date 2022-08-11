import styled from '@emotion/styled';
import { useRef } from 'react';

const $Gauge = styled.div`
  position: relative;
  width: 100%;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  .progress-bar-inner {
    width: 0;
    height: 100%;
    background: #ddd;
    transition: width 0.16s ease;
  }
`;

type Props = {
  onSeek: (progress: number) => void;
  progress: number;
};

export const Gauge: React.FC<Props> = ({ onSeek, progress }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressStyle = { width: `${progress}%` };

  return (
    <$Gauge
      onClick={(e) => {
        onSeek(e.nativeEvent.offsetX / progressBarRef.current!.clientWidth);
      }}
      ref={progressBarRef}
    >
      <div className="progress-bar-inner" style={progressStyle} />
    </$Gauge>
  );
};
