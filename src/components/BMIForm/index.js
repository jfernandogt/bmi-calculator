import React, { useState } from 'react';

const BMIForm = ({
  change = data => {
    console.log(data);
  }
}) => {
  const [state, setState] = useState({
    weight: '',
    height: '',
    date: ''
  });

  const handleChange = e => {
    const date = new Date().toLocaleString().split(',')[0];
    setState({
      ...state,
      [e.target.name]: e.target.value,
      date
    });
  };

  const handleSubmit = () => {
    change(state);
    setState({
      weight: '',
      height: '',
      date: ''
    });
  };

  return (
    <>
      <div className='row'>
        <div className='col m6 s12'>
          <label htmlFor='weight'>Peso (en Kg)</label>
          <input
            id='weight'
            name='weight'
            type='tel'
            maxLength='3'
            placeholder='50'
            value={state.weight}
            onChange={handleChange}
          />
        </div>
        <div className='col m6 s12'>
          <label htmlFor='height'>Altura (en Cm)</label>
          <input
            id='height'
            name='height'
            type='tel'
            maxLength='3'
            placeholder='160'
            value={state.height}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='center'>
        <button
          id='bmi-btn'
          className='calculate-btn'
          type='button'
          disabled={!state.weight || !state.height}
          onClick={handleSubmit}
        >
          Calcular BMI
        </button>
      </div>
    </>
  );
};

export default BMIForm;
