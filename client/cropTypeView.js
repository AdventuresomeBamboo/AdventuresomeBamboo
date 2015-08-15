onCropTypeClick: function(element, code, cropType)
    { 
      $('#stateInfo #stateName').text(cropType);
      $http.post('/cropType?'+cropType)
    }

/* FORMAT CROP TYPES AS FOLLOWS

'FIELD%20CROPS'
'FRUIT%20%26%20TREE%20NUTS'
'HORTICULTURE'
'VEGETABLES'
'CROP%20TOTALS'

*/