import React, { Component } from 'react';
import Footer from './Footer/Footer'
import { Link } from "react-router-dom";
var ls = require('local-storage');

class BasePage extends Component {

  componentDidMount() {
    const { history } = this.props
    const token = ls.get("token")
    if (token !== null) {
      history.push('/home')
    }
  }

  render() {
    return (
      <div>
        <div className='base-page'>
          <Link style={{ color: '#fff' }} to={"/sign-in"}>Click here to Login</Link>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );

  }
}

export default BasePage;