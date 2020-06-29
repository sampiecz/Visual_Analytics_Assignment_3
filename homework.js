import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { axisLeft, axisBottom, scaleLinear, select} from "d3"
import '../../scss/homework.scss'
import data from '../../csv/cars_dataset.csv' 

// Helps set color of each cylinder value
function colorSelector(cylinder) {
  if (cylinder === 8) {
    return "teal"
  } else if (cylinder === 6) {
    return "yellow"
  } else if (cylinder === 5) {
    return "red"
  } else if (cylinder === 4) {
    return "purple"
  } else if (cylinder === 3) {
    return "orange"
  }
}

// Homework main 
function Homework() {
	// func vars
	const svgRef = useRef()

	const margin = {top: 30, right: 10, bottom: 10, left: 0},
		width = 800 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom

	// on data update do thing
	useEffect(() => {

		// connect to dom
		const svg = select(svgRef.current)

    // Setup X Scale - multiplied x by 30
    const xScale = scaleLinear()
      .domain([8.0, 24.8])
      .range([8.0, 744])

    // Setup Y Scale - multiplied y by 2
    const yScale = scaleLinear()
      .domain([46, 230])
      .range([460, 46])

    // Setup X axis - pass in scale
    const xAxis = axisBottom(xScale)
    svg.select(".x-axis").style("transform", "translateY(480px)").call(xAxis)

    // Setup Y axis - pass in scale
    const yAxis = axisLeft(yScale)
    svg.select(".y-axis").style("transform", "translateX(-8px)").call(yAxis)

    // Add circles to svg and enable hover functionality 
    svg
      .selectAll(".circle")
      .data(data)
      .join("circle")
      .attr("class", "circle")
      .attr("r", value => value.MPG * .25)
      .attr("cx", value => xScale(value.Acceleration))
      .attr("cy", value => yScale(value.Horsepower))
      .attr("stroke", "black")
      .attr("fill", value => colorSelector(value.Cylinders))
      .attr('fill-opacity', 0.8)
      .on("mouseenter", (value) => {
        svg
          .selectAll(".tooltip")
          .data([value.Model])
          .join("text")
          .attr("class", "tooltip")
          .text(
            value.Model + " = acceleration(" + 
            value.Acceleration + "), horsepower(" + 
            value.Horsepower + "), cylinders (" + 
            value.Cylinders + "), mpg (" + value.MPG + ")"
          )
      })

	}, [data,])

	return (
		<div className="d3-svg-container">
			<svg className="d3-svg" ref={svgRef} >
        <g className="y-axis" />
        <g className="x-axis" />
      </svg>
		</div>
	)

} 

ReactDOM.render(
	<Homework/>,
	document.getElementById("react")
)
