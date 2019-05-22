import React, {useState} from "react";
import * as V from 'victory'


function ExchangeAreaChart(props) {

    // self explanatory
    const [showTrend, setShowTrend] = useState(false);

    //
    let dataPoints = null;

    // minY and maxY axis
    let minValue = 0;
    let maxValue = 0;
    // trend points
    const trendPoints = [];
    let incPoints = [];
    let decPoints = [];

    const init = () => {
        dataPoints = parseData(props.timeseries, props.data);
        return <></>;
    }
    
    const parseData = (timeseries, data) => {
        const hour = 60 * 60 * 1000
        const week = hour * 24 * 7;
        const month = 4 * week;
        const oneYear = 12 * month;
        const twoYears = 2 * oneYear;
        const fiveYears= 5 * oneYear;
        const tenYears = 2 * fiveYears;

        let min = 9999;
        let max = 0;
        const res = [];
        let endpoint;

        switch(timeseries) {
            case "12H":
                endpoint = new Date(Date.parse(data[data.length - 1].time) - 12 * hour);
                break;
            case "24H":
                endpoint = new Date(Date.parse(data[data.length - 1].time) - 24 * hour);
                break;
            case "2 Weeks": 
                endpoint = new Date(Date.parse(data[data.length - 1].time) - 2 * week);
                break;
            case "Month": 
                endpoint = new Date(Date.parse(data[data.length - 1].time) - month);
                break;
            case "1 Year": 
                endpoint = new Date(Date.parse(data[data.length - 1].time) - oneYear);
                break;
            case "2 Years":
                endpoint = new Date(Date.parse(data[data.length - 1].time) - twoYears);
                break;
            case "5 Years":
                endpoint = new Date(Date.parse(data[data.length - 1].time) - fiveYears);
                break;
            case "10 Years":
                endpoint = new Date(Date.parse(data[data.length - 1].time) - tenYears);
                break;
        }

            for(let i = 0; i < data.length; i ++) {
                const itemTime = new Date(Date.parse(data[i].time));
                if(itemTime >= endpoint) {
                    res.push({
                        x: itemTime, 
                        y: Number(data[i].exchangeRate), 
                        l: itemTime
                    })
                    min = Math.min(min, data[i].exchangeRate)
                    max = Math.max(max, data[i].exchangeRate)
                }
            }



            if(showTrend) {
                let sum = 0;
                for(let i = 0; i < res.length; i++) {
                    sum += +res[i].y
                    if(i % Math.floor(res.length  / 10) === 0) {
                        let y = 0;
                        if(trendPoints.length === 0) {
                            y = sum
                        } else {
                            y = sum / Math.floor(res.length  / 10)
                        }
                        sum = 0;
                        trendPoints.push({x: res[i].x, y: y})
                    }
                }
                trendPoints.push({x: res[res.length - 1].x, y: res[res.length - 1].y})

                incPoints.push({x: trendPoints[0].x, y: trendPoints[0].y})
                decPoints.push({x: trendPoints[0].x, y: trendPoints[0].y})
                for (let i = 0; i < trendPoints.length; i++) {

                    if(i > 0) {
                        if(trendPoints[i].y >= trendPoints[i -1].y) {
                            incPoints.push({x: trendPoints[i-1].x, y: trendPoints[i-1].y})
                            incPoints.push({x: trendPoints[i].x, y: trendPoints[i].y})
                            decPoints.push({x: trendPoints[i].x, y: null})
                        } else {
                            decPoints.push({x: trendPoints[i-1].x, y: trendPoints[i-1].y})
                            decPoints.push({x: trendPoints[i].x, y: trendPoints[i].y})
                            incPoints.push({x: trendPoints[i].x, y: null})

                        }
                    }
                }
                
            }
            minValue = min - (0.001*min);
            maxValue = max + (0.001*max);
            return res;
    }

    return (
        <>
        <div>{props.timeseries}</div>
        <button onClick={() => {setShowTrend(!showTrend)}}>{showTrend ? "Hide" : "Show"} trend lines</button>
        {init()}
        <V.VictoryChart  theme={V.VictoryTheme.material}
                         height={500} width={1000} 
                         minDomain={{y: minValue - 0.0001 * minValue}}
                         maxDomain={{y : maxValue + 0.0001 * maxValue}} >
            <V.VictoryAxis
                style={{ axis: { stroke: '#000' },
                axisLabel: { fontSize: 16 },
                ticks: { stroke: '#000' },
                grid: { stroke: '#B3E5FC', strokeWidth: 0.25 },
                tickLabels: { fontSize: 12, padding: 10},
                }} dependentAxis
            />
            <V.VictoryAxis
                tickFormat={
                    (x) => { 
                        const t = new Date(x);
                        switch (true) {
                            case props.timeseries === "12H" || props.timeseries === "24H":
                                return `${t.getHours() >= 10 ? t.getHours() : "0" + t.getHours() }:${t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes() }
                                        ${t.getDate() >= 10 ? t.getDate() : "0" + t.getDate() } Day`
                            case props.timeseries === "Month" || props.timeseries === "Week":
                                return `${t.getDate() >= 10 ? t.getDate() : "0" + t.getDate() } Day
                                        ${t.getMonth() >= 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)} Month`
                            default: 
                                return `${t.getDate() >= 10 ? t.getDate() : "0" + t.getDate() } Day
                                        ${t.getMonth() >= 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)} Month 
                                        ${t.getFullYear() >= 10 ? t.getFullYear() : "0" + t.getFullYear() } Year`;
                        }      
                    }
                }
                tickCount={10}
                style={{ axis: { stroke: '#000' },
                axisLabel: { fontSize: 10 },
                ticks: { stroke: '#000' },
                tickLabels: { fontSize: 12, padding: 24, angle:0, verticalAnchor: 'middle', textAnchor:'middle',  },
                }}
            />

            <V.VictoryLine 
                interpolation={"natural"}
                data={dataPoints}
            />
    
            <V.VictoryLine
                data={incPoints}
                style={{
                    data: {
                      stroke: "green",
                    }
                  }}
            />
            <V.VictoryLine
                data={decPoints}
                style={{
                    data: {
                      stroke: "red",
                    }
                  }}
            />

         

        </V.VictoryChart>
        </>

    )
}

export default ExchangeAreaChart;