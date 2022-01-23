import { imageClear, imageLoad } from '../../actions/image';
import { types } from '../../types/types';

describe( 'Test of actions/image.js', () => {
  
  test( 'Test of action imageClear ', async() => {
    
    const imageClearAction = imageClear();

    expect( imageClearAction ).toEqual({
      type: types.imageClear
    });

  });

  test( 'Test of action imageLoad ', async() => {
    
    const imageLoadAction = imageLoad( 'str', 'name', 0, 0, 1 );

    expect( imageLoadAction ).toEqual({
      type: types.imageLoad,
      payload:{
        imageBase64: 'str',
        name: 'name',
        x: 0,
        y: 0,
        scale: 1
      }
    });

  });

});