
import "../../../../css/ui/popUps/tourneyInfoBoard.css";
import close_1 from './../../../../assets/images/table/close_1.svg';

export default function TourneyInfoBoard(props) {
    return (
        <>
            <div className="popCover_1" onClick={(e) => {
                e.preventDefault();
                props.setAction("hideTourneyInfoBoard");
            }}> </div>
            <div className="popup_1">
                <div className="popup_1_in">
                    <div className="head"> Tourney Info Board
                        <button className="close_1" onClick={(e) => {
                            e.preventDefault();
                            props.setAction("hideTourneyInfoBoard");
                        }}> <img src={close_1} alt="" /> </button>
                    </div>
                    <div className="fd p_10">
                        <table className="table_1">
                            <tbody>
                                <tr>
                                    <td> Current Level: </td>
                                    <td className="clr_f00">  {props.data.cLevel} </td>
                                </tr>
                                <tr>
                                    <td> Stakes: </td>
                                    <td className="clr_f00">  {props.data.cStakes}  </td>
                                </tr>
                                <tr>
                                    <td>Next Level:  </td>
                                    <td className="clr_f00"> {props.data.nLevel} </td>
                                </tr>
                                <tr>
                                    <td> Stakes: </td>
                                    <td className="clr_f00">  {props.data.nStakes} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}