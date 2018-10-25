import * as React from "react";
import HpBar from "../trainerComponents/HpBar";
import doesExist from "../../scripts/does-exist";
import { IPokemon } from "../../tools/interfaces";
import { connect } from "react-redux";

interface IProps {
  playerPokemon: IPokemon;
}

class PlayerContainer extends React.Component<IProps> {
  state = {
    maxHp: 0,
    currentPokemon: ""
  };

  componentDidUpdate() {
    if (
      (this.state.maxHp === 0 ||
        this.state.currentPokemon !== this.props.playerPokemon.name) &&
      doesExist(this.props.playerPokemon)
    ) {
      this.setState({
        currentPokemon: this.props.playerPokemon.name
      });
      this.setState({
        maxHp: this.props.playerPokemon.stats.hp
      });
    }
  }

  render() {
    return (
      <div>
        {doesExist(this.props.playerPokemon) && (
          <div className="EnemyContainer">
            <div className="EnemyPokemonName">
              <span>{this.props.playerPokemon.name}</span>
            </div>
            <div className="EnemyHpBar">
              <HpBar
                hp={this.props.playerPokemon.stats.hp}
                maxHp={this.state.maxHp}
              />
            </div>
            <div className="EnemyImage">
              <img src={this.props.playerPokemon.sprites.back_sprite_url} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ playerPokemon }) => ({ playerPokemon });

export default connect(mapStateToProps)(PlayerContainer);
