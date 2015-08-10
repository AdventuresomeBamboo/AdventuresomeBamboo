jQuery(document).ready(function() {
        jQuery('#vmap').vectorMap({ map: 'usa_en',
        onRegionClick: function(element, code, region)
    { 
    	$('#stateInfo #stateName').text(region);
        console.log("the clicked state is : ", region);
    } });
    });