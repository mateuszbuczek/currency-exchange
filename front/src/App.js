import React, { useState } from "react";
import './App.css';
import CurrencyForm from './components/CurrencyForm';
import CurrentExchangeRate from "./components/CurrentExchangeRate";
import TimeseriesExchangeRate from "./components/TimeseriesExchangeRate";


function App() {

  const [fromCurrencyCode, setFromCurrencyCode] = useState("EUR");
  const [toCurrencyCode, setToCurrencyCode] = useState("USD");
  const [timeseries, setTimeseries] = useState("intraday")


  return (
    <div className="container">
      <div className="item">
        <h2> Select exchange currencies</h2>   
        <CurrencyForm setFrom={setFromCurrencyCode} setTo={setToCurrencyCode} />
        <CurrentExchangeRate from={fromCurrencyCode} to={toCurrencyCode} />
        <TimeseriesExchangeRate from={fromCurrencyCode} to={toCurrencyCode} timeseries={timeseries} setTimeseries={setTimeseries} />
      </div>
    </div>
  );
}

export default App;
