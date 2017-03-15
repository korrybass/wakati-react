var WakatiFactory = function () {

    var _getRemainingTime = function (time, endtime) {
        var t = time;
        var timeDiff = self.endTime - t;
        var seconds = Math.floor( (timeDiff/1000) % 60 );
        var minutes = Math.floor( (timeDiff/1000/60) % 60 );

        return {
            seconds: seconds,
            minutes: minutes
        }
    };
    var _startTimer = function (){
        var currentTime = new Date();
        // self.endTime = new Date(new Date(currentTime.getTime()).setMinutes(currentTime.getMinutes() + 45));
        self.endTime = new Date(new Date(currentTime.getTime()).setSeconds(currentTime.getSeconds() + 5));
        
        var time = currentTime.getTime();
        _countDown(time);

        if(Notification.permission !== "granted"){
            Notification.requestPermission();
        }
    };
    var _countDown = function (time) {
        var updateLoop = setInterval(function () {
            time = time + 1000;
            updatedTime = _getRemainingTime(time);
            if(updatedTime.seconds <= 0 && updatedTime.minutes <= 0){ 
                updatedTime.seconds = 0;
                updatedTime.minutes = 0;
                updateElement(updatedTime);
                clearInterval(updateLoop);
            } 
            else{ updateElement(updatedTime) };
        }, 1000 );
    };

    var updateElement = function (updatedTime) {
        if(updatedTime.seconds === 0 && updatedTime.minutes === 0){
            var notification = new Notification("Wakati has ended", {icon: "./img/clock.png", body: "Time for a Break!"});              
        }

        var secondsString = updatedTime.seconds.toString();
            var secondsArr = secondsString.split("");
            if(secondsArr.length === 1){ 
                secondsArr.unshift("0");
                secondsString = secondsArr.join("");
            };

            var minutesString = updatedTime.minutes.toString(); 
            var minutesArr = minutesString.split("");
            if(minutesArr.length === 1){ 
                minutesArr.unshift("0");
                minutesString = minutesArr.join("");
            };
            var wakatiElem = document.querySelector('#wakati');
            var WKseconds = wakatiElem.querySelector('.seconds');
            var WKminutes = wakatiElem.querySelector('.minutes'); 
            WKminutes.innerHTML = minutesString;
            WKseconds.innerHTML = secondsString;
        
    };

    var self = {
        interval: 45,
        endTime: null,  
        update: _countDown,
        start: _startTimer
    }
    return self
};

var WakatiTimer = WakatiFactory();

var startTimer = function () {
    WakatiTimer.start()
}

var wakatiStartBtn = document.querySelector('#wakati-start');
wakatiStartBtn.onclick = startTimer;