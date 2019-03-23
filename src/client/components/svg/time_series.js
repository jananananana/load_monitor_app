import { h, Component } from "preact";
import Axes from "./axes";
import ScatterPlot from "./scatter_plot";
import SparkLine from "./spark_line";
import "../../styles/components/time_series.css";

export default class TimeSeries extends Component {
    render(props) {
        const { height, margin, width } = props.dimensions;
        return (
            <g
                className="time-series-container"
                style={{
                    transform: `translate(${margin}px, 0)`,
                }}
            >
                <rect
                    className="time-series-background"
                    height={height - margin}
                    width={width}
                    x={0}
                    y={0}
                />
                <Axes
                    data={props.data}
                    dimensions={props.dimensions}
                />
                <SparkLine
                    data={props.data}
                    dimensions={props.dimensions}
                />
                <ScatterPlot
                    data={props.data}
                    dimensions={props.dimensions}
                />
            </g>
        );
    }
}
