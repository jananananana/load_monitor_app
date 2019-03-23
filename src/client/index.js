import { h, render } from 'preact';
import LoadMonitorApp from './components/load_monitoring_app';

render(
  <LoadMonitorApp />,
  document.body,
  document.getElementById("container")
);
