import { h, Component } from "preact";
import SVGContainer from "./svg/svg_container";
import TimeSeries from "./svg/time_series";
import "../styles/loading.css";
import "../styles/components/load-monitor-graph.css";

export default class LoadMonitorGraph extends Component {
    getDimensions () {
        const width = document.body.clientWidth - this.props.margin;
        const height = (width * (1 / 5));
        return {
            height,
            margin: this.props.margin,
            padding: this.props.padding,
            width
        }
    }

    render(props) {
        const { height, width } = this.getDimensions();
        const data = props.data;
        return (
            <section className="load-monitor-graph">
            {
                data &&
                data.length > 0 ?
                <div>
                    <h2 className="load-monitor-graph-title">Average CPU Load</h2>
                    <SVGContainer
                        height={height}
                        width={width}
                    >
                        <TimeSeries
                            data={data}
                            dimensions={this.getDimensions()}
                        />
                    </SVGContainer>
                </div> :
                <div className="loading-container">
                    <div className="loading" />
                </div>
            }
            </section>
        );
    }
}
LoadMonitorGraph.MAX_DATA_LEN = 60;
