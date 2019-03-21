import { h, Component } from "preact";
import { createSparkLine } from "../../lib/d3";

export default class SparkLine extends Component {
    render(props) {
        return <g className="spark-line-path-group">
        <path
            className="spark-line-path line"
            d={createSparkLine(props)}
            style={{
                fill: "transparent",
                stroke: "#336e7b",
                "stroke-width": "2",
            }}
        />
    </g>;
    }
}
