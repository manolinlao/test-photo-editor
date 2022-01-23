import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { imageLoad } from '../actions/image';
import { constants } from '../helpers/contants';
import { getBase64, validateFile } from '../helpers/utils';

export const ImageSelector = () => {

  const dispatch = useDispatch();

  // forces a click into #fileSelector <input> element
  const handleLoadNewImage = () => {

    document.querySelector( '#fileSelector' ).click();

  }

  // user has selected a file
  // for later use with LocalStorage, the file is converted into a Base64 string
  const handleFileChange = ( e ) => {
   
    const fileSelected = e.target.files[ 0 ];

    if( !validateFile( fileSelected) ){
      Swal.fire(
        'Something went wrong',
        'The file you have selected is not an image',
        'error'
      )
      return;
    }
        
    // dispatch into the reducer, this will provoke the render of the Canvas
    // in MainScreen with the new data
    getBase64( fileSelected, ( imageBase64 ) => {             
      dispatch( imageLoad( imageBase64, fileSelected.name, 0, 0, 1 ) );            
    });
   
    // clear <input> 
    document.querySelector( '#fileSelector' ).value = '';
  }
  
  // load the data from LocalStorage
  const handleStoredImage = () => {
    
    let imgObj = JSON.parse(localStorage.getItem(constants.STORAGE_NAME));

    if( imgObj ){      
      dispatch( imageLoad ( imgObj.imageBase64, imgObj.name, imgObj.x, imgObj.y, imgObj.scale ) );      
    } else{
      Swal.fire(
        'Something went wrong',
        'There are not images stored yet',
        'error'
      )
    }   
  }

  return (

    <div className='imageSelector__main-content'>

      <button 
        className='btn btn-primary'
        onClick={ handleLoadNewImage }
      >
        Select an image
      </button>
      <button 
        className='btn btn-primary ml-5'
        onClick={ handleStoredImage } 
      >
          Load image from localStorage
      </button>

      <input 
        id='fileSelector'
        name='myFileSelector'
        type='file'
        style= { { display: 'none' } }
        onChange = { handleFileChange }
      />

    </div>
  )
};
