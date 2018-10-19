import * as React from "react";
import BattleGround from "./BattleGround";

import {fetchPokemon} from "../../actions/pokemon/get-pokemon";
import { connect } from "react-redux";


class BattleGroundContainer extends React.Component<any> {

  componentDidMount() {
    this.props.fetchPokemon(1, 2)
  }

  render() {
    return <BattleGround />;
  }
}

export default connect(null, {fetchPokemon})(BattleGroundContainer);
