// import close_1 from './../../../../assets/images/table/close_1.svg';
import "../../../../css/ui/popUps/tourneyPlayerRanking.css";

export default function TourneyPlayerRanking(props) {
    return (
        <>
            <div className="popCover_1" onClick={(e) => {
                e.preventDefault();
                props.setAction("hideTplayerAlert");
            }}> </div>
            <div className="popup_1">
                <div className="popup_1_in" style={{ background: "#727473" }}>
                    <div className="head" style={{ borderBottom: '2px solid #e7a226', background: 'linear-gradient(rgb(152, 148, 145), rgb(81 81 80))' }}>
                        <span className="settingsSpan font_22">
                            <div className="sprite" style={{ backgroundPositionY: "-1px" }}></div > {"Message"}
                        </span>
                    </div>
                    {/* <div className="fd p_10">
                        <table className="table_1 text_center">
                            <tbody>
                                <tr>
                                    <td> {props.data.lineOne} </td>
                                </tr>
                                <tr>
                                    <td> {props.data.lineTwo} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                    <div className="fd" style={{ padding: "10px 15px" }}>
                        <span>{props.data.lineOne}</span>
                    </div>
                    <div className="fd" style={{ padding: "10px 15px" }}>
                        <span>{props.data.lineTwo}</span>
                    </div>
                    <div className="fd p_5 m_t_35 m_b_2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: "#1e1e1e30" }}>
                        <button className="btn_2 fd" onClick={(e) => { props.setAction("hideTplayerAlert") }}  >OK </button>
                    </div>
                </div>
            </div>
        </>
    )
}