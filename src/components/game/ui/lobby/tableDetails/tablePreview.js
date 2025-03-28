import { useEffect, useState } from "react";
// import "../../../../../css/ui/lobby/tableDetails/tablePreview.css";
import '../../../../../css/ui/lobby/tableDetails/tablePreview.css';
import UM from "../../../../utils/utilityMethods";

export default function TablePreview(props) {
	const seatPostion = {
		2: [
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "40%",
			}, {
				position: "absolute",
				left: "calc(12% - 35px)",
				top: "40%",
			}],
		4: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
		5: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
		6: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(12% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
		7: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "30%",
			},
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "50%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(12% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
		8: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(80% - 35px)",
				top: "25%",
			},
			{
				position: "absolute",
				left: "calc(80% - 35px)",
				top: "55%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(17% - 35px)",
				top: "55%",
			},
			{
				position: "absolute",
				left: "calc(17% - 35px)",
				top: "25%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
		9: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(80% - 35px)",
				top: "25%",
			},
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(80% - 35px)",
				top: "55%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(17% - 35px)",
				top: "55%",
			},

			{
				position: "absolute",
				left: "calc(17% - 35px)",
				top: "25%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
		10: [
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "10%",
			},
			{
				position: "absolute",
				left: "calc(80% - 35px)",
				top: "25%",
			},
			{
				position: "absolute",
				left: "calc(85% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(80% - 35px)",
				top: "55%",
			},
			{
				position: "absolute",
				left: "calc(65% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "70%",
			},
			{
				position: "absolute",
				left: "calc(17% - 35px)",
				top: "55%",
			},
			{
				position: "absolute",
				left: "calc(12% - 35px)",
				top: "40%",
			},
			{
				position: "absolute",
				left: "calc(17% - 35px)",
				top: "25%",
			},
			{
				position: "absolute",
				left: "calc(32% - 35px)",
				top: "10%",
			},
		],
	};

	const styleSeat_vacant = {
		border: "2px solid #dbdbdd",
		borderRadius: "3px",
	};
	const styleSeat_taken = {
		border: "2px solid #ffe555",
		borderRadius: "3px",
	};



	const Seat = (data) => {
		return (
			<div style={data.position}>
				<div style={data.seatState}>
					<div className="tablePreviewSeat">
						<div className="nameField">{data.name}</div>
						{/* <div className="chipsField">{data.chips}</div> */}
						{/* <div className="chipsField">{UM.numberWithCommas(data.chips)}</div> */}
						<div className="chipsField">{UM.numberWithCommas(123456546)}</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="tableDetailsPreview">
			<div className="tablePreviewCarpet"></div>
			<div className="tablePreviewTable"></div>
			<div className="tablePreviewSeatsContainer">
				{(() => {
					let i = 0,
						cnt = props.seats.length,
						seats = [];
					for (i; i < cnt; i++) {
						if (props.seats[i].taken === undefined) {
							return;
						}
						seats.push(<Seat key={i} seatState={(props.seats[i].taken === 0) ? styleSeat_vacant : styleSeat_taken}
							position={seatPostion[cnt][i]} name={props.seats[i].player} chips={props.seats[i].chips}></Seat>);
					}
					return seats;
				})()}
			</div>
		</div>
	);
}
