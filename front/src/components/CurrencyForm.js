import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';

function CurrencyForm(props) {
    
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
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
        <form>
        FROM <Select
            autoFocus
            value={from}
            onChange={changeFrom}
            options={options}
         />
        TO<Select
            value={to}
            onChange={changeTo}
            options={options}
         />
        </form>
    );
}
export default CurrencyForm;