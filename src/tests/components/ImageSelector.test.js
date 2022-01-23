import React from 'react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { ImageSelector } from '../../components/ImageSelector';

import { imageLoad } from '../../actions/image';

jest.mock('../../actions/image', () => ({
  imageLoad: jest.fn()
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

let wrapper;

beforeEach( () => {
  
  const store = mockStore( initialState );
  store.dispatch = jest.fn();
  wrapper = mount(
    <Provider store={ store }>
      <ImageSelector/> 
    </Provider>       
  );
});

describe( 'Test of Component <ImageSelector/>', () => {

  test( '<ImageSelector/> must be rendered correctly', () => {    
        
    expect( wrapper ).toMatchSnapshot();

  });

  test( 'button to load image from localStorage dispatches imageLoad if exist image in localstorage', () => {
    
    const imgObj = {      
      canvasWidth:600,
      canvasHeight:400,   
      imageBase64:'aaaaaaa',
      name:'name',
      x: 0,
      y: 0,
      scale: 1
    }

    localStorage.setItem( 'imgObj', JSON.stringify( imgObj ) );

    wrapper.find( 'button' ).at(1).prop( 'onClick' )();
    expect( imageLoad ).toHaveBeenCalled();

  });

  test( 'button to load image from localStorage does not dispatch imageLoad if does not exist image in localstorage', () => {
    
    localStorage.clear();

    wrapper.find( 'button' ).at(1).prop( 'onClick' )();
    expect( imageLoad ).not.toHaveBeenCalled();

  });

});