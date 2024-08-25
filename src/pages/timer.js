import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the CSS file for styling

const Timer = () => {
  const timerRef = useRef(null);
  const [inputTime, setInputTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 10,
  });
  const [timer, setTimer] = useState("00:00:10");
  const [view, setView] = useState("false");
  const navigate = useNavigate();

  // Function to calculate the remaining time
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(total / (1000 * 60 * 60));
    return { total, hours, minutes, seconds };
  };

  // Function to start the timer
  const startTimer = (endTime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);

    if (total >= 0) {
      setTimer(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    } else {
      clearInterval(timerRef.current);
      navigate("/countdown-timer/target");
    }
  };

  // Function to clear and reset the timer
  const clearTimer = () => {
    const endTime = getEndTime();
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer(endTime);
    timerRef.current = setInterval(() => startTimer(endTime), 1000);
    setView(!view);
  };

  // Function to get the end time based on user input
  const getEndTime = () => {
    const { hours, minutes, seconds } = inputTime;
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + hours);
    endTime.setMinutes(endTime.getMinutes() + minutes);
    endTime.setSeconds(endTime.getSeconds() + seconds);
    return endTime;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputTime({
      ...inputTime,
      [name]: Math.max(0, parseInt(value) || 0),
    });
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      {!view && <div className="timer-display">{timer}</div>}
      {view && (
        <div>
          <div className="input-container">
            <div className="input-form">
              <input
                type="number"
                name="hours"
                placeholder="Hours"
                value={inputTime.hours}
                onChange={handleInputChange}
                min="0"
              />
              <label className="label-text" htmlFor="hours">
                hours
              </label>
            </div>
            <div className="input-form">
              <input
                type="number"
                name="minutes"
                placeholder="Minutes"
                value={inputTime.minutes}
                onChange={handleInputChange}
                min="0"
              />
              <label className="label-text" htmlFor="minutes">
                min
              </label>
            </div>
            <div className="input-form">
              <input
                type="number"
                name="seconds"
                placeholder="Seconds"
                value={inputTime.seconds}
                onChange={handleInputChange}
                min="0"
              />
              <label className="label-text" htmlFor="seconds">
                s
              </label>
            </div>
          </div>
          <button className="start-button" onClick={clearTimer}>
            Start/Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
