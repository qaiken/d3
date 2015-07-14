var app;

(function() {

  var margin, width, height;
  var numLayers = ourData.length;
  var numSamples = 70;
  var stack = d3.layout.stack();

  var data = stack(ourData);

  console.log(data);


  app = {
    init: init
  };

  function init(params) {
    margin = params.margin;
    width = params.width - margin.left - margin.right;
    height = params.height - margin.top - margin.bottom;

    yStackMax = d3.max(data, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
    //Y-Axis is rent amount, linear scaling
    //X-Axis is time, ordinal scaling

    console.log('yStackMax',yStackMax);

    var dates = data[0].map(function(point){
      return point.x;
    });

    var x = d3.scale.ordinal()
        .domain(dates)
        .rangeRoundBands([0, width], .25);

    var y = d3.scale.linear()
        .domain([0, yStackMax * 1.05])
        .range([height, 0]);

     var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .outerTickSize(0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    //Created SVG, set width/height
    var svg = d3.select('.firstGraph')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer")
                .data(data)
                .enter().append("g")
                .attr("class", "layer")
                .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d) { return x(d.x); })
                .attr("y", height)
                .attr("width", x.rangeBand())
                .attr("height", 0);

        rect.transition()
            .delay(function(d, i) { return ((d.y0/yStackMax) + (i/numSamples)) * 2000; })
            .attr("y", function(d) { return y(0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    //Draw x-axis on the SVG
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
      .attr("x", 5)
      .attr("dy", "-.4em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    svg.append("g")
    .attr("class", "y axis")
    //.attr("transform", "translate(" + width + ",0)")
    .call(yAxis)
    .selectAll("text")
      //.attr("x", 5)
      .attr("dx", "-2.1em")
      .style("text-anchor", "start");

  svg.append("text")
    .attr("x", width/2 )
    .attr("y", height + margin.bottom )
    .attr('dy','-.5em')
    .style("text-anchor", "middle")
    .text("Date");

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Rent Prices");

  };


}());
