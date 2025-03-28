import React from "react";
import timerTop from "../../../../../assets/images/table/timer_top.svg";
import timerBottom from "../../../../../assets/images/table/timer_bottom.svg";
import { Group, Image } from "react-konva";

export class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			imageTwo: null,
			x: 100,
			y: 100,
		};
	}
	componentDidMount() {
		this.loadImage();
	}
	// componentDidUpdate(oldProps) {
	//   if (oldProps.src !== this.props.src) {
	//     this.loadImage();
	//   }
	// }
	componentWillUnmount() {
		this.image.removeEventListener("load", this.handleLoad);
		this.imageTwo.removeEventListener("load", this.handleLoadTwo);
	}
	loadImage() {
		// save to "this" to remove "load" handler on unmount
		this.image = new window.Image();
		this.image.src = timerTop;
		this.image.addEventListener("load", this.handleLoad);
		this.imageTwo = new window.Image();
		this.imageTwo.src = timerBottom;
		this.imageTwo.addEventListener("load", this.handleLoadTwo);
	}
	handleLoad = () => {
		this.setState({
			image: this.image,
		});
	};
	handleLoadTwo = () => {
		this.setState({
			imageTwo: this.imageTwo,
		});
	};
	updateDealerPosition(cnt, id) {
		if (id !== undefined) {
			this.setState({ x: this.dealerPosition[cnt][id].x, y: this.dealerPosition[cnt][id].y });
		} else {
			this.setState({ x: 100, y: 100 });
		}
	};
	render() {
		return (
			<Group visible={this.props.show}>
				<Image
					x={this.props.x}
					y={this.props.y}
					width={this.props.width}
					height={this.props.height}
					image={this.state.imageTwo}
					ref={(node) => {
						this.imageNode = node;
					}}
				/>
				<Image
					x={this.props.x}
					y={this.props.y}
					width={this.props.width}
					height={this.props.height}
					scaleX={this.props.value}
					image={this.state.image}
					ref={(node) => {
						this.imageNode = node;
					}}
				/>
			</Group>
		);
	}
}
