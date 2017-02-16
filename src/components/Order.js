import Slider from 'rc-slider'
import React, { PropTypes } from 'react'

import 'rc-slider/assets/index.css';
import style from  './style.css';

const ram_marks = {
  1: '1GB',
  4: '4GB',
  8: '8GB',
  12: '12GB',
  16: '16GB',
};

const cpu_marks = {
  0.1: '0.1 vCPU',
  1: '1 vCPU',
  2: '2 vCPU',
  3: '3 vCPU',
  3.5: '3.5 vCPU',
};

const log = id => value => console.log(id, value)

export default class OrderView extends React.Component {
  static propTypes = {
  };
  static defaultProps = { 
  };

  render() {
    return (
      <div className='container'>
        <div className='slider-container'>
          <label>RAM (GB)</label>
          <Slider
            min={1}
            max={16}
            defaultValue={4}
            marks={ram_marks}
            onChange={log('mem')}
          />
        </div>
        <div className='slider-container'>
          <label>vCPU (core)</label>
          <Slider
            min={0.1}
            max={3.5}
            step={0.1}
            defaultValue={1}
            marks={cpu_marks}
            onChange={log('cpu')}
          />
        </div>
      </div>
    );
  }
}