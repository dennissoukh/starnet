import { useRef, useEffect } from 'react';

const useCanvas = (draw: any, options: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;

    if (!canvas) return;

    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId: number;

    // const render = () => {
    //   frameCount++;
    //   draw(context, frameCount);
    //   animationFrameId = window.requestAnimationFrame(render);
    // }
    // render();
    draw(context, frameCount);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio = 1 } = window;
      const context = canvas.getContext('2d');
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context?.scale(ratio, ratio);
    }
  }, []);

  return canvasRef;
}

export default useCanvas;
