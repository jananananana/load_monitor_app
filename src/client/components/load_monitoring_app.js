import { h, Component } from "preact";
import WebSocketClient from "../websocket_client";
import SVGContainer from "./svg/svg_container";
import "../styles/reset.css";
import "../styles/loading.css";
import "../styles/components/app.css";

const MAX_DATA_LEN = 60;
const MARGIN = 40;
const PADDING = 10;

export default class LoadMonitoringApp extends Component {
    updateData (ev) {
        const loadData = this.state.loadData || [];      
        if (loadData.length === MAX_DATA_LEN) {
            loadData.shift();
        }
        loadData.push(WebSocketClient.parseMessage(ev));
        this.setState({ loadData });
    }
    componentDidMount() {
        this.ws = WebSocketClient.createWebSocketClient();
        this.ws.onmessage = ev => this.updateData(ev);
    }

    render(_, state) {
        return (
            <div className="load-monitor-container">
                <header className="load-monitor-header">
                    <h1>CPU Load Monitoring App</h1>
                </header>
                <main className="load-monitor-content">
                    {
                        state.loadData &&
                        state.loadData.length > 1 ?
                        <SVGContainer
                            data={state.loadData}
                            margin={MARGIN}
                            padding={PADDING}
                        /> :
                        <div className="loading-container">
                            <div className="loading" />
                        </div>
                    }
                </main>
            </div>
        );
    }
}