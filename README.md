# Albelli test

The app has been developed using React.

The app uses Redux to mantain a global state with the information of the image.
This state is an object of this form:
  {
    imageBase64: '###',   
    name: '###', 
    x: #,
    y: #,
    scale: #,
    canvasWidth: ###,
    canvasHeight: ###,
  }

Whenever the store state changes, it forces the render of a new image.

When the user loads a new image, the app gets the Base64 string of the image,
so the app uses the Base64 information of the image instead of the file,
in order to be able to save it later into the Localstorage.

When the uses clicks 'Save Image' button, the information of the image is
saved into the localstorage as a JSON string

  key = 'imgObj'
  value = {
      canvasWidth,
      canvasHeight,
      imageBase64,
      name,
      scale,
      x,
      y
  }

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
