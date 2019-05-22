import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import ExchangeAreaChart from "./ExchangeAreaChart";

const options = [
    { value: 'intraday', label: '12H' },
    { value: 'intraday', label: '24H' },
    { value: 'daily', label: '2 Weeks' },    
    { value: 'daily', label: 'Month' },
    // { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: '1 Year' },
    { value: 'monthly', label: '2 Years' },
    { value: 'monthly', label: '5 Years' },
    { value: 'monthly', label: '10 Years' },
  ];

function TimeseriesExchangeRate(props) {
    
    const [data, setData] = useState(null);
    const [timeseriesValue, setTimeseriesValue] = useState({value: "Intraday", label: "12H"});
    const [timeseriesLabel, setTimeseriesLabel] = useState('12H');

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
          setTimeseriesValue(e);
          setTimeseriesLabel(e.label);
          props.setTimeseries(e.value);
      }

      return (
              <div>
                  <div className="container">
                    <div className="item">
                        <p>Historical exchange rate</p>
                        <Select
                            value={timeseriesValue}
                            onChange={onChange}
                            options={options}
                            />
                    </div>
                 
                  </div>

                {data && typeof data !== "string" ? 
                    <ExchangeAreaChart data={data} timeseries={timeseriesLabel} />
                    : <h4>Unavailable for given options or too many calls (max 5 per minute)</h4>
                }
              </div>
      );
  }
  export default TimeseriesExchangeRate;