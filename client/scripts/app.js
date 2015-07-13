var app;

(function() {

  var margin, width, height;
  var numLayers = 3;
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

    yStackMax = d3.max(data, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
    //Y-Axis is rent amount, linear scaling
    //X-Axis is time, ordinal scaling

    var dates = data.map(function(item){
      return item[0].x;
    });

    console.table(dates)

    var x = d3.scale.ordinal()
        .domain(dates)
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.linear()
        .domain([0, numLayers - 1])
        .range(["#aad", "#556"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        //.tickSize(0)
        //.tickPadding(1)
        .outerTickSize(0)
        .orient("bottom");

    var svg = d3.select('.firstGraph')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
      //.attr("y", 0)
      .attr("x", 5)
      .attr("dy", "-.35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
  };



}());
