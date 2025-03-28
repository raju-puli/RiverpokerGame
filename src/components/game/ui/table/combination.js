import "../../../../css/ui/table/combination.css";

export default function Combination(props) {
    // console.log("the props from combination are ");
    // console.log(props);

    let style = {
        position: "absolute",
        width: "45vw",
        top: "28vh",
        color: "rgb(231 181 0)",
        marginLeft: "50vw",
        textAlign: "center",
        transform: "translateX(-50%)",
        // border:'1px solid black',
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: "sans-serif",
    };

    return (
        <div id="combinationText" style={style}>
            {props.text}
            {props.winpercent && <div>{props.textTwo}%</div>}
        </div>
    );
}
