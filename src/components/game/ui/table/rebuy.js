
import dollar from "../../../../assets/images/table/rupeeicon.png";
// import buychips_lb from "../../../../assets/images/table/Leader-bet-icons/buychips_lb.png";


export default function Rebuy(props) {
    const style_lb = {
        position: "fixed",
        right: "150px",
        top: '-10px',
        width: '45px',
        height: '45px',
        margin: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '1px solid red'
    }

    return (
        <div>
            <div
                // style={style_lb} 
                onClick={(e) => {
                    e.preventDefault();
                    props.network.send("<ReBuy/>")
                }}>
                <img style={{ width: '30px', height: '35px', marginTop: '2px' }} src={dollar} alt="" />
            </div>

        </div>
    )
}
