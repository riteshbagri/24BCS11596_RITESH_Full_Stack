import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const intervalId = setInterval(() => {
      setTime((current) => current + 10);
    }, 10);

    return () => clearInterval(intervalId);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-app">
      <h1>Stopwatch</h1>
      <div className="display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={() => setRunning(true)} disabled={running}>
          Start
        </button>
        <button onClick={() => setRunning(false)} disabled={!running}>
          Pause
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App
