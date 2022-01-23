import { constants } from "./contants";

export const validateFile = ( file ) => {

  switch( file.type ){
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      return true;   
    default: 
  }
  
  return false;
}

// returns a Base64 string from a file
export const getBase64 = ( file, cb ) => {
  
  let reader = new FileReader();
  reader.readAsDataURL( file );
  reader.onload = function () {
      cb( reader.result )
  };
  reader.onerror = function ( error ) {
      
  };
}

// get new x,y coords 
export const getNewCoords = ( x, y, canvasWidth, canvasHeight, direction, displaySize ) => {

  const offsetScroll = constants.OFFSET_SCROLL;
  let offsetX = 0;
  let offsetY = 0;

  switch( direction ){
    case 'up':
      offsetY = -( canvasHeight / offsetScroll );
      break;
    case 'down':
      offsetY = canvasHeight / offsetScroll;
      break;  
    case 'right':
      offsetX = canvasWidth / offsetScroll;
      break;
    case 'left':
      offsetX = -(canvasWidth / offsetScroll);
      break;      
    default:
      break;
  }

  let newCoordX = x + offsetX;
  let newCoordY = y + offsetY;
  
  if( newCoordX <0 ){
    let d = -newCoordX;
    if(d>displaySize.width){
      newCoordX = x;
    }
  }else{
    if(newCoordX>canvasWidth){
      newCoordX = x;
    }
  }
  if( newCoordY <0 ){
    let d = -newCoordY;
    if(d>displaySize.height){
      newCoordY = y;
    }
  }else{
    if(newCoordY>canvasHeight){
      newCoordY = y;
    }
  }
  
  return {
    x: newCoordX,
    y: newCoordY
  }
}