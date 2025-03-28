import ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Config from "../../../../config";
import "../../../../css/ui/popUps/avatarPopup.css";
import defaultAvtar from "../../../../assets/images/lobby_icons/profile/icon_avatar.png";
import Emiter from "../../../utils/eventEmitter";
import UM from "../../../utils/utilityMethods";

class AvatarPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadBtnState: true,
      setBtnState: true,
      DefaultImgValue: false,
      avatarUrl: "",
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1,
      },
      avatarList: [],
      setId: "-",
      myAvatarId: "-",
      previewImage: defaultAvtar,
      avatarLoader: true,
      myAvatar: "",
      avatarSetMessage: ""
    };
    this.config = new Config();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.newavatar) {
      this.setState({ avatarList: this.props.newavatar });
    }
    this.getAvatar();
  };

  componentWillUnmount() {
    this._isMounted = false;
  };

  getAvatar = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.apiPath.getAvtr_Api, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.setRequestHeader("siteid", this.config.URL_Environment.sitIds.sitid);
    if (sessionStorage.getItem(`${window.location.hostname}'_wSid'`) !== null) {
      xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
    } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
      xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
    }
    xhr.addEventListener("load", (e) => {
      this.avtrDataHandler(e);
    });
    xhr.send();
  }
  avtrDataHandler = (data) => {
    if (!this._isMounted) return;
    let response = JSON.parse(data.target.response);
    const myAvatr = `data:image/jpeg;base64,${response.imageData}`;
    this.setState({ previewImage: myAvatr, avatarLoader: false, myAvatar: myAvatr })
  }

  setAvatar = () => {
    this.setState({ avatarLoader: true, avatarSetMessage: "" });
    const body = { avatar_id: this.state.myAvatarId };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${this.config.URL_Environment.proxy.baseUrl}${this.config.URL_Environment.apiPath.setAvatar_Api}`, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.setRequestHeader("SiteId", this.config.URL_Environment.sitIds.sitid);
    xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);

    xhr.addEventListener("load", this.setAvatarHandler);

    console.log("Sending request with body:", body);
    xhr.send(JSON.stringify(body));
  };

  setAvatarHandler = (data) => {
    console.log("Avatar set response:", data.target.response);
    let res = JSON.parse(data.target.response)
    this.setState({ avatarLoader: false, avatarSetMessage: res.status });
    this.getAvatar();
    Emiter.emit("update_avatar");
  };

  avtarsList = (avatar) => {
    if (!avatar || !avatar.imageData) {
      console.error("Invalid avatar data:", avatar);
      return "";
    }
    return `data:image/png;base64,${avatar.imageData}`;
  };

  selectAvatar = (avatar) => {
    this.setState({ previewImage: `data:image/png;base64,${avatar.imageData}`, myAvatarId: avatar.id })
  }


  render() {
    const { newavatar } = this.props;
    return (
      <div className="game_type_filter_cover">
        <div className="game_type_filter">
          <header>
            <span>
              <img className="m_l_10 m_r_10" style={{ borderRadius: '5px' }} src={this.state.myAvatar} alt="" />  Avatar List
            </span>
          </header>
          <section className="fd avatar_section m_t_10 m_b_10" style={{ maxHeight: "250px" }}>
            {newavatar && newavatar.length ? (
              newavatar.map((list, i) => (
                <div key={list.id} className="imageLablediv">
                  <img className="m_l_10 m_r_10" style={{ borderRadius: "5px" }} src={this.avtarsList(list)} onClick={(e) => { e.preventDefault(); this.selectAvatar(list, i); }} alt="" />
                </div>
              ))
            ) : (
              <div className="loaderDiv">
                <span className="loader_3"></span>
              </div>
            )}
          </section>
          <span className="fd clr_river text_center">{UM.textFormat(this.state.avatarSetMessage)}</span>
          <div className="close_div p_10 col-12" style={{ height: 'unset' }}>
            <div className="df_al_js-center previewDiv col-6">
              Preview : <div className="setPerviewDiv"> {this.state.avatarLoader ? <div className="loaderDiv"><span className="loader_3"></span></div> : <img className="m_l_10 m_r_10" style={{ borderRadius: '5px', width: '100%' }} src={this.state.previewImage} alt="" />} </div>
            </div>
            <span className="col-6">
              <button type="button" className="btn_2" style={{ width: '90%', backgroundPositionY: this.state.avatarLoader ? '-60px' : "" }} onClick={this.setAvatar}
                disabled={this.state.avatarLoader && this.state.previewImage === defaultAvtar}
              > Set Avatar </button>
              <button type="button" className="btn_2" style={{ width: '90%', marginTop: '10px' }} onClick={(e) => { e.preventDefault(); this.props.setAction("hideAvtar"); }}> close </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

AvatarPopup.propTypes = {
  newavatar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageData: PropTypes.string,
    })
  ),
  avtarId: PropTypes.array.isRequired,
  setAvtar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

AvatarPopup.defaultProps = {
  newavatar: [],
};

ReactDOM.render(
  <AvatarPopup 
    newavatar={[]} 
    avtarId={[]} 
    setAvtar={() => console.log("Avatar Set")} 
    onClose={() => console.log("Popup Closed")} 
  />, 
  document.getElementById("root")
);

export default AvatarPopup;

// ReactDOM.render(<AvatarPopup newavatar={[]} avtarId={[]} setAvtar={() => { }} onClose={() => { }} />, document.getElementById("root"));
