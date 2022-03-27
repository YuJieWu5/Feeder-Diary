import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import recordList from './components/record-list';
import addRecord from './components/add-record';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark menu">
          <a href="/list" className="navbar-brand">
            Feeder Diary
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path={["/", "/list"]} component={recordList} />
            <Route exact path="/add" component={addRecord} />
            {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;