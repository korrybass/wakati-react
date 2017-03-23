import React, { Component } from 'react';
import './list.css';
import OutputFormatter from "./outputFormater"
import trashcan from "../../assests/img/trash-can.svg"


class List extends Component {
    constructor(){
        super();
        this.state = {
            tasks:  JSON.parse(localStorage.getItem('savedTasks')) || []
        }
    }

    addTask() {
        this.setState({tasks: this.state.tasks.concat([{text: '', start: "", duration: "", completed: false}])})
    }

    updateTask (idx, event) {
        let updatedArray = this.state.tasks.slice();
        updatedArray[idx]["text"] = event.target.value;
        this.setState({tasks: updatedArray})
    }

    deleteTask(idx) {
        let updatedArray = this.state.tasks.slice();
        updatedArray.splice(idx, 1);
        this.setState({tasks: updatedArray});
    }
    completeTask (idx, event){
        let updatedArray = this.state.tasks.slice();
        updatedArray[idx].completed = event.target.checked;
        this.setState({tasks: updatedArray})
    }
    updateDuration (idx, event){
        let updatedArray = this.state.tasks.slice();
        updatedArray[idx]["duration"] = event.target.value;
        this.setState({tasks: updatedArray})
    }

    clearAllTasks (){
        this.setState({tasks: []})
    }
    
    generateList () {
         localStorage.setItem('savedTasks', JSON.stringify(this.state.tasks)) ;
        
        return this.state.tasks.map( (x, idx) => {
        let lineItemStyles = (this.state.tasks[idx].completed) ? "flex-row task-row fadeInLeft completed-item" : "flex-row task-row fadeInLeft";
            
            return (
                <div key={idx} className={lineItemStyles}>
                    <div className="flex-row squaredThree">
                        <input type="checkbox" 
                        onChange={ (e) => {this.completeTask(idx, e) } }
                        checked={this.state.tasks[idx].completed}
                        id={"task-check-"+idx} name="check"  />
                        <label htmlFor={"task-check-"+idx}></label> 
                    </div>
                    <input placeholder="enter task title" 
                        onChange={(e) => { this.updateTask(idx, e) }} 
                        value={this.state.tasks[idx].text} 
                        type='text' />
                    <input className="duration" type='text' placeholder="hr"
                    onChange={(e) => { this.updateDuration(idx, e) }}
                     value={this.state.tasks[idx].duration} />
                    <button className="trash-can-btn" onClick={() => { this.deleteTask(idx) }} type="button" >
                        <img alt="" src={trashcan} />
                    </button>
                </div>
            )
        })
    }

  render() {
    return (
      <div className="list-container">
         <div className="list-holder">
              <div className="flex-row list-header">
            <h3>Daily Tasks</h3>
            <button type="button" className="action-btn add-btn" onClick={this.addTask.bind(this)}>+</button>
          </div>
        <div>
            {this.generateList()}
        </div>
        <div className="flex-row clear-btn">
            <button className="flex-to-right" type="button" onClick={this.clearAllTasks.bind(this)} >Clear All Tasks</button>
        </div>
         </div>

        <div>
            <OutputFormatter taskRecords={this.state.tasks} />
        </div>
      </div>
    );
  }}

export default List;
