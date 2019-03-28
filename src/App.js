import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import Particles from 'react-particles-js';
import 'react-rangeslider/lib/index.css'
import styles from './style';
import './App.css';
import 'tachyons';

const particlesOptions = {
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 2800,
      value2: 15
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeN = value => {
    this.setState({
      value2: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
    this.calval();
  };

  calval = () =>{
    let amt=this.state.value;
    let mon=this.state.value2;
    console.log(amt,mon);
    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+amt+"&numMonths="+mon)
    .then(response=> response.json())
    .then((result)=>{
      console.log(result.interestRate)
      console.log(result.monthlyPayment.amount)
      document.getElementById('rate').value=result.interestRate
      document.getElementById('pay').value=result.monthlyPayment.amount
    })
  }

  render () {    
    const { value,value2 } = this.state
    return (
      <div style={styles.root}>
        <h1 className='f1'>FullThrottle Labs-Task</h1>
        <Particles className='particles'
          params={particlesOptions}
        />
        <div className='value b f4' style={styles.sliderborder}>$  {value}</div>        
        <div style={styles.sliderWrapper}>
          <div className='slider'>
            <Slider
              value={value}
              min={500}
              max={5000}
              onChangeStart={this.handleChangeStart}
              onChange={this.handleChange}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        </div>  

        <div className='value b f4' style={styles.sliderborder}>Months:  {value2}</div>
        <div style={styles.sliderWrapper}>
          <div className='slider'>
            <Slider
              value={value2}
              min={6}
              max={24}
              onChangeStart={this.handleChangeStart}
              onChange={this.handleChangeN}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        </div> 

      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 b">DETAILS</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4 b" htmlFor="email-address">Interest Rate(%)</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 black b"
                  id="rate"
                  disabled
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4 b" htmlFor="password">Monthly payment in USD</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 black b"
                  id="pay"
                  disabled 
                />
              </div>
            </fieldset>
          </div>
        </main>
      </article>        

      </div>
    )
  }
}

export default App