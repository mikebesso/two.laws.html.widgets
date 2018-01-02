HTMLWidgets.widget({

  name: 'PeformanceBullet',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(params) {

        console.log("PeformanceBullet.renderValue: ", el.id, params.value);

        // TODO: code to render the widget, e.g.
        //el.innerText = params.message;

        container = d3.select("#" + el.id);

        chart = container.append("svg")
          .attr("id", el.id + "-svg")
          .attr("width", width)
          .attr("height", height)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .classed("PerformanceBullet", true)
          .attr("data-value", params.value)
          .attr("data-unsuccessful", params.unsuccessful)
          .attr("data-building", params.building)
          .attr("data-successful", params.successful)
          .attr("data-outstanding", params.outstanding)
          .attr("data-exceptional", params.exceptional)
          .attr("data-min", params.minValue)
          .attr("data-max", params.maxValue)
          .attr("data-title", params.title)
          .attr("data-subtitle", params.subtitle)
          .each(TwoLawsPerformanceBullet);


      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
