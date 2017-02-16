import _ from 'lodash'
import Slider from 'rc-slider'
import React from 'react'
import moment from 'moment'
import { Container, Header, List, Statistic } from 'semantic-ui-react'
import OrderModal from './OrderModal'

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
  90: '3 months'
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
  get nerdalize () {
    const { prices } = this.props
    const { nerdalize } = prices[0] // Why expose an array of objects?
    return nerdalize
  }
  get pricePerHour () {
    const nerdalize = this.nerdalize
    const { settings } = this.state

    return _.reduce(settings,
      (res, amount, type) =>
        res + (nerdalize[type].unit_price * amount), 0
      )
  }
  get totalPrice () {
    const { duration } = this.state

    return this.pricePerHour * duration * 24 // Duration is in days
  }

  render () {
    const { settings, duration } = this.state
    const pricePerHour = this.pricePerHour
    const totalPrice = this.totalPrice
    const nerdalize = this.nerdalize

    return (
      <Container>
        <Header>Specify resources for a compute job</Header>
        <List>
          <List.Item>
            <List.Header>Job duration:</List.Header>
            <List.Content>
              <Statistic>
                <Statistic.Value>{duration}</Statistic.Value>
                <Statistic.Label>days ({moment.duration(duration, 'days').humanize()})</Statistic.Label>
              </Statistic>
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
                <List.Content>
                  <Statistic>
                    <Statistic.Value>{settings[key]}</Statistic.Value>
                    <Statistic.Label>{price.unit}</Statistic.Label>
                  </Statistic>
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
        <div className='totals'>
          <Statistic>
            <Statistic.Value>{currencies.euro.symbol}{pricePerHour.toFixed(2)}</Statistic.Value>
            <Statistic.Label>Per hour</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{currencies.euro.symbol}{totalPrice.toFixed(2)}</Statistic.Value>
            <Statistic.Label>Total</Statistic.Label>
          </Statistic>
          <OrderModal
            button='Order'
            header='Does this seem right?'
            onClick={() => this.setState({ total: this.totalPrice })}
            settings={this.state}
          />
        </div>
      </Container>
    )
  }
}
