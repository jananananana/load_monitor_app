import { h, Component } from "preact";
import { generateScales } from "../../lib/d3";
import "../../styles/components/scatter_plot.css";

export default class ScatterPlot extends Component {
    createCircles () {
        const { xScale, yScale } = generateScales(this.props);
        const x = d => xScale(d.ts);
        const y = d => yScale(+d.value.toFixed(2))
        return this.props.data.map(d =>
            <circle
                className="scatter-plot-point"
                cx={x(d)}
                cy={y(d)}
                key={`${x(d)}_${y(d)}`}
                r={4}
            />
        );
    }

    render() {
        return (
            <g className="scatter-plot-group">{this.createCircles()}</g>
        );
    }
}
