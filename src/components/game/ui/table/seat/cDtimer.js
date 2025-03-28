import "../../../../../css/ui/table/cDtimer.css";
// import gameTB from "../../../../../assets/images/table/game_timebank.png"
import timerIcon from "../../../../../assets/images/table/button_timebank_icon.png"
// import fileName from "../../../../../jsconfig";
// import Screen from "../../../../utils/screen";
export const CountDownTimer = (props) => {
  // const style = {
  //   width: '42px',
  //   height: '42px',
  //   fill: 'none',
  //   strokeWidth: '21px',
  //   stroke: '#000000',
  //   strokeDasharray: '63 63',
  //   strokeDashoffset: `${63 * props.per}`,
  // }

  return (
    <div className="countDownTimer">
      <div id="countdown" className="countdown">
        <img id="countdown-number" className="timerIcon" src={timerIcon} alt="not found" />
        <div id="countdown-number">{props.time}</div>
      </div>
    </div>
  );

}




