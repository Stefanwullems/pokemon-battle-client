import * as React from 'react'
import { Link } from 'react-router-dom'


export class GreetingScreen extends React.Component{
render(){
    return (
        <div className="MainPage">
      <Link className="Links" to="/games"> <div className="PlayButton"/> </Link>
       <h2 className="Title"><img src="https://fontmeme.com/permalink/181023/0fdde8f2df60b7ac995280183936e93d.png" alt="fonte-de-pokemon"/></h2>
        </div>
    )
}
}