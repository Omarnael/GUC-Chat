import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Login from './components/Login'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './components/ChatScreen'

class App extends Component {
   constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen',
      isLoggedIn: false
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)

  }

  login  = (userName,password) => {
      fetch(`http://localhost:3001/login/${userName}/${password}`).then(response=>{
          console.log(response)
          const isError = response.status === 400;
          this.setState({errorMessage:isError,isLoggedIn:isError})
      })
  }


  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username,
	  currentScreen: 'ChatScreen'
        })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    const {isLoggedIn,errorMessage} = this.state;
    if(!isLoggedIn){
      return (
      <div>
      <Login login={this.login}/>
        {errorMessage&& "Wrong email or password"}
      </div>
    )
    }


    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />


    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App
