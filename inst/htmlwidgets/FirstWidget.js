HTMLWidgets.widget({

  name: 'FirstWidget',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    var firstWidget = null;

    return {

      chart: null,

      renderValue: function(params) {

        console.log("firstWidget.renderValue: ", el.id);

        // TODO: code to render the widget, e.g.
        //el.innerText = params.message;

        container = d3.select("#" + el.id);

        chart = container.append("svg")
          .attr("id", el.id + "-svg")
          .attr("width", width)
          .attr("height", height)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .classed(name, true)
          .attr("data-value", params.message)
          .each(TwoLawsFirstWidget);

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
