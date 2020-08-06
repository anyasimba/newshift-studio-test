import React from 'react'
import Axios from 'axios'
import './WeatherComponent.css'
import cities from '../cities'
import sunIcon from '../icons/sun.svg'
import cloudsIcon from '../icons/clouds.svg'

export default class WeatherComponent extends React.Component {
  state = {
    city: 'placeholder',
    temperatures: null,
  } as {
    city: string
    temperatures: number[] | null
  }

  constructor (props) {
    super(props)

    this.change = this.change.bind(this)
  }

  async change (event) {
    const {value} = event.target
    await this.setState({
      city: value,
      temperatures: null,
    })
    const weatherResponse = await Axios.get(`/weather?city=${this.state.city}`)
    await this.setState({
      temperatures: weatherResponse.data,
    })
  }

  temperature (temperature, key) {
    const icon = temperature !== 15 &&
      <img alt="" src={temperature as number > 15? sunIcon : cloudsIcon}></img>

    return temperature != null &&
      <span key={key}>{icon} {(temperature as number > 0? '+':'-') + temperature}</span>
  }

  render () {
    const {city, temperatures} = this.state
    
    return <div className="Weather">
        <select onChange={this.change} value={city}>
          <option value="placeholder" disabled>Выберите город</option>
          {cities.map((city, i) => {
            return <option key={i} value={city[0]}>{city[1]}</option>
          })}
        </select>

        <div className="result">
          {temperatures?.map((temperature, i) => this.temperature(temperature, i))}
        </div>
    </div>
  }
}