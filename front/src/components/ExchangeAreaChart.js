import React, {useState} from "react";
import * as V from 'victory'


function ExchangeAreaChart(props) {

    const [showTrend, setShowTrend] = useState(false);

    let minValue = 0;
    let maxValue = 0;
    const trendPoints = [];
    let dataPoints = null;

    const init = () => {
        dataPoints = parseData(props.timeseries, props.data);
        return <></>;
    }
    

    const parseData = (timeseries, data) => {
        if(timeseries === "intraday") {
            
            // const f = Date.parse(data[0].time + " GMT");
            // const s = Date.parse(data[1].time + " GMT");
            // const t = new Date(s - 3 * 60 * 60 * 1000); // GMT/UTC + 0

            // console.log(data,data[0].time, t);
            const hour = 60 * 60 * 1000
            let min = 9999;
            let max = 0;
            const res = [];
            const sum = 0;
            // last 12 hours
            const endpoint = new Date(Date.parse(data[data.length - 1].time + " GMT ") - 15 * hour) // additional 3 for getting data to GMT/UTC timezone

            if(showTrend) {
                for(let i = 0; i < data.length; i ++) {
                    const itemTime = new Date(Date.parse(data[i].time + " GMT") - 3 * hour );
                    if(itemTime <= endpoint) {
                        res.push({
                            x: `${itemTime.getHours()}:${itemTime.getMinutes()}`, 
                            y: +data[i].exchangeRate, 
                            l: itemTime.getMinutes()+itemTime.getHours()*60})
                        // find minimum  and maximum value
                        min = Math.min(min, data[i].exchangeRate)
                        max = Math.max(max, data[i].exchangeRate)
                        sum += +data[i].exchangeRate
                        // find trend points
                        if(i + 1 % (data.length  / 4) == 0) {
                            let y = 0;
                            if(trendPoints.length == 0) {
                                y = sum
                            } else {
                                y = sum / (data.length  / 4)
                                sum = 0;
                            }
                            trendPoints.push({x: `${itemTime.getHours()}:${itemTime.getMinutes()}`, y: y})
                        }
                    }
                    else 
                        break;
                }
            } else {
                for(let i = 0; i < data.length; i ++) {
                    const itemTime = new Date(Date.parse(data[i].time + " GMT") - 3 * hour );
                    if(itemTime <= endpoint) {
                        res.push({
                            x: `${itemTime.getHours()}:${itemTime.getMinutes()}`, 
                            y: +data[i].exchangeRate, 
                            l: itemTime.getMinutes()+itemTime.getHours()*60})
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

            return res;
        }
      
    }



    return (
        <>
        <div>{props.timeseries}</div>
        <button onClick={() => {setShowTrend(!showTrend)}}>{showTrend ? "Hide" : "Show"} trend lines</button>
        {init()}
        <V.VictoryChart height={500} width={800} minDomain={{  y: minValue }} >
            <V.VictoryAxis
                style={{ axis: { stroke: '#000' },
                axisLabel: { fontSize: 16 },
                ticks: { stroke: '#000' },
                tickLabels: { fontSize: 5, padding: 1, angle:10, verticalAnchor: 'middle', textAnchor:'start' }
                }}
            />

            <V.VictoryLine 
                data={dataPoints}
            />

            <V.VictoryLine
                data={trendPoints}
                style={{
                    data: {
                      stroke: "green",
                    }
                  }}
                />

        </V.VictoryChart>
        </>

    )
}

export default ExchangeAreaChart;