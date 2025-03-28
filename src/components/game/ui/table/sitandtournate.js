import React, { useImperativeHandle, useState, useEffect, forwardRef } from "react";

export const Breaktime = forwardRef(({ setCondition, onBreakEnd }, ref) => {
  const [time, setTime] = useState(0);

  useImperativeHandle(ref, () => ({
    childMethod(e) {
      setTime(Number(e));
    }
  }));

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            onBreakEnd?.(); // Notify parent when time reaches 0
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, onBreakEnd]);

  return (
    <div className="head breakTimePopup" style={{ position: 'fixed', left: "30%", top: "calc(50% - 45px)", width: "40%", visibility: setCondition ? "hidden" : "visible" }}>
      <div className="settingsSpan sprite1_child">
        <div className="sprite1" style={{ backgroundPositionY: "47px" }}></div>
        <p style={{ zIndex: "1" }}>
          {time > 0
            ? `Break... Next level will start in: ${String(Math.floor(time / 60)).padStart(2, '0')}m : ${String(time % 60).padStart(2, '0')}s`
            : "Starting next level..."}
        </p>
      </div>
    </div>
  );
});
