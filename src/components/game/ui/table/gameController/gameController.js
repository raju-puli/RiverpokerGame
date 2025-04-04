import { useState, useEffect, useRef, useMemo } from "react";
import GameCheckBox from "./checkBox";
import rangeshade from "./../../../../../assets/images/table/range_shade.svg";
// import Dropdown from 'react-dropdown';
// import slider_thumb from '../../../../assets/images/table/slider_thumb.png'
// import slider_thumb from './../../../../../assets/images/table/slider_thumb.png'
// import slider_thumbd from './../../../../../assets/images/table/slider_thumb_desktop.png'
// import silderBoder from './../../../../../assets/images/table/silderBoder.png'
// import silderBoder_lb from './../../../../../assets/images/table/silderBoder_lb.svg'
// import slider_thumb_lb from './../../../../../assets/images/table/slider-thumb_lb.png'
// import close_1 from './../../../../../assets/images/table/close_1.svg';
// import upArrows from "../../../../../assets/images/lobby/leaber_bet_icons/upArrows.png";
// import vector from '../../../../../assets/images/table/history_replay_playbtn.png';

import Screen from "../../../../utils/screen";
import fileName from "../../../../../jsconfig";
import { getAutoMuckCards, getRunItOnce, getRunItTwice } from "../../../../utils/global";
import leave_table_emit from "../../../../utils/eventEmitter.js";
import UM from "../../../../utils/utilityMethods.js";

import "../../../../../css/ui/table/gameController.css";
import "../../../../../css/media_queries/allpagesMedia.css";

