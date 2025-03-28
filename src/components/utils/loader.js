import React, { useEffect, useState } from "react";
// import logo from "../../assets/images/lobby/RiverLogo.png";
// import { withTranslation } from 'react-i18next';
import "../../css/login/loader.css";
// import river_logo from "../../assets/images/logo/river_logo.png";
import river_logo from "../../assets/images/logo/river_logo.svg";
// import { t } from "i18next";

function Loader() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex === 5 && direction === 1) {
                    setDirection(-1);
                } else if (prevIndex === 0 && direction === -1) {
                    setDirection(1);
                }
                return prevIndex + direction;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [direction]);

    return (
        <div className="logoBoxBg blur-container">
            <div className="overlay">
                <div className="modal">
                    <div className="fd logoBoxLoader loadingPageDiv">
                        <img src={river_logo} className="river_logo_cls" alt="not found" />
                        <div className="loader">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i}
                                    className={`loader-box ${i === currentIndex ? "red" : i === currentIndex + 1 ? "transparent-red" : ""}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};
export default (Loader)
