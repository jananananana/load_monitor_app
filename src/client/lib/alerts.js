import { formatFixedNumber, formatUtcToTime } from "./d3";

function tranformInput (datum) {
    return {
        time: formatUtcToTime(datum.ts),
        value: formatFixedNumber(datum.value, 2),
    }
}

function generateMessage(time, value, high) {
    return (
        high &&
        `High load generated an alert - load = ${value}, triggered at ${time}`
    ) || `CPU load recovered: load = ${value} at ${time}`;
}

function createAlert (datum, high = false) {
    const { time, value } = tranformInput(datum);
    const message = generateMessage(time, value, high);
    return {
        message,
        time,
        value,
    };
}

export { createAlert };
