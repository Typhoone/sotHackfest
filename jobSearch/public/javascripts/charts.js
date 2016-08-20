document.addEventListener("DOMContentLoaded", function(event) {

  var ndx = crossfilter(data.List);

  debugger;

  var regionPieDim = ndx.dimension(function(d){return d.Region});

  var regionPieGroup = regionPieDim.group().reduceSum(function(d){return 1});

  var regionPiechart = dc.pieChart("#majorRegion");

  regionPiechart
    .group(regionPieGroup)
    .dimension(regionPieDim)

  var suburbPieDim = ndx.dimension(function(d){return d.Suburb});

  var suburbPieGroup = suburbPieDim.group().reduceSum(function(d){return 1});

  var suburbPiechart = dc.pieChart("#suburb");

  suburbPiechart
    .group(suburbPieGroup)
    .dimension(suburbPieDim)





  dc.renderAll()

});
