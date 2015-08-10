

var state = 'TEXAS', crop = 'COTTON';
var result = [];

var date = new Date();
var year  = date.getFullYear();
var link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&agg_level_desc=STATE&year=2010&state_name='+state+'&commodity_desc='+crop;

var width = 960,
            height = 500;

    var radius = d3.scale.sqrt()
            .domain([0, 1e6])
            .range([0, 10]);

    var path = d3.geo.path();

    var color = d3.scale.category20();

    var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

    queue()
            .defer(d3.json, "us.json")
            .defer(d3.json, "us-state-centroids.json")
            .await(ready);

    function ready(error, us, centroid) {
        var countries = topojson.feature(us, us.objects.states).features,
                neighbors = topojson.neighbors(us.objects.states.geometries);

        svg.selectAll("states")
                .data(countries)
                .enter().insert("path", ".graticule")
                .attr("class", "states")
                .attr("d", path)
                .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); })
                .on('mouseover', function(d, i) {

                var currentState = this;
                d3.select(this).style('fill-opacity', 1);
//                var thoseStates = d3
//                        .selectAll('path')[0]
//                        .filter(function(state) {
//                            return state !== currentState;
//                        });

//                d3.selectAll(thoseStates)
//                        .style({
//                            'fill-opacity':.5
//                        });
//                })
                })
                .on('mouseout', function(d, i) {

                    d3.selectAll('path')
                            .style({
                                'fill-opacity':.7
                            });
                });

//        var paths = svg.append("path")
//                .attr("class", "states")
//                .datum(topojson.feature(us, us.objects.states))
//                .attr("d", path)
//                .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); })
//                .on('mouseover', function(d, i) {
//
//                var currentState = this;
//                var thoseStates = d3
//                        .selectAll('path')[0]
//                        .filter(function(state) {
//                            return state !== currentState;
//                        });
//
//                d3.selectAll(thoseStates)
//                        .transition()
//                        .duration(300)
//                        .style({
//                            'stroke-opacity': 1,
//                            'stroke': '#f00'
//                        });
//
//        });


//        svg.selectAll(".symbol")
//                .data(centroid.features.sort(function(a, b) { return b.properties.population - a.properties.population; }))
//                .enter().append("path")
//                .attr("class", "symbol")
//                .attr("d", path.pointRadius(function(d) { return radius(d.properties.population); }));
//
//    }
    }
