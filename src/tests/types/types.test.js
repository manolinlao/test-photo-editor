import { types } from '../../types/types';

describe( 'Test of types', () => {

  test( 'Must have all the types', () => {

    expect( types ).toEqual({
      imageClear: '[Img] clear',
      imageLoad: '[Img] load',
    });

  });

});