// import closeIcon from '../../../../assets/images/lobby/close_icon.svg';
import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next';

import "../../../../css/ui/popUps/detailedStatistics.css";
import "../../../../css/media_queries/allpagesMedia.css";

function DetailedStatistics(props) {
    return (
        <>
            <div className="popCover_1" style={{ background: 'none' }} onClick={(e) => { e.preventDefault(); props.action() }}>  </div>
            <div className="popup_1">
                <div className="popup_1_in" style={{ minHeight: '170px' }}>
                    <div className="head">
                        <span className="settingsSpan">
                            <span className="headerIconSpan emoji">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                                    <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                                </svg>
                            </span> Detailed Statistics
                        </span>
                        <button className="close_1" onClick={(e) => { e.preventDefault(); props.action() }}> <img src={close_1} alt="" />   </button>
                    </div>
                    <div className="datePanel fd p_t_5 p_b_5">Session Started At :  <span style={{ color: '#ffe555' }}>{props.data.time}</span></div>
                    <div className="statsPanel fd">
                        <div className="leftPan">
                            <table className="table_3">
                                <tbody>
                                    <tr>
                                        <td>{props.t("Hands Played")}</td> <td>{props.data.played} </td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Hands Won")}: </td><td>{props.data.won}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Buy-In")}: </td> <td>{props.data.buyIn}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Wins")}: </td> <td>{props.data.wins}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Bets")}: </td> <td> {props.data.bets}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Win-Bets")}: </td> <td>{props.data.winBets}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="rightPan">
                            <table className="table_3">
                                <tbody>
                                    <tr>
                                        <td>{props.t("Won/Saw")}: </td><td>{props.data.wonSaw}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Pre Flop")}: </td><td>{props.data.preFlop}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Flop")}Flop: </td><td>{props.data.flop}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Turn")}: </td><td>{props.data.turn}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("River")}: </td><td>{props.data.river}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("Show Down")}: </td><td>{props.data.showDown}</td>
                                    </tr>
                                    <tr>
                                        <td>{props.t("All In")}: </td><td>{props.data.allIn}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default withTranslation()(DetailedStatistics)