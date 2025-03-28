
import React from "react";
// import GIF from "./gifs";
// import GIF from "../animation/gifs";
// import GIF from "../animation/gifs";

// <----------------------------------------images start------------------------------------------->
import axe1 from "../../../../../assets/images/table/Animation_images/Axe.png";
// import fish1 from "../../../../../assets/images/table/Animation_images/fish.gif";
import money1 from "../../../../../assets/images/table/Animation_images/money.gif";
import tissues1 from "../../../../../assets/images/table/Animation_images/tissue.gif";
// import fishstick1 from "../../../../../assets/images/table/Animation_images/Rod.gif";
import sssss1 from "../../../../../assets/images/table/Animation_images/Asset 1.png";
// <----------------------------------------images end------------------------------------------->

import axegif from "../../../../../assets/images/table/Animation_gif/Comp_2.gif";
import fish from "../../../../../assets/images/table/Animation_gif/Comp_6.gif";
import money from "../../../../../assets/images/table/Animation_gif/Comp_3.gif";
import tissue from "../../../../../assets/images/table/Animation_gif/Tissue.gif";
import fishstick from "../../../../../assets/images/table/Animation_gif/Fishing.gif";
import mud from "../../../../../assets/images/table/Animation_gif/Comp_11.gif";
import axepng from '../../../../../assets/images/table/Animation_gif/Axehitting-1.png';
import fishstickpng from '../../../../../assets/images/table/Animation_gif/Fishing-New-1.png';
import mudpng from '../../../../../assets/images/table/Animation_gif/Shit-Splash-3.png';
import tissuepng from '../../../../../assets/images/table/Animation_gif/Tissue-3-2.png';
import moneypng from '../../../../../assets/images/table/Animation_gif/Money-Foll-2-1.png';
// import tableChips1 from "../../../../../assets/images/table/Red_chip.png"
import { Group, Image } from 'react-konva';
import Spritegif from "./spritegif";


