import React, { useEffect, useState, useMemo, useCallback } from "react";
import "../../../css/ui/lobby/tableDetails/tablePreview.css";
import table from "../../../assets/images/tableandcarpet/bg_table.png";
import UM from "../../utils/utilityMethods";
import MinitableSeatPositions from "../../utils/MinitableSeatPositions";
import MinitableSeatAvatarPositions from "../../utils/MinitableSeatAvatarPositions";
// import star from "./../../../../assets/images/lobby/star.png";
// import star from "./../../../assets/images/lobby/star.png";

export default function TablePreview({ cashTableData, user }) {
	// const styleSeat_vacant = {
	// 	border: "2px solid #dbdbdd",
	// 	borderRadius: "3px",
	// };

	const styleSeat_ = {
		backgroundImage: localStorage.getItem(`profileBackground_${user}`),
		WebkitBackgroundClip: "text",
		color: "transparent",
		textShadow: "0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)",
		fontWeight: 600,
		// WebkitTextStroke: ".1px white",
	};

	// const styleSeat_taken = {
	// 	border: "2px solid #ffe555",
	// 	borderRadius: "3px",
	// };

	const [tableSeats, setTableSeats] = useState(cashTableData.seats || []);

	useEffect(() => {
		setTableSeats((prevSeats) =>
			prevSeats !== cashTableData.seats ? cashTableData.seats : prevSeats
		);
	}, [cashTableData.seats]);

	const Seat = useCallback(
		({ position, seatState, name, chips }) => (
			<div style={position}>
				{(name === "Take Seat" || name === "Open Seat") ?
					<div className="take-seat-background-style">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(0, 0, 0, 0.6)"><path d="M160-120v-80h640v80H160Zm320-160L280-480l56-56 104 104v-408h80v408l104-104 56 56-200 200Z" /></svg>
					</div> :
					<div style={seatState}>
						<div className="tablePreviewSeat">
							{/* <span style={{ color: name === user ? "red" : "" }}>{name}</span> */}
							{/* <span className={name === user ? "text_Highlight" : ""}>{name}</span> */}
							{/* <span className={name === user ? "text_Highlight" : ""}>{name}</span> */}
							<span style={name === user ? styleSeat_ : {}}>{name}</span>

							<span>
								{/* <div className="">
									<img src={star} alt="" />
									<img src={star} alt="" />
									<img src={star} alt="" />
									<img src={star} alt="" />
									<img src={star} alt="" />
								</div> */}
							</span>
							<span>{UM.changeAmtLabel(chips)}</span>
							{/* <span>{UM.numberWithCommas(123456)}</span> */}
						</div>
					</div>
				}
			</div>
		),
		[user]
	);

	const renderedSeats = useMemo(() => {
		return tableSeats?.length
			? tableSeats.map((seat, i) => (
				<Seat
					key={i}
					// seatState={seat.taken === 0 ? styleSeat_vacant : styleSeat_taken}
					position={MinitableSeatPositions[tableSeats.length]?.[i]}
					avtrPosition={MinitableSeatAvatarPositions[tableSeats.length]?.[i]}
					name={seat.player}
					chips={seat.chips}
				/>
			))
			: null;
	}, [tableSeats]);

	return (
		<div className="preview-table-container">
			<img className="preview-table" src={table} alt="" />
			<div className="tablePreviewSeatsContainer">{renderedSeats}</div>
		</div>
	);
}
