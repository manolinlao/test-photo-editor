import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { imageClear } from '../actions/image';
import { constants } from '../helpers/contants';
import { getNewCoords } from '../helpers/utils';
import { useCallback } from 'react';

export const Canvas = ( { width:canvasWidth, height:canvasHeight, imageBase64, imageName, coordX, coordY, scale }) => {

  const dispatch = useDispatch();

  // states
  // imageData, Base64 string
  const [ imageData, setImageData ] = useState(); 
  // isImageLoaded, true when image is loaded into <img>
  const [ isImageLoaded, setIsImageLoaded ] = useState( false );
  const [ coords, setCoords ] = useState( { x: coordX, y: coordY  } );  
  const [ imageScale, setImageScale ] = useState();
  const [ displaySize, setDisplaySize ] = useState();
  const [ zoomValue, setZoomValue ] = useState();
  const [ imgOriginalSize, setImgOriginalSize ] = useState();
  
  // refs to DOM elements
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // image loaded into <img>
  // draws the image into the canvas
  const handleImageLoaded = () => {  

    // get canvas
    const contextCanvas = canvasRef.current.getContext( '2d' );

    // clear canvas
    contextCanvas.clearRect(0,0,canvasWidth,canvasHeight);

    // get image information - width, height, ratio
    const img = imageRef.current;
    setImgOriginalSize( { width: img.width, height: img.height } );    
    let imageRatio = img.width / img.height;
    
    // get display size to show in canvas
    // by default image is zoomd to fit the canvas respecting its ratio   
    // if scale == 1 image will resize to fit the canvas, zoom value will be calculated 
    let displayWidth = canvasWidth;
    let displayHeight = canvasWidth / imageRatio;
    if( img.width < img.height ){
      imageRatio = 1 / imageRatio;
      displayHeight = canvasHeight;
      displayWidth = canvasHeight / imageRatio;
    }
    
    // draws image into canvas
    contextCanvas.drawImage( img, coordX, coordY, displayWidth*scale, displayHeight*scale );

    // update states
    setIsImageLoaded ( true );
    setCoords( { x: coordX, y: coordY } );
    setImageScale( scale ); 
    setZoomValue( ( 100 *  displayWidth*scale ) / img.width );
    setDisplaySize( { width: displayWidth, height: displayHeight } );
   
  }

  // remove image from canvas and store state
  const handleClear = () => {    

    dispatch( imageClear() );

  }

  // move image inside canvas
  const handleMove = ( direction ) => {    

    if( direction === 'reset' ){
      setCoords( { x: 0, y: 0 } );
      return;
    }

    // gets new x,y coordinates 
    // controlling the boundaries
    let newCoords = getNewCoords( coords.x, coords.y, canvasWidth, canvasHeight, direction, displaySize );
    
    setCoords( { x: newCoords.x, y: newCoords.y } );

  }

  // scale image inside canvas
  const handleZoom = ( mode ) => {

    let newScale = 1;
    
    if( mode === 'increase' ){
      if( imageScale < 0 ){
        newScale = constants.OFFSET_SCALE;
      }else{
        newScale = imageScale + constants.OFFSET_SCALE;
      }      
    }else{
      newScale = imageScale - constants.OFFSET_SCALE;
    }    
    
    if( newScale<0 ) {
      newScale = 0;
    } 
    
    setImageScale( newScale );

  }

  // saves image data into Localstorage
  const handleSubmit = useCallback(async() => {

    // control of decimal numbers to avoid decimal deviation
    let newScale = imageScale + '';
    if( newScale.length > 3 ) newScale = newScale.substring(0,3);
    newScale = newScale - 0;  

    const imgObj = {      
      canvasWidth,
      canvasHeight,      
      imageBase64,
      name:imageName,
      x: coords.x,
      y: coords.y,
      scale: newScale
    }
      
    localStorage.setItem( constants.STORAGE_NAME, JSON.stringify( imgObj ) );

    Swal.fire(
      'Image saved in Localstorage',
      'Localstorage id is "imgObj"',
      'success'
    )

    });

  // Effect called whenever coords or imageScale changes its value
  // redraws the canvas
  useEffect( () => {    

    if(isImageLoaded){            

      const contextCanvas = canvasRef.current.getContext( '2d' );
      contextCanvas.clearRect(0,0,canvasWidth,canvasHeight);
      contextCanvas.drawImage( imageRef.current, coords.x, coords.y, displaySize.width*imageScale, displaySize.height*imageScale );
     
      let zoomValue = ( 100 *  displaySize.width*imageScale ) / imgOriginalSize.width;
      if( zoomValue < 0 ){
        zoomValue = 0;
      }

      setZoomValue( Math.floor( zoomValue ) + '%' );

    }

  }, [ coords, isImageLoaded, canvasHeight, canvasWidth, imageScale, displaySize, imgOriginalSize ] );

  // Effect called whenever imageBase64 changes its value
  // will make <img> to call handleImageLoaded
  useEffect( ()=> { 

    setImageData( imageBase64 );

  }, [ imageBase64 ] );

  return (
    <div className='canvas__main-content'>
      <div className='mt-5'>
        <b>Name:</b> { imageName }
      </div>
      <div className='mt-1' style={ { display: 'flex', justifyContent:'center'} }> 
        <div>
          <canvas ref={ canvasRef } width={ canvasWidth } height={ canvasHeight } className = 'canvas__canvas' />     
          <img ref={ imageRef } src={ imageData } onLoad={ handleImageLoaded } style={ { display:'none' } } alt=''/>
        </div>       
        <div style={ { display: 'flex', flexDirection: 'column',marginLeft:'10px' } }>
          <div className='mt-1'>
            <button className='btn btn-scroll' onClick={ () => handleMove( 'up' ) }><i className='fa-solid fa-up-long' style={ { color:'white' } }></i></button>
          </div>
          <div className='mt-1'>        
            <button className='btn btn-scroll' onClick={ () => handleMove( 'left' ) }><i className='fa-solid fa-left-long' style={ { color:'white' } }></i></button>
            <button className='btn btn-scroll' onClick={ () => handleMove( 'reset' ) }><i className='fa-regular fa-circle-xmark' style={ { color:'white' } }></i></button>
            <button className='btn btn-scroll' onClick={ () => handleMove( 'right' ) }><i className='fa-solid fa-right-long' style={ { color:'white' } }></i></button>
          </div>
          <div className='mt-1'>
            <button className='btn btn-scroll' onClick={ () => handleMove( 'down' ) }><i className='fa-solid fa-down-long' style={ { color:'white' } }></i></button>
          </div>
          <div className='mt-5'>
            <b>Zoom:</b> { zoomValue }
          </div>
          <div className='mt-1'>
            <button className='btn btn-scroll' onClick={ () => handleZoom( 'increase' ) }>+</button>
            <button className='btn btn-scroll' onClick={ () => handleZoom( 'decrease' ) }>-</button>
          </div>
        </div>        
      </div>    
     
      <div className='mt-1'>
        <button className='btn btn-secondary' onClick={ handleClear }>Clear Canvas</button>        
        <button className='btn btn-secondary ml-5' onClick={ handleSubmit }><i className="fa-regular fa-floppy-disk" style={ { color:'white' } }></i> Save image</button>
      </div>
    </div>
  )
}
