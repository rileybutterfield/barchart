import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element) {
    const vis = this;
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("The world's tallest men");

    vis.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(-90)");

    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    Promise.all([
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json"),
    ]).then((datasets) => {
      const [men, women] = datasets;
      let flag = true;
      vis.data = men;
      vis.update();
      d3.interval(() => {
        vis.data = flag ? men : women;
        vis.update();
        flag = !flag;
      }, 1000);
    });
  }
  update() {
    const vis = this;
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, (d) => d.height) * 0.95,
        d3.max(vis.data, (d) => d.height),
      ])
      .range([HEIGHT, 0]);
    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup.call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.call(yAxisCall);

    //DATA JOIN
    const rects = vis.svg.selectAll("rect").data(vis.data);

    //EXIT
    rects.exit().remove();

    //UPDATE
    rects
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.height));

    //ENTER
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.height))
      .attr("fill", "hotpink");
  }
}
