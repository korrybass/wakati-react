import React, { Component } from 'react';
import './timer.css';

class Timer extends Component {
  constructor(){
    super();
    this.state = {
      tracker: null,
      interval: 45,
      endtime: null,
      seconds: "00",
      minutes: "00",
      sessionCount: 0,
      today: new Date().getMonth()+1 + "-" + new Date().getDate() +"-" + new Date().getFullYear(),
      inProgress: false
    }
  }

  getRemainingTime (time, endtime) {
    var t = time;
    var timeDiff = this.state.endtime - t;
    var seconds = Math.floor( (timeDiff/1000) % 60 );
    var minutes = Math.floor( (timeDiff/1000/60) % 60 );

    return {
      seconds: seconds,
      minutes: minutes
    }
  };

  startTimer (){

    var currentTime = new Date();
    //======= Testing
    // endtime: new Date(new Date(currentTime.getTime()).setSeconds(currentTime.getSeconds() + 5))
    //endtime: new Date(new Date(currentTime.getTime()).setMinutes(currentTime.getMinutes() + 45))
    //========
    this.setState({ 
      endtime: new Date(new Date(currentTime.getTime()).setMinutes(currentTime.getMinutes() + 45)),      
      inProgress: true    
    })
    var time = currentTime.getTime();
    this.countDown(time);
    if (typeof Notification !== 'undefined') {
      if(Notification.permission !== "granted"){
        Notification.requestPermission();
      }
    }        
  };

  countDown (time) {
    var self = this;
    var updateLoop = setInterval(function () {
      time += 1000;
      let updatedTime = self.getRemainingTime(time);

      if(updatedTime.seconds <= 0 && updatedTime.minutes <= 0){ 
        updatedTime.seconds = 0;
        updatedTime.minutes = 0;
        self.updateElement(updatedTime);
        clearInterval(updateLoop);
      }
      else{ 
        self.updateElement(updatedTime) 
      }
    }, 1000);
  };

  updateElement (updatedTime) {
    if(updatedTime.seconds === 0 && updatedTime.minutes === 0){
      if (typeof Notification !== 'undefined') {
        new Notification("Wakati has ended", {icon: "./img/clock.png", body: "Time for a Break!"});
        this.setState({ 
          sessionCount: this.state.sessionCount + 1,
          inProgress: false
        });
      }
    }
    let secondsString = updatedTime.seconds.toString();
    let secondsArr = secondsString.split("");
    if(secondsArr.length === 1){ 
      secondsArr.unshift("0");
      secondsString = secondsArr.join("");
    };

    let minutesString = updatedTime.minutes.toString();
    let minutesArr = minutesString.split("");
    if(minutesArr.length === 1){
      minutesArr.unshift("0");
      minutesString = minutesArr.join("");
    };

    this.setState({
      seconds: secondsString,
      minutes: minutesString
    })
  };

  render() {
    return (
      <div className="timer-container">
        <div id="wakati">
          <div className="time-body slideInDown">
            <span className="minutes">{this.state.minutes}</span> : <span className="seconds">{this.state.seconds}</span>      
          </div>
          <div className="wakati-buttons">
            <button className="action-btn" disabled={this.state.inProgress} 
            id="wakati-start" onClick={this.startTimer.bind(this)} type="button">Start</button>
          </div>
          <small className="session-count">Sessions Completed: {this.state.sessionCount}</small>
          <p className="session-count">{this.state.today}</p>
        </div>
      </div>
    );
  }
}

export default Timer;
