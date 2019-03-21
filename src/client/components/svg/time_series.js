import { h, Component } from "preact";
import { extent } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleUtc } from "d3-scale";
import { select } from "d3-selection";
import { utcMinute } from "d3-time";
import ScatterPlot from "./scatter_plot";
import SparkLine from "./spark_line";

const AXIS_PADDING = 10;

export default class TimeSeries extends Component {
    generateScales () {
        const { height, width } = this.props.dimensions;
        return {
            xScale: scaleUtc()
                .domain(extent(this.props.data, d => d.ts))
                .range([0, (width - this.props.margin - 5)]),
            yScale: scaleLinear()
                .domain(extent(this.props.data, d => +d.value.toFixed(2)))
                .range([height - this.props.margin, 5]),
        }
    }
    createXAxis (node) {
        const { xScale } = this.generateScales();
        return select(node)
            .call(
                axisBottom()
                .scale(xScale)
                .ticks(10)
            );
    }
    createYAxis (node) {
        const { yScale } = this.generateScales();
        return select(node)
            .call(
                axisLeft()
                .scale(yScale)
                .ticks(4)
            );
    }
    render(props) {
        const { height, width } = props.dimensions;
        return (
            <g
                className="time-series-container"
                style={{
                    transform: `translate(${props.margin}px, 0)`,
                }}
            >
                <rect
                    className="time-series-background"
                    height={height - props.margin}
                    style={{ fill: "#eee" }}
                    width={width}
                    x={0}
                    y={0}
                />
                <g
                    className="xAxis"
                    ref={node => this.createXAxis(node)}
                    style={{transform: `translate(0, ${height - props.margin + AXIS_PADDING}px)`}}
                />
                <g
                    className="yAxis"
                    ref={node => this.createYAxis(node)}
                    style={{transform: `translate(-${AXIS_PADDING}px, 0)`}}
                    />
                <SparkLine
                    data={props.data}
                    scales={this.generateScales()}
                />
                <ScatterPlot
                    data={props.data}
                    scales={this.generateScales()}
                />
            </g>
        );
    }
}
