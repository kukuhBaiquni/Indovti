import React, {Component} from 'react';
import Dashboard from './Dashboard'
import '../App.css'
import validatejs from 'validate.js'
import validator from '../config/validator'
import {init} from '../actions/sagas'
import {connect} from 'react-redux'


class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      emailE: false,
      passwordE: false,
      login: false,
    }
  }

  submit(){
    var validation = {
      from: {
        email: true
      },
      pass: {
        length: {
          minimum: 5,
        }
      }
    }
    var emailCheck = validator(validatejs({from: this.state.email}, validation))
    var passwordCheck = validator(validatejs({pass: this.state.password}, validation))
    if (!emailCheck) {
      this.setState({emailE: true})
    }else{
      this.setState({emailE: false})
    }
    if (!passwordCheck) {
      this.setState({passwordE: true})
    }else{
      this.setState({passwordE: false})
    }

    if (emailCheck && passwordCheck) {
      localStorage.removeItem('user')
      localStorage.removeItem('data')
      var email = this.state.email;
      var password = this.state.password;
      var e = email;
      var p = password;
      var user = {email: e, password: p}
      this.props.dispatch(init(email, password))
      localStorage.setItem('user', JSON.stringify(user))
      this.timer = setInterval(
        ()=> this.tick(), 1000
      )
      this.setState({
        email: '',
        password: '',
        emailE: false,
        passwordE: false
      })
    }
  }

  tick(){
    if (this.props.status.userLogin) {
      this.setState({login: true})
      clearInterval(this.timer)
    }
  }

  render(){
    console.log(this.props);
    if (this.state.login) {
      return(<Dashboard />)
    }else{
      return(
        <div>
          <div className='navigator-container'>
            <div className='navigator-wrapper'>
              <div>
                <h2 className='navigator-title'>Login</h2>
              </div>
              <div className='form-wr'>
                <div style={{margin: 'auto',width: '400px'}}>
                  <p style={{fontWeight: 'bold'}}>Email</p>
                  {this.state.emailE ? <p style={{color: 'red'}}>Email Invalid</p> : null}
                  <input onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} className='nv-email-i' placeholder='email' type='email'/>
                  <p style={{fontWeight: 'bold'}}>Password</p>
                  {this.state.passwordE ? <p style={{color: 'red'}}>Minimum 5 characters</p> : null}
                  <input minLength={5} onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} className='nv-email-i' placeholder='password' type='password'/>
                  <button onClick={this.submit.bind(this)} className='nv-submit'>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch){
  return dispatch
}

export default connect(
  mapDispatchToProps
)(Main)
