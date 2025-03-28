import React from "react";
// import tableChips from "../../../../../assets/images/table/chipstack_main.png";
// import chip1 from "../../../../../assets/images/table/Chips/ch";
import chip1 from "../../../../../assets/images/table/Chips/chip1.png";
import chip5 from "../../../../../assets/images/table/Chips/chip5.png";
import chip10 from "../../../../../assets/images/table/Chips/chip10.png";
import chip50 from "../../../../../assets/images/table/Chips/chip50.png";
import chip100 from "../../../../../assets/images/table/Chips/chip100.png";

import chip500 from "../../../../../assets/images/table/Chips/chip500.png";
import chip1k from "../../../../../assets/images/table/Chips/chip1k.png";
import chip5k from "../../../../../assets/images/table/Chips/chip5k.png";
import chip10k from "../../../../../assets/images/table/Chips/chip10k.png";
import chip50k from "../../../../../assets/images/table/Chips/chip50k.png";


import chip100k from "../../../../../assets/images/table/Chips/chip100k.png";
import chip500k from "../../../../../assets/images/table/Chips/chip500k.png";
import chip1M from '../../../../../assets/images/table/Chips/chip1M.png'
import chip2M from '../../../../../assets/images/table/Chips/chip2M.png'
// [50000,10000,5000, 1000, 500, 100, 50, 10, 5, 1];
// import chip50k from "../../../../../assets/images/table/Chips/chip1.png";
// import chip1M from "../../../../../assets/images/table/Chips/chip1.png";

// import tableChips from "../../../../../assets/images/table/Red_chip.png"
// import Screen from "../../../../utils/screen";
// import fileName from "../../../../../jsconfig";
import { Group, Image, Text } from "react-konva";
import { getChipAnimation } from "../../../../utils/global";

import UM from "../../../../utils/utilityMethods";

export class TablePot extends React.Component {
    constructor(props) {

        super(props);
        this.sumarray = 0
        this.imagescount = [];
        this.state = {

            image1: null,
            image5: null,
            image10: null,
            image50: null,
            image100: null,

            image500: null,
            image1k: null,
            image5k: null,
            image10k: null,
            image50k: null,

            image100K: null,
            image500k: null,
            image1M: null,
            image2M: null,

            amount: 0,
            show: false,
        };

        this.key_drag = ["key_drag1", "key_drag2", "key_drag3", "key_drag4", "key_drag5", "key_drag6", "key_drag7", "key_drag8", "key_drag9", "key_drag10",
            "key_drag11", "key_drag12", "key_drag13", "key_drag14", "key_drag15", "key_drag16", "key_drag17", "key_drag18", "key_drag19", "key_drag20",
            "key_drag21", "key_drag22", "key_drag23", "key_drag24", "key_drag25", "key_drag26", "key_drag27", "key_drag28", "key_drag29", "key_drag30"
        ]
    }

