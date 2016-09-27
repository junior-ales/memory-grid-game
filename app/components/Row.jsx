import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  render() {
    let columns = [];

    for (let i = 0; i < this.props.columns; i++) {
      columns.push(<Cell key={`${this.props.id}${i}`} id={`${this.props.id}${i}`} />);
    }

    return <div className="row">{columns}</div>;
  }
}

export default Row;
