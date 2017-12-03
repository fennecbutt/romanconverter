import * as React from 'react';
import './App.css';
import { ChangeEvent } from 'react';

interface AppState {
  input: string;
  result: string;
}

const symbolsByPlace = [
  "","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
  "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
  "","I","II","III","IV","V","VI","VII","VIII","IX"
];

const symbolsByValue = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      input: '',
      result: ''
    };
  }

  private UpdateConversionInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ input: e.target.value.toUpperCase() }, this.Convert.bind(this));
  }

  /**
   * Identifies format of value in conversionInput and performs
   * an arabic<->roman conversion as necessary, storing it in result
   */
  private Convert() {
    if (!this.state.input) {
      this.UpdateResult('');
    } else if (/^\d+$/.test(this.state.input)) {
      this.UpdateResult(this.ArabicToRoman(this.state.input));
    } else if (/^[IVXLCDM]+$/.test(this.state.input)) {
      this.UpdateResult(this.RomanToArabic(this.state.input));
    } else {
      this.UpdateResult('Invalid input!');
    }
  }

  private ArabicToRoman(input: string) {
    /**
     * For each of the 1s, 10s and 100s places, we can use a precalculated map of symbols for the values
     */
    let digits = input.split('').map(n=>Number(n)), place = 3, output = '';
    while(place-- && digits.length){
      output = symbolsByPlace[digits.pop()! + (place * 10)] + output;
    }
    // For the 1000s place, only 1 symbol M is used, so we just repeat it for all digits in the 1000s place and beyond
    return 'M'.repeat(digits.length) + output;
  }

  private RomanToArabic(input: string){
    let symbols = input.split(''), total = 0, prev = null;
    while(symbols.length){
      let value = symbolsByValue[symbols.pop()!];
      if(prev && value < prev){
        value = -value;
      }
      prev = value;
      total += value || 0;
    }
    return total.toString();
  }

  private UpdateResult(result: string) {
    this.setState({ result });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Arabic/Roman numeral converter</h2>
        </div>
        <p className="App-intro">
          Number to convert:
          <input
            type="text"
            value={this.state.input}
            onChange={this.UpdateConversionInput.bind(this)}
            name="input-conversion" />
        </p>
        <p className="App-result">
          {this.state.result}
        </p>
      </div>
    );
  }
}

export default App;
