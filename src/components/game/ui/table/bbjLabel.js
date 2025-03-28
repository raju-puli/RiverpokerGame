// import "../../../../css/ui/table/bbjLabel.css";

// export default function BbjLabel(props){
//     // console.log(props);
//     return(
//         <div className = "bbjLabel_table">
//         <div className = "icon"></div>
//         <div className = "value">CHP<span style={{marginLeft:'40px'}}>{props.data}</span></div>
//         </div>
//     )
// }

import React from 'react';
import { Layer, Rect, Text, Group } from 'react-konva';

const BbjLabel = (props) => {
    return (

        <Layer>
            <Group x={320} y={42}>
                <Rect width={160} height={40} fill="white" cornerRadius={5} />
                <Rect width={150} height={20} fill="black" cornerRadius={5} x={5} y={18} />
                <Text text="BAD BEAT JACKPOT" fontSize={14} fill="red" x={10} y={5} align={"center"} verticalAlign={"middle"} fontFamily={"Roboto"} />
                <Text width={140} height={20} text="$19,753,285.75" fontSize={14} fill="white" x={10} y={20} align={"right"} verticalAlign={"middle"} fontFamily={"Roboto"} />
            </Group>

        </Layer>

    );
}

export default BbjLabel;

