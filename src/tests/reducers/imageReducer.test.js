import { constants } from '../../helpers/contants';
import { imageReducer } from '../../reducers/imageReducer';
import { types } from '../../types/types';

describe( 'Test of reducers/imageReducer.js', () => {
  
  test( 'Test of imageClear', async() => {
    
    const initialState = {  
      imageBase64: '',   
      name: '', 
      x: 0,
      y: 0,
      scale: 1,
      canvasWidth: 600,
      canvasHeight: 400
    }

    const action = {
      type: types.imageClear
    }
    
    const state = imageReducer( initialState, action );

    expect( state ).toEqual( {
      imageBase64: '',
      name: '',
      x: 0,
      y: 0,
      scale: 1,
      canvasWidth: 600,
      canvasHeight: 400
    })

  });

  test( 'Test of imageLoad', async() => {
    
    const initialState = {  
      imageBase64: '',   
      name: '', 
      x: 0,
      y: 0,
      scale: 1,
      canvasWidth: constants.CANVAS_WIDTH,
      canvasHeight: constants.CANVAS_HEIGHT
    }

    const action = {
      type: types.imageLoad,
      payload:{
        imageBase64: 'str',
        name: 'name',
        x: 100,
        y: 200,
        scale: 1,
        canvasWidth: 600,
        canvasHeight: 400
      }
    }
    
    const state = imageReducer( initialState, action );

    expect( state ).toEqual( {
      imageBase64: 'str',
      name: 'name',
      x: 100,
      y: 200,
      scale: 1,
      canvasWidth: 600,
      canvasHeight: 400
    })

  });

  
});