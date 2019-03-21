import { h, render } from 'preact';
import LoadMonitoringApp from './components/load_monitoring_app';
// import './styles/index.css';

render(
  <LoadMonitoringApp />,
  document.body,
  document.getElementById("container")
);
