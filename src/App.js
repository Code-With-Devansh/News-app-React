import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  constructor(){
    super();
    this.state={
      loading:0,
      pageSize:6
    }
  }
  changePageSize = (val)=>{
    this.setState({
      pageSize:val
    })
    console.log('changed the page size to: '+ this.state.pageSize);
  }
  setLoading = (val)=>{
    this.setState({loading:val});
  }
  render() {
    return <div>
      <Router>
        <NavBar changePageSize={this.changePageSize} defaultPageSize={this.state.pageSize} currentPageSize={this.state.pageSize}/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
        <Switch>
          <Route exact path='/'><News setLoading={this.setLoading} key={this.state.pageSize+'general'} pageSize={this.state.pageSize} country='in' category='general' everything={false}/>'</Route>
          <Route exact path="/science"><News setLoading={this.setLoading} key={this.state.pageSize+'science'} pageSize={this.state.pageSize} country='in' category='science'everything={false}/></Route>
          <Route exact path="/business"><News setLoading={this.setLoading} key={this.state.pageSize+'business'} pageSize={this.state.pageSize} country='in' category='business'everything={false}/></Route>
          <Route exact path="/entertainment"><News setLoading={this.setLoading} key={this.state.pageSize+'entertainment'} pageSize={this.state.pageSize} country='in' category='entertainment'everything={false}/></Route>
          <Route exact path="/health"><News setLoading={this.setLoading} key={this.state.pageSize+'health'} pageSize={this.state.pageSize} country='in' category='health'everything={false}/></Route>
          <Route exact path="/sports"><News setLoading={this.setLoading} key={this.state.pageSize+'sports'} pageSize={this.state.pageSize} country='in' category='sports'everything={false}/></Route>
          <Route exact path="/technology"><News setLoading={this.setLoading} key={this.state.pageSize+'technology'} pageSize={this.state.pageSize} country='in' category='technology'everything={false}/></Route>
          <Route exact path="/global"><News setLoading={this.setLoading} key={this.state.pageSize+'global'} pageSize={this.state.pageSize}category='global'/></Route>
        </Switch>
      </Router>
    </div>;
  }
}
