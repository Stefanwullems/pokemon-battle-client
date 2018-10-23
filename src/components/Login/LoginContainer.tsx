import * as React from "react";
import { connect } from "react-redux"
import {login, logout} from "../../actions/trainers/login";

class LoginContainer extends React.Component<any> {

  onRed = () => this.props.login('red');
  onBlue = () => this.props.login('blue');
  onLogout = () => this.props.logout();


  render() {
    return (this.props.trainer) ? (
      <button onClick={this.onLogout} >LOGOUT</button>
    ) : (
      <div>
        <button onClick={this.onRed}>RED</button>
        <button onClick={this.onBlue}>BLUE</button>
      </div>
    )
  }
}

const mapStateToProps = ({ trainer }) => ({ trainer });

export default connect(mapStateToProps, {login, logout})(LoginContainer)