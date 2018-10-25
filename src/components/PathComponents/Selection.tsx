import * as React from 'react';
import ApolloClient, { gql } from 'apollo-boost';

// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import { Link } from 'react-router-dom';


let Client = new ApolloClient({
  uri: 'http://localhost:4011/graphql'
});

export default class Selection extends React.Component {
  state = {
    allPokemon: []
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
        allPokemon: res.data['allPokemon']
    });
 
  }
    render() {
    return (
      <div>
        <div className="AwaitingLobby">
        
          {this.state.allPokemon.map(pokemon => <div className="pokeDivs"><h2>{pokemon['name']}</h2><img src={pokemon['sprites'+'front_sprite_url']}/></div>)}
        </div>
      </div>
    );
  }
}
