import React from 'react';
import { useSelector } from 'react-redux';
import { Canvas } from './Canvas';
import { NotImage } from './NotImage';

export const MainScreen = () => {

  // when Store State changes, it will render again the Canvas
  const { imageBase64, name, x, y, scale, canvasWidth, canvasHeight } = useSelector( state => state.image );

  return (
    <div>
        {
          ( imageBase64 )
          ?<Canvas width={ canvasWidth } height={ canvasHeight } imageBase64={ imageBase64 } imageName={ name } coordX={ x } coordY={ y } scale={ scale }/>
          :<NotImage/>
        }
    </div>
  )
};
