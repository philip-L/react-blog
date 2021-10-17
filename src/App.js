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

                    <h2 id="tag-line">Finviz and Yahoo Finance API's for Retail Investors</h2>
                    <h4 id="tag-line" class="text-muted">October 14, 2021</h4>
                    <br/>
                    <p align='left'>
                      If you saw my email' inbox, you'd think I'm a retail trader. Retail investors are powerful in numbers but can be manipulated with news. It's a game large firms can't lose, and the lonely retail investor seems to have no chance.
                    </p>
                    <p align='left'>
                      Since the March 2019 covid flash-crash, the stock market has been very bullish, with quantitative easing adding so much new money into the market, gains seem to be popping up everywhere. It may be a good time to enter the market with a bullish strategy or maybe this is the time to prepare for when the market will eventually reconcile?
                    </p>
                    <img src="/static/img/bearsbelike.jpg" align='center' width ='50%'/>
                    <br/>
                    <br/>
                    <p align='left'>
                      Nowadays, without the help of automation and algorithmic trading, retail investors face a lot of manual data analysis in choosing what company is the best bet, deciding a target, stop loss, and tracking their portfolio.
                    </p>
                    <p align='left'>
                      Thankfully there are websites like Finviz and Yahoo Finance (if you have access to a computer and internet), and if you know how to code there are their Application Programming Interface (API's). Thank you to the maintainers of these repos: https://github.com/mariostoev/finviz, https://github.com/ranaroussi/yfinance.
                    </p>
                    <br/>
                    <h4 align='left'>Stock Analysis</h4>
                    <p align='left'>
                    Some of the questions I wanted to address here are the following:
                    </p>
                    <ul align='left'>
                        <li>What companies stock are trending upward?</li>
                        <li>What companies have the best balance sheet?</li>
                        <li>What does the chart show? </li>
                    </ul>
                    <p align='left'>
                    I started by using the Finviz screener API to collect a list of stocks, filtering on average volume (over 10000), share price (under $50), and country (Canada). These companies are also option-able and short-able. I had a list of 150 symbols and I decided to use the Yahoo Finance API to fetch stock open/low/high/close historical data. I then found the distribution of percent change for the total, five-year, one-year, three-month, and one-month periods and the heat map of correlation.
                    </p>
                    <img src="/static/img/gaindist.png" align='center'/>
                    <img src="/static/img/gainheatmap.png" align='center'/>
                    <br/>
                    <br/>
                    <p align='left'>
                    The histograms show that the market has positive bias. Most of these companies have positive gain over time. From the heat map, the most recent periods are more related (trends are local), and longer periods have small sometimes negative correlation which could hint at mean reversion. This is a visualization of basic, fundamental knowledge that all investors should know.
                    </p>
                    <p align='left'>
                    To shorten my list, I look for stocks with overall positive gain over 342% and gain greater than 1% in the last month. This gives me a list of 18 companies.
                    </p>
                    <h4 align='left'>Intrinsic Value, F and Z-score</h4>
                    <p align='left'>
                    Next I want to do some value investing because it is the most fundamental (no pun intended).
                    </p>
                    <ul align='left'>
                        <li>Intrinsic value: a measure of the true worth of a company's share</li>
                        <li>Z-score: a score below 1.8 means it's likely the company is headed for bankruptcy. Scores above 3 are not likely to go bankrupt </li>
                        <li>F-score: health of a company's balance sheet. Best value = 9 </li>
                    </ul>
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
