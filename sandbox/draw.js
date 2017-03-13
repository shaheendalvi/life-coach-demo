var margin = {top: 40, right: 80, bottom: 40, left: 80};

var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2,
    innerRadius = 0;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

svg.call(tip);
var data = [
    {"id":"RM","order":"1","score":"60","weight":"0.5","color":"red","label":"Romance"},
    {"id":"HL","order":"1","score":"90","weight":"0.5","color":"green","label":"Health"},
    {"id":"FN","order":"1","score":"20","weight":"0.5","color":"yellow","label":"Finance"},
    {"id":"CR","order":"1","score":"50","weight":"0.5","color":"blue","label":"Career"},
    {"id":"PG","order":"1","score":"40","weight":"0.5","color":"orange","label":"Personal Growth"},
    {"id":"HM","order":"1","score":"65","weight":"0.5","color":"purple","label":"Home"},
    {"id":"FF","order":"1","score":"20","weight":"0.5","color":"black","label":"Family & Friends"},
    {"id":"FH","order":"1","score":"80","weight":"0.5","color":"indigo","label":"Fun & Hobbies"}];
//d3.csv('aster_data.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
   var outerGroup = svg.selectAll(".solidArc")
      .data(pie(data))
      .enter()
      .append("g")
    
    outerGroup
      .append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click',function(d){alert(d.data.id)});
      
    outerGroup
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + centroid(60, width, d.startAngle, d.endAngle) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d) { return d.data.label })
      .on('click',function(d){alert(d.data.id)});

  var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  


  // calculate the weighted mean score
//   var score = 
//     data.reduce(function(a, b) {
//       //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
//       return a + (b.score * b.weight); 
//     }, 0) / 
//     data.reduce(function(a, b) { 
//       return a + b.weight; 
//     }, 0);

//   svg.append("svg:text")
//     .attr("class", "aster-score")
//     .attr("dy", ".35em")
//     .attr("text-anchor", "middle") // text-align: right
//     .text(Math.round(score));
    
  function centroid(innerR, outerR, startAngle, endAngle){
    var r = (innerR + outerR) / 2, a = (startAngle + endAngle) / 2 - (Math.PI / 2);
    return [ Math.cos(a) * r, Math.sin(a) * r ];
  }

//});