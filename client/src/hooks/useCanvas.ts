import { useRef, useEffect } from 'react';

const useCanvas = (draw: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;

    if (!canvas) return;

    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);

  return canvasRef;
}

export default useCanvas;
