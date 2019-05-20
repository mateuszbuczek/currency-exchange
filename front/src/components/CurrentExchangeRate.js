import React, { useState, useEffect } from "react";
import axios from 'axios';

function CurrentExchangeRate(props) {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(
            `http://localhost:8080/api/v1/current?from=${props.from}&to=${props.to}`,
          );
         setData(res.data);       
        };
        fetchData();
      }, [props.from, props.to]);

      return (
          <div>
              <div>
                <h3>Real time exchange rate</h3>
                {data && 
                    <h4>{data.fromCurrencyCode}:{data.toCurrencyCode} {data.exchangeRate} @{data.time} UTC</h4>
                }
              </div>
          </div>
        
      );
  }
  export default CurrentExchangeRate;