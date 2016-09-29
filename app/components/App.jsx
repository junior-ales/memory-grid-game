import React from 'react';
import Game from './Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameId: 1 };
  }

  createNewGame() {
    this.setState({ gameId: this.state.gameId + 1 });
  }

  render() {
    return (
      <div id="content">
        <Game key={this.state.gameId}
              createNewGame={this.createNewGame.bind(this)} />
      </div>
    );
  }
}

export default App;
