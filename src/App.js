import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DynamicForm from './components/DynamicForm';
import axios from 'axios';
import './App.css';
const JsonTable = require('ts-react-json-table');

class App extends Component {
  state = {
    data: [
     ],
    current: {},
  }

  render() {

    return (
      <div className="App">


        <div class="row">


            <div class="col-1 border-right">
                <div id="follow-me" class="mt-3">
                    <a href="https://www.linkedin.com/in/philip-leblanc-7692a5aa/">
                        <img src="/static/img/linkedinlogo.png" alt="linkedin" class="img-fluid mb-4 ml-2"/>
                    </a>
                    <a href="https://github.com/philip-L">
                        <img src="/static/img/githublogo.png" alt="github" class="img-fluid ml-2"/>
                    </a>
                </div>
            </div>

            <div class="col-11">
                <div id="middle-info" class="mt-3">

                    <h2 id="tag-line">SIMPLE STOCK PRICE INDICATOR WITH KERAS AND YAHOO FINANCE API</h2>
                    <h4 id="tag-line" class="text-muted">November 11, 2021</h4>
                    <br/>
                    <p align='left'>
                      Traditional methods of stock analysis are becoming outdated, and machine learning models have been the rage for some time now. In this report, I discuss a method for a stock price indicator for my Udacity data science capstone project, using the python yfinance package to collect historical price for a list of stock symbols. Code is contained in a jupyter notebook found on my github here: <a href="https://github.com/philip-L/AlgoTrading/">here</a>.
                    </p>
                    <img src="/static/img/ML.jpg" align='center' width ='50%'/>
                    <br/>
                    <br/>
                    <p align='left'>
                      The problem here is to predict the closing price of a stock symbol n days into the future based on the data of m days of past data. In this project I wanted to explore the Long Short-Term Memory (LSTM) recurrent artificial neural network, which is powerful in time-series prediction problems. I discovered this method in the following tutorial on youtube: <a href="https://www.youtube.com/watch?v=QIUxPv5PJOY&ab_channel=ComputerScience">here</a>. Based on watching the video I expect the predictions of the model to be close, but not totally accurate, and should not be taken as real investing advice by itself.
                    </p>
                    <p align='left'>
                      The metric used to measure the model's performance here is the root-mean-squared error (RMSE). The rmse is a popular metric used to measure the difference between actual and predicted values. Since this can be thought of as a regression problem this is a good metric to use.
                    </p>

                    <br/>
                    <h4 align='left'>Analysis</h4>
                    <p align='left'>
                      The input data is the open/low/high/close (OLHC) and volume for a company's public share price since the company went public. Only the closing price is used in the model. Below is a statistical data visualization of the closing price for ticker symbol "ANY" using pandas DataFrame describe() method:
                    </p>
                    <img src="/static/img/any_closeprice.png" align='center'/>
                    <br/>

                    <br/>
                    <h4 align='left'>Methodology</h4>
                    <p align='left'>
                      To start, the data is scaled to values between 0 and 1 using sklearn's MinMaxScaler and is split into training and testing sets (80% and 20% respectively). In this problem the data needs to be split further into x and y sets, where x is an array of arrays for the closing price for m days in the past (60 data points is chosen) and y is an array of the closing price one day later.
                    </p>
                    <p align='left'>
                      With this prepared data, I use built in keras (with tensorflow) methods to build, compile, and fit a LSTM model to train on the x and y datasets. With this trained model, I predict using the testing data and calculate RMSE as a metric of difference between predicted and actual values. For refinement, I wanted to try to lower RMSE. The model originally had four layers, two LSTM layers and two Dense layers. The RMSE was ~16, and removing one of the Dense layers in the model improved RMSE to ~11.
                    </p>

                    <br/>
                    <h4 align='left'>Results</h4>
                    <p align='left'>
                      The following plot shows the historical closing price of ticker symbol "ANY" with training, testing and predicted values labeled in the legend. The model predicts values close but slightly higher than actual values. Overall it is a nice result.
                    </p>
                    <img src="/static/img/model_chart.png" align='center'/>
                    <br/>
                    <br/>
                    <p align='left'>
                      The model (LSTM) is a type of recurrent neural network designed to handle sequence dependencies and ideal for time-series prediction problems. It is trained using Backpropagation Through Time and overcomes the vanishing gradient problem. It is a good choice for regression problems.
                    </p>

                    <br/>
                    <h4 align='left'>Conclusion</h4>
                    <p align='left'>
                      In conclusion, the LSTM is just what I needed for this problem, however it could be explored more in depth to understand optimizer, loss function and the layers of the model. Some other possible areas to explore: 1. use finviz news and insider buying/selling to train a model to predict price changes. 2. to calculate percent gain for every previous year (X) and predict current year gain (y).
                    </p>
                    <br/><br/><br/>
                </div>
            </div>
        </div>

        <div id="container">

        </div>

      </div>
    );
  }
}

export default App;
