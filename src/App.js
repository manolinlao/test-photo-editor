import React from 'react';
import { Provider } from 'react-redux';
import { ImageSelector } from './components/ImageSelector';
import { MainScreen } from './components/MainScreen';
import { store } from './store/store';

export const App = () => {  
  return(
    <Provider store={ store }>
      <div className='main__main-content'>
        <ImageSelector/>
        <MainScreen/>
      </div>      
    </Provider>    
  )
};


