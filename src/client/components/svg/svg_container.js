import { h, Component } from "preact";
import TimeSeries from "./time_series";

export default class SVGContainer extends Component {
    getDimensions () {
        const width = document.body.clientWidth - this.props.margin;
        const height = (width * (1 / 3));
        return {
            height,
            margin: this.props.margin,
            padding: this.props.padding,
            width
        }
    }

    render(props) {
        const { height, width } = this.getDimensions();
        return (
            <svg
                className="svg-container"
                width={width}
                height={height}
            >
                <TimeSeries
                    data={props.data}
                    dimensions={this.getDimensions()}
                />
            </svg>
        );
    }
}
