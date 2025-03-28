import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CheckBoxAlert from "../../popUps/checkBoxAlert";
import "../../../../../css/ui/table/checkBox.css";
// import close_1 from "./../../../../../assets/images/table/close_1.svg";
// import settingsIcon from "../../../../../assets/images/table/settings1.svg";
import * as allSettings from "../../../../utils/global"
const GameCheckBox = forwardRef((props, ref) => {
  let [settings, setSettings] = useState({
    volumeMute: allSettings.getMuteValue(),
    autoMuckCards: allSettings.getAutoMuckCards(),
    autoPostBlind: allSettings.getAutoPostBlind(),
    waitBigBlind: allSettings.getWaitBigBlind(),
    runItTwice: allSettings.getRunItTwice(),
    runItOnce: allSettings.getRunItOnce(),
    muteChat: allSettings.getMuteChat()
  })
  useEffect(() => {
    if (allSettings.getMuteValue() !== settings.volumeMute) {
      setSettings({ ...settings, volumeMute: allSettings.getMuteValue() })
    }
    if (allSettings.getAutoMuckCards() !== settings.autoMuckCards) {
      setSettings({ ...settings, autoMuckCards: allSettings.getAutoMuckCards() })
    }
    if (allSettings.getAutoPostBlind() !== settings.autoPostBlind) {
      setSettings({ ...settings, autoPostBlind: allSettings.getAutoPostBlind() })
    }
    if (allSettings.getWaitBigBlind() !== settings.waitBigBlind) {
      setSettings({ ...settings, waitBigBlind: allSettings.getWaitBigBlind() })
    }
  });
  useEffect(() => {
    onClickActions("AutoMuck", settings.autoMuckCards)
  }, [settings.autoMuckCards])


  useEffect(() => {
    onClickActions("AutoPost", settings.autoPostBlind)
  }, [settings.autoPostBlind])


  useEffect(() => {
    onClickActions("WaitForBB", settings.waitBigBlind)
  }, [settings.waitBigBlind])


  useImperativeHandle(ref, () => ({
    setSitOutCheck() {
      try {
        document.getElementById("CheckBoxSO").checked = true;
      } catch (e) { }
    },
    setSitOutCheckTrue() {
      try {
        document.getElementById("CheckBoxSO").checked = false;
      } catch (e) { }
    },
    enableDefaults() {
      // document.getElementById("CheckBoxAM").checked = true;
      // document.getElementById("CheckBoxAP").checked = true;
      props.actions("closeCkeckAlert", "");
      setSettings({ ...settings, autoMuckCards: true })
      setSettings({ ...settings, autoPostBlind: true })
    },
  }));
  const setCheckStates = (action) => {
    switch (action) {
      case "Yes":
        // document.getElementById("CheckBoxAM").checked = true;
        // document.getElementById("CheckBoxAP").checked = true;
        props.actions("AutoMuck", true);
        props.actions("AutoPost", true);
        props.actions("closeCkeckAlert", "");
        allSettings.setAutoMuckCards(true);
        allSettings.setAutoPostBlind(true);
        setSettings({ ...settings, autoMuckCards: true })
        setSettings({ ...settings, autoPostBlind: true })
        break;
      case "No":
        props.actions("closeCkeckAlert", false);
        break;
      default:
        break;
    }
  }

  const onClickActions = (action, state) => {
    // console.log("checkbox >>  ", action + "..." + state);
    switch (action) {
      case "AutoMuck":
        if (state) {
          props.actions("AutoMuck", state);
        } else {
          props.actions("AutoMuck", state);
        }
        allSettings.setAutoMuckCards(state)
        setSettings({ ...settings, autoMuckCards: state });
        break;
      case "AutoPost":
        if (state) {
          props.actions("AutoPost", state)
        } else {
          props.actions("AutoPost", state)
        }
        allSettings.setAutoPostBlind(state)
        setSettings({ ...settings, autoPostBlind: state });
        break;
      case "SitOut":
        if (state) {
          props.network.send("<SitOut/>");
        } else {
          props.network.send("<SitIn/>");
          props.actions("SitOut", state);
        }
        break;
      case "WaitForBB":
        if (state) {
          console.log("its true");
          props.network?.send("<WaitForBigBlind/>");
        } else {
          console.log("its false");
        }
        allSettings.setWaitBigBlind(state)
        setSettings({ ...settings, waitBigBlind: state })
        break;

      case "ritOne":
        if (state) {
          // props.actions("ritOne", state)
          // document.getElementById("CheckBoxWR2").checked = false;
          allSettings.setRunItTwice(!state)
        }
        setSettings({ ...settings, runItOnce: state, runItTwice: state ? !state : state })
        allSettings.setRunItOnce(state)
        props.actions("ritOne", state)
        // OnsetRunItOnce
        break;
      case "ritTwo":
        if (state) {
          // document.getElementById("CheckBoxWR1").checked = false;
          allSettings.setRunItOnce(!state)
        }
        // else {
        //   document.getElementById("CheckBoxWR2").checked = false;
        // }
        setSettings({ ...settings, runItOnce: state ? !state : state, runItTwice: state })
        allSettings.setRunItTwice(state)
        props.actions("ritTwo", state)
        break;
      case "volume":
        allSettings.setMuteValue(state);
        setSettings({ ...settings, volumeMute: state })

        break;
      case "Addon":
        props.actions("Addon", state)
        break;
      case "Rebuy":
        // props.actions("Rebuy", state)
        props.actions(action, state)
        document.getElementById("CheckBoxRebuyTwo").checked = false;
        break;
      case "ReBuy2X":
        document.getElementById("CheckBoxRebuy").checked = false;
        props.actions("ReBuy2X", state)
        break;
      case "muteChat":
        allSettings.setMuteChat(state);
        setSettings({ ...settings, muteChat: state })
        break;
      default:
        break;
    }
  }
  function closeCheckbox() {
    props.actions("hideCheckBox", "null");
  }
  // function Rebuy(e) {
  //   e.preventDefault();
  //   props.network.send("<ReBuy/>")
  // }





  useEffect(() => {
    const updateScale = () => {
      const element = document.querySelector('.popup_2_in');
      if (element) {
        // Get the screen height
        const screenHeight = window.innerHeight;

        // Define minimum and maximum heights for scaling
        const minHeight = 375; // Minimum screen height for scaling
        const maxHeight = 812; // Maximum screen height for scaling

        // Define minimum and maximum scale factors
        const minScale = 0.85; // Minimum scale factor
        const maxScale = 1; // Maximum scale factor

        // Calculate scale factor based on screen height
        let scale = (screenHeight - minHeight) / (maxHeight - minHeight) * (maxScale - minScale) + minScale;

        // Clamp the scale to be within the minScale and maxScale bounds
        scale = Math.max(minScale, Math.min(maxScale, scale));

        // Apply the scale transformation
        element.style.transform = `scale(${scale})`;
        // element.style.transformOrigin = 'top left';
        // Adjust origin if needed
      }
    };

    // Initial call to set scale on mount
    updateScale();

    // Set up event listener for screen size changes
    window.addEventListener('resize', updateScale);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateScale);
  }, []);



  return (
    <div>
      {props.showAlert &&
        <CheckBoxAlert actions={setCheckStates}></CheckBoxAlert>
      }
      <div className="popCover_2" onClick={() => { closeCheckbox() }} style={{ display: `${props.showCheckBox}` }}>
      </div>

      <div style={{ display: props.showCheckBox }} className="gameCheckBoxContainer">
        <div className="popup_2">
          <div className="popup_2_in" style={{ overflow: "auto" }}>
            <div id="gameCheckBox" className="gameCheckBox">
              {!props.settingAccess ? (
                <>
                  <div className="field fd">
                    <label htmlFor="CheckBoxAM" style={{ color: "#ffffff" }}>
                      Auto Muck
                    </label>
                    <input
                      id="CheckBoxAM"
                      className="checkBox"
                      type="checkbox"
                      name="AutoMuck"
                      value="AutoMuck"
                      checked={settings.autoMuckCards}
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div className="field fd">
                    <label htmlFor="CheckBoxAP" style={{ color: "#ffffff" }}>
                      Auto Blinds
                    </label>
                    <input
                      id="CheckBoxAP"
                      className="checkBox"
                      type="checkbox"
                      name="AutoPost"
                      checked={settings.autoPostBlind}
                      value="AutoPost"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div className="field fd">
                    <label htmlFor="CheckBoxSO" style={{ color: "#ffffff" }}>
                      Sit Out For Next Hand
                    </label>
                    <input
                      id="CheckBoxSO"
                      className="checkBox"
                      type="checkbox"
                      name="SitOut"
                      value="SitOut"
                      disabled={props.leaveTablebtn}
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div className="field fd">
                    <label htmlFor="CheckBoxWBB" style={{ color: "#ffffff" }}>
                      Wait For BB
                    </label>
                    <input
                      id="CheckBoxWBB"
                      className="checkBox"
                      type="checkbox"
                      name="WaitForBB"
                      value="WaitForBB"
                      checked={settings.waitBigBlind}
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  {props.showRitBox && (
                    <>
                      <div className="field fd">
                        <label htmlFor="CheckBoxWR2" style={{ color: "#ffffff" }}>
                          Run it Always 2 times
                        </label>
                        <input
                          id="CheckBoxWR2"
                          checked={settings.runItTwice}
                          className="checkBox"
                          type="checkbox"
                          name="ritTwo"
                          value="ritTwo"
                          onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                        />
                      </div>
                      <div className="field fd">
                        <label htmlFor="CheckBoxWR1" style={{ color: "#ffffff" }}>
                          Run it Always 1 time
                        </label>
                        <input
                          id="CheckBoxWR1"
                          checked={settings.runItOnce}
                          className="checkBox"
                          type="checkbox"
                          name="ritOne"
                          value="ritOne"
                          onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                        />
                      </div>
                    </>
                  )}
                  <div className="field fd">
                    <label htmlFor="CheckBoxVolume" style={{ color: "#ffffff" }}>
                      Volume Mute
                    </label>
                    <input
                      id="CheckBoxVolume"
                      className="checkBox"
                      type="checkbox"
                      checked={settings.volumeMute}
                      name="volume"
                      value="volume"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div className="field fd">
                    <label htmlFor="CheckBoxMC" style={{ color: "#ffffff" }}>
                      Mute Chat
                    </label>
                    <input
                      id="CheckBoxMC"
                      className="checkBox"
                      type="checkbox"
                      checked={settings.muteChat}
                      name="muteChat"
                      value="muteChat"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div
                    className="field fd"
                    style={{
                      display: props.settingsAddonNrebuy ? "none" : "flex",
                    }}
                  >
                    <label htmlFor="CheckBoxAdd" style={{ color: "#ffffff" }}>
                      Auto Add On
                    </label>
                    <input
                      id="CheckBoxAdd"
                      className="checkBox"
                      type="checkbox"
                      name="Addon"
                      value="Addon"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div
                    className="field fd"
                    style={{
                      display: props.settingsAddonNrebuy ? "none" : "flex",
                    }}
                  >
                    <label htmlFor="CheckBoxRebuy" style={{ color: "#ffffff" }}>
                      Auto Rebuy
                    </label>
                    <input
                      id="CheckBoxRebuy"
                      className="checkBox"
                      type="checkbox"
                      name="Rebuy"
                      value="Rebuy"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div
                    className="field fd"
                    style={{
                      display: props.settingsAddonNrebuy ? "none" : "flex",
                    }}
                  >
                    <label htmlFor="CheckBoxRebuyTwo" style={{ color: "#ffffff" }}>
                      Auto Rebuy 2X
                    </label>
                    <input
                      id="CheckBoxRebuyTwo"
                      className="checkBox"
                      type="checkbox"
                      name="ReBuy2X"
                      value="ReBuy2X"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="field fd">
                    <label htmlFor="CheckBoxVolume" style={{ color: "#ffffff" }}>
                      Volume Mute
                    </label>
                    <input
                      id="CheckBoxVolume"
                      className="checkBox"
                      type="checkbox"
                      checked={settings.volumeMute}
                      name="volume"
                      value="volume"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                  <div className="field fd">
                    <label htmlFor="CheckBoxMC" style={{ color: "#ffffff" }}>
                      Mute Chat
                    </label>
                    <input
                      id="CheckBoxMC"
                      className="checkBox"
                      type="checkbox"
                      checked={settings.muteChat}
                      name="muteChat"
                      value="muteChat"
                      onChange={(event) => onClickActions(event.target.value, event.target.checked)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </div >
  )
})

export default GameCheckBox;
