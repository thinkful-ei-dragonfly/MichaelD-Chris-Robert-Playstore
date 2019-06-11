import React from 'react';
import PlayApp from './playapps/playapps';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      genres: '',
      sort: '',
      error: null
    }
  }
  setSort(sort) {
    this.setState({
      sort
    });
  }

  setSort(genres) {
    this.setState({
      genres
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    //construct a URL with the query string
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if(this.state.genres) {
      params.push(`search=${this.state.genres}`);
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          books: data,
          error: null //reset errors
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        });
      })

  }
  render() {
    const apps = this.state.apps.map((app, i) => {
      return <PlayApp {...app} key={i}/>
    })
    return (
      <div className="App">
        <h1>Playstore Apps</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="genres">Genres: </label>
        <select id="genres" name="genres">
            <option value="">None</option>
            <option value="title">Action</option>
            <option value="rank">Puzzle</option>
            <option value="rank">Strategy</option>
            <option value="rank">Casual</option>
            <option value="rank">Arcade</option>
            <option value="rank">Card</option>
        </select>  
        <label htmlFor="sort">Sort: </label>
        <select id="sort" name="sort">
            <option value="">None</option>
            <option value="title">Rating</option>
            <option value="rank">App</option>
        </select>  
        <button type="submit">Search</button> 
        </form>
        <div className="App_error">{ this.state.error }</div>
        <div>
          {}
        </div>
      </div>
    );
  }
}


