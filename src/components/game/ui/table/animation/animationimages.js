import React, { Component } from "react";
import { Group, Stage, Layer, Shape, Rect, Image } from "react-konva";
import TargetPos from './targetpos'


// ---------------------------animation images start------------------------------------
import axe from '../../../../../assets/images/table/Animation_images/Axe.png'
import fish from '../../../../../assets/images/table/Animation_images/fish.gif'
import money from '../../../../../assets/images/table/Animation_images/money.gif'
import tissues from '../../../../../assets/images/table/Animation_images/tissue.gif'
import fishstick from '../../../../../assets/images/table/Animation_images/Rod.gif'
import { data } from "jquery";
import Screen from "../../../../utils/screen";
// ---------------------------animation images end------------------------------------
export default class
    Animage extends Component {
    constructor(props) {
        super(props)
        this.seatsContainer1 = [];
        this.imageloadarray = []
        this.gameBox1 = null;
        this.cw_min = props.stageWidth / 20;
        this.ch_min = props.stageHeight / 30;
        this.state = {
            dragdetails: {
                index: null,
                name: ''
            },
            image: null,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            seatLayout1:Screen.getDeviceType().seatLayout,
            // seatLayout1: {
            //     2: [{ x: this.cw_min * 7.65, y: this.ch_min * 5 }, { x: this.cw_min * 7.65, y: this.ch_min * 22.3 }],

            //     4: [{ x: this.cw_min * 14.9, y: this.ch_min * 10 }, { x: this.cw_min * 15, y: this.ch_min * 20.3 },
            //     { x: this.cw_min * 0.5, y: this.ch_min * 20.3 },
            //     { x: this.cw_min * 0.5, y: this.ch_min * 10 }],

            //     5: [{ x: this.cw_min * 7.65, y: this.ch_min * 5 }, { x: this.cw_min * 14.9, y: this.ch_min * 10 },
            //     { x: this.cw_min * 15, y: this.ch_min * 20.3 }, { x: this.cw_min * 0.5, y: this.ch_min * 20.3 },
            //     { x: this.cw_min * 0.5, y: this.ch_min * 10 }],

            //     6: [{ x: this.cw_min * 14.9, y: this.ch_min * 10 }, { x: this.cw_min * 15, y: this.ch_min * 20.2 },
            //     { x: this.cw_min * 7.65, y: this.ch_min * 22.3 }, { x: this.cw_min * 0.5, y: this.ch_min * 20.2 },
            //     { x: this.cw_min * 0.5, y: this.ch_min * 10 }, { x: this.cw_min * 7.65, y: this.ch_min * 5 }],

            //     7: [{ x: this.cw_min * 15, y: this.ch_min * 8 }, { x: this.cw_min * 15.1, y: this.ch_min * 14 },
            //     { x: this.cw_min * 15, y: this.ch_min * 20.3 }, { x: this.cw_min * 0.5, y: this.ch_min * 20.3 },
            //     { x: this.cw_min * 0.4, y: this.ch_min * 14 }, { x: this.cw_min * 0.4, y: this.ch_min * 8 },
            //     { x: this.cw_min * 7.65, y: this.ch_min * 5 }],

            //     8: [{ x: this.cw_min * 15.1, y: this.ch_min * 14 }, { x: this.cw_min * 15, y: this.ch_min * 20.2 },
            //     { x: this.cw_min * 7.65, y: this.ch_min * 22.3 }, { x: this.cw_min * 0.4, y: this.ch_min * 20.2 },
            //     { x: this.cw_min * 0.4, y: this.ch_min * 14 }, { x: this.cw_min * 0.4, y: this.ch_min * 8 },
            //     { x: this.cw_min * 7.65, y: this.ch_min * 5 }, { x: this.cw_min * 14.9, y: this.ch_min * 8 }],

            //     10: [{ x: this.cw_min * 11, y: this.ch_min * 5 }, { x: this.cw_min * 15, y: this.ch_min * 8.5 },
            //     { x: this.cw_min * 15, y: this.ch_min * 13.5 }, { x: this.cw_min * 15, y: this.ch_min * 20 },
            //     { x: this.cw_min * 11, y: this.ch_min * 23.5 }, { x: this.cw_min * 4.6, y: this.ch_min * 23.5 },
            //     { x: this.cw_min * 0.5, y: this.ch_min * 20 }, { x: this.cw_min * 0.5, y: this.ch_min * 13.5 },
            //     { x: this.cw_min * 0.5, y: this.ch_min * 8.5 }, { x: this.cw_min * 4.5, y: this.ch_min * 5 }],
            // },
            imagearray: {
                1: axe,
                2: fish,
                3: money,
                4: tissues,
                5: fishstick,
            },

        }
        this.imagename = ["axe", "fish", "money", "tissue", "fishrod"]
        this.key_seat = ["Seat1", "Seat2", "Seat3", "Seat4", "Seat5", "Seat6", "Seat7", "Seat8", "Seat9", "Seat10"]
        this.key_image = ["Image0", "Image2", "Image3", "Image4", "Image5"]
        this.CollusionRefs = [this.Collusion1 = React.createRef(), this.Collusion2 = React.createRef(), this.Collusion3 = React.createRef(), this.Collusion4 = React.createRef(), this.Collusion5 = React.createRef(), this.Collusion6 = React.createRef(), this.Collusion7 = React.createRef(), this.Collusion8 = React.createRef(), this.Collusion9 = React.createRef(), this.Collusion10 = React.createRef(),]
    }

    componentDidMount() {
        this.loadImage();
        this.gameBox1 = document.getElementById('gameBox1');
        this.gameBox1.style.zIndex = "1"
        this.gameBox1.style.border = "2px solid red"
        this.gameBox1.style.top = "0px"

        this.dvHt = this.gameBox1.clientHeight;
        this.dvWid = this.gameBox1.clientWidth;
        this.resize();
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
    }
    loadImage(image1) {
        this.image = new window.Image();
        this.image1 = new window.Image();
        this.image2 = new window.Image();
        this.image3 = new window.Image();
        this.image4 = new window.Image();
        this.image.src = axe;
        this.image1.src = fish;
        this.image2.src = money;
        this.image3.src = tissues;
        this.image4.src = fishstick;
        // this.image.src = this.state.imagearray[1];
        this.image.addEventListener('load', this.handleLoad);
        this.image1.addEventListener('load', this.handleLoad);
        this.image2.addEventListener('load', this.handleLoad);
        this.image3.addEventListener('load', this.handleLoad);
        this.image4.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            image: this.image,
            image1: this.image1,
            image2: this.image2,
            image3: this.image3,
            image4: this.image4,
        });

    };
    resize = () => {
        let windHt;
        let windWd;
        this.gbw = 500;
        this.gbh = 880;
        windHt = window.innerHeight;
        windWd = window.innerWidth;

        let marg_left = (windHt * this.gbw / this.gbh - windWd) / 2;
        let marg_top = (windWd * this.gbh / this.gbw - windHt) / 2;
        let lndscp_1 = (windHt / this.gbw * this.gbh);
        let lndscp_2 = (lndscp_1 - windWd) / 2 * -1;
        let marg_left_lndscp = lndscp_1 + lndscp_2;

        // console.log(lndscp_1)
        // console.log(lndscp_2)

        let checkWid = windHt * this.gbw / this.gbh;
        // console.log(checkWid)
        this.gameBox1 = document.getElementById('gameBox1');


        if (windWd > windHt && windWd < this.gameBox1.clientWidth && windHt < this.gameBox1.clientHeight && windWd > checkWid) {
            this.gameBox1.style.transform = "scale(" + windHt / this.gbh + ")";
            this.gameBox1.style.marginLeft = marg_left * -1 + "px";
        }
        else if (windWd < windHt && windWd < this.gameBox1.clientWidth && windHt < this.gameBox1.clientHeight) {
            if ((windWd / windHt) * 100 > 60) {
                this.gameBox1.style.transform = "scale(" + windHt / this.gbh + ")";
                this.gameBox1.style.marginLeft = marg_left * -1 + "px";
            } else {
                this.gameBox1.style.transform = "scale(" + windWd / this.gbw + ")";
            }


        } else {
            this.gameBox1.style.transformOrigin = "left top";
            this.gameBox1.style.transform = "scale(" + windWd / this.gbw + ")";
            this.gameBox1.style.marginTop = marg_top * -1 + "px";
        }
        // console.log(this.gameBox1.style.transform)
    }
    tosendarray(data){

        
    
    }
    dargmoving=(e)=>{
        this.imageNode.to({
                    
        
            x: parseInt(e.target._lastPos.x),
            y:parseInt(e.target._lastPos.y),
            // duration: 0.75,
            // scaleX: 0.75, scaleY: 0.75,
            // stroke:"#fff",
            
            // ease: 'EaseInOut',
            // stroke: 'red',
            // strokeWidth: 2,
            shadowColor: 'red',
            shadowBlur: 0,
            shadowOffset: { x: 10, y: 10 },
            shadowOpacity: 0.5,
            // visible:false,
            
            // onFinish: () => {
            //     this.imageNode.to({
            //         visible: false,
            //         x: this.props.x,
            //         y: this.props.y,
            //         rotation: 0,
            //         scaleX: 0.75, scaleY: 0.75,
                    
            //     })
          
                
            // }
        })

    }
    handleDrag = (e) => {
        // alert(e.target.index + "index")
        // alert(e.target.attrs.id)
        // alert(e)
        // alert("dragend")
        // alert(e.target.index)
        this.setState({
            dragdetails: {
                index: e.target.attrs.index,
                name: e.target.attrs.id
            }
        })
        // console.log(e)
        // console.log(e.target._lastPos.x)
        // console.log(e.target._lastPos.y)
        // alert("dragend")
        for (let i = 0; i < this.props.seatCount; i++) {
            this.CollusionRefs[i].current.handleDragSeat(e.target._lastPos)
        }
        this.props.hidaAni(false)
    }
    TargetpositionId(e) {
        // alert(e)

        this.props.TargetpositionId(e, this.state.dragdetails)

    }

    render() {
        return (
            <Layer >
                <Group
                    ref={node => {
                        this.seat = node;
                    }
                    }
                >

                    <Rect
                        x={300}
                        y={720}
                        width={50}
                        height={50}
                        fill="red"
                        shadowBlur={10}
                        // draggable="true"
                        onMouseOver={() => {

                        }}
                        onMouseOut={() => {

                        }}

                        onClick={() => { this.props.hidaAni(false) }}
                        onTap={() => {
                            // this.handleClick(this.props.id);
                            // alert("hi")
                            this.props.hidaAni(false)
                        }}

                    />
                    <Group id="target">
                        {(() => {

                            let i = 0;
                            this.seatsContainer1 = [];
                            for (i; i < this.props.seatCount; i++) {

                                this.seatsContainer1.push(<TargetPos
                                    key={this.key_seat[i]}
                                    ref={this.CollusionRefs[i]}
                                    seatProperties={this.props.seatProperties}
                                    x={this.state.seatLayout1[this.props.seatCount][i].x}
                                    y={this.state.seatLayout1[this.props.seatCount][i].y}
                                    id={i}
                                    TargetpositionId={this.TargetpositionId.bind(this)}
                                ></TargetPos>);
                            }
                            return this.seatsContainer1;
                        })()}
                    </Group>
                    <Group

                    >
                        {/* <Group>

                            {(() => {
                                let i = 0;
                                this.imageloadarray = [];
                                for (i; i < 5; i++) {
                                    this.imageloadarray.push(
                                        <Image
                                        key={this.key_image[i]}
                                            x={1+i*50}
                                            y={720}
                                            width={50}
                                            height={50}
                                            stroke={"#fff"}
                                            image={this.state.image}
                                            draggable="true"
                                            index={0}
                                            onDragStart={(e) => {
                                             
                                              }}
                                              onDragMove={(e)=>{
                                                // console.log("moving")
                                                // console.log(e)

                                              }}
                                              onDragEnd={this.handleDrag}
                                              onTap={() => {alert("tap")}}
                                              onTapEnd={()=>{alert("tapend")}}

                                        />);
                                }
                                return this.imageloadarray;
                            })()}
                        </Group> */}
                    
                            <Group stroke={"#fff"}     fill="#00D2FF" height={60} width={300}>
                                <Image
                                    // key={this.key_image[i]}
                                    x={1 + 50}
                                    y={720}
                                    width={50}
                                    height={50}
                                    // stroke={"#fff"}
                                    // fill="#161A1D"
                                    // stroke="black"
                                    // strokeWidth={4}
                                    image={this.state.image}
                                    draggable="true"
                                    index={0}
                                    id="axe"
                                    onDragStart={(e) => {

                                    }}
                                    onDragMove={
                                        this.dargmoving

                                    }
                                    onDragEnd={this.handleDrag}
                                    ref={node => {
                                        this.imageNode = node;
                                    }}
                                // onTap={() => { alert("tap") }}
                                // onTapEnd={() => { alert("tapend") }}


                                />
                            </Group>
                            <Group>
                                <Image
                                    // key={this.key_image[i]}
                                    x={100}
                                    y={720}
                                    width={50}
                                    height={50}
                                    // stroke={"#fff"}
                                    // fill="#161A1D"
                                    image={this.state.image1}
                                    draggable="true"
                                    index={1}
                                    id="fish"
                                    onDragStart={(e) => {

                                    }}
                                    onDragMove={(e) => {
                                        // console.log("moving")
                                        // console.log(e)

                                    }}
                                    onDragEnd={this.handleDrag}
                                // onTap={() => { alert("tap") }}
                                // onTapEnd={() => { alert("tapend") }}

                                />
                            </Group>
                            <Group>
                                <Image
                                    // key={this.key_image[i]}
                                    x={150}
                                    y={720}
                                    width={50}
                                    height={50}
                                    // stroke={"#fff"}
                                    // fill="#161A1D"
                                    image={this.state.image2}
                                    draggable="true"
                                    index={2}
                                    id="money"
                                    onDragStart={(e) => {

                                    }}
                                    onDragMove={(e) => {
                                        // console.log("moving")
                                        // console.log(e)

                                    }}
                                    onDragEnd={this.handleDrag}
                                // onTap={() => { alert("tap") }}
                                // onTapEnd={() => { alert("tapend") }}

                                />
                            </Group>
                            <Group>
                                <Image
                                    // key={this.key_image[i]}
                                    x={200}
                                    y={720}
                                    width={50}
                                    height={50}
                                    // stroke={"#fff"}
                                    // fill="#161A1D"
                                    image={this.state.image3}
                                    draggable="true"
                                    index={3}
                                    id="tissue"
                                    onDragStart={(e) => {

                                    }}
                                    onDragMove={(e) => {
                                        // console.log("moving")
                                        // console.log(e)

                                    }}
                                    onDragEnd={this.handleDrag}
                                // onTap={() => { alert("tap") }}
                                // onTapEnd={() => { alert("tapend") }}

                                />
                            </Group>
                            <Group>
                                <Image
                                    // key={this.key_image[i]}
                                    x={250}
                                    y={720}
                                    width={50}
                                    height={50}
                                    // stroke={"#fff"}
                                    // fill="#161A1D"
                                    image={this.state.image4}
                                    draggable="true"
                                    index={4}
                                    id="fishstick"
                                    onDragStart={(e) => {

                                    }}
                                    onDragMove={(e) => {
                                        // console.log("moving")
                                        // console.log(e)

                                    }}
                                    onDragEnd={this.handleDrag}
                                // onTap={() => { alert("tap") }}
                                // onTapEnd={() => { alert("tapend") }}

                                />
                            </Group>

                        </Group>
                    </Group>
                

            </Layer>

        )
    }
}