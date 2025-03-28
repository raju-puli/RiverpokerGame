import "../../css/progress.css"
import PropTypes from "prop-types"


const ProgressBar =({value,max})=>{
    const percent = Math.round((value/max)*100);
    return(
        <div className="progressBar">
            <progress value={value} max={max}>
            </progress>
            {/* <div id = "progressBarPer">{percent}%</div> */}
        </div>
    )
}
ProgressBar.propTypes = {
    value:PropTypes.number.isRequired,
    max:PropTypes.number
}

ProgressBar.defaultProps = {
    max:2
}


export default ProgressBar;