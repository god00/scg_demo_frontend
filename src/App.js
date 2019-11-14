import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import AppRoutes from './routes';

class App extends Component {
  render() {
    return (
      <Router>
        <AppRoutes />
      </Router>
    );
  }
}

export default App;