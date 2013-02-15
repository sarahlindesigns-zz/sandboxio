define([], function() {

  root = MM = {}; //define global app namespace

  /**
    *
    * App Config Settings
    *
    */
    
  root.config = {
    debug: true,

    image: {
      batchSize: 20, //how many images to fetch
      maxHeight: 150 //max-height of images
    }
  };

});