import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [prevTime, setPrevTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
  
    useEffect(() => {
      let interval;
      if (isRunning) {
        interval = setInterval(() => {
          setTime(prevTime + new Date().getTime() - startTime);
        }, 10);
      }
      return () => clearInterval(interval);
    });

    useEffect(() => {
      const handleKeyPress = (event) => {
          if (event.key === "q") {
              isRunning ? handleStop() : handleStart();
          }
          else if (event.key === "w") {
              handleReset();
          } else if (isRunning && event.key === "e") {
              handleLap();
          }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {window.removeEventListener('keydown', handleKeyPress);};
    });
  
    const handleStart = () => {
        if (time > 0) {
            setPrevTime(time);
        }
        else {
            setPrevTime(0);
        }
        setIsRunning(true);
        setStartTime(new Date().getTime());
    };
  
    const handleStop = () => {
        setIsRunning(false);
        setStartTime(0);
    };
  
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        if (isRunning) {
            setIsRunning(false);
        }
        setStartTime(0);
        setPrevTime(0);
    };
  
    const handleLap = () => {
        setLaps([time, ...laps]);
    };
  
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const centiseconds = Math.floor(ms % 1000 / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <div style={{border: "2px solid black", maxWidth: "300px", height:"350px"}}>
        <div>
          <h2>{formatTime(time)}</h2>
        </div>
        <button className='button-css' onClick={isRunning ? handleStop : handleStart}>{isRunning ? "Stop" : "Start"} Q</button>
        <button className='button-css' onClick={handleReset}>Reset W</button>
        <button className='button-css' onClick={handleLap} disabled={!isRunning}><div>Lap</div><div>E</div></button>
        <li style={{ listStyleType: "none"}}>
          {laps.slice(0,3).map((lap, index) => (
            <li key={index}><pre>{"Lap " + (laps.length - index) + "\t" + formatTime(lap - (laps[index + 1] || 0))}</pre></li>
          ))}
        </li>
      </div>
    );
  }
  
  export default Stopwatch;