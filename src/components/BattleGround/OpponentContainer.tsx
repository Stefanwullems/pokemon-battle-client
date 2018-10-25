import * as React from "react";
import HpBar from "../trainerComponents/HpBar";
import doesExist from "../../scripts/does-exist";
import { IPokemon } from "../../tools/interfaces";
import { connect } from "react-redux";

interface IProps {
  opponentPokemon: IPokemon;
}

class OpponentContainer extends React.Component<IProps> {
  state = {
    maxHp: 0,
    currentPokemon: ""
  };

  componentDidUpdate() {
    if (
      (this.state.maxHp === 0 ||
        this.state.currentPokemon !== this.props.opponentPokemon.name) &&
      doesExist(this.props.opponentPokemon)
    ) {
      this.setState({
        currentPokemon: this.props.opponentPokemon.name
      });
      this.setState({
        maxHp: this.props.opponentPokemon.stats.hp
      });
    }
  }

  render() {
    return (
      <div>
        {doesExist(this.props.opponentPokemon) && (
          <div className="EnemyContainer">
            <div className="EnemyPokemonName">
              <span>{this.props.opponentPokemon.name}</span>
            </div>
            <div className="EnemyHpBar">
              <HpBar
                hp={this.props.opponentPokemon.stats.hp}
                maxHp={this.state.maxHp}
              />
            </div>
            <div className="EnemyImage">
              <img src={this.props.opponentPokemon.sprites.front_sprite_url} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ opponentPokemon }) => ({ opponentPokemon });

export default connect(mapStateToProps)(OpponentContainer);
