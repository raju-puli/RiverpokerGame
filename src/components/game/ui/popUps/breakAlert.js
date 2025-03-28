// import close_1 from './../../../../assets/images/table/close_1.svg';
import "../../../../css/ui/popUps/alert.css";
import Countdown, { zeroPad } from "react-countdown";
// import CountdownTimer1 from '../../../utils/CountdownTimer';
import React, { useEffect } from "react";

export default function BreakAlert(props) {
    // console.log(props.data.timeTwo)
    const renderer = ({ hours, minutes, seconds, completed }) => {
        console.log(minutes, seconds, completed)
        if (completed) {
            return ''
        } else {
            return <span>
                {zeroPad(minutes)}{" m"}:{zeroPad(seconds)}{" s"}
            </span>
        }
    }
    useEffect(() => {
        const updateScale = () => {
            const element = document.querySelector('.addonPopup');
            if (element) {
                // Get the screen height
                const screenHeight = window.innerHeight;

                // Define minimum and maximum heights for scaling
                const minHeight = 375; // Minimum screen height for scaling
                const maxHeight = 812; // Maximum screen height for scaling

                // Define minimum and maximum scale factors
                const minScale = 0.85; // Minimum scale factor
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
        <>
            {/* <div className="popCover_1" style={{ top: "45px" }} onClick={(e) => {
                e.preventDefault();
                props.setAction("hideAlert");
            }} > </div>
            <div className="popup_1">
                <div className="popup_1_in">
                    <div className="head"> Tournament Start
                    </div>
                    <div className="fd p_10 text_center">
                        <div style={{ height: '40px' }}>{props.data.lineOne}</div>
                        <Countdown date={props.data.timeOne + props.data.timeTwo} renderer={renderer} />
                    </div>
                </div>
            </div> */}
            <div className="addonPopup" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "50px" }} >

                <div className="sprite1" style={{ backgroundPositionY: "45px" }}></div >
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {props.checkTableBrekMsg ? <span className='m_r_5'>Starting next level...</span>
                            : <span className='m_r_5'>Seating... Tournament will start in </span>}

                        <Countdown date={props.data.timeOne + props.data.timeTwo} renderer={renderer} />
                    </div>
                </div>
            </div >
        </>
    )
}