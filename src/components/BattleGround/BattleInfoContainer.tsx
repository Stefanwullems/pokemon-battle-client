import * as React from "react";
import { connect } from "react-redux";

interface IProps {
  log: string;
  onNextButtonClick: () => void;
}

class BattleInfoContainer extends React.Component<IProps> {
  render() {
    return (
      <div className="BattleInfo">
        {this.props.log}
        <button onClick={this.props.onNextButtonClick}>next</button>
      </div>
    );
  }
}

const mapStateToProps = ({ log }) => ({ log });

export default connect(mapStateToProps)(BattleInfoContainer);
