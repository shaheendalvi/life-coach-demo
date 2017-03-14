function createChart(element, input, catagoryElement) {
if(element){
  element.innerHTML = '';
  var margin = {top: 40, right: 10, bottom: 10, left: 10};

  var width = 300,
      height = 350,
      radius = (Math.min(width, height) / 2),
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
      return (radius - innerRadius) * (d.data.score / 10.0) + innerRadius; 
    });

  var outlineArc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(radius);

  var svg = d3.select(element).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");


  svg.call(tip);
  var data = input || [ {id:'RM', order:1, score:5, weight:0.5, color:'#AB0066', label:'Romance'},
          {id:'HL', order:2, score:5, weight:0.5, color:'#525199', label:'Health'},
          {id:'FN', order:3, score:5, weight:0.5, color:'#D0D93C', label:'Finance'},
          {id:'CR', order:4, score:5, weight:0.5, color:'#60A6DA', label:'Career'},
          {id:'PG', order:5, score:5, weight:0.5, color:'#FF6200', label:'Personal Growth'},
          {id:'HM', order:6, score:5, weight:0.5, color:'#D0D93C', label:'Home'},
          {id:'FF', order:7, score:5, weight:0.5, color:'#000066', label:'Family & Friends'},
          {id:'FH', order:8, score:5, weight:0.5, color:'#FF00BF', label:'Fun & Hobbies'}];
      var event = new Event('selectionchanged');

    data.forEach(function(d) {
      d.id     =  d.id;
      d.order  = +d.order;
      d.color  =  d.color;
      d.weight = +d.weight;
      d.score  = +d.score;
      d.width  = +d.weight;
      d.label  =  d.label;
    });
    
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
        .on('click',function(d, catagoryElement){
          alert(d.data.id);
          
          document.dispatchEvent(event);  
        });
        
      outerGroup
        .append("text")
        .attr("transform", function(d) {
          return "translate(" + centroid(60, width, d.startAngle, d.endAngle) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.label })
        .on('click',function(d, catagoryElement){
          document.dispatchEvent(event);  
          alert(d.data.id)
        });

    var outerPath = svg.selectAll(".outlineArc")
        .data(pie(data))
        .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("class", "outlineArc")
        .attr("d", outlineArc);  

    function centroid(innerR, outerR, startAngle, endAngle){
      var r = (innerR + outerR) / 2, a = (startAngle + endAngle) / 2 - (Math.PI / 2);
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    }
  }
}