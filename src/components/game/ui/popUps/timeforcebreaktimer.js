import React, { useImperativeHandle, useState, useEffect } from "react";
export const CountdownForce = React.forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  useImperativeHandle(ref, () => ({
    childMethod(e) {
      childMethod(e)
      // setTime(Number(e))
    }
  }))

  function childMethod(e) {
    console.log('call me')
    console.log(e)
    // alert("call me-->>>>"+e)


    setTime(Number(e))
  }
  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);

          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="fd">
      <p style={{
        width: "60px", height: "25px", color: "#FF0000", position: "absolute", top: "55px", right: "10px",
        zIndex: "9", background: "#323232", border: "2px solid #FF0000", fontSize: "17px", display: "flex",
        alignItems: "center", padding: "4px", borderRadius: "9px"
      }}>
        {`${Math.floor(time / 60)}`.padStart(2, 0)} :
        {`${time % 60}`.padStart(2, 0)}
      </p>
    </div>
  )
})

