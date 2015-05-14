$( document ).ready(function() {

  var menuItems = [
  'interactive-design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ];

  //LOAD MENU AND FOOTER
  $('header').load('menu.html');
  $('footer').load('footer.html');

  //************** EVENT LISTENERS ***************//

  $('#content-prev').click(function(){
    moveSection(999, -1); //999 means not a direct project link
  });

  $('#content-next').click(function(){
    moveSection(999, 1); //999 means not a direct project link
  });

  $('#content-nav').click(function(){
    var projectId = event.target.id.slice(-1);
    moveSection(projectId, 0);

  });


  // ********** IE test ******** //

  function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  if (isIE () < 9) {
   // is IE version less than 9
  } else {
   // is IE 9 and later or not IE
  }



  // ********** HOMEPAGE DRAWING FUNCTION ******** //

  function drawingPaths(){
    console.log('run');
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
  }


// ************ LOAD SVGS INTO HOME PAGE ********** //
function loadHomeImages (){
  var count = 1;
  for (i=0; i<menuItems.length; i++) {
    $( "#home-ill-" + menuItems[i] ).load("img/home-svgs/" + menuItems[i] + ".svg", function(){
      //run drawing function after final image is done loading
      count++;
      if (count == menuItems.length) {
        drawingPaths();
      }
    });
  }
}

loadHomeImages();






//*********** SCROLLING BETWEEN PROJECTS ********//

function moveSection(search, direction) {
  var contentPara = $('.content-para'); 
  var listLength = contentPara.length;
  var visibleContent = "";
  var nextContent = "";

 
  //get current visible section
  visibleContent = $('.content-visible').attr('id').slice(-1);
  visibleContent = parseInt(visibleContent);
  

  //toggle visible class on paragraph
  $(contentPara[visibleContent]).toggleClass('content-visible');

  //if intro section then swap svgs
  if ( visibleContent === 0) {
    $('#content-img-intro').toggleClass('wrap-hide');
    $('[id^=content-img-wrap]').toggleClass('wrap-hide');
  }

  //remove image background from others
  $('[id^=content-img-view]').removeClass('content-view-' + visibleContent);


  //find next to be shown
  if (search === 999 ) {
      //if at start of list go to end
      if ( (visibleContent + direction) < 0 ) { visibleContent = listLength; }
      //if at end of list go to start
      if ( (visibleContent + direction) >= listLength ) { visibleContent = -1; }
      nextContent = visibleContent + direction;
  }
  else {
    nextContent = search;
  }

  //toggle visible class for next content paragraph
  $(contentPara[nextContent]).toggleClass('content-visible');

  //if next section is intro section then swap svgs
  if ( nextContent === 0 ) { 
    $('#content-img-intro').toggleClass('wrap-hide');
    $('[id^=content-img-wrap]').toggleClass('wrap-hide');
   }
  //if not intro load new images
  $('[id^=content-img-view]').addClass('content-view-' + nextContent);




} //*************** END MOVESECTION ************//





//*********** ILLUSTRATION SHOW ********//

var illustration = $('.ill-thumb');

//clicking an image shows large image
illustration.click(function(){
  
  //get clicked image and load full version
  var thumbUrl = $(this).attr('src')
  var fullUrl = thumbUrl.replace("thumbs", "full");
  $('#ill-full').attr('src', fullUrl);

  //show page
  var imageBack = $('#full-image-back');
  imageBack.toggleClass('js-on-page');
});


//clicking x button hides large image

$('#full-image-close').click(function(){
  var imageBack = $('#full-image-back');
  imageBack.toggleClass('js-on-page');
});




});   //close document.ready