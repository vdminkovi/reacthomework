import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {searchCard} from '../service/Search';
import Cards from './Cards';


function CardsResult({card, path, id}) {
  return(
    <div>
     <Link to={`${path}/${id}`}>{card.name}</Link>
    </div>
  )

}

class CardsView extends React.Component {

constructor (props) {
    super(props);

    this.getCard = this.getCard.bind(this);

    this.state = {
      searchResults : []
    }

}

getCard(name) {
  return searchCard(name)
    .then(results =>{ this.setState({ searchResults: results.cards })})
    .catch(error => console.error(error));
}

componentDidMount () {
  const params = queryString.parse(window.location.search);
  console.log('params', params);
  console.log(window.location);
  if (!!params.name) {
    this.getCard(params.name);
  } else {
    this.props.history.push("/");
  }
}

    render() {
      let showResult;
      if (this.state.searchResults.length > 0) {
        showResult =  <div>
          <h3>Found Card:</h3>

           {
            this.state.searchResults.map(card =>
              <CardsResult key={card.name} card={card} path={this.props.match.path} id={card.id} />
            )

          }
          </div>

      }else {
        showResult = <h3>Not found</h3>
      }

      return ( showResult )

    }
}
export default CardsView;
