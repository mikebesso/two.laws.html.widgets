TwoLawsPerformanceBullet = function(){


  var self = d3.select(this);

  // Get the parameters
    // extents
      minValue = self.attr("data-min");
      maxValue = self.attr("data-max");
    // current value
      value = self.attr("data-value");
    // breaks
      unsuccessful = self.attr("data-unsuccessful");
      building = self.attr("data-building");
      successful = self.attr("data-successful");
      outstanding = self.attr("data-outstanding");
      exceptional = self.attr("data-exceptional");
    // titles
      title = self.attr("data-title");
      subtitle = self.attr("data-subtitle");

 

  // Calculate visuals    

  var inset = 5;
  var barCount = 6;


  var bulletsTop = 5;
  var bulletsBottom = 5;
  var bulletsLeft = 100;
  var bulletsRight = 5;

  var barHeight = ((barCount + 1) * 2) * inset;
  var barWidth = self.attr("width") - (bulletsLeft + bulletsRight);


  ScaleValue = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([0, barWidth]);

  InsetBar = function(bar, value){

    var left = bar.left;
    var right = bar.left + ScaleValue(value);
    var top = bar.top + inset;
    var bottom = bar.bottom - inset;
    var width = right - left;
    var height = bottom - top;

    dimensions = {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      width: width,
      height: height  
    };

    console.log(dimensions);
    return dimensions;


  };


  barBack = {
    left: bulletsLeft,
    right: barWidth,
    top: bulletsTop,
    bottom: bulletsTop + barHeight,
    width: self.attr("width") - (bulletsLeft + bulletsRight),
    height: barHeight
  };

  barUnsuccessful = InsetBar(barBack, unsuccessful);
  barBuilding = InsetBar(barUnsuccessful, building);
  barSuccessful = InsetBar(barBuilding, successful);
  barOutstanding = InsetBar(barSuccessful, outstanding);
  barExceptional = InsetBar(barOutstanding, exceptional);

  barCurrent = InsetBar(barExceptional, value)


  chart = function(){

      titles = self.append("g")

      titles.append("text")
        .classed("title", true)
        .attr("x", barBack.left - 2)
        .attr("y", barBack.top + 2)
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "hanging")
        .text(title)

      titles.append("text")
        .classed("subtitle", true)
        .attr("x", barBack.left - 2)
        .attr("y", barBack.bottom - 2)
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "ideographic")
        .text(subtitle)

      g = self.append("g")


        g.append("rect")
          .classed("bar-back", true)
          .attr("x", barBack.left)
          .attr("y", barBack.top)
          .attr("width", barBack.width)
          .attr("height", barBack.height)

        g.append("rect")
            .classed("bar-unsuccessful", true)
            .attr("x", barUnsuccessful.left)
            .attr("y", barUnsuccessful.top)
            .attr("height", barUnsuccessful.height)
            .transition()
              .duration(250)
              .attr("width", barUnsuccessful.width)

       g.append("rect")
            .classed("bar-building", true)
            .attr("x", barBuilding.left)
            .attr("y", barBuilding.top)
            .attr("height", barBuilding.height)
            .transition()
              .duration(250)
              .attr("width", barBuilding.width)

       g.append("rect")
            .classed("bar-successful", true)
            .attr("x", barSuccessful.left)
            .attr("y", barSuccessful.top)
            .attr("height", barSuccessful.height)
            .transition()
              .duration(250)
              .attr("width", barSuccessful.width)


       g.append("rect")
            .classed("bar-outstanding", true)
            .attr("x", barOutstanding.left)
            .attr("y", barOutstanding.top)
            .attr("height", barOutstanding.height)
            .transition()
              .duration(250)
              .attr("width", barOutstanding.width)


       g.append("rect")
            .classed("bar-exceptional", true)
            .attr("x", barExceptional.left)
            .attr("y", barExceptional.top)
            .attr("height", barExceptional.height)
            .transition()
              .duration(250)
              .attr("width", barExceptional.width)

      v = self.append("rect")
            .classed("bar-value", true)
            .attr("x", barCurrent.left)
            .attr("y", barCurrent.top)
            .attr("height", barCurrent.height)
            .transition()
              .delay(500)
              .duration(750)
              .ease(d3.easeBounce)
              .attr("width", barCurrent.width)


  };

  chart();
  return chart;
}

