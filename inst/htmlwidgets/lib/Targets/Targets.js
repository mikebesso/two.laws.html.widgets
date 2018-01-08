(
  function() {


    d3.transform = function(chain) {

      //https://github.com/mikebesso/d3-transform

      var transforms = [];
      if (chain !== undefined) { transforms.push(chain);  }

      function push(kind, args) {
        var n = args.length;

        transforms.push(function() {
          if (kind == 'seq') {
            return args[0].apply(this, arr(arguments));
          } else {
            return kind + '(' + (n == 1 && typeof args[0] == 'function'
              ? args[0].apply(this, arr(arguments)) : args) + ')';
          }
        });
      }

      function arr(args) {
        return Array.prototype.slice.call(args);
      }

      var transform = function() {
        var that = this,
          args = arr(arguments);

        return transforms.map(function(f) {
          return f.apply(that, args);
        }).join(' ');
      };

      ['translate', 'rotate', 'scale', 'matrix', 'skewX', 'skewY', 'seq'].forEach(function(t) {
        transform[t] = function() {
          push(t, arr(arguments));
          return transform;
        };
      });

      return transform;
    }




    // d3 circle text from http://bl.ocks.org/nbremer/b603c3e0f7a74794da87



    d3.TwoLawsTargetRings = function(){

      var params = {
        ringCount: 1,
        ringWidth: 10,
        ringRadius: 10
      };


      TwoLawsTargetRings = function(d, i){

        var selection = d3.select(this);

        var pie = d3.pie()
          .sort(null)
          .value(function(d){return d.value;})
        ;


        var pieData = pie(d);



        var path = d3.arc()
          .outerRadius(params.ringRadius + params.ringWidth)
          .innerRadius(params.ringRadius)
        ;

        var arc = selection.selectAll(".arc")




        arc.data(pieData)
          .enter()
            .append("g")
              .attr("class", "arc")
              .each(
                function(d, i){
                  var arc = d3.select(this);
                  arc.append("path")
                    .attr("d", path)
                    .classed(d.data.key, true)
                  ;
                }
              ) 


        selection.append("circle")
          .attr("r", params.ringRadius)
          .attr("stroke", "black")
          .attr("fill-opacity", 0)

      }


      TwoLawsTargetRings.ringCount = function(value) {
        if (!arguments.length) return params.ringCount;
        params.ringCount = value;
        return TwoLawsTargetRings;
      };

      TwoLawsTargetRings.ringWidth = function(value) {
        if (!arguments.length) return params.ringWidth;
        params.ringWidth = value;
        return TwoLawsTargetRings;
      };

      TwoLawsTargetRings.ringRadius = function(value) {
        if (!arguments.length) return params.ringRadius;
        params.ringRadius = value;
        return TwoLawsTargetRings;
      };
      return TwoLawsTargetRings;

    }



    d3.TwoLawsTargetPeriods = function(){

      var params =
      {
        periodWidth: 5
      };



      function TwoLawsTargetPeriods(d, i){
        
 
        var selection = d3.select(this);
        selection.classed(d.period, true);


       var CreateRings = d3.TwoLawsTargetRings()
          .ringRadius(30 + i * params.periodWidth)
          .ringWidth(params.periodWidth / d.rings.length)
          .ringCount(d.rings.length)
        ;

        var rings = selection.selectAll("g")
          .data(d.rings)
          .enter()
            .append("g")

        rings.each(CreateRings)




      }


      TwoLawsTargetPeriods.periodWidth = function(value) {
        if (!arguments.length) return params.periodWidth;
        params.periodWidth = value;
        return TwoLawsTargetPeriods;
      };

      return TwoLawsTargetPeriods;

    }



    d3.TwoLawsTarget = function(){

      var params =
      {
        targetRadius: 100
      };

      function TwoLawsTarget(d, i){
        
       var selection = d3.select(this);

       var CreatePeriods = d3.TwoLawsTargetPeriods()
        .periodWidth(params.targetRadius / d.periods.length)
      ;

        var rings = selection.selectAll("g")
          .data(d.periods)
          .enter()
            .append("g")

        rings.each(CreatePeriods)


        selection.append("text")
          .classed("value", true)
          .text(d.value)

        selection.append("text")
          .classed("title", true)
          .text(d.objective)
          .attr("transform", "translate(0, -100)")
        ;


      }


      TwoLawsTarget.targetRadius = function(value) {
        if (!arguments.length) return params.targetRadius;
        params.targetRadius = value;
        return TwoLawsTarget;
      };

      return TwoLawsTarget;

    }



    d3.CreateTargetCharts = function(data){

      var params = data;



      function CreateTargetCharts(chartContainer){


        // Get the width and height from our bounding box
        var containerBox = chartContainer.node().getBoundingClientRect();
        var containerWidth = containerBox.width;
        var containerHeight = containerBox.height;

        var targetBox = Math.min(containerWidth, containerHeight) / 4;
        var targetRadius = 0.75 * targetBox / 4;

        var positionX = d3.scaleLinear()
          .domain([0, params.length - 1])
          .range([targetBox, targetBox + params.length * targetBox])

        var positionY = d3.scaleLinear()
          .domain([0, params.length - 1])
          .range([containerHeight / 2, containerHeight / 2])

        var svg = chartContainer.append("svg")
          .classed("Targets", true)
          .attr("width", containerWidth)
          .attr("height", containerHeight)
        ;
       
        var singleTarget = d3.TwoLawsTarget()
          .targetRadius(targetRadius)
        ;

        svg.selectAll("g")
          .data(data)
          .enter()
            .append("g")
        ;



       svg.selectAll("g")
        .each(
          function(d, i){

            var transform = d3.transform()
              .translate([positionX(i), positionY(i)])
            ;

            d3.select(this)
              .attr("transform", transform())
              .classed("objective", true)
              .each(singleTarget)
          }

        )


      }

      return CreateTargetCharts;

    }



}
)();




$(document).ready(
  function() {

    Targets = d3.selectAll("div.Targets");

    Targets.each(
      function(d, i){

        var chartContainer = d3.select(this);

        var chartId = chartContainer.attr("id");

        var chartDataScript = document.querySelector("script[data-for='" + chartId +"'][type='application/json']");

        if (chartDataScript){
          var chartData = JSON.parse(chartDataScript.textContent || chartDataScript.text).x.objectives;

          var chart = d3.CreateTargetCharts(chartData);  

          chartContainer.call(chart)
         

        }
      }
    )



  }
)



