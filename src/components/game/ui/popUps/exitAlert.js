import React, { useEffect } from "react";
import "../../../../css/ui/popUps/alert.css";
// import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next'
function ExitAlert(props) {
  function exit() {
    props.network.send("<LeaveTable/>");
    props.setAction("hideExitAlert");
  }

  useEffect(() => {
    const updateScale = () => {
      const element = document.querySelector('.popup_1_in');
      if (element) {
        // Get the screen height
        const screenHeight = window.innerHeight;

        // Define minimum and maximum heights for scaling
        const minHeight = 375; // Minimum screen height for scaling
        const maxHeight = 812; // Maximum screen height for scaling

        // Define minimum and maximum scale factors
        const minScale = 0.75; // Minimum scale factor
        const maxScale = 1; // Maximum scale factor

        // Calculate scale factor based on screen height
        let scale = (screenHeight - minHeight) / (maxHeight - minHeight) * (maxScale - minScale) + minScale;

        // Clamp the scale to be within the minScale and maxScale bounds
        scale = Math.max(minScale, Math.min(maxScale, scale));

        // Apply the scale transformation
        element.style.transform = `scale(${scale})`;
        // element.style.transformOrigin = 'top left';
        // Adjust origin if needed
      }
    };

    // Initial call to set scale on mount
    updateScale();

    // Set up event listener for screen size changes
    window.addEventListener('resize', updateScale);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideExitAlert"); }} > </div>
      <div className="popup_1" style={{ transform: 'scale(1)' }}>
        <div className="popup_1_in">
          {/* <div className="head"> {props.t("Message")}
           <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideExitAlert"); }} > <img src={close_1}  alt=""/> </button>
        </div> */}
          <div className="head">
            <span className="settingsSpan">
              <div className="sprite" style={{ backgroundPositionY: "-42px" }}></div> {props.t("Message")}</span>

          </div>
          <div className="fd clr_ff p_15  font_15">
            <div className="fd">Do you really want to leave table ?</div>
          </div>
          {/* <div className="fd">
          <ul className="footUl">
            <li>  
              <button className="btn_1" onClick={()=>{exit()}}>{props.t("Yes")}</button>
            </li>
            <li>
              <button className="btn_1"onClick={(e) => { e.preventDefault(); props.setAction("hideExitAlert"); }}>{props.t("No")}</button>
            </li>
          </ul>
        </div> */}
          <div className="fd p_5 m_t_15" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "#1e1e1e30" }}>
            <button className="btn_2 fd" onClick={() => { exit() }}  >{props.t("Yes")} </button>
            <button className="btn_2 fd" onClick={(e) => { e.preventDefault(); props.setAction("hideExitAlert"); }}  >{props.t("No")} </button>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}
export default withTranslation()(ExitAlert)
