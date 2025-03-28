


export default function CountdownForce1(props) {
    console.log(props)

    return (
        <>
        <div className="fd">
            <p style={{
                width: "60px", height: "25px", color: "green", position: "absolute", top: "55px", right: "10px",
                zIndex: "9", background: "#323232", border: "2px solid #FF0000", fontSize: "17px", display: "flex",
                alignItems: "center", padding: "4px", borderRadius: "9px"
            }}>
                {`${Math.floor(Number(props.timerdetails.force_duration) / 60)}`.padStart(2, 0)} :
                {`${Number(props.timerdetails.force_duration)  % 60}`.padStart(2, 0)}
            </p>
            </div>
        </>
    )
}