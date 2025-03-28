// import dividerLine from "../../../../assets/images/lobby/dividerLine.png"

export default function Time(props) {
    return <div style={{
        width: '60px',
        height: '30px',
        display: 'flex',
        position: 'absolute',
        right: '5px',
        bottom: '0px'
    }}>
        {/* <div style={{
            width:'2px',
            height:'30px',
            marginRight:'2px',
            backgroundImage: `url(${dividerLine})`,
		    backgroundRepeat: "no-repeat",
		    backgroundSize: "100% 100%",
        }}></div> */}
        <div className="time_Show"> {props.time} </div>
    </div>
}