export class AnimationHere extends React.Component {
    constructor(props) {
        super(props);
        this.imagegif = [axegif, fishstick, mud, fishstick, tissue, money]
        this.imagegif1 = [axepng, fishstickpng, mudpng, fishstickpng, tissuepng, moneypng]
        this.updatevalue = 0
        this.state = {

            image: null,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            indexupdate: 0,
            //   amount: 0,
            //   show: true,
            showpot: false,
            hidegif: false,
            hidegif1: false,
            hidegif2: false,
            hidegif3: false,
            hidegif4: false,
            gifanimationposition: {
                x: -50,
                y: -50
            },
            hidegife: false,
            dragingimage: {
                zeroimage: false,
                oneimage: false,
                twoimage: false,
                threeimage: false,
                fourimage: false
            },
            booleangifs: {
                zerogife: false,
                firstgife: false,
                secondgife: false,
                thirdgife: false,
                fourgife: false,

            }
            //   showpottext: true,
        };
    }
    componentDidMount() {
        this.loadImage();
        this.setState({ showpot: false })

    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image2.removeEventListener('load', this.handleLoad);
        this.image3.removeEventListener('load', this.handleLoad);
        this.image4.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        this.image = new window.Image();
        this.image1 = new window.Image();
        this.image2 = new window.Image();
        this.image3 = new window.Image();
        this.image4 = new window.Image();
        this.image.src = axe1;
        this.image1.src = sssss1;
        this.image2.src = fish;
        this.image3.src = tissues1;
        this.image4.src = money1;
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

    // TargetPositionId2(e, dragdetails) {
    TargetPositionId2(data) {
        this.setState({ hidegif: false })
        // alert()
        // alert(dragdetails.index)
        // alert(this.updatevalue+"kk")
        //    console.log(window)
        //    console.log(window.gifler)
        //    Animator.prototype.start
        //    Animator.prototype.stop

        // this.props.network.send(`<SendGiftAward giftId="${this.imagename.indexOf(this.imagename[this.state.upadtevalue])}" giftName ="${this.imagename[this.state.upadtevalue]}"  />`)
        clearTimeout(this.cleartime)
        // switch (dragdetails.index) {
        switch (Number(data.attr.giftId)) {
            case 0:
                this.setState({
                    dragingimage: {
                        zeroimage: true,
                        oneimage: false,
                        twoimage: false,
                        threeimage: false,
                        fourimage: false
                    }
                })

                // <---------------------------------------motion image0 start--------------------------->
                this.imageNode.to({

                    visible: true,
                    x: this.props.x1[Number(data.attr.receiverSeatNo)].x,
                    y: this.props.y1[Number(data.attr.receiverSeatNo)].y,
                    duration: 0.75,
                    rotation: 360,
                    scaleX: 0.75, scaleY: 0.75,

                    ease: 'EaseInOut',
                    // visible:false,

                    onFinish: () => {
                        // this.setState({ indexupdate: dragdetails.index })

                        this.setState({ showpot: false, hidegif: true, hidegife: false })

                        this.imageNode.to({
                            visible: false,
                            x: this.props.x,
                            y: this.props.y,
                            rotation: 0,
                            scaleX: 0.75, scaleY: 0.75,

                        })
                        this.cleartime = setTimeout(() => {
                            this.setState({ hidegif: false })
                            this.setState({
                                dragingimage: {
                                    zeroimage: false,
                                    oneimage: false,
                                    twoimage: false,
                                    threeimage: false,
                                    fourimage: false
                                }
                            })
                        }, 3000)

                    }
                })
                break;
            // <---------------------------------------motion image0 end--------------------------->
            case 2:
                this.setState({
                    dragingimage: {
                        zeroimage: false,
                        oneimage: true,
                        twoimage: false,
                        threeimage: false,
                        fourimage: false
                    }
                })
                // <---------------------------------------motion image1 start--------------------------->
                this.imageNode.to({

                    visible: true,
                    x: this.props.x1[Number(data.attr.receiverSeatNo)].x,
                    y: this.props.y1[Number(data.attr.receiverSeatNo)].y,
                    duration: 0.75,
                    // rotation: 360,
                    scaleX: 0.75, scaleY: 0.75,

                    ease: 'EaseInOut',
                    // visible:false,

                    onFinish: () => {
                        // this.setState({ indexupdate: dragdetails.index })

                        this.setState({ showpot: false, hidegif: true, hidegife: false })
                        this.imageNode.to({
                            visible: false,
                            x: this.props.x,
                            y: this.props.y,
                            rotation: 0,
                            scaleX: 0.75, scaleY: 0.75,

                        })
                        this.cleartime = setTimeout(() => {
                            this.setState({ hidegif: false })
                            this.setState({
                                dragingimage: {
                                    zeroimage: false,
                                    oneimage: false,
                                    twoimage: false,
                                    threeimage: false,
                                    fourimage: false
                                }
                            })
                        }, 3000)

                    }
                })
                break;
            // <---------------------------------------motion image1 end--------------------------->
            // <---------------------------------------motion image2 start--------------------------->
            case 3:
                this.setState({
                    dragingimage: {
                        zeroimage: false,
                        oneimage: false,
                        twoimage: true,
                        threeimage: false,
                        fourimage: false
                    }
                })
                this.imageNode.to({

                    visible: true,
                    x: this.props.x1[Number(data.attr.receiverSeatNo)].x,
                    y: this.props.y1[Number(data.attr.receiverSeatNo)].y,
                    duration: 0.75,
                    // rotation: 360,
                    scaleX: 0.75, scaleY: 0.75,

                    ease: 'EaseInOut',
                    // visible:false,

                    onFinish: () => {
                        // this.setState({ indexupdate: dragdetails.index })

                        this.setState({ showpot: false, hidegif: true, hidegife: false })
                        this.imageNode.to({
                            visible: false,
                            x: this.props.x,
                            y: this.props.y,
                            rotation: 0,
                            scaleX: 0.75, scaleY: 0.75,

                        })
                        this.cleartime = setTimeout(() => {
                            this.setState({ hidegif: false })
                            this.setState({
                                dragingimage: {
                                    zeroimage: false,
                                    oneimage: false,
                                    twoimage: false,
                                    threeimage: false,
                                    fourimage: false
                                }
                            })
                        }, 3000)

                    }
                })
                break;
            // <---------------------------------------motion image2 end--------------------------->
            // <---------------------------------------motion image3 start--------------------------->
            case 4:
                this.setState({
                    dragingimage: {
                        zeroimage: false,
                        oneimage: false,
                        twoimage: false,
                        threeimage: true,
                        fourimage: false
                    }
                })
                this.imageNode.to({

                    visible: true,
                    x: this.props.x1[Number(data.attr.receiverSeatNo)].x,
                    y: this.props.y1[Number(data.attr.receiverSeatNo)].y,
                    duration: 0.75,
                    // rotation: 360,
                    scaleX: 0.75, scaleY: 0.75,

                    ease: 'EaseInOut',
                    // visible:false,

                    onFinish: () => {
                        // this.setState({ indexupdate: dragdetails.index })

                        this.setState({ showpot: false, hidegif: true, hidegife: false })
                        this.imageNode.to({
                            visible: false,
                            x: this.props.x,
                            y: this.props.y,
                            rotation: 0,
                            scaleX: 0.75, scaleY: 0.75,

                        })
                        this.cleartime = setTimeout(() => {
                            this.setState({ hidegif: false })
                            this.setState({
                                dragingimage: {
                                    zeroimage: false,
                                    oneimage: false,
                                    twoimage: false,
                                    threeimage: false,
                                    fourimage: false
                                }
                            })
                        }, 3000)

                    }
                })
                break;
            // <---------------------------------------motion image3 end--------------------------->
            // <---------------------------------------motion image4 start--------------------------->
            case 5:
                this.setState({
                    dragingimage: {
                        zeroimage: false,
                        oneimage: false,
                        twoimage: false,
                        threeimage: false,
                        fourimage: true
                    }
                })
                this.imageNode.to({

                    visible: true,
                    x: this.props.x1[Number(data.attr.receiverSeatNo)].x,
                    y: this.props.y1[Number(data.attr.receiverSeatNo)].y,
                    duration: 0.75,
                    // rotation: 360,
                    scaleX: 0.75, scaleY: 0.75,

                    ease: 'EaseInOut',
                    // visible:false,

                    onFinish: () => {
                        // this.setState({ indexupdate: dragdetails.index })

                        this.setState({ showpot: false, hidegif: true, hidegife: false })
                        this.imageNode.to({
                            visible: false,
                            x: this.props.x,
                            y: this.props.y,
                            rotation: 0,
                            scaleX: 0.75, scaleY: 0.75,

                        })
                        this.cleartime = setTimeout(() => {
                            this.setState({ hidegif: false })
                            this.setState({
                                dragingimage: {
                                    zeroimage: false,
                                    oneimage: false,
                                    twoimage: false,
                                    threeimage: false,
                                    fourimage: false
                                }
                            })

                        }, 3000)

                    }
                })
                break;
            default:
                break;
            // <---------------------------------------motion image4 end--------------------------->

        }



        // this.updatevalue = dragdetails.index
        this.updatevalue = data.attr.giftId


        this.setState({ showpot: true, gifanimationposition: { x: this.props.x1[Number(data.attr.receiverSeatNo)].x, y: this.props.y1[Number(data.attr.receiverSeatNo)].y, } })

        // <---------------------------------------motion image1 end--------------------------->
        // setTimeout(() => {

        //     // this.setState({ indexupdate: dragdetails.index })

        //     switch (dragdetails.index) {
        //         case 0:
        //             this.setState({
        //                 booleangifs: {
        //                     zerogife: true,
        //                     firstgife: false,
        //                     secondgife: false,
        //                     thirdgife: false,
        //                     fourgife: false,

        //                 }
        //             })
        //             break;
        //         case 1:
        //             this.setState({
        //                 booleangifs: {
        //                     zerogife: false,
        //                     firstgife: true,
        //                     secondgife: false,
        //                     thirdgife: false,
        //                     fourgife: false,

        //                 }
        //             })
        //             break;
        //         case 2:
        //             this.setState({
        //                 booleangifs: {
        //                     zerogife: false,
        //                     firstgife: false,
        //                     secondgife: true,
        //                     thirdgife: false,
        //                     fourgife: false,

        //                 }
        //             })
        //             break;
        //         case 3:
        //             this.setState({
        //                 booleangifs: {
        //                     zerogife: false,
        //                     firstgife: false,
        //                     secondgife: false,
        //                     thirdgife: true,
        //                     fourgife: false,

        //                 }
        //             })
        //             break;
        //         case 4:
        //             this.setState({
        //                 booleangifs: {
        //                     zerogife: false,
        //                     firstgife: false,
        //                     secondgife: false,
        //                     thirdgife: false,
        //                     fourgife: true,

        //                 }
        //             })
        //             break;

        //     }
        // }, 600)






    }
    visible(e) {
        // alert(e+"hgzdsjkf")
        this.setState({ hidegif: e })

    }
    render() {

        return (
            <Group>
                <Group>

                    {/* <GIF src={this.imagegif[this.updatevalue]} visible1={this.state.hidegif} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} /> */}
                    {/* {this.state.booleangifs.zerogife && <GIF src={this.imagegif[0]} visible1={this.state.hidegif0} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} />}
                    {this.state.booleangifs.firstgife && <GIF src={this.imagegif[1]} visible1={this.state.hidegif1} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} />}
                    {this.state.booleangifs.secondgife && <GIF src={this.imagegif[2]} visible1={this.state.hidegif2} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} />}
                    {this.state.booleangifs.thirdgife && <GIF src={this.imagegif[3]} visible1={this.state.hidegif3} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} />}
                    {this.state.booleangifs.fourgife && <GIF src={this.imagegif[4]} visible1={this.state.hidegif4} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} />} */}
                </Group>
                <Group container="dragpos"
                // visible={this.props.show}
                >

                    {this.state.dragingimage.zeroimage && <Image
                        visible={this.state.showpot}
                        x={this.props.x}
                        y={this.props.y}
                        width={50}
                        height={50}
                        image={this.state.image}
                        ref={node => {
                            this.imageNode = node;
                        }}
                        animations={{
                            cardFrame: 1,
                        }}
                        animation={"cardFrame"}
                        frameRate={1}
                    />}

                    {this.state.dragingimage.oneimage && <Image
                        visible={this.state.showpot}
                        x={this.props.x}
                        y={this.props.y}
                        width={50}
                        height={50}
                        image={this.state.image1}
                        ref={node => {
                            this.imageNode = node;
                        }}
                        animations={{
                            cardFrame: 1,
                        }}
                        animation={"cardFrame"}
                        frameRate={1}
                    />}
                    {this.state.dragingimage.twoimage && <Image
                        visible={this.state.showpot}
                        x={this.props.x}
                        y={this.props.y}
                        width={50}
                        height={50}
                        image={this.state.image2}
                        ref={node => {
                            this.imageNode = node;
                        }}
                        animations={{
                            cardFrame: 1,
                        }}
                        animation={"cardFrame"}
                        frameRate={1}
                    />}
                    {this.state.dragingimage.threeimage && <Image
                        visible={this.state.showpot}
                        x={this.props.x}
                        y={this.props.y}
                        width={50}
                        height={50}
                        image={this.state.image3}
                        ref={node => {
                            this.imageNode = node;
                        }}
                        animations={{
                            cardFrame: 1,
                        }}
                        animation={"cardFrame"}
                        frameRate={1}
                    />}
                    {this.state.dragingimage.fourimage && <Image
                        visible={this.state.showpot}
                        x={this.props.x}
                        y={this.props.y}
                        width={50}
                        height={50}
                        image={this.state.image4}
                        ref={node => {
                            this.imageNode = node;
                        }}
                        animations={{
                            cardFrame: 1,
                        }}
                        animation={"cardFrame"}
                        frameRate={1}
                    />}


                    {/* <Image
                x={100}
                y={100}
                width={100}
                height={100}
                image={this.state.image1}
            /> */}



                </Group>
                <Group>
                    {/* {this.state.hidegif&&<GIF src={this.imagegif[this.updatevalue]} updatevalue={this.updatevalue} sceonds={5} visible1={this.visible.bind(this)} x={this.state.gifanimationposition.x} y={this.state.gifanimationposition.y - 80} />} */}



                </Group>
                {this.state.hidegif && <Spritegif src={this.imagegif1[this.updatevalue]} x={this.state.gifanimationposition.x - 40} y={this.state.gifanimationposition.y - 130} />}
            </Group>

        );
    }
}
