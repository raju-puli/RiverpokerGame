
import "../../../../css/ui/popUps/chipsRebuyAlert.css";
import close_1 from '../../../../assets/images/table/close_1.svg';

export default function ChipsRebuyAlert(props){
    return( 
        <>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideChipsRebuyAlert"); }} > </div>
      <div className="popup_1">
        <div className="popup_1_in">  
        <div className="head"> Chips Rebuy Alert
        <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideChipsRebuyAlert"); }} > <img src={close_1} alt=""/> </button>
        </div>
        <div className="fd clr_ff p_15 text_center font_15">
            <div className="fd">{props.data.lineOne}</div>
            <div className="fd">{props.data.lineTwo}</div>
        </div>
        </div>
    </div>
    </>
 
    )
}