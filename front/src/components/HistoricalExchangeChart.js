import React, {useState} from "react";
import {Chart} from 'react-google-charts';


function HistoricalExchangeRate(props) {

    const [showTrend, setShowTrend] = useState(true);

    let minValue = 0;
    let maxValue = 0;
    let trendPoints = [];

    const parseData = (timeseries, data) => {
        if(timeseries === "intraday") {
            
            // const f = Date.parse(data[0].time + " GMT");
            // const s = Date.parse(data[1].time + " GMT");
            // const t = new Date(s - 3 * 60 * 60 * 1000); // GMT/UTC + 0

            // console.log(data,data[0].time, t);
            const hour = 60 * 60 * 1000
            let min = 9999;
            let max = 0;
            // last 12 hours
            const endpoint = new Date(Date.parse(data[data.length - 1].time + " GMT ") - 15 * hour) // additional 3 for getting data to GMT/UTC timezone

            let res = [['Time', 'Exchange Rate']]

            if(showTrend) {
                res = [['Time', 'Exchange Rate', 'Increase', 'Decrease']];

                for(let i = data.length - 1; i >= 0; i --) {
                    const itemTime = new Date(Date.parse(data[i].time + " GMT") - 3 * hour );
                    console.log(itemTime, endpoint)
                    if(itemTime > endpoint) {
                        
                        // find minimum  and maximum value
                        min = Math.min(min, data[i].exchangeRate)
                        max = Math.max(max, data[i].exchangeRate)
                        // trend points
                        res.push([itemTime.getHours(),+data[i].exchangeRate, +data[i].exchangeRate, +data[i].exchangeRate])
                    }
                    else 
                        break;
                }
            } else {
                for(let i = 0; i < data.length; i ++) {
                    const itemTime = new Date(Date.parse(data[i].time + " GMT") - 3 * hour );
                    console.log(itemTime, endpoint)
                    if(itemTime <= endpoint) {
                        res.push([`${itemTime.getHours()}:${itemTime.getMinutes()}`,+data[i].exchangeRate])
                        // find minimum  and maximum value
                        min = Math.min(min, data[i].exchangeRate)
                        max = Math.max(max, data[i].exchangeRate)
                    }
                    else 
                        break;
                }
            }
            
            minValue = min - (0.0001*min);
            maxValue = max + (0.0001*max);
            console.log(minValue, maxValue,res)

            return res;
        }
      
    }



    return (
        <>
        <div>{props.timeseries}</div>
        <button onClick={() => {setShowTrend(!showTrend)}}>{showTrend ? "Hide" : "Show"} trend lines</button>
        <Chart
        width={'700px'}
        height={'550px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={parseData(props.timeseries, props.data)}
        options={{
          hAxis: {
            title: 'Time',
          },
          vAxis: {
            title: 'Exchange Rate',
            minValue: minValue,
            maxValue: maxValue
          },
          legend: 'none',
          chartArea: { width: '80%', height: '70%' },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
        </>

    )
}

export default HistoricalExchangeRate;