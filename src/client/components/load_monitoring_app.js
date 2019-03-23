import { h, Component } from "preact";
import { updateLogData, updateGraphData } from "../lib/state_helpers";
import {createWebSocketClient, parseMessage } from "../lib/websockets";
import LoadMonitorGraph from "./load_monitor_graph";
import LoadMonitorTable from "./load_monitor_table";
import "../styles/reset.css";
import "../styles/components/app.css";
import { debug } from "util";

export default class LoadMonitorApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            avgLoad: 0,
            graphData: [],
            highLoad: false,
            logData: [],
        };
    }

    updateData (ev) {
        const datum = parseMessage(ev);
        let stateUpdates = {
            graphData: updateGraphData(
                datum,
                this.state.graphData,
                LoadMonitorApp.MAX_DATA_LEN,
            ),
        };
        const logDataUpdates = updateLogData({
            datum,
            highLoad: this.state.highLoad,
            logData: this.state.logData,
            prevLoad: this.state.avgLoad,
        });
        stateUpdates = Object.assign(stateUpdates, logDataUpdates);
        this.setState(stateUpdates);
    }
    componentDidMount() {
        const ws = createWebSocketClient();
        ws.onmessage = ev => this.updateData(ev);
        this.setState({ ws });
    }

    render(_, state) {
        return (
            <div className="load-monitor-container">
                <header className="load-monitor-header">
                    <h1>CPU Load Monitor</h1>
                </header>
                {
                    !!state.ws &&
                    <main className="load-monitor-content">
                        <LoadMonitorGraph
                            margin={LoadMonitorApp.MARGIN}
                            padding={LoadMonitorApp.PADDING}
                            data={state.graphData}
                        />
                        <LoadMonitorTable data={state.logData} />
                    </main>
                }
            </div>
        );
    }
}
LoadMonitorApp.MARGIN = 40;
LoadMonitorApp.MAX_DATA_LEN = 60;
LoadMonitorApp.PADDING = 10;
