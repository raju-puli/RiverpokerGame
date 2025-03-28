import React from "react";
import Seat from "./seat";

// TableMain --> Seats  ---> Seat


function Seat(){

    const lastAction = useRef("")    
    const name = useRef("Take Seat")    
    const chips = useRef(0)    
    const profilePic = useRef("");


    function updateSeat(data){
        name.current 
    }

    return<div>
        <div ref={lastAction}>last action</div>
        <div ref={profilePic}>profile pic</div>
        <div ref={chips}></div>
        <div ref={name}></div>
    </div>
}

export default class Seats extends React.Component{
    constructor(){
        this.state = {
            cnt:0
        }

        this.seatRef = [React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef()]
    }
    loadSeats(seatCount){
        this.setState({cnt:seatCount});
    }

    updateSeat(seat,data){
        this.seatRef[seat].current.updateSeat(data)
    }
    render(){
        return(<div>
            {(()=>{
                this.seatsContainer = [];
                for(let i=0;i<this.state.cnt;i++){
                    this.seatsContainer.push(
                        <Seat
                            ref={this.seatRef[i]}
                        ></Seat>
                    )
                }
            })()}
        </div>)
    }
}




// document.getElementById("someId").