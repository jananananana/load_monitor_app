import { h, Component } from "preact";
import { curveBasis, line } from 'd3-shape';

export default class SparkLine extends Component {
    createSparkLine () {
        const formatY = d => +d.value.toFixed(2);
        const sparkLine = line()
            .x(d => this.props.scales.xScale(d.ts))
            .y(d => this.props.scales.yScale(formatY(d)));

        return sparkLine(this.props.data);
    }

    render() {
        return <g className="spark-line-path-group">
        <path
            className="spark-line-path line"
            d={this.createSparkLine()}
            style={{
                fill: "transparent",
                stroke: "#336e7b",
                "stroke-width": "2",
            }}
        />
    </g>;
    }
}
