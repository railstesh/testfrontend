import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from './NavBar'
var ls = require('local-storage');

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: '',
      newPassword: '',
      token: null
    }
  }

  componentDidMount() {
    const email = ls.get("email")
    const id = ls.get("id")
    const token = ls.get("token")
    this.setState({
      userId: id,
      token
    })
    axios.get(`https://newtestnode.herokuapp.com/user/getUser/${email}`)
      .then((response) => {
        const data = response.data.user
        this.setState({
          data
        })
      }, (error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    const id = this.state.userId
    const { history } = this.props;
    const url = `https://newtestnode.herokuapp.com/user/reset-password/${id}`
    const { currentPassword, newPassword } = this.state;
    const data = { currentPassword, newPassword, };

    axios.put(url,
      data
    )
      .then((response) => {
        if (response.status === 200) {
          alert("Password Changed sucessfully")
          history.push('/home');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <NavBar data={this.state.data} propsData={this.props} />
        <form className="signin-form" onSubmit={this.handleChange}>
          <h3>Change Password</h3>

          <div className="form-group">
            <label>Old Pasword</label>
            <input
              type="password"
              onChange={(e) => this.setState({ currentPassword: e.target.value })}
              className="form-control"
              placeholder="Enter old pasword"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              onChange={(e) => this.setState({ newPassword: e.target.value })}
              className="form-control"
              placeholder="Enter new pasword"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block">Submit</button>
          {!this.state.token &&
            <Link className="nav-link" to={"/sign-in"}>Back to Login</Link>
          }
        </form>
      </div>
    );
  }
}

export default ChangePassword;