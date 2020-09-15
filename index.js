class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      counting: false,
      output: "25:00",
      currentSecundes: 1500,
      session: true,
      sessionLabel: "Session",
      play: false,
    };
    this.handleTimer = this.handleTimer.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.timer = this.timer.bind(this);
    this.handleBeep = this.handleBeep.bind(this);
  }
  handleTimer() {
    let currentBreak = this.state.breakLength;
    let currentSession = this.state.sessionLength;
    let e = event.target.value;
    switch (e) {
      case "break-increment":
        this.setState({
          breakLength: currentBreak < 60 ? currentBreak + 1 : currentBreak,
        });
        break;
      case "break-decrement":
        this.setState({
          breakLength: currentBreak > 1 ? currentBreak - 1 : currentBreak,
        });
        break;
      case "session-increment":
        this.setState({
          sessionLength:
            currentSession < 60 ? currentSession + 1 : currentSession,
          output:
            currentSession < 60
              ? currentSession + 1 + ":00"
              : currentSession + ":00",
          currentSecundes: (currentSession + 1) * 60,
        });
        break;
      case "session-decrement":
        this.setState({
          sessionLength:
            currentSession > 1 ? currentSession - 1 : currentSession,
          output:
            currentSession > 10
              ? currentSession > 1
                ? currentSession - 1 + ":00"
                : currentSession + ":00"
              : currentSession > 1
              ? "0" + (currentSession - 1) + ":00"
              : "0" + currentSession + ":00",
          currentSecundes: (currentSession - 1) * 60,
        });
        break;
    }
  }
  handleReset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      counting: false,
      output: "25:00",
      session: true,
      currentSecundes: 1500,
      sessionLabel: "Session",
      play: false,
    });
    this.handleBeep();
  }
  handleStart() {
    this.setState({
      counting: this.state.counting === true ? false : true,
    });
    this.timer();
  }
  timer() {
    let count = setInterval(() => {
      if (this.state.counting === false) {
        clearInterval(count);
      } else {
        if (this.state.currentSecundes === 0) {
          this.setState({
            session: this.state.session ? false : true,
            currentSecundes: this.state.session
              ? this.state.sessionLength * 60
              : this.state.breakLength * 60,
          });
        } else {
          let currentSec = this.state.currentSecundes;
          this.setState({
            currentSecundes: currentSec - 1,
          });
          if (this.state.currentSecundes === 0) {
            this.setState({
              sessionLabel:
                this.state.sessionLabel === "Session" ? "Break" : "Session",
              play: this.state.play ? false : true,
            });
            this.handleBeep();
          }
        }
        let mm = Math.floor(this.state.currentSecundes / 60);
        let ss = this.state.currentSecundes % 60;
        this.setState({
          output: (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss),
        });
      }
    }, 1000);
  }
  handleBeep() {
    let beep = document.getElementById("beep");
    if (this.state.play) {
      beep.currentTime = 0;
      beep.play();
    } else {
      beep.pause();
    }
  }
  render() {
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <div className="length-container">
          <div className="time-buttons">
            <h3 id="break-label">Break Length</h3>
            <div className="buttons">
              <button
                id="break-increment"
                onClick={
                  this.state.counting === false ? this.handleTimer : undefined
                }
                value="break-increment"
                className="button-custom"
              >
                +
              </button>
              <p id="break-length">{this.state.breakLength}</p>
              <button
                id="break-decrement"
                onClick={
                  this.state.counting === false ? this.handleTimer : undefined
                }
                value="break-decrement"
                className="button-custom"
              >
                -
              </button>
            </div>
          </div>
          <div className="time-buttons">
            <h3 id="session-label">Session Length</h3>
            <div className="buttons">
              <button
                id="session-increment"
                onClick={
                  this.state.counting === false ? this.handleTimer : undefined
                }
                value="session-increment"
                className="button-custom"
              >
                +
              </button>
              <p id="session-length">{this.state.sessionLength}</p>
              <button
                id="session-decrement"
                onClick={
                  this.state.counting === false ? this.handleTimer : undefined
                }
                value="session-decrement"
                className="button-custom"
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="sessionBreak">
          <h3 id="timer-label">{this.state.sessionLabel}</h3>
          <p id="time-left">{this.state.output}</p>
          <div>
            <button
              id="start_stop"
              onClick={this.handleStart}
              className="button-custom"
            >
              {this.state.counting ? "Stop" : "Start"}
            </button>
            <button
              id="reset"
              onClick={this.handleReset}
              className="button-custom"
            >
              Reset
            </button>
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("wrapper"));
