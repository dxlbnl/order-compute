import _ from 'lodash'
import Slider from 'rc-slider'
import React from 'react'
import moment from 'moment'
import { Container, Header, List } from 'semantic-ui-react'

const computeTypes = {
  ram: {
    label: 'Memory',
    slider: {
      min: 1,
      max: 16,
      defaultValue: 4
    }
  },
  cpu: {
    label: 'vCPU',
    slider: {
      min: 0.1,
      step: 0.1,
      max: 16,
      defaultValue: 1
    }
  },
  storage: {
    label: 'Storage',
    slider: {
      min: 1,
      max: 500,
      defaultValue: 30
    }
  }
}
const durationMarks = {
  1: '1 day',
  7: '1 week',
  30: '1 month',
  60: '2 months',
  90: '3 months',
}
const currencies = {
  euro: {
    name: 'Euro',
    symbol: '€'
  },
  dollar: {
    name: 'Dollar',
    symbol: '$'
  }
}

export default class OrderView extends React.Component {
  static defaultProps = {
    prices: {}
  };

  constructor (props) {
    super(props)

    this.state = {
      duration: 1,
      settings: _.mapValues(computeTypes, (value) => value.slider.defaultValue)
    }
  }

  getType = (name) => computeTypes[name]
  updateSettings (type, amount) {
    const { settings } = this.state
    this.setState({
      settings: {
        ...settings,
        [type]: amount
      }
    })
  }

  render () {
    const { prices } = this.props
    const { settings, duration } = this.state
    const { nerdalize } = prices[0] // Why expose an array of objects?

    const pricePerHour = _.reduce(settings,
      (res, amount, type) =>
        res + (nerdalize[type].unit_price * amount), 0
      ) // 2 decimal points.
    const totalPrice = pricePerHour * duration * 24 // Duration is in days

    return (
      <Container>
        <Header>Specify resources for a compute job</Header>
        <List>
          <List.Item>
            <List.Header>
              Job duration: 
            </List.Header>
            <List.Description>
              {moment.duration(duration, 'days').humanize()}
              ({duration} days)
            </List.Description>
            <List.Content>
              <Slider
                min={1}
                max={90}
                defaultValue={1}
                marks={durationMarks}
                onChange={(duration) => this.setState({ duration })}
              />
            </List.Content>
          </List.Item>
        {_.map(nerdalize, (price, key) => ({ key, ...this.getType(key), price }))
          .map(({ key, label, slider, price }) => (
            <List.Item key={key}>
              <List.Header>{label}</List.Header>
              <List.Description>{`${settings[key]} (${price.unit})`}</List.Description>
              <List.Content>
                <Slider
                  {...slider}
                  marks={{
                    [slider.min]: `${slider.min} ${price.unit}`,
                    [slider.max]: `${slider.max} ${price.unit}`
                  }}
                  onChange={(amount) => this.updateSettings(key, amount)}
                />
              </List.Content>
            </List.Item>
          )
        )}
        </List>
        <div>
          <h2>Per hour: {currencies.euro.symbol}{pricePerHour.toFixed(2)}</h2>
          <h2>Total: {currencies.euro.symbol}{totalPrice.toFixed(2)}</h2>
        </div>
      </Container>
    )
  }
}
