import * as React from "react";
import ApolloClient, { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import selectPokemonParty from "src/actions/pokemon/select-pokemon-party";
import { Redirect } from "react-router-dom";

// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import { Link } from 'react-router-dom';

let Client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

interface IProps {
  selectPokemonParty: (selectedPokemon: number[]) => {};
}

class Selection extends React.Component<IProps> {
  state: any = {
    allPokemon: [],
    selectedPokemon: [],
    redirect: false
  };

  async componentDidMount() {
    const res = await Client.query({
      query: gql`
        {
          allPokemon {
            id
            name
            sprites {
              front_sprite_url
            }
          }
        }
      `
    });

    this.setState({
      allPokemon: res.data["allPokemon"]
    });
  }

  handleClick(input) {
    const state = this.state.selectedPokemon;
    if (state.indexOf(input) < 0 && this.state.selectedPokemon.length < 5) {
      this.setState({
        selectedPokemon: [...state, input]
      });
    } else if (this.state.selectedPokemon.length === 5) {
      1;
      return null;
    }
  } //sou um génio

  redirecter() {
    this.props.selectPokemonParty(
      this.state.selectedPokemon.map(pokemon => pokemon.id)
    );
    this.setState({
      redirect: true
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to="/battleGround" />}
        {!this.state.redirect && (
          <div>
            <div className="PageTitle">
              <h1 className="PageTitleHeader">
                {" "}
                Please Select 5 Pokemons from the List:{" "}
              </h1>
            </div>
            <div className="AwaitingLobby">
              {this.state.allPokemon.map((pokemon: any) => (
                <div
                  className="pokeDivs"
                  onClick={() => this.handleClick(pokemon)}
                >
                  <h2 className="pokeDivText">{pokemon.name}</h2>
                  <img
                    className="listImage"
                    src={pokemon.sprites.front_sprite_url}
                  />
                </div>
              ))}
            </div>
            <div className="SelectedTitle">
              {" "}
              <h1 className="SelectedTitleHeader">
                {" "}
                Your Currently Selected Pokemons:{" "}
              </h1>
            </div>
            <div className="AwaitingLobby">
              {this.state.selectedPokemon.map((pokemon: any) => (
                <div
                  className="SelecedpokeDivs"
                  onClick={() => this.handleClick(pokemon)}
                >
                  <h2 className="SelectedPokeDivText">{pokemon.name}</h2>
                  <img
                    className="SlectedListImage"
                    src={pokemon.sprites.front_sprite_url}
                  />
                </div>
              ))}
            </div>
            {this.state.selectedPokemon.length === 5 ? (
              <div>
                Select your Pokemons!
                <Button
                  color="primary"
                  variant="contained"
                  // onClick={this.props.createGame}
                  className="startingButton"
                  onClick={this.redirecter.bind(this)}
                >
                  FIGHT!
                </Button>{" "}
              </div>
            ) : null}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mdtp = {
  selectPokemonParty
};

export default connect(
  null,
  mdtp
)(Selection);
