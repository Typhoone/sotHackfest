var regionPiechart;
var suburbPiechart;
var PayTypeRowChart;
var tableChart ;
var ndx;

document.addEventListener("DOMContentLoaded", function(event) {
  // debugger;
  ndx = crossfilter(data.jobs);

  // debugger;

  var regionPieDim = ndx.dimension(function(d){return d.Region});

  var regionPieGroup = regionPieDim.group().reduceSum(function(d){return 1});

  regionPiechart = dc.pieChart("#majorRegion");

  regionPiechart
    .group(regionPieGroup)
    .dimension(regionPieDim)
    .legend(dc.legend())

  var suburbPieDim = ndx.dimension(function(d){return d.Suburb});

  var suburbPieGroup = suburbPieDim.group().reduceSum(function(d){return 1});

  suburbPiechart = dc.pieChart("#suburb");

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


  PayTypeRowChart = dc.rowChart("#PayTypeRowChart");

  var PayTypeRowDim = ndx.dimension(function(d){return d.JobType;});

  var PayTypeRowGroup = PayTypeRowDim.group().reduceSum(function(d){return 1});

  PayTypeRowChart
    .group(PayTypeRowGroup)
    .dimension(PayTypeRowDim)
    // .x(d3.scale.linear().domain([0,100]))
    .width(400)
    .elasticX(true)


  tableChart = dc.dataTable("#pageDataTable");

  var tableDim = ndx.dimension(function(d){return [d.Title, d.JobLocation, d.ListingId];})

  // var tableGroup = tableDim.group().reduceSum(function(d){ return 1;});

  grouping = function (d) { return [d.Title, d.JobLocation, d.ListingId];};


  tableChart
    .dimension(tableDim)
    .group(grouping)
    .size(Infinity)
    .columns(['Title', 'Location', 'ID'])
    .sortBy(function (d) { return [d.Title, d.JobLocation, d.ListingId]; })
    .order(d3.ascending);

  update()



  dc.renderAll()

});

// use odd page size to show the effect better
var ofs = 0, pag = 9;
function display() {
    d3.select('#begin')
        .text(ofs);
    d3.select('#end')
        .text(ofs+pag-1);
    d3.select('#last')
        .attr('disabled', ofs-pag<0 ? 'true' : null);
    d3.select('#next')
        .attr('disabled', ofs+pag>=ndx.size() ? 'true' : null);
    d3.select('#size').text(ndx.size());
}
function update() {
    tableChart.beginSlice(ofs);
    tableChart.endSlice(ofs+pag);
    display();
}
function next() {
    ofs += pag;
    update();
    tableChart.redraw();
}
function last() {
    ofs -= pag;
    update();
    tableChart.redraw();
}
