import { h, Component } from "preact";
import WebSocketClient from "../websocket_client";
import SVGContainer from "./svg/svg_container";

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
            <div id="load-monitor-container">
                <header id="load-monitor-header">
                    <h1>CPU Load Monitoring App</h1>
                </header>
                <main id="load-monitor-content">
                   {
                        state.loadData &&
                        state.loadData.length > 0 ?
                        <SVGContainer
                            data={state.loadData}
                            margin={MARGIN}
                            padding={PADDING}
                        /> :
                        <p>Loading ...</p>
                   }
                </main>
            </div>
        );
    }
}