import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {RomanConverter} from './RomanConverter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('converts from 1 to 3999 to roman and back again', () => {
  let converter = new RomanConverter();
  for(let i = 1; i < 4000; i++){
    let j = i.toString();
    if(converter.RomanToArabic(converter.ArabicToRoman(j)) !== j){
      throw new Error(`Conversion to or from ${j} was not successful`);
    }
  }
});
