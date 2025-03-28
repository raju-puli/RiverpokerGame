import { React, useState, useEffect, useRef, useMemo } from "react";
import GameCheckBox from "./checkBox";
import rangeshade from "./../../../../../assets/images/table/range_shade.svg";
import slider_thumb from './../../../../../assets/images/table/slider_thumb.png'
import silderBoder from './../../../../../assets/images/table/silderBoder.png'
// import silderBoder_lb from './../../../../../assets/images/table/silderBoder_lb.svg';
// import slider_thumb_lb from './../../../../../assets/images/table/slider-thumb_lb.png';
import close_1 from './../../../../../assets/images/table/close_1.svg';
import upArrows from "../../../../../assets/images/lobby/leaber_bet_icons/upArrows.png";


import Screen from "../../../../utils/screen";
import fileName from "../../../../../jsconfig";
import Emitter from "../../../../utils/eventEmitter";

import "../../../../../css/ui/table/gameController.css";
import "../../../../../css/media_queries/allpagesMedia.css";
import UM from "../../../../utils/utilityMethods";

export default function GameControllerPortrait(props) {
	// console.log(props.gameType)
	// console.log("Pot Limit table ", props.gameType.includes("PL"));
	// console.log("No Limit table ", props.gameType.includes("NL"));

	// console.log("========================game controller=============================")
	const gcbChild = useRef();
	// const [gamecontrollershow, setSamecontrollershow] = useState(true)
	const [amount, setAmount] = useState(props.options.rangeMin);
	const [min, setMin] = useState(props.options.rangeMin)
	const [max, setMax] = useState(props.options.rangeMax)
	const [blindState, setBlindState] = useState(false);
	const [muckState, setMuckState] = useState(false);
	// const [checkAmount, setCheckamount] = useState(null);
	const [check, setCheck] = useState(false);
	const [showRiseOptions, setShowRiseOptions] = useState(false);
	const [runitoncevalue, setRunitoncevalue] = useState(false);
	// const [hidetocheckbox, setHidetocheckbox] = useState(false)
	const [runittwicevalue, setRunittwicevalue] = useState(false);
	const [errorMesageForGameslider, setErrorMesageForGameslider] = useState(false)
	// const [cal, setCal] = useState(true)
	// const [show, setShow] = useState(true)
	const [lbFastActions, setLbFastActions] = useState("")
	const [selectedType, setSelectedType] = useState("")
	const [preAction, setPreaction] = useState({ name: "", amount: "" })
	const [queue_error, setQueue_error] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const Fastbets = [
		{ value: 7, label: '2/3 Pot' },
		{ value: 6, label: 'Max' },
		{ value: 5, label: '1/2 Pot' },
		{ value: 4, label: 'Pot' },
		{ value: 3, label: 'X3' },
		{ value: 2, label: 'X2' },
		{ value: 1, label: 'Plus' },
		{ value: 0, label: 'Minus' },
	];

	const [actionBets, setActionBets] = useState({ action: undefined, value: false });


	useEffect(() => {
		Emitter.on('clearQuickBetOptions', clearQuickOptions);
		return () => {
			Emitter.off('clearQuickBetOptions', clearQuickOptions);
		};
	}, [props.options.action]);
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
		// console.log("gamecontroller  >>  ", action + " ... " + state);
		switch (action) {
			case "SitOut":
				// if (!state) {
				// 	props.setGc(props.options.seatId);
				// }
				if (state) {
					gcbChild.current.setSitOutCheckTrue();
				} else {
					gcbChild.current.setSitOutCheck();
				};

				break;
			case "AutoPost":
				setBlindState(state);
				props.setCheckGc("AutoPost", state);
				break;
			case "AutoMuck":
				setMuckState(state);
				props.setCheckGc("AutoMuck", state);
				break;
			case "closeCheckAlert":
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
				// if (state) {
				if (state) {
					setRunitoncevalue(false);
					setRunittwicevalue(state);
				} else {
					setRunittwicevalue(state);
				}
				// props.setCheckGc(action, state);
				// }
				// else {
				// 	setRunittwicevalue(state)
				// 	props.setCheckGc("ritTwo", state);

				// }
				break;
			case "ritOne":
				// if (state) {
				if (state) {
					setRunittwicevalue(false);
					setRunitoncevalue(state);
				} else {
					setRunitoncevalue(state);
				}
				// props.setCheckGc(action, state);
				// }
				// else {
				// 	setRunitoncevalue(state);
				// 	props.setCheckGc("ritOne", state);
				// }
				break;
			case "VolumeMute":
				props.volumeaction(state);
				break;
			case "Addon":
				props.setCheckGc("Addon", state);
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
		setMin(props.options.rangeMin);
		setMax(props.options.rangeMax);
	}, [props.options.rangeMin, props.options.rangeMax]);
	useEffect(() => {
		if (props.options.showChecks) {
			gcbChild.current.enableDefaults();
		}
	}, [props.options.showChecks]);

	useEffect(() => {
		setQueue_error(true)
		return () => { setQueue_error(false) }
	}, [props.options.quickAction])

	const changeAmtlabl = (labelValue) => {
		const absValue = Math.abs(Number(labelValue));
		let formattedValue;

		if (absValue >= 1.0e9) {
			formattedValue = (absValue / 1.0e9).toFixed(2) + "B"; // billion
		} else if (absValue >= 1.0e6) {
			formattedValue = (absValue / 1.0e6).toFixed(2) + "M"; // million
		} else if (absValue >= 1.0e3) {
			formattedValue = (absValue / 1.0e3).toFixed(2) + "K"; // thousand
		} else {
			formattedValue = absValue.toFixed(2); // less than a thousand
		}

		// Remove trailing .00 if applicable
		if (formattedValue.endsWith('.00')) {
			return formattedValue.slice(0, -3); // Remove .00
		}
		else if (formattedValue.endsWith('.00B')) {
			return formattedValue.slice(0, -4) + "B"; // Remove .00
		}
		else if (formattedValue.endsWith('.00M')) {
			return formattedValue.slice(0, -4) + "M"; // Remove .00
		}
		else if (formattedValue.endsWith('.00K')) {
			return formattedValue.slice(0, -4) + "K"; // Remove .00
		}

		return formattedValue;
	};

	const Checkbox = (value) => {
		const onSelectType = (e) => {
			if (e.target.checked) {
				setSelectedType(e.target.name);
				// console.log(e.target.name)
				// console.log(e.target.value)
				setPreaction({ name: e.target.name, amount: e.target.value });
			} else {
				setSelectedType("");
				setPreaction({ name: "", amount: "" });
			};
		}
		/*===================== Check the type of amount =============================*/
		// let amount = (typeof (value.amount) !== 'number' ? value.amount.split(".")[0] : value.amount);
		let amount = value.amount;
		return (

			// <label className={selectedType === value.name ? "shadowlabel" : ""}> <input type="checkbox" key={value.name} name={value.name} value={value.amount} onChange={(event) => { onSelectType(event) }} checked={selectedType === value.name}></input>{value.name}{" "}{value.amount}</label>
			<label className={selectedType === value.name ? "shadowlabel" : ""}> <input type="checkbox" key={value.name} name={value.name} value={value.amount} onChange={(event) => { onSelectType(event) }} checked={selectedType === value.name}></input>{value.name}{" "}{amount <= 0 ? "" : changeAmtlabl(amount)}</label>
		);
	};



	const handleAction = (value) => {
		// Use a separate function to manage updates
		const performAction = (actionName, amount) => {
			resetAction();
			props.setGc(props.options.seatId, true);
			props.network.send(`<${actionName} amount="${amount}"/>`);
		};

		if (preAction.name) {
			switch (preAction.name) {
				case "Fold":
					if (value.name === 'Check') {
						resetAction();
						setTimeout(() => {
							setCheck(true);
						}, 200);
					} else if (value.name === 'Call') {
						performAction("Fold");
					}
					break;

				case "Check":
					if (value.name === preAction.name) {
						performAction("Check");
					}
					break;

				case "Call":
					if (value.name === preAction.name) {
						performAction("Call", value.amount);
					}
					break;

				case "Bet":
					if (value.name === preAction.name) {
						performAction("Bet", value.amount);
					}
					break;

				case "Raise":
					if (value.name === preAction.name) {
						performAction("Raise", value.amount);
					}
					break;

				case "Raise Any":
					if (value.name === "Raise") {
						performAction("Raise", value.amount);
					}
					break;

				case "Call Any":
					if (value.name === "Call") {
						performAction("Call", value.amount);
					}
					break;

				case "Check/Fold":
					if (value.name === 'Check') {
						performAction("Check");
					} else if (value.name === 'Call') {
						performAction("Fold");
					}
					break;

				default:
					break;
			}
		}
	};

	const resetAction = () => {
		setTimeout(() => {
			setSelectedType("");
			setPreaction({ name: '', amount: '' });
		}, 500);
	};


	const Button = (value) => {
		// console.log("Value", value)
		if (preAction.name !== '') {
			handleAction(value);
			// if (preAction.name === "Fold") {
			// 	if (value.name) {
			// 		if (value.name === 'Check') {
			// 			setSelectedType("");
			// 			setPreaction({ name: '', amount: '' });
			// 			setCheck(true);
			// 		} else if (value.name === 'Call') {
			// 			setSelectedType("");
			// 			setPreaction({ name: '', amount: '' });
			// 			props.setGc(props.options.seatId, true);
			// 			props.network.send(`<Fold/>`);
			// 		}
			// 	}
			// } else if (preAction.name === "Check") {
			// 	if (value.name === preAction.name) {
			// 		setSelectedType("");
			// 		setPreaction({ name: '', amount: '' });
			// 		props.setGc(props.options.seatId, true);
			// 		props.network.send(`<Check/>`);
			// 	}
			// } else if (preAction.name === "Call") {
			// 	if (value.name === preAction.name) {
			// 		// if (Number(value.amount) === Number(preAction.amount)) {
			// 		setSelectedType("");
			// 		setPreaction({ name: '', amount: '' });
			// 		props.setGc(props.options.seatId, true);
			// 		props.network.send(`<Call amount="${value.amount}"/>`);
			// 		// }
			// 	}
			// } else if (preAction.name === "Bet") {
			// 	if (value.name === preAction.name) {
			// 		setSelectedType("");
			// 		setPreaction({ name: '', amount: '' });
			// 		props.setGc(props.options.seatId, true);
			// 		props.network.send(`<Bet amount="${value.amount}"/>`);
			// 	}
			// } else if (preAction.name === "Raise") {
			// 	if (value.name === preAction.name) {
			// 		// if (Number(value.amount) === Number(preAction.amount)) {
			// 		setSelectedType("");
			// 		setPreaction({ name: '', amount: '' });
			// 		props.setGc(props.options.seatId, true);
			// 		props.network.send(`<Raise amount="${value.amount}"/>`);
			// 		// }
			// 	}
			// } else if (preAction.name === "Raise Any") {
			// 	if (value.name === "Raise") {
			// 		setSelectedType("");
			// 		setPreaction({ name: '', amount: '' });
			// 		props.setGc(props.options.seatId, true);
			// 		props.network.send(`<Raise amount="${value.amount}"/>`);
			// 	}
			// } else if (preAction.name === "Call Any") {
			// 	if (value.name === "Call") {
			// 		setSelectedType("");
			// 		setPreaction({ name: '', amount: '' });
			// 		props.setGc(props.options.seatId, true);
			// 		props.network.send(`<Call amount="${value.amount}"/>`);
			// 	}
			// } else {
			// 	if (preAction.name === "Check/Fold") {
			// 		if (value.name) {
			// 			if (value.name === 'Check') {
			// 				setSelectedType("");
			// 				setPreaction({ name: '', amount: '' });
			// 				props.setGc(props.options.seatId, true);
			// 				props.network.send(`<Check/>`);
			// 			} else if (value.name === 'Call') {
			// 				setSelectedType("");
			// 				setPreaction({ name: '', amount: '' });
			// 				props.setGc(props.options.seatId, true);
			// 				props.network.send(`<Fold/>`);
			// 			}
			// 		}

			// 	}
			// }
		}





		// if (radio !== null && value.amount !== "") {
		// 	// console.log(actionBets.action + "     =============this is what checked")
		// 	// console.log(value.name + "     =============this is what value.name")
		// 	setRadio(null);

		// 	if (value.name === "Raise" && actionBets.action === "Raise") {
		// 		// setCheckamount(value.amount);
		// 		props.network.send(`<Raise amount="${value.amount}"/>`);
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	else if (value.name === "Call" && actionBets.action === "Call") {
		// 		// setCheckamount(value.amount);
		// 		props.network.send(`<Call amount="${value.amount}"/>`);
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	else if (value.name === "Bet" && actionBets.action === "Bet") {
		// 		// setCheckamount(value.amount);
		// 		props.network.send(`<Bet amount="${value.amount}"/>`);
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	else if (value.name === "Raise" && actionBets.action === "Check") {
		// 		// console.log("value.name === Raise&&actionBets.action === Call&&value.name === Check------>1")
		// 	}
		// 	else if (actionBets.action === "Call" && actionBets.action === "Check") {
		// 		// console.log("value.name === Raise&&actionBets.action === Call&&value.name === Check---------->2")
		// 	}
		// 	else if (value.name === "Bet" && actionBets.action === "Check") {
		// 		// console.log("value.name === Bet&&actionBets.action === Check")
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	else if (actionBets.action === "Fold") {
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	else if (value.name === "Run It Twice") {
		// 		if (runittwicevalue) {
		// 			props.showSliderRUNIT(true);
		// 			props.network.send(`<RunItTwice accept="true"/>`);
		// 		}
		// 		// else {
		// 		// props.showSliderRUNIT(false)
		// 		// };
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	else if (value.name === "Run It Once") {
		// 		if (runitoncevalue) {
		// 			props.showSliderRUNIT(true)
		// 			props.network.send(`<RunItTwice accept="false"/>`);
		// 		}
		// 		// else {
		// 		// props.showSliderRUNIT(false)
		// 		// // };
		// 		props.setGc(props.options.seatId);
		// 	}
		// 	// console.log(value.name)

		// 	// setRadio(null);
		// }




		const onClickButton = () => {
			setSelectedType("");
			setLbFastActions('');
			setPreaction({ name: '', amount: '' });
			setShowRiseOptions(false);
			// console.log(value, amount)
			if (value.name !== "Raise") {
				setAmount(value.amount);
			}
			if (value.name === "SitIn") {
				// gcbChild.current.setSitOutCheck();
				if (value.amount === 0) {
					props.setAction("BuyChips")
					props.handlecheckBox(true)
				} else {
					props.network.send(`<SitIn/>`);
					props.setGc(props.options.seatId);
					props.handlecheckBox(false);
					gcbChild.current.setSitOutCheck()
					// gcbChild.current.setSitOutCheckTrue();
				}

			}
			if (value.name === "SitOut") {
				props.network.send(`<SitOut/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "BB") {
				props.network.send(`<PostBigBlind amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "SB") {
				props.network.send(`<PostSmallBlind amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Call") {
				props.network.send(`<Call amount="${value.amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Bet") {
				props.network.send(`<Bet amount="${amount}"/>`);
				props.setGc(props.options.seatId);
			}
			if (value.name === "Raise") {
				props.network.send(`<Raise amount="${amount}"/>`);
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

		function handleRaiseconform() {
			setShowRiseOptions(true)
			setTimeout(() => {
				setShowRiseOptions(false)
			}, 30000);
		}
		if (value.name === "Raise" || value.name === "Bet") {
			if (Screen.getDeviceType().name === "Mobile") {
				if (!showRiseOptions) {
					return (
						<button onClick={(amount !== max && lbFastActions === "") ? handleRaiseconform : onClickButton} className="gCbtn" >
							<div id="raiseBtn">{Number(amount) === Number(value.myBalance) ? 'All-In' : value.name}</div>
							{/* <div>{UM.numberWithCommas(amount)}</div> */}
							<div>{UM.changeAmtLabel(amount)}</div>
						</button>
					);
				}
				if (showRiseOptions) {
					return (
						<button onClick={onClickButton} className="gCbtn" >
							<div id="raiseBtn">Confirm</div>
							<div>{UM.changeAmtLabel(amount)}</div>

						</button>
					);
				};
			}
			if (Screen.getDeviceType().name === "Desktop") {
				// Format the amount to have 2 decimal places if it includes a decimal, otherwise 0 decimal places
				// let maxAmount = Number(amount).toFixed(2);

				return (
					<button className="gCbtnSub" onClick={onClickButton}>
						<div>
							{amount === value.myBalance ? 'All-In' : value.name}{" "}
							{/* {UM.numberWithCommas(amount)} */}
							<div>{UM.changeAmtLabel(amount)}</div>
						</div>
					</button>
				);
			}

		} else if (value.name === "SitIn") {
			return (
				<button className="gCbtnSub" onClick={onClickButton}>
					<div>{value.name}</div>
					{/* <div>{value.amount}</div> */}
				</button>
			);
		} else if (value.name === "SitOut") {
			return (
				<button className="gCbtnSub" onClick={onClickButton}>
					<div>{value.name}</div>
				</button>
			);
		}
		else if (value.name === "Run It Once" || value.name === "Run It Twice") {
			return (
				<button onClick={onClickButton} className="gCbtnSub" >
					{/* <span>{value.name}{" "}{value.amount} </span> */}
					<span>{value.name} </span>
				</button>
			);
		}
		else if (value.name === "Show" || value.name === "Muck") {
			return (
				<button onClick={onClickButton} className="gCbtnSub" >
					<span>{value.name}</span>
				</button>
			);
		}
		else {

			return (
				<button onClick={onClickButton} className="gCbtn" >
					{/* <span>{value.name} </span> */}
					<span>{Number(value.amount) === Number(value.myBalance) && value.name === "Call" ? 'All-In' : value.name}{" "}{value.name === "Call" ? UM.numberWithCommas(value.amount) : ""} </span>
				</button>
			);
		}
		updateGradient(value.amount);

	};
	function RangeIncreament(e) {
		e.preventDefault()
		const rangeInput = document.getElementById('myRange');
		// console.log(rangeInput)
		const minValue = parseFloat(rangeInput.min);
		const maxValue = parseFloat(rangeInput.max);
		const currentValue = parseFloat(rangeInput.value);
		setAmount(currentValue)

		const percentage = (currentValue - minValue) / (maxValue - minValue) * 100;

		//   const percentage = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
		let gradient;
		if (fileName.name === "Leader_bet") {
			gradient = `linear-gradient(to right, #515151 0%, #515151 ${percentage}%, #0C0C0C ${percentage}%, #0C0C0C 100%)`;
		} else {
			gradient = `linear-gradient(to right, red 0%, yellow ${percentage}%, #476078 ${percentage}%, #476078 100%)`;
		}
		// const gradient = `linear-gradient(to right, red 0%, yellow ${percentage}%, #476078 ${percentage}%, #476078 100%)`;
		rangeInput.style.background = gradient;
		// const thumb = rangeInput.shadowRoot.querySelector('input[type="range"]::-webkit-slider-thumb');
		// const thumb1 = rangeInput.shadowRoot.querySelector('input[type="range"]::-webkit-slider-thumb:active');
		// thumb.style.WebkitSliderThumb.backgroundImage =`url(${slider_thumbd})`;
		// thumb1.style.WebkitSliderThumb.backgroundImage =`url(${slider_thumbd})`;

	}
	const updateGradient = (data) => {

		const rangeInput = document.getElementById('myRange');

		const minValue = parseFloat(rangeInput.min);
		const maxValue = parseFloat(rangeInput.max);
		// const currentValue = parseFloat(rangeInput.value);
		const currentValue = data;
		// setAmount(currentValue)

		const percentage = (currentValue - minValue) / (maxValue - minValue) * 100;

		// console.log("percentage", percentage)
		// console.log("minValue", minValue)
		// console.log("maxValue", maxValue)
		// console.log("currentValue", currentValue)

		//   const percentage = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
		let gradient;
		if (fileName.name === "Leader_bet") {
			gradient = `linear-gradient(to right, #515151 0%, #515151 ${percentage}%, #0C0C0C ${percentage}%, #0C0C0C 100%)`;
		} else {
			gradient = `linear-gradient(to right, red 0%, yellow ${percentage}%, #476078 ${percentage}%, #476078 100%)`;
		}
		rangeInput.style.background = gradient;
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


	const onChangeSlider = (e, fileName) => {
		// console.log(e)
		// console.log(e.target)
		// console.log(e.target.value)
		// const sv = document.getElementById("sliderBarGC");
		// const setAmount = (value) => { };
		setAmount(e.target.value);
		const sliderWrapper = (fileName === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? document.querySelector('.s-wrapper_lb') : document.querySelector('.s-wrapper');
		const sliderInput = (fileName === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? document.querySelector('.s-input_lb') : document.querySelector('.s-input');
		// const maxValue = +sliderInput.max;

		const updateSlider = () => {
			const progress = 100 * (e.target.value - e.target.min) / (e.target.max - e.target.min);
			sliderWrapper.style.setProperty('--slider-progress', progress);
		};

		sliderInput.addEventListener('input', updateSlider);
		updateSlider();
	};


	// const [radio, setRadio] = useState(null);

	// function changeRadio(id) {


	// 	setRadio(id)


	// }


	// const onClickActionsBets = (actionBet, stateBet) => {

	// 	switch (actionBet) {
	// 		case "Fold":
	// 			if (actionBets.value) {
	// 				props.network.send(`<Fold/>`);
	// 				// console.log("knock knock - Fold");
	// 			} else {
	// 				// console.log("default fold not enabled ................................");
	// 			}
	// 			break;
	// 		case "Check":
	// 			if (actionBets.value) {
	// 				props.network.send(`<Check/>`);
	// 				// console.log("knock knock - Check");
	// 			} else {
	// 				// console.log("default checks not enabled ................................");
	// 			}
	// 			break;
	// 		case "Call":
	// 			if (actionBets.value) {
	// 				// console.log("knock knock - Call");
	// 			} else {
	// 				// console.log("default call not enabled ................................");
	// 			}
	// 			break;
	// 		case "Bet":
	// 			if (actionBets.value) {
	// 				// console.log("knock knock - Bet");
	// 			} else {
	// 				// console.log("default Bet not enabled ................................");
	// 			}
	// 			break;
	// 		case "Raise":
	// 			if (actionBets.value) {
	// 				// console.log("knock knock - raise");
	// 			} else {
	// 				// console.log("default Raise not enabled ................................");
	// 			}
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// }


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
	function fastBetActions(e) {
		// console.log(e)
		// console.log(e.target.name)
		const sliderWrapper = fileName.name === ("Leader_bet" && Screen.getDeviceType().name === "Mobile") ? document.querySelector('.s-wrapper_lb') : document.querySelector('.s-wrapper');

		switch (e.target.name) {
			case 'max':
				setAmount(max);
				const progress = 100;
				sliderWrapper.style.setProperty('--slider-progress', progress);
				break;
			case 'pot':
				if (props.options.showpot) {
					setAmount(Number(props.options.valuepot));
					const progress = Number(props.options.valuepot) * 100 / Number(max);
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			case '2/3pot':
				if (props.options.show2by3) {
					setAmount(Number(props.options.value2by3));
					const progress = (2 * Number(props.options.value2by3) / 3) * 100 / Number(max);
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			case '1/2pot':
				if (props.options.show1by2) {
					setAmount(Number(props.options.valuepot) / 2);
					const progress = (Number(props.options.valuepot) / 2) * 100 / Number(max);
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			case '3bb':
				if (props.options.show3x) {
					setAmount(Number(props.options.bigblindValue) * 3);
					const progress = (Number(props.options.bigblindValue) * 3) * 100 / Number(max);
					// console.log("3bb   >>>   ", progress)
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			case '2bb':
				if (props.options.show2x) {
					setAmount(Number(props.options.bigblindValue) * 2);
					const progress = (Number(props.options.bigblindValue) * 2) * 100 / Number(max);
					// console.log("2bb   >>>   ", progress)
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			case 'addition':
				if (Number(amount) + 100 < Number(max)) {
					setAmount(Number(e.target.value) + 100);
					// console.log("addition  ", e.target.value)
					if (Number(e.target.value) + 100 < Number(max)) {
						const progress = (100 * ((Number(e.target.value) + 100) - Number(min)) / (Number(max) - Number(min)));
						// console.log("addition  ", progress)
						sliderWrapper.style.setProperty('--slider-progress', progress);
					}
				} else {
					setAmount(max)
					const progress = 100;
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			case 'subtraction':
				if (Number(amount) - 100 > Number(min)) {
					setAmount(Number(amount) - 100);
					// console.log("subtraction  ", e.target.value)
					if (Number(e.target.value) - 100 > Number(min)) {
						const progress = 100 * ((Number(e.target.value) - 100) - Number(min)) / (Number(max) - Number(min));
						// console.log("subtraction  ", progress)
						sliderWrapper.style.setProperty('--slider-progress', progress);
					}
				} else {
					setAmount(min)
					const progress = 0;
					sliderWrapper.style.setProperty('--slider-progress', progress);
				}
				break;
			default:
				break;
		}

	}


	function fastBetActionsD(e) {
		var timeoutAction;
		var minAmount = Number(min)
		var maxAmount = Number(max)
		var totalAmount = Number(amount)
		// const rangeInput = document.getElementById('myRange');
		setErrorMesageForGameslider("");
		// clearTimeout(this.timeoutAction);
		clearTimeout(timeoutAction);

		switch (e) {
			case 0:
				if (minAmount < totalAmount) {
					const decrement = totalAmount * 0.2;
					const newValue = Math.max(totalAmount - decrement, minAmount);
					setAmount(newValue);
					updateGradient(newValue);
				} else {
					setErrorMesageForGameslider("Bet amount can't be less than minimum amount");
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("");
					}, 3000);
				}
				break;

			case 1:
				if (maxAmount > totalAmount) {
					const increment = totalAmount * 0.2;
					const newValue = Math.min(totalAmount + increment, maxAmount);
					setAmount(newValue);
					updateGradient(newValue);
				} else {
					setErrorMesageForGameslider("Raise amount shouldn't be greater than maximum amount");
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("");
					}, 3000);
				}
				break;
			case 2:
				if (minAmount * 2 < maxAmount) {
					// setAmount((min) * 2);
					// updateGradient((min) * 2)
					setAmount(Number(props.options.bigblindValue) * 2);
					updateGradient(Number(props.options.bigblindValue) * 2)
				} else {
					setErrorMesageForGameslider("2BB amount shouldn't be greater than maximum amount")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				}
				break;
			case 3:
				if (minAmount * 3 < maxAmount) {
					// setAmount((min) * 3);
					// updateGradient((min) * 3)
					setAmount(Number(props.options.bigblindValue) * 3);
					updateGradient(Number(props.options.bigblindValue) * 3)
				} else {
					setErrorMesageForGameslider("3BB amount shouldn't be greater than maximum amount")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				}
				break;
			case 4:
				if (props.options.valuepot >= minAmount && props.options.valuepot <= maxAmount) {
					setAmount(props.options.valuepot);
					updateGradient(props.options.valuepot)
				} else if (props.options.valuepot === null) {
					setErrorMesageForGameslider("Pot amount not available")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				} else if (props.options.valuepot > maxAmount) {
					setErrorMesageForGameslider("Pot amount shouldn't be greater than maximum amount")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				} else {
					setErrorMesageForGameslider("Pot amount shouldn't be less than minimum amount")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				}
				break;
			case 5:
				if (((props.options.valuepot) / 2) > minAmount) {
					setAmount(Number(props.options.value1by2));
					updateGradient(((props.options.valuepot) / 2));
				} else if (props.options.valuepot === null) {
					setErrorMesageForGameslider("Pot amount not available")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("");
					}, 3000);
				}
				else {
					setErrorMesageForGameslider("1/2Pot amount shouldn't be less than minimum amount")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				}
				break;
			case 6:
				setAmount(max);
				updateGradient(max);
				break;
			case 7:
				if (((props.options.valuepot) * 2 / 3) > minAmount) {
					setAmount(((props.options.valuepot) * 2 / 3).toFixed());
					updateGradient(((props.options.valuepot) * 2 / 3).toFixed());
				} else if (props.options.valuepot == null) {
					setErrorMesageForGameslider("Pot amount not available")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				}
				else {
					setErrorMesageForGameslider("2/3Pot amount shouldn't be less than minimum amount")
					timeoutAction = setTimeout(() => {
						setErrorMesageForGameslider("")
					}, 3000);
				}
				break;
			default:
				break;
		}
	}

	const onClickNewSlider = (e) => {

		props.setCheckGc("playerLevelInfo", true);
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

	}
	function fastBetActions_lb(e) {
		setSelectedType("")
		setPreaction({ name: '', amount: '' })
		if (lbFastActions !== e.target.id) {
			setLbFastActions(e.target.id);
			switch (e.target.id) {
				case "max":
					setAmount(max);
					break;
				case "1/2":
					setAmount(Number(props.options.value1by2));
					break;
				case "2/3":
					setAmount(Number(props.options.value2by3));
					break;
				case "X5":
					setAmount(Number(props.options.bigblindValue) * 5);
					break;
				case "X3":
					setAmount(Number(props.options.bigblindValue) * 3);
					break;
				case "X2":
					setAmount(Number(props.options.bigblindValue) * 2);
					// console.log(Number(props.options.bigblindValue) * 2)
					break;
				default:
					// console.log(e.target.name)
					break;
			}
		} else {
			setAmount(min);
			setLbFastActions('');
		}
	};



	// const renderOptionsArray = () => {
	const renderOptionsArray = useMemo(() => {
		let optionsArray = [];
		// const cnt = props.options.action.length;

		// console.log(props.options.action)


		const uniqueItems = props.options.action.filter((item, index, self) =>
			index === self.findIndex((t) => (
				t.name === item.name
			))
		);
		const cnt = uniqueItems.length;

		for (let i = 0; i < cnt; i++) {
			// const action = props.options.action[i];
			// console.log(uniqueItems)
			const action = uniqueItems[i];
			// console.log(action);
			optionsArray.push(
				<Button
					key={i}
					name={action.name}
					myBalance={props.myBalance}
					amount={action.amount}
				/>
			);


			if (action.name === "PostBigBlind") {
				if (blindState) {
					props.network.send(`<PostBigBlind amount="${action.amount}"/>`);
					props.setGc(props.options.seatId);
					break;
				}
				props.options.action[i].name = "BB";
			} else if (action.name === "PostSmallBlind") {
				if (blindState) {
					props.network.send(`<PostSmallBlind amount="${action.amount}"/>`);
					props.setGc(props.options.seatId);
					break;
				}
				props.options.action[i].name = "SB";
			} else if (action.name === "PostThirdBlind") {
				if (blindState) {
					props.network.send(`<PostThirdBlind amount="${action.amount}"/>`);
					props.setGc(props.options.seatId);
					break;
				}
				props.options.action[i].name = "SB";
			} else if (action.name === "Muck" || action.name === "Show") {
				if (muckState) {
					props.network.send(`<Muck/>`);
					props.setGc(props.options.seatId);
					break;
				}
			}
			else if (action.name === "SitIn") {
				try {
					gcbChild.current.setSitOutCheck();
					// gcbChild.current.setSitOutCheckTrue();
				} catch (e) {
					console.error(e);
				}
			}
			if (action.name === "Run It Once") {
				if (runitoncevalue) {
					props.network.send(`<RunItTwice accept="false"/>`);
					props.setGc(props.options.seatId);
					break;
				}
			}
			if (action.name === "Run It Twice") {
				if (runittwicevalue) {
					props.network.send(`<RunItTwice accept="true"/>`);
					props.setGc(props.options.seatId);
					break;
				}
			}
			else if (action.name === actionBets.action) {
				// if (radio !== null) {
				// 	onClickActionsBets(actionBets.action, "");
				// }
			}
		}

		return optionsArray;
	}, [props.options.action, props.options.action.map(action => action.amount), blindState, muckState, runittwicevalue, runitoncevalue, actionBets.action]);



	const renderQuickOptionsArray = () => {
		let quickOptionsArray = [];
		const cnt = props.options.quickAction.length;
		if (!props.options.action.length) {

			for (let q = 0; q < cnt; q++) {
				const quickAction = props.options.quickAction[q];

				quickOptionsArray.push(
					<Checkbox
						key={q}
						name={quickAction.name}
						amount={quickAction.amount}
					/>
				);
			}
		}

		return quickOptionsArray;
	};

	// const renderQuickOptionsArray = useMemo(() => {
	// 	let quickOptionsArray = [];
	// 	const cnt = props.options.quickAction.length;

	// 	for (let q = 0; q < cnt; q++) {
	// 		const quickAction = props.options.quickAction[q];

	// 		quickOptionsArray.push(
	// 			<Checkbox
	// 				key={q}
	// 				name={quickAction.name}
	// 				amount={quickAction.amount}
	// 			/>
	// 		);
	// 	}

	// 	return quickOptionsArray;
	// }, [props.options.quickAction]);
	const countDigits = (value) => {
		// console.log(value)
		if (value) {
			const digitCount = value.toString().replace(/\D/g, '').length;
			return digitCount;
		}
	};
	const checking = (amount) => {
		// let windowWidth = window.innerWidth;
		let countDigitsPlayer = countDigits(amount);
		let showAmount = "";
		if (countDigitsPlayer) {
			// console.log(countDigitsPlayer)
			try {
				if (countDigitsPlayer > 6) {
					showAmount = UM.changeAmtLabel(amount);
				} else {
					showAmount = UM.numberWithCommas(amount);
				}
			} catch (e) { console.error(e.message) };
			return showAmount;
		}
		return UM.numberWithCommas(amount);
	}


	return (
		<div>
			{/* {closeCheck &&  */}
			<GameCheckBox ref={gcbChild} leaveTablebtn={props.leaveTablebtn} showRitBox={props.showRitBox} network={props.network} showCheckBox={props.showCheckBox} actions={checkBoxActions} showAlert={props.showAlert} settingsAddonNrebuy={props.settingsAddonNrebuy} ></GameCheckBox>
			{check && <div >
				<div className="popCover_1" onClick={(e) => { e.preventDefault(); closeAlert(); }}> </div>
				<div className="popup_1">
					<div className="popup_1_in">
						<div className="head"> Alert
							<button className="close_1" onClick={(e) => { e.preventDefault(); closeAlert(); }}>  <img src={close_1} alt="" />  </button>
						</div>
						<div className="fd clr_ff p_lr_15 text_center p_t_15 p_b_10">
							Do you really want to Fold ? you have an option to check
						</div>

						<div className="fd">
							<ul className="footUl">
								<li>
									<button className="btn_1" onClick={(e) => { e.preventDefault(); TakeFold(); }}>Fold</button>
								</li>
								<li>
									<button className="btn_1" onClick={(e) => { e.preventDefault(); TakeCheck(); }}>Check</button>
								</li>
							</ul>
						</div>

					</div>

				</div>
			</div>}


			{/* <div className="gameController" style={{ visibility: props.options.showgamecontr }} > */}
			<div className={fileName.name === "Leader_bet" && Screen.getDeviceType().name === "Mobile" ? "gameController_lb" : "gameController"} style={{ visibility: props.options.showgamecontr, marginBottom: (props.opentables > 2 && fileName.name === "Riverpoker") ? '25px' : '' }} >
				{showRiseOptions && (
					<div className="fd" style={{ opacity: '0' }}>
						<div className="sliderRange">
							<div className="range_box_1">
								<img className="range_shade" src={rangeshade} alt="" />
								<div className="range_box_2" id="range_box_2"></div>
								<input id="gCsliderBar" type="range" step="0.01" className="rangeInput" name="rangeInput" min={props.options.rangeMin}
									max={props.options.rangeMax} value={amount} onChange={(e) => updateTextInput(e)} />
							</div>
							<input type="text" id="textInput" className="rangeValue text_center" value={amount} readOnly />
						</div>
					</div>
				)}






				{/* }   */}
				{/* showCheckBox={props.showCheckBox} */}










				{/* {showRiseOptions && (<div>
					<Dropdown options={Fastbets} onChange={(e) => fastBetActions(e.value)} placeholder="Fast Bets" />
				</div>)} */}
				{(showRiseOptions && Screen.getDeviceType().name === "Mobile" && fileName.name !== "Leader_bet") && (
					<div className="fd">
						<div className="riseOptions">
							<div className="span">
								{/* <li><button disabled={amount === max} name="max" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>{amount === max ? 'All-In' : 'Max'}</button></li> */}
								{props?.gameType.includes("PL") ?
									<li><button disabled={amount === max} name="max" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>{'Max'}</button></li> :
									<li><button disabled={amount === max} name="max" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>{'All-In'}</button></li>
								}
								<li><button disabled={!props.options.showpot} name="pot" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>POT</button></li>
								<li><button disabled={!props.options.show2by3} name="2/3pot" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>2/3 POT</button></li>
								<li><button disabled={!props.options.show1by2} name="1/2pot" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>1/2 POT</button></li>
								<li><button disabled={!props.options.show3x} name="3bb" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>3 BB</button></li>
								<li><button disabled={!props.options.show2x} name="2bb" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>2 BB</button></li>
								<li><button disabled={amount === max} name="addition" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}>+</button></li>
								<li><button disabled={amount === min} name="subtraction" min={min} max={max} value={amount} onClick={(e) => fastBetActions(e)}><span style={{ fontSize: '20px' }}>&#8722;</span></button></li>
							</div>
							<div className="span">
								<div className="fd">
									<img src={silderBoder} alt="" style={{ height: '260px' }} />
									<div className="sliderTop">
										<small>{UM.numberWithCommas(props.options.rangeMax)}</small>
									</div>
									<div className="slider_G_Controller fd" style={{ position: 'absolute', top: '0' }}>
										<input id="sliderBarGC" className="GC_backRange" type="range" step="0.01" min={min} max={max} value={amount} onChange={onChangeSlider}></input>
										<div className="s-wrapper">
											<div className="s-track">
												<input id="inputSlider" className="s-input" type="range" step="0.01" min={min} max={max} value={amount} readOnly />
												<div className="s-thumb">
													<img src={slider_thumb} alt="" style={{ width: '30px' }} />
												</div>
											</div>
										</div>
									</div>
									<div className="sliderBottom">
										<small>{UM.numberWithCommas(amount)}</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{/* {console.log("Check Raise", props.options.action.length, Screen.getDeviceType().name, fileName.name)
				} */}
				{(props.options.action.length > 2) &&
					Screen.getDeviceType().name === "Desktop" && (
						(fileName.name === "Leader_bet" || fileName.name === "Riverpoker") ?
							<div className="fd">
								<div className="riseOptions">
									<div className="row span m_t_10">
										<li><button options={Fastbets} disabled={!props.options.showpot} onClick={(e) => fastBetActionsD(4)}>POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show2by3} onClick={(e) => fastBetActionsD(7)}>2/3 POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show1by2} onClick={(e) => fastBetActionsD(5)}>1/2 POT</button></li>
										<li><button options={Fastbets} disabled={!props.options.show3x} onClick={(e) => fastBetActionsD(3)}>3 BB</button></li>
										<li><button options={Fastbets} disabled={!props.options.show2x} onClick={(e) => fastBetActionsD(2)}>2 BB</button></li>
										{props?.gameType.includes("PL") ?
											<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(6)}>{"Max"}</button></li> :
											<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(6)}>{"All - In"}</button></li>
										}

									</div>
									<br />
									<div className="fd">
										<div className="row" style={{ padding: fileName.name === "Riverpoker" ? '0px 5px 5px 5px' : '' }}>
											<button className="col-1 m_l_5 m_r_5 minuspuls" options={Fastbets} disabled={amount === min} onClick={(e) => fastBetActionsD(0)}><span style={{ fontSize: '20px' }}>&#8722;</span></button>
											<input className="col-7 m_l_5 m_r_5 m_t_10" type="range" style={{ appearance: "none", paddingLeft: "0", paddingRight: "0", borderRadius: "10px", border: "1px solide #000" }}
												min={min} max={max} step="0.01"
												id="myRange"
												value={amount}
												onChange={(e) => { RangeIncreament(e) }}
											/>
											<button className="col-1 m_l_5 m_r_5 minuspuls" options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(1)} >+</button>
											{/* <input className="sliderBottom col-2 " type="number" value={amount} style={{ float: "right", color: "#FFF", textAlign: "center", background: fileName.name === "Riverpoker" ? '#5b5b5b' : '', borderRadius: fileName.name === "Riverpoker" ? '10px' : '', border: 'none' }} /> */}
											{/* <input className="sliderBottom col-2 " type="text" value={UM.numberWithCommas(amount)} style={{ float: "right", color: "#FFF", textAlign: "center", background: fileName.name === "Riverpoker" ? '#5b5b5b' : '', borderRadius: fileName.name === "Riverpoker" ? '10px' : '', border: 'none' }} /> */}
											<input className="sliderBottom col-2 sreekanth" type="text" value={checking(amount)}
												onMouseEnter={() => setIsHovered(true)} // Show on hover
												onMouseLeave={() => setIsHovered(false)}
												style={{
													float: "right", color: "#FFF",

													textAlign: "center", background: fileName.name === "Riverpoker" ? '#5b5b5b' : '', borderRadius: fileName.name === "Riverpoker" ? '10px' : '', border: 'none'
												}} />
											{isHovered && (
												<div
													style={{
														position: 'absolute',
														top: '-30px', // Position above the input field
														right: "10px",
														borderRadius: "15px",
														backgroundColor: '#0E1E33',
														padding: '5px',
														border: '1px solid #d6ba6d',
														fontSize: '14px',
														boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
														zIndex: 10,
														color: "#d6ba6d"
													}}
												>
													{UM.numberWithCommas(amount)} {/* Show the value of the input */}
												</div>
											)}
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
										<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(6)}>{Number(min) === Number(max) ? "All - In" : "Max"}</button></li>
										<li><button options={Fastbets} disabled={amount === max} onClick={(e) => fastBetActionsD(1)} >+</button></li>
										<li><button options={Fastbets} disabled={amount === min} onClick={(e) => fastBetActionsD(0)}><span style={{ fontSize: '20px' }}>&#8722;</span></button></li>

									</div>
									<br />
									<div className="fd">
										<input className="col-10 " type="range" style={{ appearance: "none", paddingLeft: "0", paddingRight: "0", borderRadius: "10px", border: "1px solide #000" }}
											step="0.01"
											min={min} max={max}
											id="myRange"
											onChange={(e) => { RangeIncreament(e) }}
										/>
										{/* <div className="col-10 "><img src={slider_thumbd} /></div> */}

										<input className="sliderBottom col-2" type="number" value={amount} style={{ float: "right", color: "#FFF", textAlign: "center" }} />
									</div>
									<div className="errorMesageForGameslider">{errorMesageForGameslider}</div>
								</div>
							</div>
					)
				}

				{/* <div className="buttonGroup" style={Screen.getDeviceType().style.buttonGroup}> */}
				{/* <div className={fileName.name === "Leader_bet" && Screen.getDeviceType().name == "Mobile" ? "buttonGroup_lb" : "buttonGroup"} style={Screen.getDeviceType().style.buttonGroup}> */}
				<div className={fileName.name === "Leader_bet" ? "buttonGroup_lb" : "buttonGroup"} style={Screen.getDeviceType().style.buttonGroup}>
					{/* {renderOptionsArray()} */}
					{renderOptionsArray}

					<div className="fast-actions" style={{ display: ((fileName.name === "Leader_bet" && Screen.getDeviceType().name === "Mobile") && props.options.action.length > 2) ? 'flex' : 'none' }}>
						<div className="buttons-container">
							<button id="max" className={lbFastActions === "max" ? 'Active' : ''} min={min} max={max} value={amount} onClick={(e) => fastBetActions_lb(e)} disabled={Number(amount) === Number(max)}>Max</button>
							<button id="1/2" className={lbFastActions === "1/2" ? 'Active' : ''} min={min} max={max} value={amount} onClick={(e) => fastBetActions_lb(e)} disabled={!props.options.show1by2}>1/2</button>
							<button id="2/3" className={lbFastActions === "2/3" ? 'Active' : ''} min={min} max={max} value={amount} onClick={(e) => fastBetActions_lb(e)} disabled={!props.options.show2by3}>2/3</button>
							<button id="X5" className={lbFastActions === "X5" ? 'Active' : ''} min={min} max={max} value={amount} onClick={(e) => fastBetActions_lb(e)} disabled={!props.options.show3x}>X5</button>
							<button id="X3" className={lbFastActions === "X3" ? 'Active' : ''} min={min} max={max} value={amount} onClick={(e) => fastBetActions_lb(e)} disabled={!props.options.show3x}>X3</button>
							<button id="X2" className={lbFastActions === "X2" ? 'Active' : ''} min={min} max={max} value={amount} onClick={(e) => fastBetActions_lb(e)} disabled={!props.options.show2x}>X2</button>
						</div>
					</div>
				</div>
			</div>
			{queue_error && <div className={Screen.getDeviceType().style.checkboxGroup} style={{ display: props.options.showgamecontr !== 'visible' && props.options.quickAction.length !== 0 ? 'flex' : 'none', width: Screen.getDeviceType().name === "Mobile" ? '100%' : '50%', bottom: (Screen.getDeviceType().name === "Mobile" && fileName.name === "Leader_bet") ? '58px' : '10px', left: (Screen.getDeviceType().name !== "Mobile" && fileName.name === "Riverpoker") ? 'initial' : '', bottom: (Screen.getDeviceType().name !== "Mobile" && fileName.name === "Riverpoker") ? '50px' : '' }}>
				{/* {(() => {
					let q = 0,
						cnt = props.options.quickAction.length,
						quickOptionsArray = [];
					for (q = 0; q < cnt; q++) {
						quickOptionsArray.push(<Checkbox key={q} name={props.options.quickAction[q].name} amount={props.options.quickAction[q].amount}></Checkbox>);
					}
					return quickOptionsArray;

				})()} */}
				{renderQuickOptionsArray()}
				{/* {renderQuickOptionsArray} */}
			</div>}
			{(Screen.getDeviceType().name === "Mobile" && fileName.name === "Leader_bet") && (
				<div className="upArrow-riseOptions">
					<button type="button" onClick={onClickNewSlider}>
						{/* <button type="button" > */}
						<img src={upArrows} alt="" />
					</button>
				</div>
			)}
			{/* {(showRiseOptions && Screen.getDeviceType().name === "Mobile" && fileName.name === "Leader_bet") && (
				<div className="new-slider-cover">
					<div className="slide-bar-container">
						<div className="fd">
							<img className="silder-img_lb" src={silderBoder_lb} alt="" />
							<div className="slider_G_Controller fd" style={{ position: 'absolute', top: '0' }}>
								<input id="sliderBarGC" className="GC_backRange" style={{ top: '45px', left: '-43px', width: '35px' }} type="range" min={min} max={max} value={amount} step="0.01" onChange={onChangeSlider}></input>
								<div className="s-wrapper" style={{ left: '-64px', top: '92px' }}>
									<div className="s-track">
										<input id="inputSlider" className="s-input" type="range" step="0.01" min={min} max={max} value={amount} readOnly />
										<div className="s-thumb">
											<img src={slider_thumb_lb} alt="" style={{ width: '30px', transform: ' rotate(90deg)', margin: '0px 5px 10px 0px' }} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="slide-bar-value">{UM.numberWithCommas(amount)}</div>
					<div className="div-chin"></div>
				</div>
			)} */}
		</div>
	);
}
