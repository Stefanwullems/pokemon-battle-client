import * as React from "react";
import { connect } from "react-redux"
import { login, logout, playerLogin, playerLogout } from "../../actions/trainers/login";

class LoginContainer extends React.Component<any> {

  onRed = () => {
    this.props.login('red');
    this.props.playerLogin('red');
  }
  onBlue = () => {
    this.props.login('blue');
    this.props.playerLogin('blue');
  }
  onLogout = () => {
    this.props.logout(this.props.trainer.player);
    this.props.playerLogout();
  }


  render() {
    return (this.props.trainer.player) ? (
      <button onClick={this.onLogout}>LOGOUT</button>
    ) : (
      <div>
        <button onClick={this.onRed} disabled={!this.props.trainer.red === null}>RED</button>
        <button onClick={this.onBlue} disabled={!this.props.trainer.blue === null}>BLUE</button>
      </div>
    )
  }
}

const mapStateToProps = ({ trainer }) => ({ trainer });

export default connect(mapStateToProps, {login, logout, playerLogin, playerLogout})(LoginContainer)