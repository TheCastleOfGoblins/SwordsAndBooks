function SvGraph(_svg,_path){
  var svg = _svg;
  var $svg = $(svg);
  var nodes = {};
  var edge = [];
  var path = _path;
  var $path = $(path);
  var edit = false;
  var currentNodeId = -1;
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
      this.addNode(data.node[key]);
    }
    for(var edge in data.edges){
      this.addEdge(data.edges[edge]);
    }
  }
  this.addNode = function(node)
  {
    nodes[node.id] = node;
    var model = {cx: node.x, cy: node.y, r:9, class:"node"};

    if(node.current)
    {
      model.class = "node selected";
    }
    var circle = makeSVG('circle', model);
    if(!node.current)
    {
      circle.ondblclick = function() {
        window.location = node.url;
      }
    }
    else
    {
      currentNodeId = node.id;
    }
    var text = makeSVG('text', {x : node.x - 10 , y:node.y - 10, class:"node-title"}, node.title);
    svg.appendChild(circle);
    svg.appendChild(text);
  }
  this.currentNodeId = function()
  {
    return currentNodeId;
  }
  this.addEdge = function(edge)
  {
    var start = nodes[edge.start];
    var end = nodes[edge.end];
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