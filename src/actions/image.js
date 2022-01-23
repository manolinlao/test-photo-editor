import { types } from '../types/types';

export const imageClear = () => {
  return({
    type: types.imageClear    
  })
}

export const imageLoad = ( imageBase64, name, x, y, scale ) => {
  return({
    type: types.imageLoad,
    payload: {      
      imageBase64,
      name,
      x,
      y,
      scale
    }
  })
}