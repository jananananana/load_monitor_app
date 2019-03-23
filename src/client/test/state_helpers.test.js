import { updateLogData } from "../lib/state_helpers";

const datum = {
    ts: 1546318800000,
    value: 4,
}
const options = { datum }; 
const time = "05:00:00";
const value = 4.00;
test("Expect updateLog data to generate an alert when avgLoad goes over 1", () => {
    Object.assign(options, {
        highLoad: false,
        logData: [],
        prevLoad: 20,
    });
    const message =
        `High load generated an alert - load = ${value}, triggered at ${time}`;
    expect(updateLogData(options)).toEqual({
        avgLoad: 2,
        highLoad: true,
        logData: [{
            message,
            time,
            value,
        }],
  });
});

test("Expect updateLog data to generate an alert when avgLoad goes down", () => {
    Object.assign(options, {
        highLoad: true,
        logData: [],
        prevLoad: 5,
    });
    const message =
        `CPU load recovered: load = ${value} at ${time}`;
    expect(updateLogData(options)).toEqual({
        avgLoad: 0.75,
        highLoad: false,
        logData: [{
            message,
            time,
            value,
        }],
  });
});