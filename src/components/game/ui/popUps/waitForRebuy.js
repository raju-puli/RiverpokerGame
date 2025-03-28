
import { React, useState, useEffect } from "react";

import "../../../../css/ui/popUps/waitForRebuy.css"
import close_1 from './../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next';
function WaitForRebuy(props) {
  let [time, setTime] = useState(props.data.time / 1000);
  let [chips, setChips] = useState(props.data.chips);
  let [cost, setCost] = useState(props.data.cost);
  let buyChipsTimer;
  useEffect(() => {
    let isMounted = true;
    let t = time;
    buyChipsTimer = setInterval(() => {
      if (t > 0 && isMounted) {
        t = t - 1;
        setTime(t);
        // console.log("time left to buy:"+t);
      } else {
        isMounted = false;
        clearInterval(buyChipsTimer);
        props.setAction("hideReBuyChips");
        console.log("time out to buy chips");
      }
    }, 1000);
    return () => {
      isMounted = false;
      clearInterval(buyChipsTimer)
      // props.setAction("hideReBuyChips")
    }

  }, [time]);

  useEffect(() => {
    setChips(props.data.chips)
    setCost(props.data.cost)
  });

  return (
    <>
      <div className="popCover_1" style={{ top: "45px" }} onClick={(e) => {
        e.preventDefault();
        props.setAction("hideAlert");
      }} > </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head"> {props.t("Add Chips")}
            <button className="close_1" onClick={(e) => {
              e.preventDefault();
              props.setAction("hideReBuyChips");
            }}> <img src={close_1} alt="" />  </button>
          </div>
          <div className="fd p_10">
            <div className="lableOne">
              {props.t("You Have Lost All The Chips")} <br></br>
              {props.t("Do You Want To Buy")} <span style={{ color: 'red' }}>{Number(chips).toLocaleString("en-US")}</span> {props.t("Chips At The Price Of")} <span style={{ color: 'red' }}>{Number(cost).toLocaleString("en-US")}</span>
            </div>
          </div>
          <div className="fd p_lr_10 p_t_10">
            <table className="table_1 noBdr">
              <tbody>
                <tr>
                  <td> {props.t("Your current balance")}: </td>
                  <td> 0 </td>
                </tr>
                <tr>
                  <td> {props.t("Rebuys Available")}: </td>
                  <td> {Number(props.data.count).toLocaleString("en-US")} </td>
                </tr>
                <tr>
                  <td> {props.t("ReBuy")} <span style={{ color: 'red' }}>{Number(chips).toLocaleString("en-US")}</span> {props.t("Chips Per")} <span style={{ color: 'red' }}>{Number(cost).toLocaleString("en-US")}</span> </td>
                  <td> <button className="btn_1" onClick={(e) => {
                    e.preventDefault();
                    props.network.send('<ReBuy/>');
                    if (buyChipsTimer !== undefined) {
                      clearInterval(buyChipsTimer);
                    }
                    props.setAction("hideReBuyChips");

                  }}>{props.t("Rebuy")}</button> </td>
                </tr>
                <tr>
                  <td> {props.t("Double ReBuy")} <span style={{ color: 'red' }}>{Number(2 * Number(chips)).toLocaleString("en-US")}</span> {props.t("Chips Per")} <span style={{ color: 'red' }}>{Number(2 * Number(cost)).toLocaleString("en-US")}</span> </td>
                  <td> <button className="btn_1" onClick={(e) => {
                    e.preventDefault();
                    props.network.send('<ReBuy number="2" />');
                    // props.network.send('<ReBuy/>');
                    if (buyChipsTimer !== undefined) {
                      clearInterval(buyChipsTimer);
                    }
                    props.setAction("hideReBuyChips");

                  }}>{props.t("2XRebuy")}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className = "dataContainer">
        <div className = "line">Your Current Balance: <div className = "alignThemRight">0</div></div>
        <div className = "line">Rebuys Available:<div className = "alignThemRight">{props.data.count}</div> </div>
        <div className = "line">ReBuy <span style={{color:'red'}}>{props.data.chips}</span> Chips Per <span style={{color:'red'}}>{props.data.cost}</span>
         <div className = "alignThemRight"><button onClick = {(e)=>{
            e.preventDefault();
            props.network.send('<ReBuy/>');
            if(buyChipsTimer !== undefined){
              clearInterval(buyChipsTimer);
            }
            props.setAction("hideReBuyChips");

        }}>Rebuy</button></div></div>
        <div className = "line">Double ReBuy <span style={{color:'red'}}>{2*props.data.chips}</span> Chips Per <span style={{color:'red'}}>{2*props.data.cost}</span> 
        <div className = "alignThemRight"><button onClick={(e)=>{
            e.preventDefault();
            props.network.send('<ReBuy number="2" />'); 
            if(buyChipsTimer !== undefined){
              clearInterval(buyChipsTimer);
            }
            props.setAction("hideReBuyChips");

        }}>2XRebuy</button></div></div>
        
        </div> */}
          <div className="fd p_lr_10 p_tb_10 text_center clr_4 bg_3">
            {props.t("Time Left")}:&nbsp;<span style={{ color: 'red' }}>{time}</span>&nbsp;{props.t("sec")}
          </div>
        </div>
      </div>
    </>
  )
}
export default withTranslation()(WaitForRebuy);
// <div>Your Current Balance: <span style={{marginLeft:'128px'}}>454545</span></div>
// <div>Rebuys Available:<span style={{marginLeft:'159px'}}>454545</span> </div>
// <div>ReBuy <span style={{color:'red'}}>454545</span> Chips Per <span style={{color:'red'}}>454545</span> <span style={{marginLeft:'61px'}}><button>Rebuy</button></span></div>
// <div>Double ReBuy <span style={{color:'red'}}>454545</span> Chips Per <span style={{color:'red'}}>454545</span> <span style={{marginLeft:'10px'}}><button>2XRebuy</button></span></div>