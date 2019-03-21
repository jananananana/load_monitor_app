import { extent } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleUtc } from "d3-scale";
import { select } from "d3-selection";
import { line } from 'd3-shape';

function generateScales (props) {
    const { height, margin, width } = props.dimensions;
    return {
        xScale: scaleUtc()
            .domain(extent(props.data, d => d.ts))
            .range([0, (width - margin - 5)]),
        yScale: scaleLinear()
            .domain([0, 1])
            .range([height - margin, 5]),
    }
}
function createXAxis (node, props) {
    const { xScale } = generateScales(props);
    return select(node)
        .call(
            axisBottom()
            .scale(xScale)
            .ticks(10)
        );
}
function createYAxis (node, props) {
    const { yScale } = generateScales(props);
    return select(node)
        .call(
            axisLeft()
            .scale(yScale)
            .ticks(8)
        );
}

function createSparkLine (props) {
    const { xScale, yScale } = generateScales(props);
    const formatY = d => +d.value.toFixed(2);
    const sparkLine = line()
        .x(d => xScale(d.ts))
        .y(d => yScale(formatY(d)));

    return sparkLine(props.data);
}

export { generateScales, createXAxis, createYAxis, createSparkLine };
