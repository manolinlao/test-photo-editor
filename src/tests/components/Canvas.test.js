import React from 'react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Canvas } from '../../components/Canvas';

import { imageClear } from '../../actions/image';

jest.mock('../../actions/image', () => ({
  imageClear: jest.fn()
}))


const mockStore = configureStore();
const initialState = {
  image:{  
    imageBase64: '',   
    name:'', 
    x:0,
    y:0,
    scale:1,
    canvasWidth: 600,
    canvasHeight: 400
  }
};

const canvasData = {
  width: 600,
  height: 400,
  imageBase64: 'aaaaa',
  imageName: 'name',
  coordX: 0,
  coordY: 0,
  scale: 1
}

let wrapper;

beforeEach( () => {
  
  const store = mockStore( initialState );
  store.dispatch = jest.fn();
  wrapper = mount(
    <Provider store={ store } { ...canvasData }>
      <Canvas/> 
    </Provider>       
  );
});

describe( 'Test of Component <Canvas/>', () => {

  test( '<Canvas/> must be rendered correctly', () => {    
        
    expect( wrapper ).toMatchSnapshot();

  });

  test( 'button for clearing canvas dispatches imageClear action', () => {

    expect( wrapper ).toMatchSnapshot();
    wrapper.find( 'button' ).at( 7 ).prop( 'onClick' )();
    expect( imageClear ).toHaveBeenCalled();

  })

});