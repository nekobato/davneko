import styled from '@emotion/styled';
import { useContext, useEffect, useRef } from 'react';
import { AudioContext as DavnekoAudioContext } from '@/utils/AudioContext';

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

const $VisualizerCanvas = styled.canvas``;

export const LineVisualizer: React.FC<Props> = ({ audioRef }) => {
  const audioContext = useContext(DavnekoAudioContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const audioSrc = useRef<MediaElementAudioSourceNode | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const WIDTH = 400;
  const HEIGHT = 320;

  const barWidth = 4;

  const draw = () => {
    let x = 0;

    analyser.current!.getByteFrequencyData(dataArray.current!);

    ctx.current!.fillStyle = 'rgb(0, 0, 0, 0.2)';
    ctx.current!.fillRect(0, 0, WIDTH, HEIGHT);

    let r, g, b;
    let bars = 64;

    for (let i = 0; i < bars; i++) {
      const barHeight = dataArray.current![i];

      if (dataArray.current![i] > 210) {
        // pink
        r = 250;
        g = 0;
        b = 255;
      } else if (dataArray.current![i] > 200) {
        // yellow
        r = 250;
        g = 255;
        b = 0;
      } else if (dataArray.current![i] > 190) {
        // yellow/green
        r = 204;
        g = 255;
        b = 0;
      } else if (dataArray.current![i] > 180) {
        // blue/green
        r = 0;
        g = 219;
        b = 131;
      } else {
        // light blue
        r = 0;
        g = 199;
        b = 255;
      }

      ctx.current!.fillStyle = `rgb(${r},${g},${b})`;
      ctx.current!.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 2; // Gives 10px space between each bar
    }

    requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (!audioRef.current || !audioContext.audioState.isPlaying || audioSrc.current) return;

    ctx.current = canvasRef.current!.getContext('2d')!;

    audioCtx.current = new AudioContext();

    audioSrc.current = audioCtx.current.createMediaElementSource(audioRef.current);
    analyser.current = audioCtx.current.createAnalyser();

    audioSrc.current.connect(analyser.current);
    analyser.current.connect(audioCtx.current.destination);

    analyser.current.fftSize = 8192;

    const bufferLength = analyser.current.frequencyBinCount;

    dataArray.current = new Uint8Array(bufferLength);

    draw();
  }, [audioContext.audioState.isPlaying]);

  return <$VisualizerCanvas ref={canvasRef} width={WIDTH} height={HEIGHT} />;
};
