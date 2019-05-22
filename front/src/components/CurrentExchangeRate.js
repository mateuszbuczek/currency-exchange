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
          <div className="container">
               <p>Realtime exchange rate:  
                    {data && 
                        <a>  {Number(data.exchangeRate).toFixed(4)} @{data.time} UTC</a>
                    }
               </p>
                
          </div>
        
      );
  }
  export default CurrentExchangeRate;