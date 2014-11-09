function SvGraph(_svg,_path){
  var svg = _svg;
  var $svg = $(svg);
  var nodes = {};
  var edge = [];
  var path = _path;
  var $path = $(path);
  var edit = false;
  var currentNodeId = -1;
  var firstNodeId = -1;
  function makeSVG(tag, attrs,txt) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    el.textContent = txt;
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
  }

  this.addNodes = function(data)
  {
    edit = data.edit;
    for(var key in data.node)
    {
      if(data.node[key].current)
      {
        currentNodeId = data.node[key].id;  
      }
      if(data.node[key].first)
      {
        firstNodeId = data.node[key].id
      }
      this.addNode(data.node[key]);
    }
    for(var edge in data.edges){
      this.addEdge(data.edges[edge]);
    }
  }
  this.addNode = function(node)
  {
    nodes[node.id] = node;

    var style = "node";

    if(node.id == firstNodeId)
    {
      style += " root";
    }

    if(node.id == currentNodeId)
    {
      style += " selected";
    }

    var model = {cx: node.x, cy: node.y, r:9, class:style};

    var circle = makeSVG('circle', model);
    circle.onclick = function() {
      window.location = node.url;
    }
    
    var text = makeSVG('text', {x : node.x - 35 , y:node.y - 10, class:"node-title"}, node.title);
    svg.appendChild(circle);
    svg.appendChild(text);
  }
  this.nodes = function()
  {
    return nodes;
  }
  this.currentNodeId = function()
  {
    return currentNodeId;
  }
  this.lastNodeId = function()
  {
    return lastNodeId;
  }
  this.addEdge = function(edge)
  {
      var start = nodes[edge.start];
      var ends = edge.end;
      for(var i = 0 ; i < ends.length ; i++){
        this.addCurEdge(start,nodes[ends[i]])
      }
  }
  this.addCurEdge = function(start,end)
  {
    if(start && end)
    {
      var curPath = $path.attr("d");
      var drawing = curPath.substring(0, curPath.length - 1);
      drawing += "M" + start.x + " " + start.y + " ";
      drawing += "L" + end.x + " " + end.y + " Z";
      $path.attr("d",drawing);
      return;
    }  
  }
}