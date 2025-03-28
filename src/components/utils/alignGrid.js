"use strict";
import { Component } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text, Circle, Group, Line } from "react-konva";

export default class AlignGrid extends Component {
	constructor(props) {
		super(props);
		this.cw = props.width / props.cols;
		this.ch = props.height / props.rows;
	}

	render() {
		return (
			<Group container="grid">
				{(() => {
					let i = 0,cnt = 0,
						rows = [];
					for (i; i < this.props.height; i+= this.ch) {
						rows.push(
						<Group>
						<Line points={[0, i, this.props.width,i]} stroke={"#ff0000"} strokeWidth={0.5}></Line>
							<Text x={0} y={i} text={cnt} fill={'#ffffff'}></Text>
							</Group>
						);
						cnt++
					}
					return rows;
				})()}
				{(() => {
					let i = 0,cnt=0,
						cols = [];
					for (i; i < this.props.width; i+= this.cw) {
						cols.push(
							<Group>
							<Line points={[i, 0, i, this.props.height]} stroke={"#ff0000"} strokeWidth={0.5}></Line>
							<Text x={i} y={0} text={cnt} fill={'#ffffff'}></Text>
							</Group>
						);
						cnt++
					}
					return cols;
				})()}
			</Group>
		);
	}

}
