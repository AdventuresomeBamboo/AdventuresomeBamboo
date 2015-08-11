jQuery(document).ready(function() {
	jQuery('#vmap').vectorMap({ map: 'usa_en',
		backgroundColor: '#1640BC',
		borderColor: '#818181',
		borderOpacity: 0.25,
		borderWidth: 1,
		color: '#f4f3f0',
		enableZoom: true,
		hoverColor: '#8AA0DE',
		hoverOpacity: null,
		normalizeFunction: 'linear',
		scaleColors: ['#b6d6ff', '#005ace'],
		selectedColor: '#c9dfaf',
		selectedRegion: null,	
		onRegionClick: function(element, code, region)
		{ 
			$('#stateInfo #stateName').text(region);
			$.ajax({
				url:'http://localhost:5678/state',
				dataType: 'text',
				type: 'post',
				data: region.toString(),
				success: function(data){
					console.log(data)
				}
			})
		}
	});
});