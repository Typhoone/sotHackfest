document.addEventListener("DOMContentLoaded", function(event) {
  // debugger;
  var ndx = crossfilter(data.jobs);

  // debugger;

  var regionPieDim = ndx.dimension(function(d){return d.Region});

  var regionPieGroup = regionPieDim.group().reduceSum(function(d){return 1});

  var regionPiechart = dc.pieChart("#majorRegion");

  regionPiechart
    .group(regionPieGroup)
    .dimension(regionPieDim)
    .legend(dc.legend())

  var suburbPieDim = ndx.dimension(function(d){return d.Suburb});

  var suburbPieGroup = suburbPieDim.group().reduceSum(function(d){return 1});

  var suburbPiechart = dc.pieChart("#suburb");

  suburbPiechart
    .group(suburbPieGroup)
    .dimension(suburbPieDim)


  // var JobTypeRowDim = ndx.dimension(function(d){return d.Title});
  //
  // var JobTypeRowGroup = JobTypeRowDim.group().reduceSum(function(d){return 1});
  //
  // var TypeRowChart = dc.rowChart("#TypeRowChart");
  //
  // // debugger;
  //
  // TypeRowChart
  //   .group(JobTypeRowGroup)
  //   .dimension(JobTypeRowDim)
  //   .x(d3.scale.linear())
  //   .width(200)


  var PayTypeRowChart = dc.rowChart("#PayTypeRowChart");

  var PayTypeRowDim = ndx.dimension(function(d){return d.JobType;});

  var PayTypeRowGroup = PayTypeRowDim.group().reduceSum(function(d){return 1});

  PayTypeRowChart
    .group(PayTypeRowGroup)
    .dimension(PayTypeRowDim)
    // .x(d3.scale.linear().domain([0,100]))
    .width(200)
    .elasticX(true)






  dc.renderAll()

});
