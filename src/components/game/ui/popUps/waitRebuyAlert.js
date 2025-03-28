import { useState, useEffect } from 'react';
import "../../../../css/ui/popUps/waitRebuyAlert.css";
// import close_1 from './../../../../assets/images/table/close_1.svg';

export default function WaitRebuyAlert(props) {
  let [time, setTime] = useState(props.data.time / 1000);

  let buyChipsTimer;
  useEffect(() => {
    let isMounted = true;
    let t = time;
    buyChipsTimer = setInterval(() => {
      if (t > 0 && isMounted) {
        t = t - 1;
        setTime(t);
        // console.log("time left to buy:"+t);
      } else {
        isMounted = false;
        clearInterval(buyChipsTimer);
        props.setAction("hideReBuyChips");
        console.log("time out to buy chips");
      }
    }, 1000);
    return () => {
      isMounted = false;
      clearInterval(buyChipsTimer)
      // props.setAction("hideReBuyChips")
    }

  }, [time]);
  return (
    <>
      <div className="popCover_1" style={{ top: "45px" }} onClick={(e) => {
        e.preventDefault();
        props.setAction("hideAlert");
      }} > </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head"> Waiting For Rebuy
            {/* <button className="close_1" onClick={(e) => {
              e.preventDefault();
              props.setAction("hideReBuyChipsAlert");
            }}> <img src={close_1} alt='' />  </button> */}
          </div>
          <div className="fd p_10 text_center">
            Waiting For other Player/Players to Rebuy

          </div>
          <div className="fd p_lr_10 p_tb_10 text_center clr_4 bg_3 bblr">
            Time Left:&nbsp;<span style={{ color: "red" }}>{time}</span>&nbsp;sec
          </div>
        </div>
      </div>
    </>
  );
}
