import React from 'react';
import { flatten, sampleSize } from 'lodash';

import Cell from './Cell';
import Row from './Row';
import Footer from './Footer';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = [];
    let row;

    for (let r = 0; r < this.props.rows; r++) {
      row = [];
      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }

      this.matrix.push(row);
    }

    this.activeCells = sampleSize(flatten(this.matrix), this.props.activeCellsCount);

    this.state = { gameState: 'ready' };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ gameState: 'memorize' }, () => {
        setTimeout(() => this.setState({ gameState: 'recall' }), 2000);
      });
    }, 2000);
  }

  render() {
    return (
      <div className="grid">
        {this.matrix.map((row, ri) => (
        <Row key={ri}>
          {row.map(cellId => <Cell key={cellId} id={cellId} activeCells={this.activeCells} gameState={this.state.gameState} />)}
        </Row>
        ))}
        <Footer gameState={this.state.gameState} />
      </div>
    );
  }
}

export default Game;
