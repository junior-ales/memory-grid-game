import React from 'react';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div id="content">
        <Game rows={5} columns={5} activeCellsCount={6} />
      </div>
    );
  }
}

export default App;
