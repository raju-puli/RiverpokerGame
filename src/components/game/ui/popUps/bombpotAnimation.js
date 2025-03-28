import '../../../../css/ui/popUps/bomb.css'
import bomb from '../../../../assets/images/popUp/bomba_2.gif'
// import Screen from '../../../utils/screen';
export default function Bombpot() {
    return (
        <div className='fd' style={{ position: "absolute", top: "0px", bottom: "0px", left: "0px", right: "0px" }}>
            <div className='middlebomb' >
                <img src={bomb} alt=''/>
            </div>
        </div>
    )
}
