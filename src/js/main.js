$( document ).ready(function() {

  var menuItems = [
  'interactive-design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ]

  // load svgs into home page
  for (i=0; i<menuItems.length; i++) {
      $( "#home-ill-" + menuItems[i] ).load("img/home-svgs/" + menuItems[i] + ".svg");
  }









});   //close document.ready