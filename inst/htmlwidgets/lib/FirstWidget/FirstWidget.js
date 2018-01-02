
function TwoLawsFirstWidget(){

  // turn this into a selection
  self = d3.select(this);

  // chart builder
  function chart(){


    message = self.attr("data-value");

    self.append("text")
      .attr("x", "50%")
      .attr("y", "50%")
      .attr("text-anchor", "middle")
      .text(message);

    }


  // build the chart
  chart();

  return chart;
}
