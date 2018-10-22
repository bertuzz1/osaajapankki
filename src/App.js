import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import * as auth from './firebase/auth'
import { firebase } from './firebase/firebase'
import { getPersonalData } from './firebase/db'
import Login from './Login'
import AddUser from './AddUser'
import Search from './Search'
import NavbarTop from './NavbarTop'
import { Button, Loader, Container, Header, Content } from 'rsuite'
import { setStatePersonalData, toggleLoading, setStateLogoutUser } from './redux/reducer'

class App extends Component {
  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async authUser => {
      console.log("auth state changed")
      if (authUser) {
        console.log("user is logged in")
        let personalData = await getPersonalData()
        this.props.setStatePersonalData(personalData)
        console.log(personalData)
      } else {
        this.props.setStateLogoutUser()
      }
    })
  }

  render() {
    console.log(this.props.user)
    let content = null
    if (this.props.loading) {
      // render loading animation
      content = (<Loader size="lg" content="Hetki..." />)
    } else if (this.props.user === false) {
      // render login screen
      content = (<Login />)
    } else if(this.props.user === undefined) {
      content = (
        <div>
          <h2>Ei oikeuksia.</h2>
          <Button color="green" onClick={ auth.signOut }>Logout</Button>
        </div>
      )
    } else {
      // render UI
      content = (
        <Router>
          <Container>
            <Header>
              <NavbarTop />
            </Header>

            <Content>
              <Route exact path="/" render={() => <Search />} />
              <Route exact path="/haku" render={() => <Search />} />
              <Route exact path="/lisaa" render={() => <AddUser />} />
            </Content>
          </Container>
        </Router>
      )
    }
    return (
      content
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(
  mapStateToProps,
  { setStatePersonalData, toggleLoading, setStateLogoutUser }
)(App)
