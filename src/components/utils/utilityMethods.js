import Config from "../../config";
import Screen from "./screen";
import gsap from "gsap";

function GameName(type) {
    switch (type) {
        case "TEXAS_HOLDEM_LIMIT":
            return "FL Hold'em";
        case "TEXAS_HOLDEM_NO_LIMIT":
            return "NL Hold'em";
        case "TEXAS_HOLDEM_POT_LIMIT":
            return "PL Hold'em";
        case "OMAHA_LIMIT":
            return "FL Omaha";
        case "OMAHA_NO_LIMIT":
            return "NL Omaha";
        case "OMAHA_POT_LIMIT":
            return "PL Omaha";
        case "OMAHA_FIVE_CARDS_LIMIT":
            return "FL Omaha 5card";
        case "OMAHA_FIVE_CARDS_NO_LIMIT":
            return "NL Omaha 5card";
        case "OMAHA_FIVE_CARDS_POT_LIMIT":
            return "PL Omaha 5card";
        case "OMAHA_SIX_CARDS_LIMIT":
            return "FL Omaha 6card";
        case "OMAHA_SIX_CARDS_NO_LIMIT":
            return "NL Omaha 6card";
        case "OMAHA_SIX_CARDS_POT_LIMIT":
            return "PL Omaha 6card";
        case "OMAHA_HIGH_LOW_POT_LIMIT":
            return "PL Omaha Hi-Lo";
        default:
            return type;
    }
};

// function getGameType(game) {
//     let gameType = "";
//     switch (game) {
//         case "TEXAS_HOLDEM_LIMIT":
//             gameType = "FLHE";
//             break;
//         case "TEXAS_HOLDEM_NO_LIMIT":
//             gameType = "NLHE";
//             break;
//         case "TEXAS_HOLDEM_POT_LIMIT":
//             gameType = "PLHE";
//             break;
//         case "OMAHA_LIMIT":
//             gameType = "FLO";
//             break;
//         case "OMAHA_NO_LIMIT":
//             gameType = "NLO";
//             break;
//         case "OMAHA_POT_LIMIT":
//             gameType = "PLO";
//             break;
//         case "OMAHA_FIVE_CARDS_LIMIT":
//             gameType = "FLO5";
//             break;
//         case "OMAHA_FIVE_CARDS_NO_LIMIT":
//             gameType = "NLO5";
//             break;
//         case "OMAHA_FIVE_CARDS_POT_LIMIT":
//             gameType = "PLO5";
//             break;
//         case "OMAHA_SIX_CARDS_LIMIT":
//             gameType = "FLO6";
//             break;
//         case "OMAHA_SIX_CARDS_NO_LIMIT":
//             gameType = "NLO6";
//             break;
//         case "OMAHA_SIX_CARDS_POT_LIMIT":
//             gameType = "PLO6";
//             break;
//         case "OMAHA_HIGH_LOW_NO_LIMIT":
//             gameType = "NL Omaha Hi-Lo";
//             break;
//         case "OMAHA_HIGH_LOW_POT_LIMIT":
//             gameType = "PL Omaha Hi-Lo";
//             break;
//         case "OMAHA_HIGH_LOW_LIMIT":
//             gameType = "FL Omaha Hi-Lo";
//             break;
//         default:
//             gameType = "Not In List";
//             break;
//     }
//     return gameType;
// }

function cardsLength(type) {
    switch (type) {
        case "TEXAS_HOLDEM_LIMIT":
            return 2;
        case "TEXAS_HOLDEM_NO_LIMIT":
            return 2;
        case "TEXAS_HOLDEM_POT_LIMIT":
            return 2;
        case "OMAHA_LIMIT":
            return 4;
        case "OMAHA_NO_LIMIT":
            return 4;
        case "OMAHA_POT_LIMIT":
            return 4;
        case "OMAHA_FIVE_CARDS_LIMIT":
            return 5;
        case "OMAHA_FIVE_CARDS_NO_LIMIT":
            return 5;
        case "OMAHA_FIVE_CARDS_POT_LIMIT":
            return 5;
        case "OMAHA_SIX_CARDS_LIMIT":
            return 6;
        case "OMAHA_SIX_CARDS_NO_LIMIT":
            return 6;
        case "OMAHA_SIX_CARDS_POT_LIMIT":
            return 6;
        case "OMAHA_HIGH_LOW_POT_LIMIT":
            return 4;
        default:
            return 2;
    }
};


const numberWithCommas = (x) => {
    if (x === null || x === undefined) {
        return "0";
    }
    const number = parseFloat(x);
    if (isNaN(number)) return x;

    const hasDecimalPoint = x.toString().includes(".");
    const formattedNumber = number.toFixed(hasDecimalPoint ? 2 : 0);

    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function changeAmtLabel(labelValue) {
    const value = Math.abs(Number(labelValue));
    if (isNaN(value)) return "-";

    function formatWithSuffix(num, suffix) {
        const formatted = num.toFixed(2);

        return formatted.endsWith(".00") ? Math.floor(num) + suffix : formatted + suffix;
    }

    if (value >= 1.0e9) {
        return formatWithSuffix(value / 1.0e9, "B");
    } else if (value >= 1.0e6) {
        return formatWithSuffix(value / 1.0e6, "M");
    } else if (value >= 1.0e3) {
        return formatWithSuffix(value / 1.0e3, "K");
    } else {
        return formatWithSuffix(value, "");
    }
}

const numberWithCommas_length9 = (x) => { if (x === null || x === undefined) { return "0"; } if (x.toString().length > 9) { return changeAmtLabel(x) } const number = parseFloat(x); if (isNaN(number)) return x; const hasDecimalPoint = x.toString().includes("."); const formattedNumber = number.toFixed(hasDecimalPoint ? 2 : 0); return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

var config = new Config();
try {
    var sid = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid;
} catch (e) { console.error(e.message) };

const redirectUrlLinks = (event) => {
    if (sid) {
        const type = event.target.value;
        if (type) {
            if (Screen.getDeviceType().name === "Mobile") {
                window.location.href = `${config.URL_Environment.proxy.baseUrl}/client-redirect?LANG=en&sid=${sid}&to=${type}`
            } else {
                return window.open(`${config.URL_Environment.proxy.baseUrl}/client-redirect?LANG=en&sid=${sid}&to=${type}`);
            };
        }
    } else {
        sid = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid;
    }
};

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function textFormat(status) {
    if (status) {
        return status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };
}

function dateFormater(date) {
    const serverTime = new Date(parseInt(date));
    const setFormate = serverTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return setFormate;
}


const AnimationMiniTable = (data, tableId) => {
    const element = document.getElementById(tableId);
    if (element) {
        gsap.killTweensOf(element);
        gsap.set(element, { x: 0 });
        if (data === "LEFT") {
            gsap.from(`#${tableId}`, { x: -window.innerWidth / 2, duration: 0.25, ease: "linear" });
        } else if (data === "RIGHT") {
            gsap.from(`#${tableId}`, { x: window.innerWidth / 2, duration: 0.25, ease: "linear" });
        } else {
            console.log("Current Table");
        }
    } else {
        console.log("Element not found");
        return;
    }
}

const UM = { GameName, cardsLength, numberWithCommas, changeAmtLabel, roundToTwo, textFormat, redirectUrlLinks, dateFormater, numberWithCommas_length9, AnimationMiniTable }

export default UM;