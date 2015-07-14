function visualBars(totalWidth, totalHeight, margins) {
  this.height = totalHeight - margins.top - margins.bottom;
  this.width = totalWidth - margins.left - margins.right;
  this.margins = margins;

  this.x = d3.scale.ordinal()
       .domain([0,(v.fCount/2)])
       .rangeRoundBands([0, this.width]);

  this.y = d3.scale.linear()
       .domain([0, v.maxLevel+1])
       .range([this.height, 0]);

  this.color = d3.scale.category20b();

  this.svg = d3.select('.v');
}

var vBMethods = {
  init: function(){
    this.svg = this.svg
      .attr("width", this.width + this.margins.left + this.margins.right)
      .attr("height", this.height + this.margins.top + this.margins.bottom)
      .append("g")
        //.attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

    return this;
  },

  redraw: function(data){
    var self = this;

    var rect = self.svg.selectAll("rect")
      .data(data);

      rect.enter().append("rect")
        .attr("x", function(d, i) { return i*5; })
        .attr("width", "5")
        .style("fill", function(d, i) { return self.color(i); })

      rect.attr("height", function(d){ return self.height - self.y(d); })
          .attr("y", function(d){ return self.y(d); })



     // .transition()
     //   //.duration(2500)
     //   //.ease('bounce')
     //   //.delay(function(d, i) { return ((d.y0/yStackMax) + (i/numSamples)) * 2000; })
     //   .attr("height", function(d){ return self.y(d); })
  },
};

visualBars.prototype = Object.create(vBMethods);
visualBars.prototype.constructor = visualBars;
