//---------------------------------- Settings start-----------------
let settings = window.localStorage.getItem("settings") ? JSON.parse(window.localStorage.getItem("settings")) : {
    "fourColouredCards": false,
    "showAvatars": true,
    "showOpenSeat": true,
    "useRaiseTo": false,
    "showHandStrength": true,
    "waitBigBlind": false,
    "autoPostBlind": true,
    "autoMuckCards": true,
    "muteValue": false,
    "showChatBalloon": true,
    "showPlayerChat": true,
    "showDealerMessage": true,
    "runItTwice": false,
    "runItOnce": false,
    "muteChat": false
}
//---------------------------------- Settings End-----------------


//---------------------------------- Four Coloured Cards start-----------------

let fourColouredCards = settings.fourColouredCards;

export const getFourColouredCards = () => fourColouredCards

export const setFourColouredCards = (value) => {
    fourColouredCards = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, fourColouredCards: value }))
}
//---------------------------------- Four Coloured Cards end--------------------
//---------------------------------- Show Avatars start-----------------

let showAvatars = settings.showAvatars;

export const getShowAvatars = () => showAvatars

export const setShowAvatars = (value) => {
    showAvatars = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, showAvatars: value }))
}
//---------------------------------- Show Avatar end--------------------


//---------------------------------- Show Open Seat start-----------------

let showOpenSeat = settings.showOpenSeat;

export const getOpenSeat = () => showOpenSeat;

export const setOpenSeat = (value) => {
    showOpenSeat = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, showOpenSeat: value }))

};

//---------------------------------- Show Open Seat end-----------------


//---------------------------------- Use Raise To start-----------------

let useRaiseTo = settings.useRaiseTo;

export const getUseRaiseTo = () => useRaiseTo;

export const setUseRaiseTo = (value) => {
    useRaiseTo = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, useRaiseTo: value }))

};

//---------------------------------- Use Raise To end-----------------


//---------------------------------- Wait for Big/Over Blind start-----------------

let waitBigBlind = settings.waitBigBlind;

export const getWaitBigBlind = () => waitBigBlind;

export const setWaitBigBlind = (value) => {
    waitBigBlind = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, waitBigBlind: value }))

};

//---------------------------------- Wait for Big/Over Blind end-----------------


//---------------------------------- Use Post Blind start-----------------

let autoPostBlind = settings.autoPostBlind;

export const getAutoPostBlind = () => autoPostBlind;

export const setAutoPostBlind = (value) => {
    autoPostBlind = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, autoPostBlind: value }))

};

//---------------------------------- Use Post Blind end-----------------


//---------------------------------- Auto Muck start-----------------

let autoMuckCards = settings.autoMuckCards;

export const getAutoMuckCards = () => autoMuckCards;

export const setAutoMuckCards = (value) => {
    autoMuckCards = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, autoMuckCards: value }))

};

//---------------------------------- Auto Muck end-----------------

//---------------------------------- Show Hand Strength start-----------------

let showHandStrength = settings.showHandStrength;

export const getHandStrength = () => showHandStrength

export const setHandStrength = (value) => {
    showHandStrength = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, showHandStrength: value }))
}
//---------------------------------- Show Hand Strength end-----------------


//----------------------------------volume mute start-----------------

let muteValue = settings.muteValue;

export const getMuteValue = () => muteValue;

export const setMuteValue = (value) => {
    muteValue = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, muteValue: value }))
};

//----------------------------------volume mute end-----------------

//----------------------------------Show Player Chat on Balloon start-----------------

let showChatBalloon = settings.showChatBalloon;

export const getShowChatBalloon = () => showChatBalloon;

export const setShowChatBalloon = (value) => {
    showChatBalloon = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, showChatBalloon: value }))
};


//----------------------------------Show Player Chat on Balloon end-----------------

//----------------------------------Show Player Chat start-----------------

let showPlayerChat = settings.showPlayerChat;

