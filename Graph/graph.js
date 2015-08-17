function renderGraph(){

  var data, 
      g,  
      div;
  div = document.getElementById("graphDiv");    

  data = "Time, Production \n"; //title of the graph
  data += '2010,123 \n';
  data += '2011,95 \n';
  data += '2012,150 \n';
  data += '2013,160 \n';
  data += '2014,162 \n';

  g = new Dygraph(div,data,{}); // constructor takes 3 argunments - 

}