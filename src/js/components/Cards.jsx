import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CardsView from './CardsView';
import CardsDetail from './CardsDetail';

class CardsForm extends React.Component{

  constructor(props) {
    super(props);

    this.LoadCards = this.LoadCards.bind(this);
    this.updateSearch = this.updateSearch.bind(this);

    this.state ={
      cards:[],
      Loaded: false,
      search: "",
      hasSubmitted: false
    }
  }
  LoadCards() {

    const getCards = () => {

      return fetch(`https://api.magicthegathering.io/v1/cards/`);
    };

    getCards()
      .then(response => response.json())
      .then(card => this.setState({
        cards: card.cards,
        Loaded: true,

      }))
      .catch(error => console.error(error));

  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  FormSubmit(event){
    event.preventDefault();

    this.setState({hasSubmitted: true})
  }
  componentDidMount() {
    this.LoadCards();
  }

render() {
/*  let filteredCards = this.state.cards.filter(
    (card) =>{
      return card.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    }
  );*/

  if (this.state.hasSubmitted) {
    console.log(this.state.search);
    console.log(this.props.match.path);
    console.log(this.props);
    return <Redirect to={`${this.props.match.path}cards?name=${this.state.search}`} />;
  }

  return(
    <div>
      <hr/>
      <h1>Cards</h1>
        <form onSubmit={this.FormSubmit.bind(this)}>
          <input type="text" value={this.state.search} onChange={this.updateSearch}/>
          <button>Search</button>
        </form>
        <ul>
          {
          this.state.cards.map((card, i) => <li key={i}>{card.name} -
          <i>{card.colors}; &nbsp; &nbsp;</i>
          <b>{card.types}</b>
          <h5><i>{card.artist}</i></h5>
          </li>)
          }
        </ul>
  </div>
  )
}
}

class Cards extends React.Component {
  constructor(props) {
    super(props);

  }

render (){
  const {path} = this.props.match;
  console.log('path', `${path}cards`);
  return(
    <React.Fragment>
      <Route path={`${path}cards`} component={CardsView} exact/>
      <Route path={path} component={CardsForm} exact/>
      <Route path={`${path}cards/:id`} component={CardsDetail} exact/>
    </React.Fragment>
  )
}

}
export default Cards;
