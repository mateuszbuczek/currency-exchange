import React, { useState } from "react";
import './App.css';
import CurrencyForm from './components/CurrencyForm';
import CurrentExchangeRate from "./components/CurrentExchangeRate";
import HistoricalExchangeRate from "./components/HistoricalExchangeRate";


function App() {

  const [fromCurrencyCode, setFromCurrencyCode] = useState("EUR");
  const [toCurrencyCode, setToCurrencyCode] = useState("USD");
  const [timeseries, setTimeseries] = useState("intraday")


  return (
    <div className="wrapper">
   
      <div>
      <marquee direction="down" behavior="alternate" height="150">
      <marquee behavior="alternate">
      <h1>Select exchange currencies</h1>

      </marquee>
        </marquee>
        <CurrencyForm setFrom={setFromCurrencyCode} setTo={setToCurrencyCode} />
        <CurrentExchangeRate from={fromCurrencyCode} to={toCurrencyCode} />
        <HistoricalExchangeRate from={fromCurrencyCode} to={toCurrencyCode} timeseries={timeseries} setTimeseries={setTimeseries} />
      </div>
    </div>
  );
}

export default App;
