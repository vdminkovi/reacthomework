import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import data from './assets/data.json';
import eminem from './assets/images/eminem-profile.jpg';
import Header from './js/components/header';
import Cards from './js/components/Cards';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" component={Cards}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>
  ,document.getElementById("root")
);
