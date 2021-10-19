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
                      Since the March 2020 covid flash-crash, the stock market has been very bullish, with quantitative easing adding so much new money into the market, gains seem to be popping up everywhere. It may be a good time to enter the market with a bullish strategy or maybe this is the time to prepare for when the market will eventually reconcile?
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
                    To shorten my list, I look for stocks with positive gain greater than 342% (the 75th percentile) overall, and gain greater than 1% in the last month. This gives me a list of 18 companies.
                    </p>

                    <br/>
                    <h4 align='left'>Intrinsic Value, F and Z-score</h4>
                    <p align='left'>
                    Next I want to do some value investing because it is the most fundamental (pun intended). Here are some definitions:
                    </p>
                    <ul align='left'>
                        <li>Intrinsic value: a measure of the true worth of a company's share</li>
                        <li>Altman Z-Score = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E. A score below 1.8 means it's likely the company is headed for bankruptcy. Scores above 3 are not likely to go bankrupt. Where:</li>
                        <br/>
                        <ul>
                            <li>A = working capital / total assets</li>
                            <li>B = retained earnings / total assets</li>
                            <li>C = earnings before interest and tax / total assets</li>
                            <li>D = market value of equity / total liabilities</li>
                            <li>E = sales / total assets</li>
                        </ul>
                        <br/>
                        <li>Piotroski F-score: health of a company's balance sheet. Best value = 9 </li>
                        <br/>
                        Profitability criteria:<br/>
                        <ul>
                            <li>Positive net income (1 point)</li>
                            <li>Positive return on assets in the current year (1 point)</li>
                            <li>Positive operating cash flow in the current year (1 point)</li>
                            <li>Cash flow from operations being greater than net Income (quality of earnings) (1 point)</li>
                        </ul>
                        <br/>
                        Leverage, liquidity, and source of funds criteria:<br/>
                        <ul>
                            <li>Lower ratio of long term debt in the current period, compared to the previous year (decreased leverage) (1 point)</li>
                            <li>Higher current ratio this year compared to the previous year (more liquidity) (1 point)</li>
                            <li>No new shares were issued in the last year (lack of dilution) (1 point)</li>
                        </ul>
                        <br/>
                        Operating efficiency criteria:<br/>
                        <ul>
                            <li>A higher gross margin compared to the previous year (1 point)</li>
                            <li>A higher asset turnover ratio compared to the previous year (1 point)</li>
                        </ul>
                    </ul>
                    <p align='left'>
                    First, I find companies that have twice as many current assets compared to current liabilities. (current ratio = 2), This is the result:
                    </p>
                    <img src="/static/img/currentratio.png" align='center' width ='75%'/>
                    <br/>
                    <br/>
                    <p align='left'>
                    Next, I want to use Z and F-Score (see descriptions above from Investopedia.com), but the data I have is missing some of the necessary values, thus I simply calculate intrinsic value with two methods: using the price/earnings ratio and with Benjamin Graham's method. The goal here is to find the best valued company, therefore I filter with intrinsic value to find the companies which are undervalued. The result is that Kirkland Lake Gold Ltd. is the only one left.
                    </p>

                    <br/>
                    <h4 align='left'>Charting and Technical Analysis</h4>
                    <p align='left'>
                    The most basic form is the use of moving-averages (MA's). When the price is above a MA it could be considered bullish, and below it is bearish. Additionally, I use simple Bollinger Bands which are an indication of a possible break out of a channel. I do a final check to see how the graph looks. From top to bottom, the chart display three-month, one-year and total history.
                    </p>
                    <img src="/static/img/chart.png" align='center'/>

                    <br/>
                    <h4 align='left'>Conclusion</h4>
                    <p align='left'>
                    Ever since I graduated from University, I wanted to develop a trading strategy for myself to help remove emotions and improve my investment decision making. I believe everyone should have access to tools to automate their investing strategy and I found there are a lot of resources to explore on Github. My github repo for this project can be found <a href="https://github.com/philip-L/yahoo-trading/">here</a>. Other data that could be useful to investigate in the future: options trading, news analysis, and insider buying/selling. If you made it this far, congrats and thanks for reading.
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
