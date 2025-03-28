import "../../../../css/ui/popUps/addonAlert.css";
import close_1 from '../../../../assets/images/table/close_1.svg';

export default function AddonAlert(props) {
  return (
    <>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideAddonAlert"); }} > </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head"> Addon Alert
            <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideAddonAlert"); }} > <img src={close_1} alt="" /> </button>
          </div>
          <div className="fd text_center p_10">
            {props.data} <br></br>
            Do You Want To Add Chips Now?
          </div>
          <div className="fd">
            <ul className="footUl">
              <li>
                <button className="btn_1" onClick={(e) => {
                  e.preventDefault();
                  props.network.send('<ReBuy/>');
                  props.setAction("hideAddonAlert");

                }}>Yes</button>
              </li>
              <li>
                <button className="btn_1" onClick={(e) => {
                  e.preventDefault();
                  props.setAction("hideAddonAlert");
                }}>No</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}