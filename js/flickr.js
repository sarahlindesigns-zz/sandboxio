define(['vendor/jquery', 'config'], function() {

  root.Flickr = function(config) {

    var self = this;
    var debug = config.debug;
    var pageNum = 0;

    if(debug) console.log('Loaded the \'Flickr\' class');

    self.getImages = function(amount, callback) {

      pageNum++; //next page of images

       $.ajax({
        url: 'http://api.flickr.com/services/rest/',
        type: 'GET',
        data: {
          method: 'flickr.photos.search',
          api_key: '5d88673f3ec83af2a28630eefca88354',
          tags: 'tree',
          has_geo: '',
          per_page: amount,
          format: 'json',
          nojsoncallback: '1',
          page: pageNum
          }
        }).done(function(data) {
          if(data !== null && typeof callback === 'function') {
            callback(data.photos.photo);
          }
        });

    };// end getImages();

    self.getImageUrl = function(photo, size) {
      var p = photo, s = size,
      url ='http://farm'+p.farm+'.staticflickr.com/'+p.server+'/'+p.id+'_'+p.secret+'_'+s+'.jpg';

      return url;
    }
    
  }; // end Flickr Class

});
