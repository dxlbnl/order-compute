import _ from 'lodash'
import Slider from 'rc-slider'
import React from 'react'

import 'rc-slider/assets/index.css';
import style from  './style.css';

const ComputeTypes = {
  ram: {
    label: 'Memory',
    slider: {
      min: 1,
      max: 16,
      defaultValue: 4,
    },
  },
  cpu: {
    label: 'vCPU',
    slider: {
      min: 0.1,
      step: 0.1,
      max: 16,
      defaultValue: 1,
    },
  },
  storage: {
    label: "Storage",
    slider: {
      min: 1,
      max: 500,
      defaultValue: 30,
    },
  },
};
const currencies = {
  euro: {
    name: 'Euro',
    symbol: '€',
  },
  dollar: {
    name: 'Dollar',
    symbol: '$',
  }
}

export default class OrderView extends React.Component {
  static defaultProps = {
    prices: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      settings: _.mapValues(ComputeTypes, (value) => value.slider.defaultValue)
    };
  }

  getType = (name) => ComputeTypes[name]
  updateSettings(type, amount) {
    const { settings } = this.state;
    this.setState({
      settings: {
        ...settings,
        [type]: amount
      }
    })
  }

  render() {
    const { prices } = this.props
    const { settings } = this.state
    const { nerdalize } = prices[0] // Why expose an array of objects?

    return (
      <div className='container'>
        {_.map(nerdalize, (price, key) => ({ key, ...this.getType(key), price }))
          .map(({ key, label, slider, price }) => (
            <div className='slider-container' key={key}>
              <h2>{settings[key]}</h2>
              <label>{label} ({price.unit})</label>
              <Slider
                {...slider}
                marks={{
                  [slider.min]: `${slider.min} ${price.unit}`,
                  [slider.max]: `${slider.max} ${price.unit}`,
                }}
                onChange={(amount) => this.updateSettings(key, amount)}
              />
            </div>
          )
        )}
        <div>
          <h2>Total: {
            _.reduce(settings, 
              (res, amount, type) =>
                res + (nerdalize[type].unit_price * amount), 0
              ).toFixed(2) // 2 decimal points.
          }
          </h2>
        </div>
      </div>
    );
  }
}