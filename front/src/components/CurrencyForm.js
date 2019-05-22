import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';

function CurrencyForm(props) {
  const [from, setFrom] = useState({value: "EUR", label: "EUR (Euro)"});
  const [to, setTo] = useState({value: "USD", label: "USD (United States Dollar)"});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await axios(
        'https://openexchangerates.org/api/currencies.json',
      );
     setOptions(mapToArrayOfObjects(res.data));       
    };
    fetchData();
  }, []);

  const mapToArrayOfObjects = data => {
      return Object.keys(data).map(key => {
          return {value: key, label: `${key} (${data[key]})`}
      })
  }

  const changeFrom = e => {
    setFrom(e);
    props.setFrom(e.value);
  } 

  const changeTo = e => {
    setTo(e);
    props.setTo(e.value);
  } 

    return (
        <div className="container">
          <div className="item">
            <p>FROM</p>
            <p>TO</p>
          </div>
          <div className="item">
          <Select
                autoFocus
                value={from}
                onChange={changeFrom}
                options={options}
            />
            <Select
                value={to}
                onChange={changeTo}
                options={options}
            />
          </div>
        </div>
    );
}
export default CurrencyForm;