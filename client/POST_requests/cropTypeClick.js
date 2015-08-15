onCropTypeClick: function(element, code, cropType)
    { 
      $('#stateInfo #stateName').text(cropType);
      $.ajax({
        url:'http://localhost:5678/cropType?'+cropType,
        type: 'post',
        success: function (data){
          console.log('Success');
        }
      })
    }