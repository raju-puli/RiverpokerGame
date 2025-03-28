
export default function TournamentRebuy(props) {


    return (
        <>
            <div className="popCover_1" onClick={(e) => {
                e.preventDefault();
                props.setAction("hideTournamentRebuy");
            }}> </div>
            <div className="popup_1">
                <div className="popup_1_in" style={{ background: "#727473" }}>
                    <div className="head" style={{ borderBottom: '2px solid #e7a226', background: 'linear-gradient(rgb(152, 148, 145), rgb(81 81 80))' }}>
                        <span className="settingsSpan font_22">
                            <div className="sprite" style={{ backgroundPositionY: "81px" }}></div > {"Add Chips"}
                        </span>
                    </div>

                    <div className="fd" style={{ padding: "10px 15px" }}>
                        <span>Rebuy available :</span> <span>{props.data.count}</span>
                    </div>
                    <div className="fd" style={{ padding: "10px 15px" }}>
                        <span>Rebuy cost :</span> <span>{props.data.cost + "+" + props.data.fee}</span>
                    </div>
                    <div className="fd" style={{ padding: "10px 15px" }}>
                        <span>Chips per Rebuy :</span> <span>{props.data.chips}</span>
                    </div>
                    <div className="fd p_5 m_t_35 m_b_5" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: "#1e1e1e30" }}>
                        <button className="btn_2 fd p_2" onClick={(e) => {  props.network.send('<ReBuy/>');props.setAction("hideTournamentRebuy")  }}  style={{width:"30%"}}>OK </button>
                        {props.data.Rebuybtn&&<button className="btn_2 fd p_2" onClick={(e) => { props.network.send('<ReBuy number="2" />');props.setAction("hideTournamentRebuy") }}  style={{width:"30%"}}>2XRebuy  </button>}
                        <button className="btn_2 fd p_2" onClick={(e) => { props.setAction("hideTournamentRebuy") }}  style={{width:"30%"}}>Close </button>
                    </div>
                </div>
            </div>
        </>
    )
}
