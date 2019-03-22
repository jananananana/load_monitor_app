import { h, Component } from "preact";
import { formatUtcToTime, generateScales } from "../../lib/d3";
import "../../styles/components/scatter_plot.css";

export default class ScatterPlot extends Component {
    createCircles () {
        const { xScale, yScale } = generateScales(this.props);
        const formatY = d => +d.value.toFixed(2);
        const x = d => xScale(d.ts);
        const y = d => yScale(formatY(d));
        return this.props.data.map(d =>
            <g className="scatter-plot-point" >
                <circle
                    className="scatter-plot-dot"
                    cx={x(d)}
                    cy={y(d)}
                    key={`${x(d)}_${y(d)}`}
                    r={4}
                />
                <text
                    x={x(d)}
                    y={y(d) - 20}
                    className="scatter-plot-label"
                >
                    {`Time: ${formatUtcToTime(d.ts)} Value: ${formatY(d)}`}
                </text>
            </g>
        );
    }

    render() {
        return (
            <g className="scatter-plot-group">{this.createCircles()}</g>
        );
    }
}