    componentDidMount() {

        this.loadImage();
    }
    componentWillUnmount() {
        this.image1.removeEventListener("load", this.handleLoad);
        this.image5.removeEventListener("load", this.handleLoad);
        this.image10.removeEventListener("load", this.handleLoad);
        this.image50.removeEventListener("load", this.handleLoad);
        this.image100.removeEventListener("load", this.handleLoad);
        this.image500.removeEventListener("load", this.handleLoad);
        this.image1k.removeEventListener("load", this.handleLoad);
        this.image5k.removeEventListener("load", this.handleLoad);
        this.image10k.removeEventListener("load", this.handleLoad);
        this.image50k.removeEventListener("load", this.handleLoad);
        this.image100k.removeEventListener("load", this.handleLoad);
        this.image500k.removeEventListener("load", this.handleLoad);
        this.image1M.removeEventListener("load", this.handleLoad);
        this.image2M.removeEventListener("load", this.handleLoad);
        this.setState({ show: false });
    }
    loadImage() {
        this.image1 = new window.Image();
        this.image5 = new window.Image();
        this.image10 = new window.Image();
        this.image50 = new window.Image();
        this.image100 = new window.Image();
        this.image500 = new window.Image();
        this.image1k = new window.Image();
        this.image5k = new window.Image();
        this.image10k = new window.Image();
        this.image50k = new window.Image();
        this.image100k = new window.Image();
        this.image500k = new window.Image();
        this.image1M = new window.Image();
        this.image2M = new window.Image();
        this.image1.src = chip1;
        this.image5.src = chip5;
        this.image10.src = chip10;
        this.image50.src = chip50;
        this.image100.src = chip100;
        this.image500.src = chip500;
        this.image1k.src = chip1k;
        this.image5k.src = chip5k;
        this.image10k.src = chip10k;
        this.image50k.src = chip50k;
        this.image100k.src = chip100k;
        this.image500k.src = chip500k;
        this.image1M.src = chip1M;
        this.image2M.src = chip2M;
        this.image1.addEventListener("load", this.handleLoad);
        this.image5.addEventListener("load", this.handleLoad);
        this.image10.addEventListener("load", this.handleLoad);
        this.image50.addEventListener("load", this.handleLoad);
        this.image100.addEventListener("load", this.handleLoad);
        this.image500.addEventListener("load", this.handleLoad);
        this.image1k.addEventListener("load", this.handleLoad);
        this.image5k.addEventListener("load", this.handleLoad);
        this.image10k.addEventListener("load", this.handleLoad);
        this.image50k.addEventListener("load", this.handleLoad);
        this.image100k.addEventListener("load", this.handleLoad);
        this.image500k.addEventListener("load", this.handleLoad);
        this.image1M.addEventListener("load", this.handleLoad);
        this.image2M.addEventListener("load", this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            image1: this.image1,
            image5: this.image5,
            image10: this.image10,
            image50: this.image50,
            image100: this.image100,
            image500: this.image500,
            image1k: this.image1k,
            image5k: this.image5k,
            image10k: this.image10k,
            image50k: this.image50k,
            image100k: this.image100k,
            image500k: this.image500k,
            image1M: this.image1M,
            image2M: this.image2M,
        });
    };

    rakePotAnimate() {
        this.setState({ show: false });
        this.rakePot.to({
            opacity: 1,
            visible: getChipAnimation(),
            x: this.props.x - 35,
            y: -200,
            duration: 1,
            ease: "EaseIn",
            onFinish: () => {
                // this.rakePot.to({
                //   opacity:1,
                // })
                this.setState({ show: true });
                this.rakePot.to({
                    visible: true,
                    x: this.props.x - 35,
                    y: this.props.y - 15,
                });
            },
        });
    }

    render() {
        return (
            <Group container="tablePot" visible={this.props.show}>
                <Group>
                    {(() => {
                        let i = 0;
                        this.imagescount = [];
                        for (i; i < 5; i++) {
                            this.imagescount.push(
                                <Image
                                    key={this.key_drag[i]}
                                    x={this.props.x}
                                    y={this.props.y - 15 - i * 3}
                                    width={20}
                                    height={20}
                                    image={
                                        i < this.props.countchips[0] ? this.state.image2M :
                                            i < this.props.countchips[0] + this.props.countchips[1] ? this.state.image1M :
                                                i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] ? this.state.image500k :
                                                    i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] ? this.state.image100k :
                                                        i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] ? this.state.image50k :
                                                            i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] ? this.state.image10k :
                                                                i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] ? this.state.image5k :
                                                                    i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] + this.props.countchips[7] ? this.state.image1k :
                                                                        i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] + this.props.countchips[7] + this.props.countchips[8] ? this.state.image500 :
                                                                            i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] + this.props.countchips[7] + this.props.countchips[8] + this.props.countchips[9] ? this.state.image100 :
                                                                                i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] + this.props.countchips[7] + this.props.countchips[8] + this.props.countchips[9] + this.props.countchips[10] ? this.state.image50 :
                                                                                    i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] + this.props.countchips[7] + this.props.countchips[8] + this.props.countchips[9] + this.props.countchips[10] + this.props.countchips[11] ? this.state.image10 :
                                                                                        i < this.props.countchips[0] + this.props.countchips[1] + this.props.countchips[2] + this.props.countchips[3] + this.props.countchips[4] + this.props.countchips[5] + this.props.countchips[6] + this.props.countchips[7] + this.props.countchips[8] + this.props.countchips[9] + this.props.countchips[10] + this.props.countchips[11] + this.props.countchips[12] ? this.state.image5 :
                                                                                            this.state.image1
                                    }
                                    ref={(node) => {
                                        this.imageNode = node;
                                    }}
                                />


                            );
                        }
                        return this.imagescount;
                    })()}
                </Group>
                <Text x={this.props.x - 40} y={this.props.y} width={100} height={20} align={"center"} verticalAlign={"middle"} text={this.props.tableOriantationLandscape ? UM.numberWithCommas(this.props.amount) : UM.changeAmtLabel(this.props.amount)} fontSize={14} fontStyle={'bold'} fontFamily={"Calibri"} fill={"#66ff66"}></Text>

                <Text x={this.props.x - 65} y={this.props.y}
                    width={80} height={20}
                    align={"center"} verticalAlign={"middle"}
                    // text={`${this.props.rakeCut}`}
                    fontSize={16} fontFamily={"Calibri"} fill={"red"}
                    ref={(node) => { this.rakePot = node; }}
                ></Text>
            </Group>
        );
    }
}
