$( document ).ready(function() {

  var menuItems = [
  'interactive-design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ]

  //load menu & footer
  $('header').load('menu.html');
  $('footer').load('footer.html');

  // load svgs into home page <a> tags
  for (i=0; i<menuItems.length; i++) {
      $( "#home-ill-" + menuItems[i] ).load("img/home-svgs/" + menuItems[i] + ".svg");
  }









});   //close document.ready