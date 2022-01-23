import React from 'react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MainScreen } from '../../components/MainScreen';
import { imageClear } from '../../actions/image';

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

describe( 'Test of Component <MainScreen/>', () => {

  test( '<MainScreen/> must be rendered correctly', () => {    
    
    const store = mockStore( initialState );
    const wrapper = mount(
      <Provider store={ store }>
        <MainScreen/> 
      </Provider>       
    );

    expect( wrapper ).toMatchSnapshot();

  });
  
  test( '<MainScreen/> must show <NotImage/> if there is no image loaded', () => {

    const store = mockStore( initialState );
    const wrapper = mount(
      <Provider store={ store }>
        <MainScreen/> 
      </Provider>       
    );

    expect( wrapper ).toMatchSnapshot();
    const p = wrapper.find( 'p' );
    expect( p.text().trim() ).toBe( 'You must load an image to be showed in canvas' );
    
  });

 
  test( '<MainScreen/> must show <Canvas/> if there is an image loaded', () => {

    const initialState = {
      image:{  
        imageBase64: 'image',   
        name:'', 
        x:0,
        y:0,
        scale:1,
        canvasWidth: 600,
        canvasHeight: 400
      }
    };

    const store = mockStore( initialState );
    const wrapper = mount(
      <Provider store={ store }>
        <MainScreen/> 
      </Provider>       
    );

    expect( wrapper ).toMatchSnapshot();
    expect(wrapper.find('div.canvas__main-content').exists()).toBe( true );
    
  });
  

});