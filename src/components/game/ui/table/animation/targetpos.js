import React, { Component } from "react";
import { Group, Rect } from "react-konva";
export default class TargetPos extends Component {
    constructor(props) {
        super(props)
    }
    handleDragSeat(e, index) {

        if (parseInt(e.x) + 50 >= this.props.x &&
            parseInt(e.x) <= this.props.x + this.props.seatProperties.panelWidth &&
            parseInt(e.y) + 50 >= this.props.y - 100 &&
            parseInt(e.y) <= this.props.y + this.props.seatProperties.panelHeight) {
            this.props.TargetpositionId(this.props.id, index)
        }
    }

    render() {
        return (
            <Group>

                <Group
                    container="target"
                    x={this.props.x}
                    y={this.props.y - 100}

                >
                    <Rect
                        width={this.props.seatProperties.panelWidth}
                        height={this.props.seatProperties.panelHeight * 2}

                        // width={100}
                        // height={120}
                        // fill="blue"
                        shadowBlur={10}
                        // onClick={() => { alert("onclick") }}
                        onTap={() => {
                            // this.handleClick(this.props.id);
                            // alert("hi")
                            // this.props.hidaAni(false)
                        }}
                    />
                    {/* <Text x={18} y={-52} width={80} height={20} align={"center"} verticalAlign={"middle"} text={"target"} fill="#fff"
                        fontSize={15} fontFamily={"Roboto"} fontStyle={'bold'}></Text> */}
                </Group>

            </Group>
        )
    }
}