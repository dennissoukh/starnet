import React from 'react';
import useCanvas from '../../hooks/useCanvas';

const _postdraw = () => {
  console.log('postdraw')
  // ctx.restore();
}

const Canvas: React.FC<any> = ({ draw, ...rest }) => {
  const canvasRef = useCanvas(draw, { postdraw: _postdraw });

  return (
    <canvas ref={canvasRef} {...rest}/>
  );
}

export default Canvas;
