import { h, Component } from "preact";

export default class ScatterPlot extends Component {
    createCircles () {
        const x = d => this.props.scales.xScale(d.ts);
        const y = d => this.props.scales.yScale(+d.value.toFixed(2))
        return this.props.data.map(d =>
            <circle
                cx={x(d)}
                cy={y(d)}
                key={`${x(d)}_${y(d)}`}
                style={{ fill: "#AA2E00" }}
                r={4}
            />
        );
    }

    render() {
        return (
            <g className="spark-line-scatter-group">{this.createCircles()}</g>
        );
    }
}
