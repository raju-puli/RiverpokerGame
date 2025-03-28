import React from "react";
import "../../../../../css/ui/lobby/tableDetails/tourneyDetails.css";
import close_1 from './../../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next'
import fileName from "../../../../../jsconfig";
function TourneyDetails(props) {
	const onClickTlobby = (e) => {
		e.preventDefault();
		console.log("open Tourney Lobby clicked ");
		props.setAction("hideTourneyDet")
		if (props.data.id !== undefined) {
			props.network.send(`<OpenTable id="${props.data.id}" type="${props.data.type}"/>`);
		}
	};
	const onClickRegister = (e) => {
		// alert("not defined")
	};

	return (
		<React.Fragment>
			{/* <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideTourneyDet") }}></div> */}
			{/* <div className="popup_1"> */}
			{/* <div className="popup_1_in"> */}
			<div style={{ marginTop: "10px" }}>
				<div className="head df_al_jsb" style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}> {props.t("Tournament Details")}
					{/* <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideTourneyDet") }}>
							<img src={close_1} alt=""/>
						</button> */}
				</div>
				<div className="fd p_10 bdr" style={{ maxHeight: "210px", overflow: "auto" }}>
					<div className="fd ">
						<span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("Name")}: </span>  {props.data.field1}
					</div>
					<div className="fd m_t_10">
						<div className="fd bg_3 rds_5 p_10">
							<span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("Tornament Starts On")}: </span>
							{props.data1.date}
						</div>
					</div>
					<div className="fd m_t_10">
						<table className="table_2" style={{ fontSize: "12px" }}>
							<tbody>
								<tr>
									<td>
										<span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("BuyIn")}: </span> &nbsp; {props.data.buyIn} &nbsp; &nbsp;<br></br>
										<span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("Type")}: </span> &nbsp; {props.data.type} &nbsp; &nbsp;
									</td>
									<td>
										<span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("Status")}: </span> &nbsp; {props.data.status} &nbsp; &nbsp; <br></br>
										<span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("Players")}: </span> &nbsp; {props.data1.players} &nbsp; &nbsp; <br></br>
										{/* <span className={fileName.name === "Leader_bet" ? "clr_ff" : "clr_5"}> {props.t("Prize Pool")}: </span> &nbsp; {props.data.prize} &nbsp; &nbsp; */}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="fd m_t_10">
						<div className="fd clr_5"> {props.t("Description")}: </div>
						<div className="fd dscr_ht m_t_5">
							{props.data.description}
						</div>
					</div>
					{/* <div className="fd m_t_15" style={{display:'flex', alignItems:'center',justifyContent:'end'}}>
							<button id="btn" className="btn_2 fd" onClick={onClickTlobby} style={{width:'100%'}}>
								{props.t("TOURNEY LOBBY")}
							</button>

				
						</div> */}
				</div>
			</div>
			{/* </div>
			</div> */}
		</React.Fragment>
	);
}
export default withTranslation()(TourneyDetails)