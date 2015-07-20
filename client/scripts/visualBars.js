function visualBars(totalWidth, totalHeight, margins) {
  this.height = totalHeight - margins.top - margins.bottom;
  this.width = totalWidth - margins.left - margins.right;
  this.margins = margins;

  this.x = d3.scale.ordinal()
       .domain(d3.range(0,v.fCount/2,1))
       .rangeBands([0, this.width],0.5);

  this.y = d3.scale.linear()
       .domain([0, v.maxLevel+1])
       .range([this.height, 0])
       .nice();

  this.color = d3.scale.linear()
      .domain([0, v.fCount/2*0.33, v.fCount/2*0.66, v.fCount/2])
      .range(["#FCBF3A", "#FF218D", '#30AAFF', '#DDFF45']);

  this.barWidth = this.width / (v.fCount/2);

  this.svg = d3.select('.v');
}

var vBMethods = {
  init: function(){
    this.svg = this.svg
      .attr("width", this.width + this.margins.left + this.margins.right)
      .attr("height", this.height + this.margins.top + this.margins.bottom)
      .append("g");

    return this;
  },

  redraw: function(data){
    var self = this;

    var rect = self.svg.selectAll("rect")
      .data(data);

      rect.enter().append("rect")
        .attr("x", function(d, i) { return self.x(i); })
        .attr("width", self.x.rangeBand() )
        .style("fill", function(d, i) { return self.color(i); })

      rect.attr("height", function(d){ return self.height - self.y(d); })
          .attr("y", function(d){ return self.y(d); })
  },
};

visualBars.prototype = Object.create(vBMethods);
visualBars.prototype.constructor = visualBars;
