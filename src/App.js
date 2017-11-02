import React, { Component } from 'react';
import { sluggify } from './utils'
import Header from './Header'
import DateGroupedList from './DateGroupedList'

import 'normalize.css'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      permits: []
    }
  }

  componentDidMount() {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        // let permits = json.filter(p => p.neighborhood !== null )
        let permits = json.map((v) => {
          v.nhid = sluggify(v.neighborhood)
          return v
        })

        const nhid = this.props.match.params.nhid
        if(nhid) {
          permits = permits.filter((p) => p.nhid === nhid )
        }

        this.setState({ permits: permits })
      })

  }

  render() {
    return (
      <div className="App">
        <Header />
        <DateGroupedList permits={this.state.permits} />
      </div>
    );
  }
}

export default App;
