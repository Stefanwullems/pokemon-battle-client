import * as React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import { Link } from 'react-router-dom';


let Client = new ApolloClient({
  uri: 'http://localhost:4011/graphql'
});



export default class Selection extends React.Component{
  state:any = {
    allPokemon: [],
    selectedPokemon: []
  };
  async componentDidMount() {
    const res = await Client.query({
      query: gql`
        {
          allPokemon {
            name
            sprites
            {front_sprite_url}
          }
        }
      `
    });

    console.log(res.data['allPokemon'])

    this.setState({
        allPokemon : res.data['allPokemon']
    });
 
  }

  handleClick(input){
   this.setState({
    selectedPokemon: [input]
   })
}
  

    render() {
    return (
      <div>
          <div className="PageTitle"><h1 className="PageTitleHeader"> Please Select 5 Pokemons from the List: </h1></div>
        <div className="AwaitingLobby">
          {this.state.allPokemon.map((pokemon : any) => <div className="pokeDivs" onClick={() =>this.handleClick(pokemon)}><h2 className="pokeDivText">{pokemon.name}</h2><img className="listImage" src={pokemon.sprites.front_sprite_url}/></div>)}
        </div>
        <div className="SelectedTitle"> <h1 className="SelectedTitleHeader"> Your Currently Selected Pokemons: </h1></div>
        <div className="AwaitingLobby">
          {this.state.selectedPokemon.map((pokemon : any) => <div className="SelecedpokeDivs" onClick={() =>this.handleClick(pokemon)}><h2 className="pokeDivText">{pokemon.name}</h2><img className="listImage" src={pokemon.sprites.front_sprite_url}/></div>)}
        </div>
      </div>
    );
  }
}