export const getShowPlayerChat = () => showPlayerChat;

export const setShowPlayerChat = (value) => {
    showPlayerChat = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, showPlayerChat: value }))
};


//----------------------------------Show Player Chat end-----------------

//----------------------------------Show Dealer Message start-----------------

let showDealerMessage = settings.showDealerMessage;

export const getShowDealerMessage = () => showDealerMessage;

export const setShowDealerMessage = (value) => {
    showDealerMessage = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, showDealerMessage: value }))
};


//----------------------------------Show Dealer Message end-----------------

//----------------------------------Run It twice start-----------------

let runItTwice = settings.runItTwice;

export const getRunItTwice = () => runItTwice;

export const setRunItTwice = (value) => {
    runItTwice = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, runItTwice: value }))
};


//----------------------------------Run It twice end-----------------

//----------------------------------Run It Once start-----------------

let runItOnce = settings.runItOnce;

export const getRunItOnce = () => runItOnce;

export const setRunItOnce = (value) => {
    runItOnce = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, runItOnce: value }))
};


//----------------------------------Run It Once end-----------------

//----------------------------------Mute Chat start-----------------

let muteChat = settings.muteChat;

export const getMuteChat = () => muteChat;

export const setMuteChat = (value) => {
    muteChat = value;
    window.localStorage.setItem("settings", JSON.stringify({ ...settings, muteChat: value }))
};


//----------------------------------Mute Chat end-----------------

/**************************************Performance Settings Start******************************************/

let performance = window.localStorage.getItem("performanceSettings") ? JSON.parse(window.localStorage.getItem("performanceSettings")) : {
    "smoothAnimation": false,
    "dealerCardAnimation": true,
    "playerCardAnimation": true,
    "chipAnimation": true,
    "tournamentIcon": true
}

/************************************** Performance Settings End ******************************************/

/************************************** Smooth Animation Start ******************************************/

let smoothAnimation = performance.smoothAnimation;

export const getSmoothAnimation = () => smoothAnimation

export const setSmoothAnimation = (value) => {
    smoothAnimation = value
    window.localStorage.setItem("performanceSettings", JSON.stringify({ ...performance, smoothAnimation: value }))
}

/************************************** Smooth Animation End ******************************************/
/************************************** Dealer Card Animation Start ******************************************/

let dealerCardAnimation = performance.dealerCardAnimation;

export const getDealerCardAnimation = () => dealerCardAnimation

export const setDealerCardAnimation = (value) => {
    dealerCardAnimation = value
    window.localStorage.setItem("performanceSettings", JSON.stringify({ ...performance, dealerCardAnimation: value }))
}

/************************************** Dealer Card Animation End ******************************************/


/************************************** Player Card Animation Start ******************************************/

let playerCardAnimation = performance.playerCardAnimation;

export const getPlayerCardAnimation = () => playerCardAnimation

export const setPlayerCardAnimation = (value) => {
    playerCardAnimation = value
    window.localStorage.setItem("performanceSettings", JSON.stringify({ ...performance, playerCardAnimation: value }))
}

/************************************** Player Card Animation End ******************************************/


/************************************** Chips Animation Start ******************************************/

let chipAnimation = performance.chipAnimation;

export const getChipAnimation = () => chipAnimation

export const setChipAnimation = (value) => {
    chipAnimation = value
    window.localStorage.setItem("performanceSettings", JSON.stringify({ ...performance, chipAnimation: value }))
}

/************************************** Chip Animation End ******************************************/


/************************************** Tournament Icon Start ******************************************/

let tournamentIcon = performance.tournamentIcon;

export const getTournamentIcon = () => tournamentIcon

export const setTournamentIcon = (value) => {
    tournamentIcon = value
    window.localStorage.setItem("performanceSettings", JSON.stringify({ ...performance, tournamentIcon: value }))
}

/************************************** Tournament Icon End ******************************************/
