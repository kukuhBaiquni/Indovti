import React, {Component} from 'react';
import '../Dashboard.css'

var main = true
export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      main: main,
      spec: false
    }
  }

  render(){
    return(
      <div className='ds-body'>
        <div className='ds-box'>
          <div className='ds-menu'>
            <div className='ds-list' onClick={() => this.setState({main: false, spec: false})}>Edit Info</div>
            <div onClick={() => this.setState({main: false, spec: true})} className='ds-list'>Search</div>
          </div>
          <div className='switchable-layer'>
            {
              this.state.main
              ?
              <div className='layer-state'>
                <div className='ds-title'>Welcome</div>
                <div className='ds-title'>Please complete your info</div>
              </div>
              :
              <div>
                <Edit />
              </div>
            }
            {
              this.state.spec &&
              <div>Not done yet T_T</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

class Edit extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      genre: 'Male',
      phone: '',
      pass: '',
    }
  }

  componentDidMount(){
    var target = localStorage.getItem('user')
    var data = JSON.parse(target)
    this.setState({
      email: data.email,
      pass: data.password,
      name: data.name,
      genre: data.genre,
      phone: data.phone,
    })
  }

  submit(){
    var name = this.state.name;
    var email = this.state.email;
    var genre = this.state.genre;
    var phone = this.state.phone;
    var password = this.state.pass;
    var user = {name, email, genre, phone, password}
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user))
    main = true
  }

  render(){
    return(
      <div className='ds-edit'>
        <div className='ds-wrap'>
          <p>Name</p>
          <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} className='e-input' placeholder='Name' />
          <p>Email</p>
          <input value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} className='e-input' placeholder='Email' />
          <p>Genre</p>
          <select value={this.state.genre} className='e-input' onChange={(e) => this.setState({genre: e.target.value})}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <p>Phone</p>
          <input value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})} type='number' className='e-input' placeholder='Phone' /><br />
          <button onClick={this.submit.bind(this)} className='button-s'>Update</button>
        </div>
      </div>
    )
  }
}
