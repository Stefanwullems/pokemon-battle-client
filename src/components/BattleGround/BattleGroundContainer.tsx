import * as React from "react";
import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import fetchPokemon from "../../actions/pokemon/get-pokemon";
import switchTurn from "../../actions/gameLogic/switch-turn";
import selectPokemon from "../../actions/pokemon/select-pokemon";
import newTurn from "../../actions/gameLogic/new-turn";

interface IProps {
  fetchPokemon: (playerPartyIds: number[], opponentPartyIds: number[]) => void;
  switchTurn: () => void;
  selectPokemon: (id: number, from: string) => void;
  newTurn: () => void;
  playerPokemon: any;
  opponentPokemon: any;
}

class BattleGroundContainer extends React.Component<IProps> {
  async componentDidMount() {
    const { fetchPokemon, selectPokemon } = this.props;

    await fetchPokemon([2, 5], [5, 8]);
    selectPokemon(5, "opponent");
    selectPokemon(2, "player");
  }

  render() {
    return <BattleGround />;
  }
}

const mapStateToProps = ({ playerPokemon, opponentPokemon }) => ({
  playerPokemon,
  opponentPokemon
});

export default connect(
  mapStateToProps,
  { fetchPokemon, switchTurn, selectPokemon, newTurn }
)(BattleGroundContainer);
