import * as React from "react";
import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import getPokemon from "../../actions/pokemon/get-pokemon";
import switchTurn from "../../actions/battle/switch-turn";

interface IProps {
  getPokemon: (id1: number, id2: number) => void;
  switchTurn: () => void;
}

class BattleGroundContainer extends React.Component<IProps> {
  componentDidMount() {
    this.props.getPokemon(1, 2);
    this.props.switchTurn();
  }
  render() {
    return <BattleGround />;
  }
}

export default connect(
  null,
  { getPokemon, switchTurn }
)(BattleGroundContainer);
