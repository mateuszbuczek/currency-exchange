import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import HistoricalExchangeRate from "./HistoricalExchangeChart";
import ExchangeAreaChart from "./ExchangeAreaChart";

const options = [
    { value: 'intraday', label: 'Intraday' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

function TimeseriesExchangeRate(props) {
    
    const [data, setData] = useState(null);
    const [timeseries, setTimeseries] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
               const res = await axios(
                    `http://localhost:8080/api/v1/${props.timeseries}?from=${props.from}&to=${props.to}`,
                     );
                    setData(res.data);
            } catch (e) {
                setData(e.message)
            }
        
        };
        fetchData();
      }, [props.timeseries, props.from, props.to]);

      const onChange = e => {
          setTimeseries(e);
          props.setTimeseries(e.value);
      }

      return (
              <div>
                <h3>Historical exchange rate</h3>
                <Select
                    value={timeseries}
                    onChange={onChange}
                    options={options}
                />
                {data && typeof data !== "string" ? 
                
                    // data.map(item => {
                    // return <h4 key={item.time}>{item.fromCurrencyCode}:{item.toCurrencyCode} {item.exchangeRate} @{item.time} UTC</h4>})

                    // <HistoricalExchangeRate data={data} timeseries={props.timeseries} />
                    <ExchangeAreaChart data={data} timeseries={props.timeseries} />
                    : <h4>Unavailable for given options or too many calls (max 5 per minute)</h4>
                }
              </div>
      );
  }
  export default TimeseriesExchangeRate;