export default function GameController(props) {

	// console.log("========================game controller=============================")
	const gcbChild = useRef();
	// const [gamecontrollershow, setSamecontrollershow] = useState(true);
	const [amount, setAmount] = useState(props.options.rangeMin);
	const [min, setMin] = useState(props.options.rangeMin)
	const [max, setMax] = useState(props.options.rangeMax)
	const [blindState, setBlindState] = useState(false);
	const [muckState, setMuckState] = useState(getAutoMuckCards());
	// const [checkAmount, setCheckamount] = useState(null);
	const [check, setCheck] = useState(false);
	const [showRiseOptions, setShowRiseOptions] = useState(false);
	const [allPlayerBalance, setAllPlayerBalance] = useState("");
	const [runitoncevalue, setRunitoncevalue] = useState(getRunItOnce())
	// const [hidetocheckbox, setHidetocheckbox] = useState(false)
	const [runittwicevalue, setRunittwicevalue] = useState(getRunItTwice())
	// const [errorMesageForGameslider, setErrorMesageForGameslider] = useState(false);
	const [cal, setCal] = useState(true)
	// const [show, setShow] = useState(true);
	// const [lbFastActions, setLbFastActions] = useState("")
	const [selectedType, setSelectedType] = useState("")
	const [preAction, setPreaction] = useState({ name: "", amount: "" })
	const [queue_error, setQueue_error] = useState(false);
	// const fastBetref = useRef();
	// const [isOpen, setIsOpen] = useState(false);
	const [showFastBetOptions, setShowFastBetOptions] = useState(false);

	const [raiseOrbetAmount, setRaiseOrbetAmount] = useState(0);
	// const [selectedOption, setSelectedOption] = useState(null);
	// const fastBetRef = useRef(null);

	const Fastbets = [
		// { value: 6, label: min == max ? 'All - In' : 'Max', disabled: amount === max },
		{ value: 6, label: Number(min) === Number(max) ? 'All - In' : 'Max' },
		{ value: 7, label: '2/3 Pot', disabled: !props.options.show2by3 },
		{ value: 5, label: '1/2 Pot', disabled: !props.options.show1by2 },
		{ value: 4, label: 'Pot', disabled: !props.options.showpot },
		{ value: 3, label: 'X3', disabled: !props.options.show3x },
		{ value: 2, label: 'X2', disabled: !props.options.show2x },
		// { value: 1, label: 'Plus' },
		// { value: 0, label: 'Minus' },
	];
	const [fastbets, setFastbets] = useState(Fastbets)

	const [actionBets, setActionBets] = useState({ action: undefined, value: false });


	useEffect(() => {
		leave_table_emit.on('clearQuickBetOptions', clearQuickOptions);
		return () => {
			leave_table_emit.off('ProfileShow', clearQuickOptions);
		};
	}, []);
	const clearQuickOptions = () => {
		setSelectedType("");
		setPreaction({ name: "", amount: "" });
	}
	// const setCheckBoxActions = (action, value) => {
	// 	if (show) {
	// 		setShow(!show)

	// 	} else {
	// 		setRadio(null)
	// 	}


	// 	switch (action) {
	// 		case "Check":
	// 			setActionBets({ action: action, value: value })
	// 			break;
	// 		case "Fold":
	// 			setActionBets({ action: action, value: value })
	// 			break;
	// 		case "Call":
	// 			setActionBets({ action: action, value: value })
	// 			break;
	// 		case "Raise":
	// 			setActionBets({ action: action, value: value })
	// 			break;
	// 		case "Bet":
	// 			setActionBets({ action: action, value: value })
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }


	const checkBoxActions = (action, state) => {
		console.log("gamecontroller  >>  ", action + " ... " + state)
		switch (action) {
			case "SitOut":
				console.log(action, state)
				// if (!state) {
				// 	props.setGc(props.options.seatId);
				// }
				break;
			case "AutoPost":
				setBlindState(state);
				props.setCheckGc("AutoPost", state);
				break;
			case "AutoMuck":
				setMuckState(state);
				props.setCheckGc("AutoMuck", state);
				break;
			case "closeCkeckAlert":
				props.setCheckGc(action, state);
				break;
			case "Fold":
				props.network.send(`<Fold/>`);
				break;
			case "Check":
				props.network.send(`<Check/>`);
				break;
			case "hideCheckBox":
				props.action("hideCheckBox");
				break;
			case "ritTwo":
				if (state) {
					setRunitoncevalue(!state)
					setRunittwicevalue(state)
					props.setCheckGc("ritTwo", state);
				}
				else {
					setRunittwicevalue(state)
					props.setCheckGc("ritTwo", state);

				}
				break;
			case "ritOne":
				if (state) {
					setRunitoncevalue(state);
					setRunittwicevalue(!state)
					setRadio(true)
					// props.setCheckGc("ritOne", state);
				}
				else {
					setRunitoncevalue(state);
					// props.setCheckGc("ritOne", state);
				}
				break;
			case "VolumeMute":
				props.volumeaction(state);
				break;
			case "Addon":
				props.setCheckGc("AddOn", state);
				break;
			case "Rebuy":
				props.setCheckGc("Rebuy", state);
				break;
			case "ReBuy2X":
				props.setCheckGc("ReBuy2X", state);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		setAmount(props.options.rangeMin);
		setRaiseOrbetAmount(props.options.rangeMin);
		setMin(props.options.rangeMin);
		setMax(props.options.rangeMax);
		setFastbets(Fastbets)
		updateGradient(0)
		setNum('')
		console.log("My range", amount, max, props.options)
	}, [props.options.rangeMin, props.options.rangeMax]);
	useEffect(() => {
		if (props.options.showChecks) {
			gcbChild.current.enableDefaults();
		}
	}, [props.options.showChecks]);

	useEffect(() => {
		setQueue_error(true);
		return () => { setQueue_error(false) }
	}, [props.options.quickAction]);

	useEffect(() => {
		if (props.options?.action[1]?.name === 'WaitForBigBlind') {
			setShowFastBetOptions(false);
		} else {
			if (props.options.action.length >= 3) {
				setShowFastBetOptions(true);
			} else {
				setShowFastBetOptions(false);
			}
		}
		setQueue_error(false);
	}, [props.options.action])

	// const Checkbox = (value) => {
	// 	const onSelectType = (e) => {
	// 		if (e.target.checked) {
	// 			setSelectedType(e.target.name);
	// 			console.log(e.target.name)
	// 			console.log(e.target.value)
	// 			setPreaction({ name: e.target.name, amount: e.target.value });
	// 		} else {
	// 			setSelectedType("");
	// 			setPreaction({ name: "", amount: "" });
	// 		};
	// 	}
	// 	return (

	// 		<label className={selectedType === value.name ? "shadowlabel" : ""}> <input type="checkbox" key={value.name} name={value.name} value={value.amount} onChange={(event) => { onSelectType(event) }} checked={selectedType === value.name}></input>{value.name}{" "}{value.amount}</label>
	// 	);
	// };

	const Button = (value) => {
		if (preAction.name !== '') {
			if (preAction.name === "Fold") {
				if (value.name) {
					if (value.name === 'Check') {
						setSelectedType("");
						setPreaction({ name: '', amount: '' });
						setCheck(true);
					} else if (value.name === 'Call') {
						setSelectedType("");
						setPreaction({ name: '', amount: '' });
						props.setGc(props.options.seatId, true);
						props.network.send(`<Fold/>`);
					}
				}
			} else if (preAction.name === "Check") {
				if (value.name === preAction.name) {
					setSelectedType("");
					setPreaction({ name: '', amount: '' });
					props.setGc(props.options.seatId, true);
					props.network.send(`<Check/>`);
				}
			} else if (preAction.name === "Call") {
				if (value.name === preAction.name) {
					setSelectedType("");
					setPreaction({ name: '', amount: '' });
					props.setGc(props.options.seatId, true);
					props.network.send(`<Call amount="${value.amount}"/>`);
				}
			} else if (preAction.name === "Bet") {
				if (value.name === preAction.name) {
					setSelectedType("");
					setPreaction({ name: '', amount: '' });
					props.setGc(props.options.seatId, true);
					props.network.send(`<Bet amount="${value.amount}"/>`);
				}
			} else if (preAction.name === "Raise") {
				if (value.name === preAction.name) {
					setSelectedType("");
					setPreaction({ name: '', amount: '' });
					props.setGc(props.options.seatId, true);
					props.network.send(`<Raise amount="${value.amount}"/>`);
				}
			} else if (preAction.name === "Raise Any") {
				if (value.name === "Raise") {
					setSelectedType("");
					setPreaction({ name: '', amount: '' });
					props.setGc(props.options.seatId, true);
					props.network.send(`<Raise amount="${value.amount}"/>`);
				}
			} else if (preAction.name === "Call Any") {
				if (value.name === "Call") {
					setSelectedType("");
					setPreaction({ name: '', amount: '' });
					props.setGc(props.options.seatId, true);
					props.network.send(`<Call amount="${value.amount}"/>`);
				}
			} else {
				if (preAction.name === "Check/Fold") {
					if (value.name) {
						if (value.name === 'Check') {
							setSelectedType("");
							setPreaction({ name: '', amount: '' });
							props.setGc(props.options.seatId, true);
							props.network.send(`<Check/>`);
						} else if (value.name === 'Call') {
							setSelectedType("");
							setPreaction({ name: '', amount: '' });
							props.setGc(props.options.seatId, true);
							props.network.send(`<Fold/>`);
						}
					}
				}
			}
		}

		if (radio !== null && value.amount !== "") {
			setRadio(null);
			if (value.name === "Raise" && actionBets.action === "Raise") {
				props.network.send(`<Raise amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			else if (value.name === "Call" && actionBets.action === "Call") {
				props.network.send(`<Call amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			else if (value.name === "Bet" && actionBets.action === "Bet") {
				props.network.send(`<Bet amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			else if (value.name === "Run It Twice") {
				if (runittwicevalue) {
					props.network.send(`<RunItTwice accept="true"/>`);
					props.setGc(props.options.seatId);
				}
				props.setGc(props.options.seatId);
			}
			else if (value.name === "Run It Once") {
				if (runitoncevalue) {
					props.network.send(`<RunItTwice accept="false"/>`);
				}
				props.setGc(props.options.seatId);
			}
			else if (value.name === "Bet" && actionBets.action === "Check") {
				props.setGc(props.options.seatId);
			}
			else if (actionBets.action === "Fold") {
				props.setGc(props.options.seatId);
			}
		}

		const onClickButton = () => {
			setCal(true)
			setSelectedType("");
			// setLbFastActions('');
			setAllPlayerBalance("");
			setPreaction({ name: '', amount: '' });
			setShowRiseOptions(false);
			setSelectedOption("Fast Bet");
			setOpenDropDown(false);

			if (value.name === "SitIn") {
				gcbChild.current.setSitOutCheck();
				if (value.amount === 0) {
					props.setAction("BuyChips")
					props.handlecheckBox(true)
				} else {
					props.network.send(`<SitIn/>`);
					props.setGc(props.options.seatId);
					props.handlecheckBox(false);
					gcbChild.current.setSitOutCheckTrue();
				}

			}
			if (value.name === "SitOut") {
				props.network.send(`<SitOut/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "BB" || value.name === "PostBigBlind") {
				props.network.send(`<PostBigBlind amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "SB" || value.name === "PostSmallBlind") {
				props.network.send(`<PostSmallBlind amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Call") {
				props.network.send(`<Call amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Bet") {
				// props.network.send(`<Bet amount="${value.amount}"/>`);
				props.network.send(`<Bet amount="${raiseOrbetAmount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Raise") {
				// props.network.send(`<Raise amount="${value.amount}"/>`);
				props.network.send(`<Raise amount="${raiseOrbetAmount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Check") {
				props.network.send(`<Check/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Muck") {
				props.network.send(`<Muck/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Show") {
				props.network.send(`<Show/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Run It Twice") {
				props.network.send(`<RunItTwice accept="true"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Run It Once") {
				props.network.send(`<RunItTwice accept="false"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Fold") {
				if (props.options.action[1].name === 'Check') {
					setCheck(true);
				} else {
					props.network.send(`<Fold/>`);
					props.setGc(props.options.seatId);
				}
			}
		};

		// function handleRaiseconform() {
		// 	setShowRiseOptions(true)
		// 	setTimeout(() => {
		// 		setShowRiseOptions(false)
		// 	}, 30000);
		// }
		let tab = document.getElementById('myRange' + props.doc);
		if (value.name === "Call") {
			if (Number(value.amount) >= Number(max)) {
				if (tab) {
					tab.style.visibility = 'hidden';
				}
				setAllPlayerBalance(value.amount);
			} else {
				setAllPlayerBalance("");
				if (tab) {
					tab.style.visibility = 'visible';
				}
			}
		}

		if (value.name === "Raise" || value.name === "Bet") {
			if (tab) {
				tab.style.visibility = 'visible';
			}
			return (
				// <button className="gCbtnSub" onClick={onClickButton}>
				// 	<div>
				// 		{Number(amount) === Number(props.mychips) ? "All-In" :
				// 			(value.name === "Raise" && getUseRaiseTo()) ? "Raise To" :
				// 				(Number(amount) === Number(max) ? "Max" : value.name)}
				// 	</div>&nbsp;&nbsp;
				// 	<div>
				// 		{Number(amount) === Number(props.options.rangeMax) ? UM.numberWithCommas(amount) :
				// 			(value.name === "Raise" && getUseRaiseTo()) ? UM.numberWithCommas(amount * 2) :
				// 				UM.numberWithCommas(amount)}
				// 	</div>
				// </button>

				<button className="gCbtnSub" onClick={onClickButton}>
					<div>
						{/* {Number(value.amount) === Number(props.mychips) ? "Max" : value.name} */}
						{Number(raiseOrbetAmount) === Number(props.mychips) ? "Max" : value.name}
					</div> &nbsp;&nbsp;
					<div>
						{props.stageProperties.deviceOrientation ? UM.changeAmtLabel(raiseOrbetAmount) : UM.numberWithCommas(raiseOrbetAmount)}
					</div>
				</button>
			);

		} else if (value.name === "SitIn") {
			if (tab) {
				tab.style.visibility = 'hidden';
			}
			return (
				<button className="gCbtnSub" onClick={onClickButton}>
					<div>{value.name}</div>
				</button>
			);
		} else if (value.name === "SitOut") {
			if (tab) {
				tab.style.visibility = 'hidden';
			}
			return (
				<button className="gCbtnSub" onClick={onClickButton}>
					<div>{value.name}</div>
				</button>
			);
		}
		else if (value.name === "Run It Once" || value.name === "Run It Twice") {
			if (tab) {
				tab.style.visibility = 'hidden';
			}
			return (
				<button onClick={onClickButton} className="gCbtnSub" >
					<span>{value.name} </span>
				</button>
			);
		}
		else if (value.name === "Show" || value.name === "Muck") {
			if (tab) {
				tab.style.visibility = 'hidden';
			}
			return (
				<button onClick={onClickButton} className="gCbtnSub" >
					<span>{value.name}</span>
				</button>
			);
		}
		else if (value.name === "SB" || value.name === "BB") {
			if (tab) {
				tab.style.visibility = 'hidden';
			}
			return (
				<button onClick={onClickButton} className="gCbtnSub" >
					<span>{value.name + " " + (props.stageProperties.deviceOrientation ? UM.changeAmtLabel(value.amount) : UM.numberWithCommas(value.amount))}</span>
				</button>
			);
		}
		else {
			return (
				// <button onClick={onClickButton} className="gCbtn" >
				// 	<span>{value.name === "Call" && Number(value.amount) >= Number(max) ? "All-In" : value.name} {" "}{value.name === "Call" ? UM.numberWithCommas(value.amount) : ""} </span>
				// </button>
				<button onClick={onClickButton} className="gCbtn" >
					{/* <span>{value.name + "" + value.amount}</span> */}
					<div>
						{Number(value.amount) === Number(props.mychips) ? "All-In" : value.name}
					</div> &nbsp;
					{value.amount && (
						<div>
							{props.stageProperties.deviceOrientation ? UM.changeAmtLabel(value.amount) : UM.numberWithCommas(value.amount)}
						</div>
					)}
				</button>
			);
		}
		// updateGradient(value.amount);
	};


	const RangeIncreament = (e) => {
		// const value = parseFloat(e.target.value).toFixed(2);
		const value = e.target.value;
		console.log(fastbets)
		// fastBetActionsD(undefined);
		// const tab = document.getElementById("selectedOptions");
		// console.log(tab);
		updateGradient(value);
		setAmount(e.target.value);
		setRaiseOrbetAmount(e.target.value);
		setSelectedOption("Fast Bet");
		setOpenDropDown(false);
	};

	const updateGradient = (data) => {

		const rangeInput = document.getElementById('myRange' + props.doc);

		// const minValue = parseFloat(rangeInput.min);
		// const maxValue = parseFloat(rangeInput.max);
		const minValue = rangeInput.min;
		const maxValue = rangeInput.max;
		// const currentValue = parseFloat(rangeInput.value);
		const currentValue = data;
		// setAmount(currentValue)

		const percentage = (currentValue - minValue) / (maxValue - minValue) * 100;

		// console.log("percentage", percentage)
		// console.log("minValue", minValue)
		// console.log("maxValue", maxValue)
		// console.log("currentValue", currentValue)

		//   const percentage = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
		// let gradient;
		// if (fileName.name === "Leader_bet") {

		// 	gradient = `linear-gradient(to right, #515151 0%, #515151 ${percentage}%, #0C0C0C ${percentage}%, #0C0C0C 100%)`;
		// } else {

		// 	gradient = `linear-gradient(to right, red 0%, yellow ${percentage}%, #476078 ${percentage}%, #476078 100%)`;
		// }
		rangeInput.style.background = `linear-gradient(to right, #e3c54c 0%, #e3c54c ${percentage}%, #476078 ${percentage}%, #476078 100%)`;
	}






	// const onChangeSlider = (e) => {
	// 	let sv = document.getElementById("sliderBarGC");
	// 	setAmount(sv.value);
	// 	const sliderWrapper = fileName.name === ("Leader_bet" && Screen.getDeviceType().name == "Mobile") ? document.querySelector('.s-wrapper_lb') : document.querySelector('.s-wrapper');
	// 	const sliderInput = fileName.name === ("Leader_bet" && Screen.getDeviceType().name == "Mobile") ? document.querySelector('.s-input_lb') : document.querySelector('.s-input');
	// 	const maxValue = +sliderInput.max;
	// 	const updateSlider = () => {
	// 		const progress = 100 * (e.target.value - e.target.min) / (e.target.max - e.target.min)
	// 		sliderWrapper.style.setProperty('--slider-progress', progress);
	// 	}
	// 	sliderInput.addEventListener('input', updateSlider);
	// 	updateSlider();
	// };


	// const onChangeSlider = (e, fileName) => {
	// 	// console.log(e)
	// 	// console.log(e.target)
	// 	// console.log(e.target.value)
	// 	const sv = document.getElementById("sliderBarGC");
	// 	// const setAmount = (value) => { };
	// 	setAmount(e.target.value);
	// 	const sliderWrapper = (fileName === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? document.querySelector('.s-wrapper_lb') : document.querySelector('.s-wrapper');
	// 	const sliderInput = (fileName === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? document.querySelector('.s-input_lb') : document.querySelector('.s-input');
	// 	const maxValue = +sliderInput.max;

	// 	const updateSlider = () => {
	// 		const progress = 100 * (e.target.value - e.target.min) / (e.target.max - e.target.min);
	// 		sliderWrapper.style.setProperty('--slider-progress', progress);
	// 	};

	// 	sliderInput.addEventListener('input', updateSlider);
	// 	updateSlider();
	// };


	const [radio, setRadio] = useState(null);

	// function changeRadio(id) {


	// 	setRadio(id)


	// }


	const onClickActionsBets = (actionBet, stateBet) => {

		switch (actionBet) {
			case "Fold":

				if (actionBets.value) {

					props.network.send(`<Fold/>`);
					console.log("knock knock - Fold");
				} else {
					console.log("default fold not enabled ................................");
				}
				break;
			case "Check":
				if (actionBets.value) {

					props.network.send(`<Check/>`);
					console.log("knock knock - Check");
				} else {
					console.log("default checks not enabled ................................");
				}
				break;
			case "Call":

				if (actionBets.value) {

					console.log("knock knock - Call");

				} else {
					console.log("default call not enabled ................................");
				}
				break;
			case "Bet":

				if (actionBets.value) {

					console.log("knock knock - Bet");
				} else {
					console.log("default Bet not enabled ................................");
				}
				break;
			case "Raise":

				if (actionBets.value) {

					console.log("knock knock - raise");
				} else {
					console.log("default Raise not enabled ................................");
				}
				break;
			default:
				break;
		}

	}
	function updateTextInput(e) {
		// console.log(e)
		// console.log((e.target.value/100)*e.target.max)
		// alert(((e.target.value) * x))
		let x = 100 / max;
		document.getElementById('textInput').value = e.target.value;
		document.getElementById('range_box_2').style.bottom = ((e.target.value) * x) + '%';



		let gCsv = document.getElementById("gCsliderBar");
		let gCtv = document.getElementById("textInput");

		gCtv.value = gCsv.value;
		setAmount(gCsv.value);
		setRaiseOrbetAmount(gCsv.value);
		// console.log(amount)

		// if ((Number(e.target.value) - Number(props.options.rangeMax)) == Number(0)) {
		// 	console.log((Number(e.target.value) - Number(props.options.rangeMax)) == Number(0) )
		// 	console.log((Number(e.target.value) - Number(props.options.rangeMax)))
		// 	alert("gameController.js 400" + " All-In")
		// } else if(Number(e.target.value) == Number(props.options.rangeMax)){
		// 	console.log(Number(e.target.value) == Number(props.options.rangeMax))
		// 	alert("gameController.js 400" + " RiseMax")
		// }else{
		// 	console.log( Number(e.target.value) +" "+ Number(props.options.rangeMax))
		// }
		// range_box_2
	}
	function closeAlert() {
		// document.getElementById("gameController").style.visibility="visible"
		setCheck(false)

	}
	function TakeFold() {
		// sessionStorage.setItem("stopShow", "stopShow")
		props.network.send(`<Fold/>`);
		setCheck(false)
		props.setGc(props.options.seatId);
	}
	function TakeCheck() {
		// sessionStorage.setItem("stopShow", "stopShow")
		props.network.send(`<Check/>`);
		setCheck(false)
		props.setGc(props.options.seatId);
	}
	// function fastBetActions(e) {

	// 	setFastbets(Fastbets);
	// 	console.log(fastBetref.current)
	// 	console.log(e)
	// 	const sliderWrapper =  document.querySelector('.myRange') ;

	// 	switch (e) {
	// 		case '6':
	// 			setAmount(max);
	// 			const progress = 100;
	// 			sliderWrapper.style.setProperty('--slider-progress', progress);
	// 			break;
	// 		case '4':
	// 			if (props.options.showpot) {
	// 				setAmount(Number(props.options.valuepot));
	// 				const progress = Number(props.options.valuepot) * 100 / Number(max);
	// 				sliderWrapper.style.setProperty('--slider-progress', progress);
	// 			}
	// 			break;
	// 		case '7':
	// 			if (props.options.show2by3) {
	// 				setAmount(Number(props.options.value2by3));
	// 				const progress = (2 * Number(props.options.value2by3) / 3) * 100 / Number(max);
	// 				sliderWrapper.style.setProperty('--slider-progress', progress);
	// 			}
	// 			break;
	// 		case '5':
	// 			if (props.options.show1by2) {
	// 				setAmount(Number(props.options.value1by2));
	// 				const progress = (Number(props.options.value1by2) / 2) * 100 / Number(max);
	// 				sliderWrapper.style.setProperty('--slider-progress', progress);
	// 			}
	// 			break;
	// 		case '3':
	// 			if (props.options.show3x) {
	// 				setAmount(Number(props.options.bigblindValue) * 3);
	// 				const progress = (Number(props.options.bigblindValue) * 3) * 100 / Number(max);
	// 				console.log("3bb   >>>   ", progress)
	// 				sliderWrapper.style.setProperty('--slider-progress', progress);
	// 			}
	// 			break;
	// 		case '2':
	// 			if (props.options.show2x) {
	// 				setAmount(Number(props.options.bigblindValue) * 2);
	// 				const progress = (Number(props.options.bigblindValue) * 2) * 100 / Number(max);
	// 				console.log("2bb   >>>   ", progress)
	// 				sliderWrapper.style.setProperty('--slider-progress', progress);
	// 			}
	// 			break;
	// 		// case 'addition':
	// 		// 	if (Number(amount) + 100 < Number(max)) {
	// 		// 		setAmount(Number(e.target.value) + 100);
	// 		// 		console.log("addition  ", e.target.value)
	// 		// 		if (Number(e.target.value) + 100 < Number(max)) {
	// 		// 			const progress = (100 * ((Number(e.target.value) + 100) - Number(min)) / (Number(max) - Number(min)));
	// 		// 			console.log("addition  ", progress)
	// 		// 			sliderWrapper.style.setProperty('--slider-progress', progress);
	// 		// 		}
	// 		// 	} else {
	// 		// 		setAmount(max)
	// 		// 		const progress = 100;
	// 		// 		sliderWrapper.style.setProperty('--slider-progress', progress);
	// 		// 	}
	// 		// 	break;
	// 		// case 'subtraction':
	// 		// 	if (Number(amount) - 100 > Number(min)) {
	// 		// 		setAmount(Number(amount) - 100);
	// 		// 		console.log("subtraction  ", e.target.value)
	// 		// 		if (Number(e.target.value) - 100 > Number(min)) {
	// 		// 			const progress = 100 * ((Number(e.target.value) - 100) - Number(min)) / (Number(max) - Number(min));
	// 		// 			console.log("subtraction  ", progress)
	// 		// 			sliderWrapper.style.setProperty('--slider-progress', progress);
	// 		// 		}
	// 		// 	} else {
	// 		// 		setAmount(min)
	// 		// 		const progress = 0;
	// 		// 		sliderWrapper.style.setProperty('--slider-progress', progress);
	// 		// 	}
	// 		// 	break;
	// 		default:
	// 			break;
	// 	}

	// }


	function fastBetActionsD(e) {
		console.log(e)
		console.log(e.target)
		// alert("hit")
		// setFastbets(Fastbets)
		// setIsOpen(false);
		// setFastbets((prevOptions) => [...prevOptions, fastbets])


		var minAmount = Number(min)
		var maxAmount = Number(max)
		var totalAmount = Number(amount)
		const rangeInput = document.getElementById('myRange' + props.doc);
		// setErrorMesageForGameslider("")
		switch (e) {
			case 0:
				if (minAmount < totalAmount) {
					rangeInput.stepDown()
					setAmount(rangeInput.value)
					setRaiseOrbetAmount(rangeInput.value)
					updateGradient(rangeInput.value)
				} else {
					// setErrorMesageForGameslider("Bet amount can't be less than minimum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			case 1:
				if (maxAmount > totalAmount) {
					rangeInput.stepUp()
					setAmount(rangeInput.value)
					setRaiseOrbetAmount(rangeInput.value)
					updateGradient(rangeInput.value)
				} else {
					// setErrorMesageForGameslider("Raise amount shouldn't be greater than maximum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			case 2:
				if (minAmount * 2 < maxAmount) {
					// setAmount((min) * 2);
					// updateGradient((min) * 2)
					setAmount(Number(props.options.bigblindValue) * 2);
					setRaiseOrbetAmount(Number(props.options.bigblindValue) * 2);
					updateGradient(Number(props.options.bigblindValue) * 2)
				} else {
					// setErrorMesageForGameslider("2BB amount shouldn't be greater than maximum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			case 3:
				if (minAmount * 3 < maxAmount) {
					// setAmount((min) * 3);
					// updateGradient((min) * 3)
					setAmount(Number(props.options.bigblindValue) * 3);
					setRaiseOrbetAmount(Number(props.options.bigblindValue) * 3);
					updateGradient(Number(props.options.bigblindValue) * 3)
				} else {
					// setErrorMesageForGameslider("3BB amount shouldn't be greater than maximum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			case 4:
				if (props.options.valuepot >= minAmount && props.options.valuepot <= maxAmount) {
					setAmount(props.options.valuepot);
					setRaiseOrbetAmount(props.options.valuepot);
					updateGradient(props.options.valuepot)
				} else if (props.options.valuepot === null) {
					// setErrorMesageForGameslider("Pot amount not available")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				} else if (props.options.valuepot > maxAmount) {
					// setErrorMesageForGameslider("Pot amount shouldn't be greater than maximum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				} else {
					// setErrorMesageForGameslider("Pot amount shouldn't be less than minimum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			case 5:
				if (((props.options.valuepot) / 2) > minAmount) {
					setAmount(Number(props.options.value1by2));
					setRaiseOrbetAmount(Number(props.options.value1by2));
					updateGradient(((props.options.valuepot) / 2));
				} else if (props.options.valuepot === null) {
					// setErrorMesageForGameslider("Pot amount not available")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				else {
					// setErrorMesageForGameslider("1/2Pot amount shouldn't be less than minimum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			case 6:
				setAmount(max);
				setRaiseOrbetAmount(max);
				updateGradient(max);
				break;
			case 7:
				if (((props.options.valuepot) * 2 / 3) > minAmount) {
					setAmount(((props.options.valuepot) * 2 / 3).toFixed());
					setRaiseOrbetAmount(((props.options.valuepot) * 2 / 3).toFixed());
					updateGradient(((props.options.valuepot) * 2 / 3).toFixed());
				} else if (props.options.valuepot == null) {
					// setErrorMesageForGameslider("Pot amount not available")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				else {
					// setErrorMesageForGameslider("2/3Pot amount shouldn't be less than minimum amount")
					// setTimeout(() => {
					// 	setErrorMesageForGameslider("")
					// }, 3000);
				}
				break;
			default:
				break;
		}
	}

	// const onClickNewSlider = (e) => {

	// props.setCheckGc("playerLevelInfo", true);
	// var slider = document.getElementById("myRange");
	// var sliderContainer = document.querySelector(".slider-container");

	// slider.oninput = function () {
	// 	var value = (slider.value - slider.min) / (slider.max - slider.min);
	// 	var newPosition = 20 + (slider.offsetWidth - 40) * value; // Adjust for the thumb size
	// 	slider.style.background = 'linear-gradient(to right, gray 20px, transparent 20px, transparent ' + newPosition + 'px, green ' + newPosition + 'px)'; // Adjust the colors as needed
	// };
	// showTourneyInfoBoard

	// document.addEventListener("DOMContentLoaded", function () {
	// 	var rangePercent = document.querySelector('[type="range"]').value;
	// 	var rangeInput = document.querySelector('[type="range"]');
	// 	var headingSpan = document.querySelector('h4 > span');
	// 	var heading = document.querySelector('h4');

	// 	rangeInput.addEventListener('change', function () {
	// 		rangePercent = rangeInput.value;
	// 		updateSlider();
	// 	});

	// 	rangeInput.addEventListener('input', function () {
	// 		rangePercent = rangeInput.value;
	// 		updateSlider();
	// 	});

	// 	function updateSlider() {
	// 		heading.innerHTML = rangePercent + '<span></span>';
	// 		rangeInput.style.filter = 'hue-rotate(-' + rangePercent + 'deg)';
	// 		headingSpan.style.filter = 'hue-rotate(-' + rangePercent + 'deg)';
	// 		var transformValue = 'translateX(-50%) scale(' + (1 + rangePercent / 100) + ')';
	// 		var leftValue = rangePercent + '%';
	// 		heading.style.transform = transformValue;
	// 		heading.style.left = leftValue;
	// 	}
	// });
	// }

	// function fastBetActions_lb(e) {
	// 	setSelectedType("")
	// 	setPreaction({ name: '', amount: '' })
	// 	if (lbFastActions !== e.target.id) {
	// 		setLbFastActions(e.target.id);
	// 		switch (e.target.id) {
	// 			case "max":
	// 				setAmount(max);
	// 				break;
	// 			case "1/2":
	// 				setAmount(Number(props.options.value1by2));
	// 				break;
	// 			case "2/3":
	// 				setAmount(Number(props.options.value2by3));
	// 				break;
	// 			case "X5":
	// 				setAmount(Number(props.options.bigblindValue) * 5);
	// 				break;
	// 			case "X3":
	// 				setAmount(Number(props.options.bigblindValue) * 3);
	// 				break;
	// 			case "X2":
	// 				setAmount(Number(props.options.bigblindValue) * 2);
	// 				console.log(Number(props.options.bigblindValue) * 2)
	// 				break;
	// 			default:
	// 				console.log(e.target.name)
	// 				break;
	// 		}
	// 	} else {
	// 		setAmount(min);
	// 		setLbFastActions('');
	// 	}
	// }

	// useEffect(() => {
	// 	const menuElement = document.querySelector('.Dropdown-menu');
	// 	if (menuElement) {
	// 	  const vectorElement = document.createElement('div');
	// 	  vectorElement.className = 'custom-vector';
	// 	  const img = document.createElement('img');
	// 	  img.src = vector;  // Replace with your vector image path
	// 	  img.alt = 'Custom Vector';
	// 	  vectorElement.appendChild(img);
	// 	  menuElement.appendChild(vectorElement);
	// 	}
	//   }, );
	const [num, setNum] = useState('')
	const [colorText, setColorText] = useState(true)
	function numcalucaltor(e) {
		// console.log("Number(num) + Number(e)", Number(num + e), "amount", amount, "props.options.rangeMax", props.options.rangeMax)


		if (Number(num + e) <= Number(props.options.rangeMax)) {
			CheckError(num + e)
			// if (Number(num) + Number(e) <= Number(props.options.rangeMax)) {
			setNum(num + e)
		}
	}

	const deletelasthandle = () => {
		let str = num;
		str = str.substring(0, str.length - 1);
		console.log(str);
		setNum(str)
		CheckError(str)

		// document.getElementById("dotbtn").disabled = false;
	}
	const dothandle = () => {
		if (!/\./.test(num)) {
			setNum(num + ".");
		}

		// document.getElementById("dotbtn").disabled = true;
	}
	const CheckError = (data) => {
		if (Number(data) >= amount && Number(data) <= Number(props.options.rangeMax)) {
			setColorText(true)
		} else {
			setColorText(false)

		}
	}


	function handleEnter() {
		console.log("parseInt(num)", parseInt(num), num, "Float", Number(num))

		if (colorText) {
			if (props.options.rangeMax === parseInt(num) && props.options.rangeMin < parseInt(num)) {
				console.log(props.options.rangeMax + "range balance is equal to iyour enter balance ");
				setCal(true);
				setAmount(Number(num));
				setRaiseOrbetAmount(Number(num));
			}
			else if (props.options.rangeMax >= parseInt(num) && props.options.rangeMin < parseInt(num)) {
				console.log(props.options.rangeMax + "range balance is lesser is your enter balance");
				setCal(true);
				setAmount(Number(num));
				setRaiseOrbetAmount(Number(num));
			}
			else if (props.options.rangeMax < parseInt(num)) {
				console.log(props.options.rangeMax + "range balance is greater is your balance ")
				setAmount(Number(num));
				setRaiseOrbetAmount(Number(num));
				updateGradient(Number(num));
				setCal(true)
			}
			else if (props.options.rangeMin > parseInt(num)) {
				setAmount(Number(num));
				setRaiseOrbetAmount(Number(num));
				updateGradient(Number(num));
				setCal(true)
			}
			else {
				setCal(true);
			}
		}
		updateGradient(parseInt(num))
	}

	// const handleToggle = () => {
	// 	setIsOpen(prev => !prev);
	// };

	// const handleOptionSelect = (option) => {
	// 	if (!option.disabled) {
	// 		setSelectedOption(option);
	// 		fastBetActionsD(option.value);
	// 		setIsOpen(false); // Close dropdown after selection
	// 	}
	// };


	const ButtonoptionsArray = useMemo(() => {
		let cnt = props.options.action.length;
		// let cnt = 3;
		let optionsArray = [];
		// console.log(props.options.action);
		// let arr = [
		// 	{ name: "test0", amount: 123456 },
		// 	{ name: "PostBigBlind", amount: "2000000" },
		// 	{ name: "Raises", amount: 123456 },
		// ]
		for (let i = 0; i < cnt; i++) {
			console.log(props.options.action[i].name + " : " + props.options.action[i].amount);
			optionsArray.push(
				<Button
					key={i}
					name={props.options.action[i].name}
					amount={props.options.action[i].amount}
				// name={arr[i].name}
				// amount={arr[i].amount}
				/>
			);

			if (props.options.action[i].name === "PostBigBlind") {
				if (blindState) {
					props.network.send(`<PostBigBlind amount="${props.options.action[i].amount}"/>`);
					props.setGc(props.options.seatId);
					break;
				}
				props.options.action[i].name = "BB";
			} else if (props.options.action[i].name === "PostSmallBlind") {
				if (blindState) {
					props.network.send(`<PostSmallBlind amount="${props.options.action[i].amount}"/>`);
					props.setGc(props.options.seatId);
					break;
				}
				props.options.action[i].name = "SB";
			} else if (props.options.action[i].name === "PostThirdBlind") {
				if (blindState) {
					props.network.send(`<PostThirdBlind amount="${props.options.action[i].amount}"/>`);
					props.setGc(props.options.seatId);
					break;
				}
				props.options.action[i].name = "SB";
			} else if (props.options.action[i].name === "Muck" || props.options.action[i].name === "Show") {
				if (muckState) {
					props.network.send(`<Muck/>`);
					props.setGc(props.options.seatId);
					break;
				}
			} else if (props.options.action[i].name === "Run It Twice") {
				console.log("Run It Twice is called");
				if (runittwicevalue) {
					console.log("Run It Twice is called 1");
					props.network.send(`<RunItTwice accept="true"/>`);
					props.setGc(props.options.seatId);
					break;
				}
			} else if (props.options.action[i].name === "Run It Once") {
				console.log("Run It Once is called");
				if (runitoncevalue) {
					console.log("Run It Once is called 2");
					props.network.send(`<RunItTwice accept="false"/>`);
					props.setGc(props.options.seatId);
					break;
				}
			} else if (props.options.action[i].name === "SitIn") {
				try {
					gcbChild.current.setSitOutCheckTrue();
				} catch (e) {
					console.log(e);
				}
			} else if (props.options.action[i].name === actionBets.action) {
				if (radio !== null) {
					onClickActionsBets(actionBets.action, "");
				}
			}
		}
		return optionsArray;
	}, [props.options.action, blindState, muckState, runittwicevalue, runitoncevalue, actionBets, radio, raiseOrbetAmount]);


	const [openDropDown, setOpenDropDown] = useState(false);
	const onOptionHandler = () => {
		let select_up_arrow = document.getElementById("select-up-arrow");
		if (select_up_arrow) {
			console.log(select_up_arrow)
			if (openDropDown) {
				select_up_arrow.style = null;
			} else {
				select_up_arrow.style.rotate = "0deg";
			}
			setOpenDropDown(!openDropDown);
		}
	}
	const [selectedOption, setSelectedOption] = useState("Fast Bet");
	const onSelectOptions = (value, index) => {
		setSelectedOption(value);
		fastBetActionsD(index);
	}



	return (
		<div>
			{/* <--------------------------------> */}



			<div className="calculatorcover" hidden={cal} style={{ visibility: props.options.action.length >= 2 ? "visible" : "hidden", }}>
				<div className="calculatorgrid">
					<table>
						<tbody>
							<tr>
								<td onClick={(e) => numcalucaltor(7)}>7</td>
								<td onClick={(e) => numcalucaltor(8)}>8</td>
								<td onClick={(e) => numcalucaltor(9)}>9</td>
								<td onClick={deletelasthandle}>←</td>
							</tr>
							<tr>
								<td onClick={(e) => numcalucaltor(4)}>4</td>
								<td onClick={(e) => numcalucaltor(5)}>5</td>
								<td onClick={(e) => numcalucaltor(6)}>6</td>
								<td onClick={() => {
									setCal(true)
									CheckError(amount)
								}} style={{ background: '#AA0808', color: "#fff" }}>x</td>
							</tr>
							<tr>
								<td onClick={(e) => numcalucaltor(1)}>1</td>
								<td onClick={(e) => numcalucaltor(2)}>2</td>
								<td onClick={(e) => numcalucaltor(3)}>3</td>
								<td onClick={() => { setNum("") }} style={{ background: '#BF9504', color: "#fff" }}>C</td>
							</tr>
							<tr>
								<td onClick={(e) => numcalucaltor("00")}>00</td>
								<td onClick={(e) => numcalucaltor(0)}>0</td>
								{/* <td onClick={(e) => numcalucaltor('.')}>.</td> */}
								<td id="dotbtn" onClick={dothandle}>.</td>
								<td onClick={handleEnter} style={{ background: '#0C8004', color: "#fff" }}>✓</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
			{/* <----------------start----------------> */}
			<div id="myrangeposition">
				{/* <input className="slider m_l_5 m_r_5 m_t_10" type="range" style={{ appearance: "none", paddingLeft: "0", paddingRight: "0", borderRadius: "10px", border: "1px solide #000", bottom: "25vh", left: "-65px", position: "relative", visibility: props.options.action.length >= 2 && props.options.RunITTwice ? "visible" : "hidden", }} */}
				{/* <input className="slider m_l_5 m_r_5 m_t_10 new_range_slider_" type="range" style={{ visibility: "visible" }} */}
				{/* <input className="slider m_l_5 m_r_5 m_t_10 new_range_slider_" type="range" style={{ visibility: props.options.action.length >= 2 && props.options.RunITTwice ? "visible" : "hidden", }}
					min={min} max={max} step="0.01"
					id={`${"myRange" + props.doc}`}
					value={amount}
					onChange={RangeIncreament}
				/> */}
				<input
					className="slider m_l_5 m_r_5 m_t_10 new_range_slider_"
					type="range"
					style={{ visibility: props.options.action.length > 2 && props.options.RunITTwice ? "visible" : "hidden" }}
					min={min}
					max={max}
					step="0.01"
					id={`myRange${props.doc}`}
					value={amount}
					onChange={RangeIncreament}
				/>

			</div>


			{/* <---------------end-----------------> */}
			<div className="row FastBets" style={{
				position: "absolute", bottom: "0px", left: "0", zIndex: "1", height: "8vh", minHeight: "50px",
				// visibility: props.options.action.length >= 3 && props.options.RunITTwice ? "visible" : "hidden",
				visibility: showFastBetOptions && props.options.RunITTwice ? "visible" : "hidden",

				background: "linear-gradient(#2f425a, #111c29)", width: "50%"
			}}>
				<div className="col-6" onClick={() => { setCal(false) }}>
					<div className="calculatorEnter" ><span style={{ color: colorText ? "#fff" : "#ff0000" }}>{!cal ? UM.numberWithCommas(num) : allPlayerBalance !== "" ? UM.numberWithCommas(allPlayerBalance) : UM.numberWithCommas(amount)}</span></div>
				</div>
				{(props.options.action.length >= 3 && props.options.RunITTwice) &&
					<div className="col-6">
						{/* <Dropdown id="selectedOptions" options={fastbets.map(option => ({
						...option,
						className: option.disabled ? 'disabled-option' : ''
					}))}
						className={isOpen ? 'dropdown-open' : ''}
						ref={fastBetref} menuClassName="my-menu-class" onChange={(e) => fastBetActionsD(e.value)} placeholder="Fast Bet" /> */}

						<button type="button" className="select-btn" style={{ border: `1px solid ${openDropDown ? "rgb(254, 214, 38)" : "#4d4d4d"}`, color: openDropDown ? "rgb(254, 214, 38)" : "" }} onClick={() => onOptionHandler()}>{selectedOption}
							<span className="df">
								<svg xmlns="http://www.w3.org/2000/svg" id="select-up-arrow" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
									<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
								</svg>
							</span>
							<div className={`${openDropDown ? "showDropdown" : "hideDropdown"} options-div`}>

								{fastbets.map((option, index) => (
									<button
										key={index}
										value={option.value}
										disabled={option.disabled}
										className={option.label === selectedOption ? 'active' : ''}
										onClick={() => onSelectOptions(option.label, option.value)}
									>
										{option.label}
									</button>
								))}
							</div>
						</button>

					</div>}

			</div>

			<GameCheckBox ref={gcbChild} network={props.network} leaveTablebtn={props.leaveTablebtn} showRitBox={props.showRitBox} showCheckBox={props.showCheckBox} settingAccess={props.settingAccess} actions={checkBoxActions} showAlert={props.showAlert} settingsAddonNrebuy={props.settingsAddonNrebuy} ></GameCheckBox>
			{check && <div >
				<div className="popCover_1" onClick={(e) => { e.preventDefault(); closeAlert(); }}> </div>
				<div className="popup_1">
					<div className="popup_1_in">
						<div className="head">
							<span className="settingsSpan">
								<div className="sprite" style={{ backgroundPositionY: "-42px" }}></div> Message</span>

						</div>
						<div className="fd clr_ff p_15 text_center font_15">
							<div className="fd">It is free to Check. <br></br>Do you want to fold anyway ?</div>
						</div>

						<div className="fd df p_10" style={{ justifyContent: "space-between" }}>
							{/* <ul className="footUl">
								<li> */}
							<button className="btn_2" onClick={(e) => { e.preventDefault(); TakeFold(); }}>Fold</button>
							{/* </li>
								<li> */}
							<button className="btn_2" onClick={(e) => { e.preventDefault(); TakeCheck(); }}>Check</button>
							{/* </li>
							</ul> */}
						</div>

					</div>

				</div>
			</div>}






			<div className={fileName.name === "Leader_bet" && Screen.getDeviceType().name === "Mobile" ? "gameController_lb" : "gameController"} style={{ visibility: props.options.showgamecontr, marginBottom: (props.opentables > 2 && fileName.name === "Riverpoker") ? '25px' : '' }} >
				{showRiseOptions && (
					// <div className="fd" style={{ opacity: '0' }}>
					// 	<div className="sliderRange">
					// 		<div className="range_box_1">
					// 			<img className="range_shade" src={rangeshade} alt="" />
					// 			<div className="range_box_2" id="range_box_2"></div>
					// 			<input id="gCsliderBar" type="range" className="rangeInput" name="rangeInput" min={props.options.rangeMin}
					// 				max={props.options.rangeMax} value={amount} onChange={(e) => updateTextInput(e)} />
					// 		</div>
					// 		<input type="text" id="textInput" className="rangeValue text_center" value={amount} readOnly />
					// 	</div>
					// </div>
					<div className="fd" style={{ opacity: '0' }}>
						<div className="sliderRange">
							<div className="range_box_1">
								<img className="range_shade" src={rangeshade} alt="Range Shade" />
								<div className="range_box_2" id="range_box_2"></div>
								<input type="range" id="gCsliderBar" className="rangeInput"
									name="rangeInput"
									min={props.options.rangeMin}
									max={props.options.rangeMax}
									value={amount}
									onChange={(e) => updateTextInput(e)}
								/>
							</div>
							<input
								type="text"
								id="textInput"
								className="rangeValue text_center"
								value={amount}
								readOnly
							/>
						</div>
					</div>

				)}


				{/* {
					(props.options.action.length > 2) &&
					Screen.getDeviceType().name == "Desktop" && (
						(fileName.name === "Leader_bet" || fileName.name === "Riverpoker") ?
							<div className="fd">
								<div className="riseOptions">
									<div className="row span m_t_10">
										<li><button options={Fastbets} disabled={!props.options.showpot} onClick={(e) => fastBetActionsD(4)}>POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show2by3} onClick={(e) => fastBetActionsD(7)}>2/3 POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show1by2} onClick={(e) => fastBetActionsD(5)}>1/2 POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show3x} onClick={(e) => fastBetActionsD(3)}>3 BB</button></li>
										<li><button options={Fastbets} disabled={!props.options.show2x} onClick={(e) => fastBetActionsD(2)}>2 BB</button></li>
										<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(6)}>{min == max ? "All - In" : "Max"}</button></li>

									</div>
									<br />
									<div className="fd">
										<div className="row" style={{ padding: fileName.name === "Riverpoker" ? '0px 5px 5px 5px' : '' }}>
											<button className="col-1 m_l_5 m_r_5 minuspuls" options={Fastbets} disabled={amount === min} onClick={(e) => fastBetActionsD(0)}><span style={{ fontSize: '20px' }}>&#8722;</span></button>
											<input className="col-7 m_l_5 m_r_5 m_t_10" type="range" style={{ appearance: "none", paddingLeft: "0", paddingRight: "0", borderRadius: "10px", border: "1px solide #000" }}
												min={min} max={max}
												id="myRange"
												value={amount}
												onChange={(e) => { RangeIncreament(e) }}
											/>
											<button className="col-1 m_l_5 m_r_5 minuspuls" options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(1)} >+</button>
									
											<input className="sliderBottom col-2 " type="text" value={UM.numberWithCommas(amount)} style={{ float: "right", color: "#FFF", textAlign: "center", background: fileName.name === "Riverpoker" ? '#5b5b5b' : '', borderRadius: fileName.name === "Riverpoker" ? '10px' : '', border: 'none' }} />
										</div>
									</div>
									<div className="errorMesageForGameslider">{errorMesageForGameslider}</div>
								</div>
							</div>
							:
							<div className="fd">
								<div className="riseOptions ">
									<div className="row span m_t_10">
										<li><button options={Fastbets} disabled={!props.options.showpot} onClick={(e) => fastBetActionsD(4)}>POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show2by3} onClick={(e) => fastBetActionsD(7)}>2/3 POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show1by2} onClick={(e) => fastBetActionsD(5)}>1/2 POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show3x} onClick={(e) => fastBetActionsD(3)}>3 BB</button></li>
										<li><button options={Fastbets} disabled={!props.options.show2x} onClick={(e) => fastBetActionsD(2)}>2 BB</button></li>
										<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(6)}>{min == max ? "All - In" : "Max"}</button></li>
										<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(1)} >+</button></li>
										<li><button options={Fastbets} disabled={amount === min} onClick={(e) => fastBetActionsD(0)}><span style={{ fontSize: '20px' }}>&#8722;</span></button></li>

									</div>
									<br />
									<div className="fd">
										<input className="col-10 " type="range" style={{ appearance: "none", paddingLeft: "0", paddingRight: "0", borderRadius: "10px", border: "1px solide #000" }}

											min={min} max={max}
											id="myRange"
											onChange={(e) => { RangeIncreament(e) }}
										/>
										

										<input className="sliderBottom col-2" type="number" value={amount} style={{ float: "right", color: "#FFF", textAlign: "center" }} />
									</div>
									<div className="errorMesageForGameslider">{errorMesageForGameslider}</div>
								</div>
							</div>
					)
				} */}


				{/* {showRiseOptions && (<div>
					<Dropdown options={Fastbets} onChange={(e) => fastBetActions(e.value)} placeholder="Fast Bets" />
				</div>)} */}


				<div className="buttonGroup" style={{ width: "100%", float: "right" }} key={props.doc}>
					{ButtonoptionsArray}
					{/* {(() => {
						let i = 0,
							cnt = props.options.action.length,
							optionsArray = [];
						for (i = 0; i < cnt; i++) {
							optionsArray.push(<Button key={i} name={props.options.action[i].name} amount={props.options.action[i].amount.toLocaleString("en-Us")} >
							</Button>);
							if (props.options.action[i].name === "PostBigBlind") {
								if (blindState) {
									props.network.send(`<PostBigBlind amount="${props.options.action[i].amount}"/>`);
									props.setGc(props.options.seatId);
									break;
								}
								props.options.action[i].name = "BB";
							}
							else if (props.options.action[i].name === "PostSmallBlind") {
								if (blindState) {
									props.network.send(`<PostSmallBlind amount="${props.options.action[i].amount}"/>`);
									props.setGc(props.options.seatId);

									break;
								}
								props.options.action[i].name = "SB";
							}
							else if (props.options.action[i].name === "PostThirdBlind") {
								if (blindState) {
									props.network.send(`<PostThirdBlind amount="${props.options.action[i].amount}"/>`);
									props.setGc(props.options.seatId);

									break;
								}
								props.options.action[i].name = "SB";
							}
							else if (props.options.action[i].name === "Muck" || props.options.action[i].name === "Show") {
								if (muckState) {
									props.network.send(`<Muck/>`);
									props.setGc(props.options.seatId);
									break;
								}
							}
							else if (props.options.action[i].name === "Run It Twice") {
								console.log("Run It Twice is called");
								if (runittwicevalue) {
									console.log("Run It Twice is called 1");
									props.network.send(`<RunItTwice accept="true"/>`);
									props.setGc(props.options.seatId);
									break;
								}

							}
							else if (props.options.action[i].name === "Run It Once") {
								console.log("Run It Once is called");
								if (runitoncevalue) {
									console.log("Run It Once is called 2");
									props.network.send(`<RunItTwice accept="false"/>`);
									props.setGc(props.options.seatId);
									break;
								}

							}
							else if (props.options.action[i].name === "SitIn") {
								try {
									gcbChild.current.setSitOutCheckTrue();
								} catch (e) {
									console.log(e)
								}
							}
							else if (props.options.action[i].name === actionBets.action) {
								if (radio !== null) {
									onClickActionsBets(actionBets.action, "");
								}
							}
						}
						return optionsArray;
					})()} */}

				</div>
			</div>


			{/* 
			{queue_error && <div className="checkboxGroup" style={{ display: props.options.showgamecontr !== 'visible' && props.options.quickAction.length !== 0 ? 'flex' : 'none', width: '50%', }}>
				{(() => {
					let q = 0,
						cnt = props.options.quickAction.length,
						quickOptionsArray = [];
					for (q = 0; q < cnt; q++) {
						quickOptionsArray.push(<Checkbox key={q} name={props.options.quickAction[q].name} amount={props.options.quickAction[q].amount}></Checkbox>);
					}
					return quickOptionsArray;

				})()}
			</div>} */}

			{/* <div className="GameCheckBox" style={{ display: 'flex', width: '50%', }}> */}
			{(queue_error) && <div className="GameCheckBox" style={{ display: props.options.showgamecontr !== 'visible' && props.options.quickAction.length !== 0 ? 'flex' : 'none', width: '50%', }}>
				{props.options.quickAction.map((option, index) => (
					<Checkbox
						key={index}
						name={option?.name}
						amount={option?.amount}
						setPreaction={setPreaction}
						setSelectedType={setSelectedType}
						selectedType={selectedType}
					/>
				))}
			</div>
			}



			{/* {(Screen.getDeviceType().name === "Mobile" && fileName.name === "Leader_bet") && (
				<div className="upArrow-riseOptions">
					<button type="button" onClick={onClickNewSlider}>
						<img src={upArrows} alt="" />
					</button>
				</div>
			)} */}
			{/* {(showRiseOptions && Screen.getDeviceType().name == "Mobile" && fileName.name === "Leader_bet") && (
				<div className="new-slider-cover">
					<div className="slide-bar-container">
						<div className="fd">
							<img className="silder-img_lb" src={silderBoder_lb} alt="" />
							<div className="slider_G_Controller fd" style={{ position: 'absolute', top: '0' }}>
								<input id="sliderBarGC" className="GC_backRange" style={{ top: '45px', left: '-43px', width: '35px' }} type="range" min={min} max={max} value={amount} onChange={onChangeSlider}></input>
								<div className="s-wrapper" style={{ left: '-64px', top: '92px' }}>
									<div className="s-track">
										<input id="inputSlider" className="s-input" type="range" min={min} max={max} value={amount} readOnly />
										<div className="s-thumb">
											<img src={slider_thumb_lb} alt="" style={{ width: '30px', transform: ' rotate(90deg)', margin: '0px 5px 10px 0px' }} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="slide-bar-value">{Number(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
					<div className="div-chin"></div>
				</div>
			)} */}
		</div>
	);
}




const Checkbox = ({ selectedType, setPreaction, setSelectedType, name, amount }) => {

	const onSelectType = (e) => {
		console.log(e.target)
		console.log(e.target.checked)
		if (e.target.checked) {
			setSelectedType(e.target.name);
			setPreaction({ name: e.target.name, amount: e.target.value });
		} else {
			setSelectedType("");
			setPreaction({ name: "", amount: "" });
		};
	};

	return (
		// <div className="custom-checkbox">
		// 	<input
		// 		type="checkbox"
		// 		id={name}
		// 		name={name}
		// 		value={amount}
		// 		onChange={onSelectType}
		// 		checked={selectedType === name}
		// 	/>
		// 	<label htmlFor={name}>{name} {amount}</label>
		// </div>

		// <div className="custom-checkbox">
		// 	<label htmlFor={name}>
		// 		<input type="checkbox" id={name} name={name} value={amount} onChange={onSelectType} checked={selectedType === name} />
		// 		{name} {amount}
		// 	</label>
		// </div>

		<div className="custom-checkbox">
			<label htmlFor={name} >
				<input
					type="checkbox"
					id={name}
					name={name}
					value={amount}
					onChange={onSelectType}
					checked={selectedType === name}
				/>
				{name} {amount}
			</label>
		</div>


	);
};

