import { h, Component } from "preact";

export default class SVGContainer extends Component {
    render(props) {
        return (
            <svg
                className="svg-container"
                height={props.height}
                width={props.width}
            >
                {props.children}
            </svg>
        );
    }
}
