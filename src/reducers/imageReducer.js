import { types } from '../types/types';
import { constants } from '../helpers/contants';
/*
  Reducer Object
  
  {
    imageBase64: -> the image uploaded by the user in base64
    name: -> the name of the file uploaded by the user
    x: -> coord x in the canvas
    y: -> coord y in the canvas
    scale: -> the image will fit into the canvas. 
              1 = image will resize inside the canvas, this is by default
    canvasWitdh: -> we'll be using 600px
    canvasHeight: -> we'll be using 400px    
  }

*/

const initialState = {  
  imageBase64: '',   
  name:'', 
  x:0,
  y:0,
  scale:1,
  canvasWidth: constants.CANVAS_WIDTH,
  canvasHeight: constants.CANVAS_HEIGHT
}

export const imageReducer = ( state = initialState, action ) => {
  
  switch( action.type ){
    case types.imageClear:
      return {
        ...state,        
        imageBase64: '',              
        name: '',
        x:0,
        y:0,
        scale:1        
      }
    case types.imageLoad:
      return{
        ...state,       
        imageBase64: action.payload.imageBase64,
        name: action.payload.name,
        x: action.payload.x,
        y: action.payload.y,
        scale: action.payload.scale,        
      }
    default:
      return state;
  }

}