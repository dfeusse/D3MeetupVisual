function turnOn(selection) {
  /*
  selection
    //.attr('r', 13)
    .attr("stroke-width", 4)
    .attr("stroke", "red")
    .style("opacity", 1);
    */
}
function turnOff(selection) {
  /*
  selection
    .style("opacity", 0.5)
    .attr("stroke-width", 2)
    //.attr('r', 10)
    .attr("stroke", "black")
    */
}


function visualize() {
  
  var scoreSizeScale = d3.scale.sqrt()
    //.domain(d3.extent(nodes, function(d) { return d.score }))
    .domain([-3, 3])
    .range([5, 10]);
  
  var scoreColorScale = d3.scale.linear()
    //.domain([-3, -2, -1, 0, 1, 2, 3])
    .domain([-3, 3])
    .range(["#ff0000", "#00ff00"])

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) { return 'Member: ' + d.name })
    //.html(function(d) { return d.name; })
    .offset([-12, 0]);

  var vis = d3.select("#display").append("svg")
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'svg_vis');

  var pone = vis.call(tip);

  var paths = vis.selectAll("path.connector")
    .data(memberList)
  paths.enter()
  .append("path")
  .attr("class", function(d) {return d.id; })
    .classed("connector", true)
  
  var line = d3.svg.line()
  .x(function(d) { return d.x })
  .y(function(d) { return d.y })
  .interpolate("cardinal")
  

  var circles = vis.selectAll('circle')
    .data(nodes)//, function(d) {return d.id; });
  var inACircle = false;
  circles.enter()
    .append('circle')
      //.attr('id_value', function(d) {return d.id; })
    //.attr('fill', function(d) {return fill_color(d.group); })
    .attr("class", function(d) {return d.id; })
    .attr('stroke-width', 2)
    //.attr('r', 10)
    .attr('r', function(d) { return scoreSizeScale(memberLookup[d.id].score); })
    .style('fill', function(d) { return scoreColorScale(memberLookup[d.id].score); })
    .style("opacity", 0.8)
  

  
    //.attr('stroke', function(d) {return d3.rgb(fill_color(d.group)).darker(); });

  circles.on("mouseover", mouseOver);
  paths.on("mouseover", mouseOver);
  
  function mouseOver(d) {
    //tip.show
    inACircle = true;
    circles.filter(function(f) { return f.id !== d.id })
    .classed("selected", false)
      //.transition().duration(300)
      //.call(turnOff)

    circles.filter(function(f) { return f.id === d.id })
    .classed("selected", true)
      //.transition().duration(100)
      //.call(turnOn)
    //circles.style("opacity", 0.5);
    
    paths.filter(function(f) { return f.id !== d.id })
    .classed("selected", false)
    paths.filter(function(f) { return f.id === d.id })
    .classed("selected", true)

  }

  circles.on("mouseout", mouseOut);
  paths.on("mouseout", mouseOut);
  function mouseOut(d) {
    circles.transition().duration(500)
    .call(turnOff)
  }

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
        vis.selectAll("path.connector")
      .attr("d", function(d) { return line(d.nodes) })
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

  circles.on('mouseover.tip', tip.show);
  circles.on('mouseout.tip', tip.hide);

  //tipsy tooltips
  //http://bl.ocks.org/ilyabo/1373263
  /*
  $('svg circle').tipsy({
        gravity: 'w',
        html: true,
        title: function() {
          //var d = this.__data__, c = colors(d.i);
          //return 'Hi there! My color is <span style="color:' + c + '">' + c + '</span>';
          return 'id: ';
        }
      });
  */
}

