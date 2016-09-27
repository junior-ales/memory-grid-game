import React from 'react';
import Row from './Row';

class Game extends React.Component {
  render() {
    let grid = [];

    for (let i = 0; i < this.props.rows; i++) {
      grid.push(<Row key={i} id={i} columns={this.props.columns} />);
    }

    return <div className="grid">{grid}</div>;
  }
}

export default Game;
