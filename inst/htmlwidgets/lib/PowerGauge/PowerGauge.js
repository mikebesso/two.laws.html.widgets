
function TwoLawsPowerGauge(){

  // turn this into a selection
  var self = d3.select(this);

	var config = {
		size						: 500,
		clipWidth					: 200,
		clipHeight					: 110,
		ringInset					: 50,
		ringWidth					: 20,

		pointerWidth				: 10,
		pointerTailLength			: 5,
		pointerHeadLengthPercent	: 0.9,

		minValue					: 0,
		maxValue					: 10,

		minAngle					: -90,
		maxAngle					: 90,

		transitionMs				: 750,

		majorTicks					: 5,
		labelFormat					: d3.format('d'),
		labelInset					: 10,

		arcColorFn					: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
	};

	var range = null;
	var r = null;
	var pointerHeadLength = null;
	var value = 5;

	var svg = null;
	var arc = null;
	var scale = null;
	var ticks = null;
	var tickData = null;
	var pointer = null;

	var donut = d3.pie();

	function deg2rad(deg) {
		return deg * Math.PI / 180;
	}

	function newAngle(d) {
		var ratio = scale(d);
		return config.minAngle + (ratio * range);
	}


	function configure() {
		var prop = null;

    value = self.attr("data-value");
    config.minValue = self.attr("data-min");
    config.maxValue = self.attr("data-max");

		range = config.maxAngle - config.minAngle;
		r = config.size / 2;
		pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

		// a linear scale that maps domain values to a percent from 0..1
		scale = d3.scaleLinear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);

		ticks = scale.ticks(config.majorTicks);
		tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});

		arc = d3.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
	}

	configure();


	function centerTranslation() {
		return 'translate('+r +','+ r +')';
	}

	function isRendered() {
		return (svg !== undefined);
	}

  // chart builder
  function chart(){

    svg = self;

 			//	.attr('width', config.clipWidth)
			//	.attr('height', config.clipHeight);


    var centerTx = centerTranslation();

		var arcs = svg.append('g')
				.attr('class', 'arc')
				.attr('transform', centerTx);

		arcs.selectAll('path')
				.data(tickData)
			.enter().append('path')
				.attr('fill', function(d, i) {
					return config.arcColorFn(d * i);
				})
				.attr('d', arc);

		var lg = svg.append('g')
				.attr('class', 'label')
				.attr('transform', centerTx);
		lg.selectAll('text')
				.data(ticks)
			.enter().append('text')
				.attr('transform', function(d) {
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * range);
					return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
				})
				.text(config.labelFormat);

		var lineData = [ [config.pointerWidth / 2, 0],
						[0, -pointerHeadLength],
						[-(config.pointerWidth / 2), 0],
						[0, config.pointerTailLength],
						[config.pointerWidth / 2, 0] ];

		var pointerLine = d3.line().curve(d3.curveLinear);

		var pg = svg.append('g').data([lineData])
				.attr('class', 'pointer')
				.attr('transform', centerTx);

		pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.transition()
			  .ease(d3.easeBounce)
			  .duration(1000)
			  .attrTween("transform", function() {return d3.interpolateString("rotate(-90)", "rotate(" + newAngle(value) + ")")});

//			.attr('transform', 'rotate(' + newAngle(value) +')');

    pointer.attr()

    }


  // build the chart
  chart();

  return chart;
}
