import React from "react";
import "../../../css/ui/tLobby/tourneyLobby.css";
import TourneyLobbyMain from "./tourneyLobbyMain";

// export default class TourneyLobby extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("the props from Table are");
//     console.log(this.props);
//     let tourney_id = this.getTourneyId();
//     let sessionData = JSON.parse(sessionStorage.getItem(tourney_id));

// 		// let sid = sessionStorage.getItem(tourney_id);
//     let sid = sessionData.sid;
//     let tableId = sessionData.tableId;

//     this.state = {
//       tourneyId:tourney_id,
//       sid:sid,
//       tableId:tableId
//     }

//   }
//   getTourneyId(){
// 		let name = window.name;
//             console.log('window name displayed from Table');
//             console.log(name);
//             console.log(typeof(name));
//             let nameArray = name.split('=');
// 			console.log(nameArray);
// 			return nameArray[1];
// 	}
//       render() {
//     return (
//       <div className = "tourneyLobby">
//           <TourneyLobbyMain data = {this.state}></TourneyLobbyMain>
//       </div>
//     );
//   }
// }
