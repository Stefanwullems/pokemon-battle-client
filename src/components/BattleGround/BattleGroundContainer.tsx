import * as React from "react";
import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import fetchPokemon from "../../actions/pokemon/get-pokemon";
import switchTurn from "../../actions/gameLogic/switch-turn";

interface IProps {
  fetchPokemon: (pplayerPartyIds: number[], opponentPartyIds: number[]) => void;
  switchTurn: () => void;
}

class BattleGroundContainer extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchPokemon([2, 5], [5, 8]);
  }

  render() {
    return <BattleGround />;
  }
}

export default connect(
  null,
  { fetchPokemon, switchTurn }
)(BattleGroundContainer);
