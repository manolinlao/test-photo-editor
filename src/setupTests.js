//import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure( { adapter: new Adapter() } );
expect.addSnapshotSerializer( createSerializer( { mode: 'deep' } ) );

// mocking localstorage
var localStorageMock = (function() {
  var store = {};

  return {
    getItem: function(key) {
        return store[key] || null;
    },
    setItem: function(key, value) {
        store[key] = value.toString();
    },
    clear: function() {
        store = {};
    }
  }; 
})();

Object.defineProperty(window, 'localStorage', {
 value: localStorageMock
});