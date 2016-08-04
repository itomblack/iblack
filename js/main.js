$( document ).ready(function() {

//************** PAGE TRANSITIONS ***************//
 
    $(".page-transition").click(function(event){
      event.preventDefault();
      linkLocation = this.href;
      $("body").fadeOut(300, redirectPage);    
    });

    function redirectPage() {
      window.location = linkLocation;
    }

//************** MENU ITEMS ***************//

  var menuItems = [
  'design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ];


  //************** DESIGN SECTION ***************//
  
  // run if on design page
  if ( $('#design-body').length ) { 

    var eClicked;
    //clicking x button hides large image
    $('#full-image-close').click(function(){
      $('#full-page-design').toggleClass('js-on-page');
      $(".project-wrap").not(eClicked).fadeTo(200, 1)
    });

    $(".project-title").click(function () {

        eClicked = $(this).parent();

        $(".project-wrap").not(eClicked).fadeTo(300, 0.3)
        //get html
        var projectContent = $(this).parent().html();
        //place in to panel
        $('#design-holder').html(projectContent);
        //open panel
        $('#full-page-design').toggleClass('js-on-page');
        //close if header is clicked
        $('#design-holder').find('.project-title').click( function() {
          $('#full-page-design').toggleClass('js-on-page');
          $(".project-wrap").not(eClicked).fadeTo(200, 1)
        })


        //apply stick header
        stickOnScroll();
    });

    // ****** STICK HEADER ****** //
    function stickOnScroll() {
      $('#design-holder').scroll(function(){
        var scroll =  $('#design-holder').scrollTop();
        var heightImg = $(this).find('.title-img-wrap').height();
        var headerElem = $(this).find('.title-text-wrap');
        var contentElem = $(this).find('.project-content');

        if( scroll - heightImg > 36 ) {
            headerElem.addClass('js-fix-header'); 
            contentElem.css({
              "margin-top": "160px"
            });
        } else {
            headerElem.removeClass('js-fix-header');
            contentElem.css({
              "margin-top": "0"
            });       
        }
      });
    }
    // **** END STICK HEADER **** //

} //end if on design page



  // ********** HOMEPAGE DRAWING FUNCTION ******** //
  var homeFeatures  = function () {

      function drawingPaths(){
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
}

// run if on HOME page
if ( $('#home-body').length ) { 
  homeFeatures();
}





//***************** IMAGE ON PAGES *********************//
//*****************************************************//

var photoUrls = [];
var photoUrl;
var photoShownArrayPos = "";

var loadPhotoFolder = function (folder, folderLength, prefix) {
  for ( i=1; i < (folderLength+1); i++ ) {
    var currentUrl = '../img/' + folder + '/' + prefix + i + '.jpg';
    photoUrls.push(currentUrl);
  };
}


var putImagesOnPage = function ( photoUrls ) {
  //add some photos to page
  var totalPhotos = photoUrls.length;
  var photosLeft = photoUrls.length;
  var initPhotoLoad = 4;
  
  var loadPhotoBatch = function (startAt, numToLoad) {
      //so you can't try and load non existant photos
      if (numToLoad >= photosLeft) { numToLoad = photosLeft; };
      
      if (photosLeft > 0) {
          for ( i=startAt; i < (startAt + numToLoad); i++ ) {
            $('<img src="' + photoUrls[i] + '" alt="Just another photo">').load(function() {
                $('<div class="photo-img-wrap">').appendTo('#content-block');
                $(this).appendTo('.photo-img-wrap:last');
                // click to see large version
                var photoItem = $('#content-block img');
                photoItem.unbind();
                //clicking an image shows large image
                photoItem.click(function(){
                  showPhotos(this);
                });
                showPhotoSize();   
            });
          };
          photosLeft = photosLeft - initPhotoLoad;
      }   
  };


  //choose intitial load based on screen size
  if (window.innerWidth >= 550) { var initPhotoLoad = 6; };
  if (window.innerWidth >= 850) { var initPhotoLoad = 9; };
  if (window.innerWidth >= 1150) { var initPhotoLoad = 12; };

  loadPhotoBatch(0,initPhotoLoad);

  // load more if scrolling near bottom of page
  var run = false;
  $('.photo-wrap').scroll(function(ev) {
    var pageHeight = $('.photo-wrap').innerHeight();
    var scrollDist = $('.photo-wrap').scrollTop();
    var imgOffset = $('.photo-img-wrap:last').offset().top;
    var imgHeight = $('.photo-img-wrap:last').height();

    if ((pageHeight >= (imgOffset + 120) ) && (run == false)) {
        run = true;
        loadPhotoBatch((totalPhotos - photosLeft), initPhotoLoad);
        setTimeout(function() { run = false }, 300);
    };
  });


  

  var showPhotos = function(clickedItem) {
    console.log(clickedItem);
    //get clicked image and load full version
    photoUrl = $(clickedItem).attr('src');

    $('#photo-full').fadeOut(200, function(){
          $(this).attr('src', photoUrl).bind('onreadystatechange load', function(){
                if (this.complete) $(this).fadeIn(500);
          });
    });   
    //show page
    $('#full-image-photo').toggleClass('js-on-page');
  }
  //clicking x button hides large image
  $('#full-image-close').click(function(){
    $('#full-image-photo').toggleClass('js-on-page');
  });



  // Scrolling with arrows
  $("body").keydown(function(e){
      // left arrow
      if ((e.keyCode || e.which) == 37) {  
        moveDirection(-1);
      }
      // right arrow
      if ((e.keyCode || e.which) == 39) {
         moveDirection(1);
      }   
  });

  var moveDirection = function(direction) {
    //work out which one this is from the array of images
    photoShownArrayPos = photoUrls.indexOf( photoUrl );
    nextPhotoArrayPos = photoShownArrayPos + direction;
    currentlyShowingNum = totalPhotos - photosLeft - 1;

    if (nextPhotoArrayPos < 0) {
      nextPhotoArrayPos = currentlyShowingNum;
    } else if (nextPhotoArrayPos > currentlyShowingNum ) {
      nextPhotoArrayPos = 0;
    }
    // select image and swap out for next one
    $('#photo-full').fadeOut(500, function(){
        nextPhotoSrc = photoUrls[nextPhotoArrayPos];
        $(this).attr('src', nextPhotoSrc ).bind('onreadystatechange load', function(){
           if (this.complete) $(this).fadeIn(500);
        });
    });   

    //update photoUrl to match
    photoUrl = photoUrls[nextPhotoArrayPos];
  };

  // make sure resize shows more pictures if needed
  var initialSize = window.innerWidth;
  $(window).resize( function() {
    currentSize = window.innerWidth;

    if( (currentSize >= 550) && (initialSize < 550) ) {
      initialSize = 551;
      loadPhotoBatch((totalPhotos - photosLeft), 2);

    } 
    else if( (currentSize >= 850) && (initialSize < 850) ) {
      initialSize = 851;
      loadPhotoBatch((totalPhotos - photosLeft), 3);
    }
    else if( (currentSize >= 1150) && (initialSize < 1150) ) {
      initialSize = 1151;
      loadPhotoBatch((totalPhotos - photosLeft), 3);
    }
  })
}
/* end put photos on page*/



function showPhotoSize() {
  $('.photo-img-wrap').find('img').each(function(){
      var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
      $(this).addClass(imgClass);
  })
}

//**************** END PUTTING IMAGES ON PAGE ******************//
//*************************************************************//





//**************** PHOTOGRAHY SHOW ******************//
//***************************************************//

var photographyFeatures  = function () {

  //load photos urls in to array
  loadPhotoFolder('photography/nz-web', 32, 'nz-');
  loadPhotoFolder('photography/rome-web', 21, 'rome-');
  loadPhotoFolder('photography/canada-web', 30, 'canada-');

  putImagesOnPage( photoUrls );

} 

// run if on photo page
if ( $('#photog-body').length ) { 
    photographyFeatures();
};


/**************** END PHOTOGRAPHY SHOE ****************/







//**************** ILLUSTRATION SHOW ******************//
//***************************************************//
var illustrationFeatures  = function () {

    //load photos urls in to array
    loadPhotoFolder('illustration', 59, '');
    putImagesOnPage( photoUrls );

} /* END ILLUSTRATION FEATURES */

// run if on ILLUSTRATION page
if ( $('#illustration-body').length ) { 
  illustrationFeatures();
}







// funky console message
console.log('%cThanks for inspecting my site!','font-family: "Open sans",Helvetica,Arial,sans-serif;font-weight: 400;font-size:21px;color:#3f88e8;');

});   //close document.ready