import { h, Component } from "preact";
import { createSparkLine } from "../../lib/d3";
import "../../styles/components/spark_line.css";

export default class SparkLine extends Component {
    render(props) {
        return <g className="spark-line-path-group">
            <path
                className="spark-line-path line"
                d={createSparkLine(props)}
            />
        </g>;
    }
}
