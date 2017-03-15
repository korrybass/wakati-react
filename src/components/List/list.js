import React, { Component } from 'react';
import './list.css';

class List extends Component {
    constructor(){
        super();
        this.state = {
            tasks: []
        }
    }

    addTask() {
        this.setState({tasks: this.state.tasks.concat([{}])})
    }
    updateTask (id, event) {
        let updatedArray = this.state.tasks.slice();
        updatedArray[id]["text"] = event.target.value;
        this.setState({tasks: updatedArray})
    }
    generateList () {
        return this.state.tasks.map( (x, idx) => {
            return (
                <div key={idx} className="flex-row task-row">
                    <div className="flex-row squaredThree">
                        <input type="checkbox" value="None" name="check"  />
                        <label htmlFor="squaredThree"></label>
                    </div>
                    <input placeholder="enter task title" onChange={(e) => { this.updateTask(idx, e) }} value={x.text} type='text' />
                </div>
            )
        })
    }
    


  render() {
    return (
      <div className="list-container">
        <h3>Daily Tasks</h3>
        <button type="button" onClick={this.addTask.bind(this)}>+</button>
        {this.generateList()}
      </div>
    );
  }}

export default List;
