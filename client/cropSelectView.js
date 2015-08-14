onRegionClick: function(element, code, crop)
    { 
      $('#stateInfo #stateName').text(crop);
      $.ajax({
        url:'http://localhost:5678/state?'+crop,
        type: 'post',
        success: function (data){
          console.log('Success')
        }
      })
    }