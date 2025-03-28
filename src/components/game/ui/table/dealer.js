import React from "react";
import dealer from "../../../../assets/images/table/dealer_icon.png";
// import Lbealer from "../../../../assets/images/table/LBdealer.png";
import { Image } from "react-konva";
// import fileName from "../../../../jsconfig";

export class Dealer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            x: 390,
            y: 160,
        };

        // this.dealerPosition = {
        //     2: [
        //         { x: 1030, y: 310 },
        //         { x: 30, y: 320 },
        //     ],
        //     4: [
        //         { x: 745, y: 90 },
        //         { x: 685, y: 470 },
        //         { x: 365, y: 470 },
        //         { x: 320, y: 90 },
        //     ],
        //     6: [
        //         { x: 745, y: 90 },
        //         { x: 1030, y: 310 },
        //         { x: 685, y: 470 },
        //         { x: 365, y: 470 },
        //         { x: 30, y: 320 },
        //         { x: 320, y: 90 },
        //     ],
        //     7: [
        //         { x: 745, y: 90 },
        //         { x: 975, y: 165 },
        //         { x: 970, y: 455 },
        //         { x: 685, y: 470 },
        //         { x: 365, y: 470 },
        //         { x: 110, y: 455 },
        //     ],
        //     8: [
        //         { x: 745, y: 90 },
        //         { x: 975, y: 165 },
        //         { x: 970, y: 455 },
        //         { x: 685, y: 470 },
        //         { x: 365, y: 470 },
        //         { x: 110, y: 455 },
        //         { x: 85, y: 170 },
        //         { x: 320, y: 90 },
        //     ],
        //     10: [
        //         { x: 745, y: 90 },
        //         { x: 975, y: 165 },
        //         { x: 1030, y: 310 },
        //         { x: 970, y: 455 },
        //         { x: 685, y: 470 },
        //         { x: 365, y: 470 },
        //         { x: 110, y: 455 },
        //         { x: 30, y: 320 },
        //         { x: 85, y: 170 },
        //         { x: 320, y: 90 },
        //     ],
        // };
    }
    componentDidMount() {
        this.loadImage();
        this.setState({
            image: null,
            x: 390,
            y: 160,
        })
    }
    // componentDidUpdate(oldProps) {
    //   if (oldProps.src !== this.props.src) {
    //     this.loadImage();
    //   }
    // }
    componentWillUnmount() {
        // this.props.cancel("Component unmounted, request is cancelled.");
        this.image.removeEventListener("load", this.handleLoad);
        this.dealerAnimation(330, 30);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        // this.image.src = (fileName.name === "Leader_bet" ? Lbealer : dealer);
        this.image.src = dealer;
        this.image.addEventListener("load", this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image,
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    updateDealerPosition(position, id) {
        // console.log("dealer position");
        // console.log(position);
        // console.log(id);
        // try{

        // if(position!==undefined){
        if (id && position) {
            this.dealerAnimation(position.x - this.props.paddings, position.y - this.props.paddings)
            this.setState({ x: position.x - this.props.paddings, y: position.y - this.props.paddings })
            // if (position.x > 440) {

            //     this.setState({
            //         x: position.x - 40 - this.props.paddings,
            //         y: position.y < 150 ? position.y - this.props.paddings - 0 :
            //             position.y < 250 ? position.y - this.props.paddings + 10 :
            //                 position.y - this.props.paddings - 45
            //     });
            // } else {
            //     this.setState({
            //         x: position.x + 160 - this.props.paddings,
            //         y: position.y < 150 ? position.y - this.props.paddings - 0 :
            //             position.y < 250 ? position.y - this.props.paddings + 10 :
            //                 position.y - this.props.paddings - 45
            //     });

            // }
            // console.log("update the dealer to "+ id);
            // console.log(position);
            // this.dealerAnimation(position.x - this.props.paddings + (fileName.name === "Leader_bet" ? (window.innerWidth > 500 ? 20 : 10) : 0), position.y - this.props.paddings + (fileName.name === "Leader_bet" ? (window.innerWidth > 500 ? 10 : 0) : 0));
        } else {
            // this.setState({x:10,y:100})
            this.dealerAnimation(330, 30);
        }
        // }catch(e){}
    }
    dealerAnimation(x, y) {
        this.imageNode.to({
            x: x,
            y: y,
            duration: 0.4,
            ease: "Linear",
            // ease:'EaseInOut'
        });
    }
    render() {
        return (
            <Image x={this.state.x} y={this.state.y} width={this.props.size}
                height={this.props.size} image={this.state.image}
                ref={(node) => { this.imageNode = node; }}
            />
        );
    }
}
