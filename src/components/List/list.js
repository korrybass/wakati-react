import React, { Component } from 'react';
import './list.css';
import trashcan from "../../assests/img/trash-can.png"

class List extends Component {
    constructor(){
        super();
        this.state = {
            tasks: []
        }
    }

    addTask() {
        this.setState({tasks: this.state.tasks.concat([{text: ''}])})
    }

    updateTask (id, event) {
        let updatedArray = this.state.tasks.slice();
        updatedArray[id]["text"] = event.target.value;
        this.setState({tasks: updatedArray})
    }

    deleteTask(idx) {
        let updatedArray = this.state.tasks.slice();
        updatedArray.splice(idx, 1);
        this.setState({tasks: updatedArray});
    }
    
    generateList () {
        return this.state.tasks.map( (x, idx) => {
            return (
                <div key={idx} className="flex-row task-row fadeInLeft">
                    <div className="flex-row squaredThree">
                        <input type="checkbox" value="None" id={"task-check-"+idx} name="check"  />
                        <label htmlFor={"task-check-"+idx}></label>
                    </div>
                    <input placeholder="enter task title" 
                        onChange={(e) => { this.updateTask(idx, e) }} 
                        value={this.state.tasks[idx].text} 
                        type='text' />
                    <button className="trash-can-btn" onClick={() => { this.deleteTask(idx) }} type="button" >
                        <img src={trashcan} />
                    </button>
                </div>
            )
        })
    }

  render() {
    return (
      <div className="list-container">
          <div className="flex-row list-header">
            <h3>Daily Tasks</h3>
            <button type="button" className="action-btn add-btn" onClick={this.addTask.bind(this)}>+</button>
          </div>
        <div>
            {this.generateList()}
        </div>
      </div>
    );
  }}

export default List;
