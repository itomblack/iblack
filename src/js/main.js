$( document ).ready(function() {

  var menuItems = [
  'interactive-design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ];

  //load menu & footer
  $('header').load('menu.html');
  $('footer').load('footer.html');

  

  // Define Drawing function for homepage
  var drawingPaths = function (){
  
    var current_frame = 0;
    var total_frames = 90;
    var path = [];
    var length = [];

    path = document.querySelectorAll('path');

    for(var i=0; i<path.length;i++){

      l = path[i].getTotalLength();
      length[i] = l;
      path[i].style.strokeDasharray = l + ' ' + l; 
      path[i].style.strokeDashoffset = l;
    }
    var handle = 0;

    var draw = function() {
       var progress = current_frame/total_frames;
       if (progress > 1) {
         window.cancelAnimationFrame(handle);
       } else {
         current_frame++;
         for(var j=0; j<path.length;j++){
           path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
         }
         handle = window.requestAnimationFrame(draw);
       }
    };
    draw();
  };


// load svgs into home page <a> tags
for (i=0; i<menuItems.length; i++) {
  $( "#home-ill-" + menuItems[i] ).load("img/home-svgs/" + menuItems[i] + ".svg", drawingPaths);
}


//*********** scrolling between projects ********//

$('#content-prev').click(function(){
  moveSection(-1);
});
$('#content-next').click(function(){
  moveSection(1);
});

function moveSection(direction) {
  var contentPara = $('.content-para'); 
  var listLength = contentPara.length;
  for(var i=0; i<listLength; i++){

    if ( $(contentPara[i]).hasClass('content-visible') === true ) {
      $(contentPara[i]).removeClass('content-visible');

      //if at start of list go to end
      if ( (i+direction) < 0 ) { i = listLength; }

      //if at end of list go to start
      if ( (i+direction) >= listLength ) { i = -1; }
      
      $(contentPara[i + direction]).addClass('content-visible');

      i = listLength; //exit loop
    }
  }
} //*************** END MOVESECTION ************//













});   //close document.ready