import "../../../../css/ui/tLobby/tLobbyMenu.css";
const TourneyLobbyMenu = () => {
  return (
    <div className="tLobbyMenu">
      <div className="dropdown">
        <button className="dropbtn">Cashier</button>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Rules</button>
        <div className="dropdown-content">
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/online-poker/texas-holdem/overview.html","","width:800,height:400")}}>Texas Hold'em</button>
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/help/omaha/overview.html","","width:800,height:400")}}>Omaha</button>
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/help/omaha/overview.html","","width:800,height:400")}}>Omaha 5</button>
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/help/omaha/overview.html","","width:800,height:400")}}>Omaha 6</button>
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/online-poker/texas-holdem/overview.html","","width:800,height:400")}}>RIT</button>
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/online-poker/texas-holdem/overview.html","","width:800,height:400")}}>Tournaments</button>
          <button onClick = {(e)=>{e.preventDefault();window.open("https://www.rivmon2.com/online-poker/texas-holdem/overview.html","","width:800,height:400")}}>Glossary</button>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn"  onClick = {(e)=>{
          e.preventDefault();
          // alert("action not defined");
          window.open("https://www.pokermoguls.com/howtoplay","","width:800,height:400");
          }}>Help</button>
      </div>
      <div className="dropdown">
        <button className="dropbtn" onClick={(e)=>{e.preventDefault();window.close()}}>Exit</button>
      </div>
    </div>
  );
};

export default TourneyLobbyMenu;
