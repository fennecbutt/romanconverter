import * as React from 'react';
import './App.css';
import { ChangeEvent } from 'react';
import {RomanConverter} from './RomanConverter';

interface AppState {
  input: string;
  result: string;
}

class App extends React.Component<{}, AppState> {

  private converter = new RomanConverter();

  constructor(props: {}) {
    super(props);
    this.state = {
      input: '',
      result: ''
    };
  }

  private UpdateConversionInput(e: ChangeEvent<HTMLInputElement>) {
    let formattedInput = e.target.value.toUpperCase();
    if(!formattedInput || /^[\dIVXLCDM]+$/.test(formattedInput)){
      this.setState({ input: formattedInput }, this.Convert.bind(this));
    }
  }

  /**
   * Identifies format of value in conversionInput and performs
   * an arabic<->roman conversion as necessary, storing it in result
   */
  private Convert() {
    if (!this.state.input) {
      this.UpdateResult('');
    } else if (/^\d+$/.test(this.state.input)) {
      this.UpdateResult(this.converter.ArabicToRoman(this.state.input));
    } else if (/^[IVXLCDM]+$/.test(this.state.input)) {
      this.UpdateResult(this.converter.RomanToArabic(this.state.input));
    } else {
      this.UpdateResult('Invalid input!');
    }
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
