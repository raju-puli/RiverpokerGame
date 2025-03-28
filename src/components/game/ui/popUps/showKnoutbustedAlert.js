import close_1 from './../../../../assets/images/table/close_1.svg';
import "../../../../css/ui/popUps/tourneyPlayerRanking.css";
import { withTranslation } from 'react-i18next';
function ShowKnoutbustedAlert(props){
    return(
        <>
            <div className="popCover_1" onClick ={(e)=>{
                    e.preventDefault();
                    props.setAction("hideTplayerAlert");
                }}> </div>
            <div className="popup_1">
                <div className="popup_1_in">
                    <div className="head">{props.t("Message")}
                        <button className="close_1" onClick ={(e)=>{
                    e.preventDefault();
                    props.setAction("showKnoutbustedAlert");
                }}> <img src={close_1} alt=''/> </button>
                    </div>   
            <div className="fd p_10">
                <table className="table_1 text_center">
                    <tbody>
                    <tr>
                        <td> {props.data.lineOne} </td>
                    </tr>
                    {/* <tr>
                        <td> {props.data.lineTwo} </td>
                    </tr> */}
                    </tbody>
                </table>
            </div> 
            </div>
        </div>
        </>
    )
}
export default withTranslation()(ShowKnoutbustedAlert);