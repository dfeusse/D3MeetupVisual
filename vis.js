function turnOn(selection) {
  selection
    .attr('r', 13)
    .attr("stroke-width", 4)
    .attr("stroke", "red")
    .style("opacity", 1);
}
function turnOff(selection) {
  selection
    .style("opacity", 0.5)
    .attr("stroke-width", 2)
    .attr('r', 10)
    .attr("stroke", "black")
}



function visualize() {
  var vis = d3.select("#display").append("svg")
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'svg_vis');

  var circles = vis.selectAll('circle')
    .data(nodes, function(d) {return d.id; });
  var inACircle = false;
  circles.enter()
    .append('circle')
      //.attr('id_value', function(d) {return d.id; })
    //.attr('fill', function(d) {return fill_color(d.group); })
    .attr("class", function(d) {return d.id; })
    .attr('stroke-width', 2)
    .attr('r', 10)
    .style("opacity", 0.8);
    //.attr('stroke', function(d) {return d3.rgb(fill_color(d.group)).darker(); });

  circles.on("mouseover", function(d) {
    inACircle = true;
    circles.filter(function(f) { return f.id !== d.id })
      .transition().duration(300)
      .call(turnOff)

    circles.filter(function(f) { return f.id === d.id })
      .transition().duration(100)
      .call(turnOn);
    //circles.style("opacity", 0.5);
  })
  .on("mouseout", function(d) {
    circles.transition().duration(500)
    .call(turnOff)
  });

  function charge(d) {
    return -Math.pow(10, 2.0) / 8;
  }

  force = d3.layout.force()
    .nodes(nodes)
    .size([width, height]);

  circles.call(force.drag);

  force.gravity(-0.01)
    .charge(charge)
    .friction(0.9)
    .on('tick', function(e) {
        force.nodes().forEach(function(d) {
          //var target = year_centers[d.year]
          var target = meetup_centers[d.node_centers]
          d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
          d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
        })
        vis.selectAll('circle')
          .attr('cx', function(d) {return d.x;})
          .attr('cy', function(d) {return d.y;});
    });

  //column labeling
  var meetups_x = {"x": 200, "y": width / 2, "z": width - 200};
  var meetups_x_data = d3.keys(meetups_x)
  var columnlabels = vis.selectAll("body")
      .data(meetups_x_data);

  columnlabels.enter().append("text")
      .attr("class", "years")
      .attr("x", function(d) { return meetups_x[d]; })
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(function(d) { return d; });

  //row labeling
  var meetups_y = {"attended": 150, "flaked": 400};
  var meetups_y_data = d3.keys(meetups_y)
  var rowlabels = vis.selectAll("body")
      .data(meetups_y_data);

  rowlabels.enter().append("text")
      .attr("class", "rows")
      .attr("x", 30)
      .attr("y", function(d) { return meetups_y[d]; })
      .attr("text-anchor", "middle")
      .text(function(d) { return d; });

  //start
  force.start();
}
