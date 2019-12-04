import React, { useState, useEffect } from 'react';

import BMIForm from '../BMIForm';
import Chart from '../Chart';
import Info from '../Info';

import 'materialize-css/dist/css/materialize.min.css';
import './styles.css';

const uuidv1 = require('uuid/v4');

function App() {
  let initialState = () => JSON.parse(localStorage.getItem('data')) || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const handleChange = val => {
    let heightInM = val.height / 100;
    val.bmi = (val.weight / Math.pow(heightInM, 2)).toFixed(2);
    val.id = uuidv1();
    let newVal = [...state, val];
    let len = newVal.length;
    if (len > 7) newVal = newVal.slice(1, len);
    setState(newVal);
  };

  const handleDelete = id => {
    localStorage.setItem('lastState', JSON.stringify(state));
    let newState = state.filter(i => i.id !== id);
    setState(newState);
  };

  const handleUndo = () => {
    setState(JSON.parse(localStorage.getItem('lastState')));
    localStorage.removeItem('lastState');
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
    const date = state.map(obj => obj.date);
    const bmi = state.map(obj => obj.bmi);

    setData({
      date,
      bmi
    });
  }, [state]);

  return (
    <div className='container'>
      <div className='row center'>
        <h1 className='white-text'> BMI Tracker</h1>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <BMIForm change={handleChange} />
          <Chart labelData={data.date} bmiData={data.bmi} />
        </div>
        <div>
          <div className='row center'>
            <h4 className='white-text'>7 Day Data</h4>
          </div>
          <div className='data-container row'>
            {state.length > 0 ? (
              <>
                {state.map(info => (
                  <Info
                    key={info.id}
                    id={info.id}
                    weight={info.weight}
                    height={info.height}
                    date={info.date}
                    bmi={info.bmi}
                    deleteCard={handleDelete}
                  />
                ))}
              </>
            ) : (
              <span className='center white-text'>No Data</span>
            )}
          </div>
        </div>
        {localStorage.getItem('lastState') !== null ? (
          <div className='center'>
            <button className='calculate-btn' onClick={handleUndo}>
              Undo
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default App;
