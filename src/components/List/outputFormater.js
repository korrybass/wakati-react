import React, { Component } from 'react';
import './outputFormatter.css';


class OutputFormatter extends Component {
    constructor(){
        super();
    }

formatDataOutput (){
  return this.props.taskRecords.map( (x, idx) => {
    return (
      <div key={idx} className="task-output-line">
        <p>{x.text}</p> | <p>{x.duration}</p>hr | <p>{ (x.completed) ? "Completed" : "In Progress" }</p>
      </div>
    )
  })
}

  render() {
    return (
      <div >
        <h4 className="body-header"> Generate Email Body </h4>
        <div className="output-body">
          <h5>Date: {new Date().getMonth()+1 + "-" + new Date().getDate() +"-" + new Date().getFullYear()}</h5>
          {this.formatDataOutput()}
        </div>
      </div>
    );
  }}

export default OutputFormatter;
