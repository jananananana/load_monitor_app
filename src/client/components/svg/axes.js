import { h, Component } from "preact";
import { createXAxis, createYAxis } from "../../lib/d3";

export default class Axes extends Component {
    render(props) {
        const { height, margin, padding } = props.dimensions;
        return (
            <g>
                <g
                    className="xAxis"
                    ref={node => createXAxis(node, props)}
                    style={{transform: `translate(0, ${height - margin + padding}px)`}}
                />
                <g
                    className="yAxis"
                    ref={node => createYAxis(node, props)}
                    style={{transform: `translate(-${padding}px, 0)`}}
                />
            </g>
        );
    }
}
