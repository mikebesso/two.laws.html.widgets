HTMLWidgets.widget({

  name: 'PowerGauge',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    var PowerGauge = null;

    return {

      chart: null,

      renderValue: function(params) {

        console.log("PowerGauge.renderValue: ", el.id, params.value);

        // TODO: code to render the widget, e.g.
        //el.innerText = params.message;

        container = d3.select("#" + el.id);

        chart = container.append("svg")
          .attr("id", el.id + "-svg")
          .attr("width", width)
          .attr("height", height)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .classed(name, true)
          .attr("data-value", params.value)
          .attr("data-min", params.min)
          .attr("data-max", params.max)
          .each(TwoLawsPowerGauge);

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
