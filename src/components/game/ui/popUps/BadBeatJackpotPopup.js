import React from "react";
import jackpot from '../../../../assets/images/table/jackpot1.png';
import UM from "../../../utils/utilityMethods";

const BadBeatJackpotPopup = ({ data, onClose }) => {
    const { BadBeatJackpotPayout } = data;
    // console.log(BadBeatJackpotPayout)
    const { attr, JackpotWinner } = BadBeatJackpotPayout;

    return (
        <>
            <div className="game_type_filter_cover"
            // onClick={onClose}
            >
                <div className="game_type_filter" style={{ width: '480px', border: '1px solid #696965' }}>
                    <header>
                        <span>
                            <img alt="" /> Bad Beat Jackpot
                        </span>
                    </header>
                    <section className="fd">
                        <img style={{ width: "inherit" }} src={jackpot} alt="jackpot" />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p>has been won at table:</p>
                            <h3 style={{ color: "#98603e" }}>{attr.tableName}</h3>
                            <div className="winners">
                                {JackpotWinner?.map((winner, index) => (
                                    <p key={index}>
                                        {winner.attr.nickname} has won: <span className="amount" style={{ color: "#98603e" }}>{UM.numberWithCommas(winner.attr.jackpotWinAmount)}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="close_div">
                        <button type="button" className="btn_2"
                            onClick={onClose}
                        > close </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BadBeatJackpotPopup;
