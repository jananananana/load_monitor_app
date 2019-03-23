import { createAlert } from "./alerts";

function updateLogData (options = {}) {
    const {
        datum,
        highLoad = false,
        logData,
        prevLoad
    } = options;
    const avgLoad = (prevLoad + datum.value) / 12;
    const updates = { avgLoad };
    if (avgLoad > 1) {
        updates.highLoad = true;
        logData.push(createAlert(datum, updates.highLoad));
        updates.logData = logData;
        return updates;
    }
    if (highLoad === true) {
        logData.push(createAlert(datum));
        updates.logData = logData;
        updates.highLoad = false;
    }
    return updates;
}

function updateGraphData (datum, graphData, max) {
    const data = graphData;
    if (data.length === max) {
        data.shift();
    }
    data.push(datum);

    return data;
}

export { updateLogData, updateGraphData };
