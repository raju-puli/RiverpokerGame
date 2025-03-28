
export default function RebuyTournamentAlert(props) {


    return (
        <>
            <div className="popCover_1" onClick={(e) => {
                e.preventDefault();
                props.setAction("hideTournamentAlert");
            }}> </div>
            <div className="popup_1">
                <div className="popup_1_in" style={{ background: "#727473" }}>
                    <div className="head" style={{ borderBottom: '2px solid #e7a226', background: 'linear-gradient(rgb(152, 148, 145), rgb(81 81 80))' }}>
                        <span className="settingsSpan font_22">
                            <div className="sprite" style={{ backgroundPositionY: "81px" }}></div > {"Add Chips"}
                        </span>
                    </div>

                    
                    <div className="fd" style={{ padding: "10px 15px" }}>
                        <span>{props.data.lineOne}</span>
                    </div>
                    
                    <div className="fd p_5 m_t_35 m_b_5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: "#1e1e1e30" }}>
                        
                        <button className="btn_2 fd p_2" onClick={(e) => {props.setAction("hideTournamentAlert"); }}  style={{width:"30%"}}>OK  </button>
                       
                    </div>
                </div>
            </div>
        </>
    )
}
