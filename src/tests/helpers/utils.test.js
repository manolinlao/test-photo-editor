import { getBase64, getNewCoords } from "../../helpers/utils";

function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}


// Tests of helpers/utils.js
describe( 'Test of helpers/utils.js', () => {

  // Test of getBase64 
  test( 'getBase64 must return a base64 string', async() => {
    
    const strBase64 = 'data:text/plain;base64,aGVsbG8gd29ybGQ=';
    const file = dataURLtoFile(strBase64,'hello.txt');
    
    getBase64( file, ( imageBase64 ) => {             
      expect( imageBase64 ).toBe( strBase64 );
    });

  });  

  // Test of getNewCoords - up must increase coord y  
  test( 'up increases coord y', async() => {    
    const newCoords = getNewCoords( 10, 10, 400, 400, 'up', { width: 100, height: 100 } )
    expect( newCoords.y ).toBeLessThan( 10 );
  });

  // Test of getNewCoords - down must decrease coord y
  test( 'down decreases coord y', async() => {    
    const newCoords = getNewCoords( 10, 10, 400, 400, 'down', { width: 100, height: 100 } )
    expect( newCoords.y ).toBeGreaterThan( 10 );
  });

  // Test of getNewCoords - right must increase coord x
  test( 'right increases coord x', async() => {    
    const newCoords = getNewCoords( 10, 10, 400, 400, 'right', { width: 100, height: 100 } )
    expect( newCoords.x ).toBeGreaterThan( 10 );
  });
  
  // Test of getNewCoords - right must decrease coord x
  test( 'left decreases coord x', async() => {    
    const newCoords = getNewCoords( 10, 10, 400, 400, 'left', { width: 100, height: 100 } )   
    expect( newCoords.x ).toBeLessThan( 10 );
  });

});