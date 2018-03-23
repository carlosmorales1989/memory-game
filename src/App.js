import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const path = require('path');

class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    //let images = ["images/luigi.jpg", "images/mario.jpg","images/peach.jpg","images/toad.jpg"];
    let images = require.context('./../public/game-images', false, /\.(png|jpg|svg)$/).keys();
    images = images.concat(images);
    let grid = images.map((myPath)=>{
      return {path: path.join('game-images',myPath), enabled: false};
    });
    this.state = {
        grid: grid,
        current_cell: -1
    };
  }

  handleClick(id){
    let newGrid = this.state.grid;
    if(this.state.current_cell == id || newGrid[id].enabled == true){
      alert("Celda invalida");
      return;
    }
    if(this.state.current_cell == -1){
      newGrid[id].enabled = true;
      this.setState({
        grid: newGrid,
        current_cell: id
      });
    }else{
      if(newGrid[id].path == newGrid[this.state.current_cell].path){
        newGrid[id].enabled = true;
      }else{
        newGrid[this.state.current_cell].enabled = false;
      }
      this.setState({
        grid: newGrid,
        current_cell: -1
      });
    }

  }

  render() {
    const images = this.state.grid.map((cell,index) =>
      <Cell img={cell.path} id={index} handleClick={this.handleClick} enabled={cell.enabled}/>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {images}
      </div>
    );
  }
}

class Cell extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.id);
  }

  render(){
      return(
          <button onClick={this.handleClick}>
            <img className="game-cell" src={this.props.enabled?this.props.img:"images/question.png"}/>
          </button>
      );
  }

}

export default App;
