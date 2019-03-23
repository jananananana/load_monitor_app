import { h, Component } from "preact";
import "../styles/components/load-monitor-table.css";

export default class LoadMonitorTable extends Component {
    render(props) {
        return (
            <section className="load-monitor-table">
                <h2 className="load-monitor-table-title">CPU Load Alerts</h2>
                <div className="load-monitor-alerts-wrapper">
                    <ul className="load-monitor-alerts">{
                        props.data.map(datum =>
                            <li className="load-monitor-alert">{datum.message}</li>
                        )
                    }</ul>
                </div>
            </section>
        );
    }
}
