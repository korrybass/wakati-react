import React, { Component } from 'react';
import './outputFormatter.css';


class OutputFormatter extends Component {
    constructor(){
        super();
    }

formatDataOutput (){
  return this.props.taskRecords.map( (x, idx) => {
    return (
      <div className="task-output-line">
        <p>{x.text}</p> | <p>{x.duration}</p> | <p>{ (x.completed) ? "Completed" : "In Progress" }</p>
      </div>
    )
  })
}

  render() {
    return (
      <div className="">
        {this.formatDataOutput()}
      </div>
    );
  }}

export default OutputFormatter;
