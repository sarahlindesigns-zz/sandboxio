$(document).ready(function() {

  console.log("loaded");

  var slide = $('.slide');
  var prev  = $('button:contains("PREV")');
  var next  = $('button:contains("NEXT")');

  prev.click(function() {
    console.log(this);
  });

  next.click(function() {
    console.log(this);
  });

});