onRegionClick: function(element, code, cropType)
    { 
      $('#stateInfo #stateName').text(cropType);
      $.ajax({
        url:'http://localhost:5678/state?'+cropType,
        type: 'post',
        success: function (data){
          console.log('Success')
        }
      })
    }

/* FORMAT CROP TYPES AS FOLLOWS

'FIELD%20CROPS'
'FRUIT%20%26%20TREE%20NUTS'
'HORTICULTURE'
'VEGETABLES'
'CROP%20TOTALS'

*/