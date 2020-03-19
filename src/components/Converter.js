import React, { Component } from "react";
import axios from "axios";
import "../App.css";

export class converter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      exchangeRate: [],
      amount: "",
      country1: "",
      country2: "",
      exchangeRateArray: [],
      currencyArray: [],
      res: 0,
      currencyCode: ""
    };
  }

  componentDidMount = () => {
    document.title = "Currency Converter";
    const fetchCurrencies = () => {
      axios
        .get(
          "https://www.apilayer.net/api/list?access_key=f693059fa767e40c5c0cfc0c2ce9ece4"
        )
        .then(res => {
          this.setState({ currencies: res.data.currencies });
          let currencyArray = [];

          for (let key in this.state.currencies) {
            currencyArray.push({
              key1: key,
              key2: this.state.currencies[key]
            });
          }
          this.setState({ currencyArray: currencyArray });
        })
        .catch(err => console.log(err.message));
    };

    const fetchExchangeRates = () => {
      axios
        .get(
          "http://www.apilayer.net/api/live?access_key=f693059fa767e40c5c0cfc0c2ce9ece4"
        )
        .then(res => {
          this.setState({ exchangeRate: res.data.quotes });
          let exchangeRateArray = [];
          for (let key in this.state.exchangeRate) {
            exchangeRateArray.push({
              key1: key,
              key2: this.state.exchangeRate[key]
            });
          }
          this.setState({ exchangeRateArray: exchangeRateArray });
          // console.log(exchangeRateArray);
        })
        .catch(err => console.log(err.message));
    };
    fetchCurrencies();
    fetchExchangeRates();
  };
  handleInputBox = e => {
    e.preventDefault();
    this.setState({
      amount: e.target.value
    });
  };
  handleSelect1 = e => {
    this.setState({
      country1: e.target.value
    });
  };
  handleSelect2 = e => {
    this.setState({
      country2: e.target.value
    });
  };

  convertNow = () => {
    let x = 0;
    let y = 0;
    let currencyCode = "";
    for (let key in this.state.exchangeRate) {
      if (key == this.state.country1) {
        x = this.state.exchangeRate[key];
      }
    }
    for (let key in this.state.exchangeRate) {
      if (key == this.state.country2) {
        currencyCode = key;
        y = this.state.exchangeRate[key];
      }
    }

    let exchange = (y / x) * this.state.amount;
    exchange = exchange.toFixed(3);
    this.setState({
      res: exchange,
      currencyCode: currencyCode.slice(3)
    });
    // console.log(currencyCode.slice(3));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 class="display-4 text-center mt-5 mb-5">Currency Converter</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <select class="form-control" onChange={this.handleSelect1}>
              <option value="">Select Country</option>
              {this.state.currencyArray.map(ele => {
                return (
                  <option key={ele.key1} value={`USD${ele.key1}`}>
                    {ele.key2}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className=" form-control"
              value={this.state.amount}
              onChange={this.handleInputBox}
              placeholder="Amount"
            />
          </div>
          <div className="col-md-4">
            <select class="form-control" onChange={this.handleSelect2}>
              <option value="">Select Country</option>
              {this.state.currencyArray.map(elem => {
                return (
                  <option key={elem.key1} value={`USD${elem.key1}`}>
                    {elem.key2}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <h1 className="display-1 text-center p-3" id="show">
              {this.state.res}
              <sub className="h4">{this.state.currencyCode}</sub>
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <button onClick={this.convertNow} class="btn btn-dark btn-block">
              Convert
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default converter;
