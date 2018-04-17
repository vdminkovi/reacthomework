import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {searchCard} from '../service/Search';
import Cards from './Cards';
import { getSpecificCard } from '../service/Search';

class CardsDetail extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      card: [],
      error: null,
      isLoaded: false
    }
  }

componentDidMount () {
    const char_id = this.props.match.params.id;

    fetch(`https://api.magicthegathering.io/v1/cards/${char_id}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          card: result.card
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}

render () {
  if(this.state.error){
    return <div>Error:{ this.state.error.message } </div>;
  }else if (!this.state.isLoaded){
    return <div>Loading.... !</div>
  }else {
    return(
      <Card key={this.state.card.id}
            image={this.state.card.imageUrl}
            name={this.state.card.name}
            color={this.state.card.colors}
            artist={this.state.card.artist}
    />
    )
  }

}

}
export default CardsDetail;

function Card (props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.artist}</p>
      <p>{props.color}</p>
      <img src={props.image}/>
    </div>
  )
}
