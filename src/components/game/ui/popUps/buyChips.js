
import React from "react";
import "../../../../css/ui/popUps/buyChips.css";
import { useEffect, useState } from "react";
import close_1 from './../../../../assets/images/table/close_1.svg';
import dollar from './../../../../assets/images/table/dollar.svg';
import { withTranslation } from 'react-i18next';
import fileName from "../../../../jsconfig";
import Screen from "../../../utils/screen";

import UM from "../../../utils/utilityMethods";

function BuyChips(props) {

  const [min, setMin] = useState(props.data.min);
  const [max, setMax] = useState(props.data.max);
  const [newAvlBal, setNewAvlBal] = useState(props.data.newAvlBal);
  const [newMinBal, setNewMinBal] = useState(props.data.newMinBal);
  const [newMaxBal, setNewMaxBal] = useState(props.data.newMaxBal);
  const [time, setTime] = useState(Math.floor(props.data.time - 1));
  const [btnState, setbtnState] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorMsgText, setErrorMsgText] = useState("");
  const [pausTheTime, setPausTheTime] = useState(true);
  const [amount, setAmount] = useState(min);
  const [inputValues, setInputValues] = useState({
    cash: 0,
    bonus: 0,
  });

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      setMin(props.data.min);
      setNewAvlBal(props.data.newAvlBal);
      setNewMinBal(props.data.newMinBal);
      setNewMaxBal(props.data.newMaxBal);
      setMax(props.data.max);
      setAmount(props.data.min);
      setTime(Math.floor(props.data.time - 1));
    }

    if ((Number(min) > Number(newAvlBal))) {
      props.network.send(`<GetMoneyExchangeInfo wallet=${props.usdTable ? "'USD'" : "'CHP'"}  />`);
    }

    return () => {
      isSubscribed = false;
    };
  }, [props.data]);

  const [exchangeBtnState, setExchangeBtnState] = useState(false);

  useEffect(() => {
    const { Balance, CurrencyRates, attr } = props.onMoneyExchangeInfo || {};
    if (!Balance || !CurrencyRates || !attr) return;

    const exchangeRate = Number(CurrencyRates.CurrencyRate?.attr?.rate);
    const cashBalance = Number(Balance.attr?.cash);
    if (!exchangeRate || !cashBalance) return;

    let convertedBalance = attr.wallet === "USD"
      ? cashBalance * exchangeRate
      : cashBalance / exchangeRate;

    const total = convertedBalance + Number(newAvlBal);
    setExchangeBtnState(total <= min);
  }, [props.onMoneyExchangeInfo]);


  // useEffect(() => {
  //   if (Object.values(props.onMoneyExchangeInfo).length) {
  //     console.log(props.onMoneyExchangeInfo)
  //     const { Balance, CurrencyRates, ...rest } = props.onMoneyExchangeInfo;
  //     if (rest.attr.wallet === "USD") {
  //       const USD = Number(Balance.attr.cash) * Number(CurrencyRates.CurrencyRate.attr.rate)
  //       console.log(USD)
  //       const total = (Number(USD) + Number(newAvlBal));
  //       console.log(total);
  //       if (total > min) {
  //         setExchangeBtnState(false);
  //       } else {
  //         setExchangeBtnState(true);
  //       }
  //     } else if (rest.attr.wallet === "CHP") {
  //       const CHP = Number(Balance.attr.cash) / Number(CurrencyRates.CurrencyRate.attr.rate);

  //       const total = (Number(CHP) + Number(newAvlBal));
  //       console.log(total);
  //       if (total > min) {
  //         setExchangeBtnState(false);
  //       } else {
  //         setExchangeBtnState(true);
  //       }
  //     }
  //   }
  // }, [props.onMoneyExchangeInfo])


  useEffect(() => {
    const updateScale = () => {
      const element = document.querySelector('.popup_1_in');
      if (element) {
        const screenHeight = window.innerHeight;
        const minHeight = 375;
        const maxHeight = 812;
        const minScale = 0.85;
        const maxScale = 1;

        let scale = (screenHeight - minHeight) / (maxHeight - minHeight) * (maxScale - minScale) + minScale;

        scale = Math.max(minScale, Math.min(maxScale, scale));

        element.style.transform = `scale(${scale})`;
      }
    };

    updateScale();

    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const [header, setHeader] = useState(`Add Chips - ${props.usdTable ? "USD" : "CHP"}`);

  var buyChipsTimer;
  useEffect(() => {

    if (Number(newAvlBal) < Number(props.data.min)) {
      setbtnState(true)
      setErrorMsg(true)
      if (header === `Add Chips - ${props.usdTable ? "USD" : "CHP"}`) {
        setErrorMsgText(`You don't have enough money in ${props.usdTable ? "USD" : "CHP"} wallet. You can exchange money from other wallet.`);
      }
      if (props.onMoneyExchangeInfo.hasOwnProperty("attr")) {
        setNewAvlBal(props.onMoneyExchangeInfo.attr.cash);
      }
    } else {
      setErrorMsgText("");
      setErrorMsg(false);
      setbtnState(false);
    }

  }, [props]);

  useEffect(() => {
    if (props.data.runTimer && pausTheTime) {
      let t = Math.floor(Number(time));
      buyChipsTimer = setInterval(() => {
        if (t > 0) {
          t = t - 1;
          setTime(t);
        } else {
          clearInterval(buyChipsTimer);
          props.setAction("hideBuyChips");
        }
      }, 1000);
    }

    return () => {
      clearInterval(buyChipsTimer);
    };
  }, [time])

  const onClickClose = () => {
    props.network.send(`<CancelBuyChips />`);
    props.setAction("hideBuyChips");
  }

  const onClickBuy = () => {
    if (Number(props.data.max) < Number(props.data.min)) {
      setErrorMsg(true);
      setErrorMsgText("balance is low")
    } else {
      setErrorMsg(false);
      setErrorMsgText("");
      if (amount === 0) {
        setErrorMsg(true)
        setErrorMsgText("Minimum buy 1 chip")
      }
      else if (Number(props.data.min) > Number(amount)) {
        setErrorMsg(true);
        setErrorMsgText(`please check minimun buyin ${Number(props.data.min)}`);
      } else {
        setErrorMsg(false)
        setErrorMsgText("")
        if (Number(props.data.min) <= Number(amount)) {
          props.network.send(`<BuyChips amount="${amount}"/>`);
          props.setAction("hideBuyChips");
        }
      }
    }
  };


  const onClickExchange = () => {
    setErrorMsgText("");

    if (header === `Add Chips - ${props.usdTable ? "USD" : "CHP"}`) {
      setHeader("Currency Exchange");
      props.network.send(`<GetMoneyExchangeInfo wallet=${props.usdTable ? "'USD'" : "'CHP'"}  />`);
      setPausTheTime(false);
      clearInterval(buyChipsTimer);
      setTimeout(() => {
        props.network.send(`<CancelBuyChips />`);
      }, 100);
    } else {
      // onClickCancel()

      // props.isGetingResponse("ExchangeMoney");

      if (Number(inputValues['cash']) > 0) {
        props.network.send(`<ExchangeMoney wallet=${props.usdTable ? "'USD'" : "'CHP'"}><Sources><ExchangeSource wallet=${!props.usdTable ? "'USD'" : "'CHP'"} cash="${inputValues['cash']}" /></Sources></ExchangeMoney>`);
      }
      if (Number(inputValues['bonus']) > 0) {
        setTimeout(() => {
          props.network.send(`<ExchangeMoney wallet=${props.usdTable ? "'USD'" : "'CHP'"}><Sources><ExchangeSource wallet=${!props.usdTable ? "'USD'" : "'CHP'"} bonus="${inputValues['bonus']}" /></Sources></ExchangeMoney>`);
        }, 100);
      }
      setNewAvlBal((Number(props.onMoneyExchangeInfo.attr.cash) + (Number(inputValues['cash']) + (Number(inputValues['bonus'])))))
      // props.network.send(`<CancelBuyChips />`);
      setPausTheTime(true);
      console.log(props.onMoneyExchangeInfo.attr.cash)
      if (Number(props.data.min) <= (Number(props.onMoneyExchangeInfo.attr.cash) + (Number(inputValues['cash']) + (Number(inputValues['bonus']))))) {
        setTimeout(() => {
          props.onGetTakeSeat("", props.data.time > 0 ? "take_seat" : "rebuy_chips");
        }, 1000);
      }
      inputValues['cash'] = 0;
      inputValues['bonus'] = 0;
      setHeader(`Add Chips - ${props.usdTable ? "USD" : "CHP"}`);
    }
  }


  const onClickCancel = () => {
    props.network.send(`<CancelBuyChips />`)
    props.setAction("hideBuyChips1");
  };


  const onTestSlider = (e) => {
    const value = parseFloat(e.target.value).toFixed(2);
    updateGradient(value);
  };

  const updateGradient = (data) => {
    const rangeInput = document.getElementById('myRange1');
    const minValue = parseFloat(rangeInput.min).toFixed(2);
    const maxValue = parseFloat(rangeInput.max).toFixed(2);
    const currentValue = parseFloat(data).toFixed(2);
    const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

    let gradient = `linear-gradient(to right, #c38f03 0%, #c38f03 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
    rangeInput.style.background = gradient;
    setAmount(parseFloat(currentValue));
  };

  const [inputFocus, setInputFocus] = useState({ cash: false, bonus: false });

  const handleInputChange = (e, attrKey) => {
    const newValue = Number(e.target.value);
    const { usdTable, onMoneyExchangeInfo } = props;
    const { cash, bonus } = onMoneyExchangeInfo.Balance.attr;
    const chpToUsdRate = onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate;
    const usdToChpRate = 1 / chpToUsdRate;

    const totalAmountCash = usdTable ? cash * chpToUsdRate : cash * usdToChpRate;
    const totalAmountBonus = usdTable ? bonus * chpToUsdRate : bonus * usdToChpRate;

    const updateState = (amount, totalAmount, currency) => {
      if (newValue <= totalAmount) {
        setErrorMsgText("");
        setInputValues(prevState => ({
          ...prevState,
          [attrKey]: e.target.value
        }));
      } else {
        setErrorMsgText(`You can convert a maximum of ${UM.numberWithCommas(totalAmount.toFixed(2))} ${currency} only.`);
      }
    };

    if (attrKey === "cash") {
      updateState(newValue, totalAmountCash, usdTable ? "USD" : "CHP");
    } else if (attrKey === "bonus") {
      updateState(newValue, totalAmountBonus, usdTable ? "USD" : "CHP");
    }
  };

  const handleInputFocus = (attrKey) => {
    setInputFocus(prevState => ({
      ...prevState,
      [attrKey]: true
    }));
  };

  const handleInputBlur = (attrKey) => {
    setInputFocus(prevState => ({
      ...prevState,
      [attrKey]: false
    }));

    if (inputValues[attrKey] === "" || inputValues[attrKey] === undefined) {
      setInputValues(prevState => ({
        ...prevState,
        [attrKey]: 0
      }));
    }
  };



  return (
    <React.Fragment>
      {header !== `Add Chips - ${props.usdTable ? "USD" : "CHP"}` ?
        <div className="popCover_1" >  </div> :
        <div className="popCover_1" onClick={onClickCancel}>  </div>
      }

      {(Number(min) > Number(newAvlBal)) ?

        <div className="popup_1" style={{ maxWidth: 'fit-content' }}>
          <div className="popup_1_in" style={{ minHeight: '170px' }}>
            <div className="head">
              <span className="settingsSpan">
                <img src={dollar} alt="" style={{ display: fileName.name === "Leader_bet" ? 'none' : 'block' }} /> {header}</span>
              <button className="close_1" onClick={onClickCancel}> <img src={close_1} alt="" />  </button>
            </div>
            {errorMsg && (
              <div className="errorMsgDiv">
                {/*  */}
                <span>{exchangeBtnState ? `Insufficient ${props.usdTable ? "USD" : "CHP"} balance for exchange..!` : errorMsgText} </span>
              </div>
            )}
            {header !== `Add Chips - ${props.usdTable ? "USD" : "CHP"}` ?

              <div className="fd exChangeDiv">
                <p>Exchange funds to {props.usdTable ? "USD" : "CHP"}</p>
                {props.onMoneyExchangeInfo && props.onMoneyExchangeInfo.hasOwnProperty("attr") && (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th>Wallet</th>
                          <th>Available</th>
                          <th>Rate</th>
                          {/* <th>Amount to Receive in {props.usdTable ? "USD" : "CHP"}</th> */}
                          {/* <th>{props.usdTable ? "USD" : "CHP"}</th> */}
                          <th>Chips</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{props.usdTable ? "CHP" : "USD"} Cash</td>
                          <td>{UM.numberWithCommas(props.onMoneyExchangeInfo.Balance.attr.cash)}</td>
                          {props?.onMoneyExchangeInfo?.CurrencyRates?.CurrencyRate?.attr?.rate >= 1 ?
                            <td>{UM.numberWithCommas(props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate)}</td> :
                            <td>{props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate}</td>
                          }
                          <td>
                            <span>
                              <input type="number"
                                value={
                                  inputFocus.cash && inputValues['cash'] === 0 ? "" : inputValues['cash']
                                }
                                onChange={(e) => handleInputChange(e, 'cash')}
                                onFocus={() => handleInputFocus('cash')}
                                onBlur={() => handleInputBlur('cash')}
                              />
                            </span>
                            <span>
                              {!props.usdTable ? "CHP" : "USD"} (
                              {props.usdTable
                                ? UM.numberWithCommas((inputValues['cash'] / props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate).toFixed(2))
                                : UM.numberWithCommas((inputValues['cash'] * props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate).toFixed(2))
                              })
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>{props.usdTable ? "CHP" : "USD"} Bonus</td>
                          <td>{UM.numberWithCommas(props.onMoneyExchangeInfo.Balance.attr.bonus)}</td>
                          <td>{UM.numberWithCommas(props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate)}</td>
                          <td>
                            <span>
                              <input
                                type="number"
                                id="inputBonus"
                                value={
                                  inputFocus.bonus && inputValues['bonus'] === 0 ? "" : inputValues['bonus']
                                }
                                onChange={(e) => handleInputChange(e, 'bonus')}
                                onFocus={() => handleInputFocus('bonus')}
                                onBlur={() => handleInputBlur('bonus')}
                              />
                            </span>
                            <span>
                              {!props.usdTable ? "CHP" : "USD"} (
                              {props.usdTable
                                ? UM.numberWithCommas((inputValues['bonus'] / props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate).toFixed(2))
                                : UM.numberWithCommas((inputValues['bonus'] * props.onMoneyExchangeInfo.CurrencyRates.CurrencyRate.attr.rate).toFixed(2))
                              })
                            </span>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                    <div className="df">
                      <h4>Summary:</h4>
                      <div className="m_5">
                        <p>
                          <span>Cash :</span>
                          <span> {props.usdTable ? "$" : ""} {UM.numberWithCommas(inputValues['cash'])}</span>
                        </p>
                        <p>
                          <span>Bonus :</span>
                          <span> {props.usdTable ? "$" : ""} {UM.numberWithCommas(inputValues['bonus'])}</span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              :
              <div className="fd buyNew" style={{ width: '100%', padding: '15px' }}>
                <div className="fd buyBalance" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="df">
                    <span style={{ margin: '5px' }}>{props.t("Your current CHP balance")}: </span>
                    <span style={{ margin: '1px' }} className="clr_ff font_20 bold"> {UM.numberWithCommas(props.playerBalance["myCHPbalance"])} </span>
                  </div>
                  <div className="df">
                    <span style={{ margin: '5px' }}>{props.t("Your current USD balance")}: </span>
                    <span style={{ margin: '1px' }} className="clr_ff font_20 bold"> {UM.numberWithCommas(props.playerBalance["myUSDbalance"])} </span>
                  </div>
                </div>
                <div className="fd">
                  <div className="minMaxBalance" style={{ flexDirection: 'row', justifyContent: 'center', margin: '5px' }}>
                    <span > {props.t("Minimum buy-in")} : </span>
                    <span className="clr_4 font_15"> {UM.numberWithCommas(min)} </span>
                  </div>
                </div>
              </div>
            }
            <div className="exchangeBtns" >
              <button className="btn_2" onClick={onClickCancel}> Cancel  </button>
              {/* {(showTimer && header === `Add Chips - ${props.usdTable ? "USD" : "CHP"}`) && ( */}
              <div className="df_al_js-center" style={{ visibility: (props.data.time > 0 && pausTheTime) ? 'visible' : 'hidden' }}>
                {props.t("Time Left")}: <span style={{ color: "red" }} className="font_18">{time}</span>
              </div>
              {/* )} */}
              {/* exchangeBtnState */}
              {/* <button className="btn_2 fd" onClick={onClickExchange} disabled={true && (Number(inputValues['cash']) <= 0 && Number(inputValues['bonus']) <= 0) && header !== `Add Chips - ${props.usdTable ? "USD" : "CHP"}`}>Exchange</button> */}
              {header !== `Add Chips - ${props.usdTable ? "USD" : "CHP"}` ?
                (<button className="btn_2 fd" onClick={onClickExchange} disabled={(Number(inputValues['cash']) <= 0 && Number(inputValues['bonus']) <= 0) && header !== `Add Chips - ${props.usdTable ? "USD" : "CHP"}`}>Exchange</button>) :
                (<button className="btn_2 fd" onClick={onClickExchange} disabled={exchangeBtnState}>Exchange</button>)
              }
            </div>
          </div>
        </div>

        :

        <div className={fileName.name === "Leader_bet" ? "popup_1_lb" : "popup_1"} style={{ maxWidth: (Screen.getDeviceType().name === "Mobile" && fileName.name === "Leader_bet") ? "307px" : fileName.name === "Leader_bet" ? "545px" : "" }}>
          <div className={fileName.name === "Leader_bet" ? "popup_1_in_lb" : "popup_1_in"} style={{ minHeight: '170px' }}>
            <div className="head">
              <span className="settingsSpan">
                <div className="sprite" style={{ backgroundPositionY: "81px" }}></div> {props.t("Add Chips - CHP")}</span>

            </div>
            {errorMsg && (
              <div className="errorMsgDiv">
                <span>{errorMsgText}</span>
              </div>
            )}

            <>
              <div className="fd" style={{ borderBottom: "1px solid #000", padding: "10px 15px" }}>
                <span>How much money would you like to bring to this table</span>
              </div>
              <div className="fd buyNew">
                <div className="fd buyBalance p_5">
                  <span >{props.t("Your current balance")}: <span className="clr_ff bold"> {UM.changeAmtLabel(newAvlBal)} </span></span>
                </div>
                <div className="fd">
                  <table className="fd">
                    <tbody>
                      <tr className="v_align">
                        <td>
                          <div className="minMaxBalance p_5">
                            <span > {props.t("Minimum buy-in")} : <span className="clr_4 font_15"> {UM.changeAmtLabel(newMinBal)} </span></span>
                          </div>
                        </td>
                        <td>
                          <div className="minMaxBalance p_5">
                            <span > {props.t("Maximum buy-in")} : <span className="clr_4 font_15"> {UM.changeAmtLabel(newMaxBal)} </span></span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div className="slider-container fd row">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step="0.01"
                  value={amount}
                  className="custom-slider"
                  id="myRange1"
                  onChange={onTestSlider}
                  style={{ appearance: 'none', width: '70%', height: '10px', transition: 'opacity 0.2s', border: 'none', marginTop: '-5px', borderRadius: '20px', margin: '15px' }}
                />


                <input id="textInput" className="inputValue" style={{ width: '20%' }} type="text" value={UM.changeAmtLabel(amount)} disabled={btnState} readOnly />
              </div>
              <div className="fd p_5 m_t_15" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "#1e1e1e30" }}>
                <button className="btn_2 fd" onClick={onClickBuy}  >{props.t("OK")} </button>
                <div className="df_al_js-center" style={{ visibility: (props.data.time > 0 && pausTheTime) ? 'visible' : 'hidden' }}>
                  {props.t("Time Left")}: <span style={{ color: "red" }} className="font_18">{time}</span>
                </div>
                <button className="btn_2 fd" onClick={onClickClose}  >{props.t("close")} </button>
              </div>
            </>
          </div>
        </div>
      }
    </React.Fragment >
  );
}
export default withTranslation()(BuyChips);