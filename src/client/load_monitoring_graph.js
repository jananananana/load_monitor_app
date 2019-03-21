export default class LoadMonitorGraph {
    constructor (options = {}) {
        this.ws = options.ws;
        this.loadDataCollection = [];

        this.initialize();
    }

    initialize () {
        this.initializeMessageHandler();
        this.render();
    }
    initializeMessageHandler() {
        this.ws.onmessage = (ev) => {
            this.loadDataCollection.push(JSON.parse(ev.data));
            this.update();
        };
    }
    update () {}
    render () {
        const svg = d3.select("#load-monitor-header")
            .append("svg")
            .attr("height", "480")
            .attr("width", "960");
        const margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, width - margin.right]);
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value])
            .range([height - margin.bottom, margin.top]);
        const line = d3.line()
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });
        g.append("defs").append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("width", width)
            .attr("height", height);
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0, y${(0)})`)
            .call(d3.axisBottom(x));
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
        g.append("g")
            .attr("clip-path", "url(#clip)")
        .append("path")
            .datum(this.loadDataCollection)
            .attr("class", "line")
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .on("start", tick);
        }
}
