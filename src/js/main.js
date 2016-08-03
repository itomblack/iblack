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
  var eTop;
  var eLeft;
  //make project titles clickable
  $(".project-title").click(function () {
      var eTitle = this;
      var headerElem = $(this).find('.title-text-wrap');
      var eClicked = $(this).parent();
      var contentElem = eClicked.find('.project-content');
      var pageWrap = $('.home-ills-wrap');

      if ( $(eClicked).hasClass('js-project-open') ) {
          //if open then close
          //remove classes from stick header
          headerElem.removeClass('js-fix-header');
          contentElem.css({ "margin-top": "0" });
          pageWrap.toggleClass('js-no-padding');
          //close project
          $(eClicked)
            .toggleClass('js-project-open')
          ;
          //fade in other cards
          $(".project-title").not(eTitle).parent()
            .delay(200)
            .fadeTo(200, 1);

      } else {
          // if closed then open
          $(".project-title").not(eTitle).parent()
            .fadeTo(200, 0, function() {
              pageWrap.toggleClass('js-no-padding');
              $(eClicked).toggleClass('js-project-open');

                // STICKY HEADER
                stickOnScroll(eClicked, headerElem, contentElem);
            });          
      }
  });

  
  // ****** STICK HEADER ****** //
  function stickOnScroll(eClicked, headerElem, contentElem) {
    $('.js-project-open').scroll(function(){

      var scroll =  $('.js-project-open').scrollTop();
      var heightImg = $(this).find('.title-img-wrap').height();

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



//***************** ILLUSTRATION SHOW ***************//
//***************************************************//

var illustrationFeatures  = function () {

    var illustration = $('.ill-thumb');

    //clicking an image shows large image
    illustration.click(function(){
      
      //get clicked image and load full version
      var thumbUrl = $(this).attr('src');
      var fullUrl = thumbUrl.replace("thumbs", "full");


      $('#ill-full').fadeOut(200, function(){
            $(this).attr('src', fullUrl).bind('onreadystatechange load', function(){
                  if (this.complete) $(this).fadeIn(500);
            });
      });   

      //show page
      var imageBack = $('#full-image-back');
      imageBack.toggleClass('js-on-page');
    });


    //clicking x button hides large image

    $('#full-image-close').click(function(){
      var imageBack = $('#full-image-back');
      imageBack.toggleClass('js-on-page');
    });


    //FILTER

    $('[id*=filter]').click( function() {
      var filter = this.id.split('-')[1];
      var allPics = $('.ill-thumb');
      //if off then remove class and show images
      if ($(this).hasClass('filter-on')) {
          $(this).removeClass('filter-on');
          for (i=0; i<allPics.length; i++) {
              if ($(allPics[i]).attr('data').indexOf(filter) == 0) {
                $(allPics[i]).removeClass('hide-illustration');
              };
          }

      } else {
          // else add class and hide images
          $(this).addClass('filter-on');

          // $('[data=' + filter + ']').addClass('hide-illustration')

          for ( i=0; i<allPics.length; i++ ) {
              if ($(allPics[i]).attr('data').indexOf(filter) == 0) {
                $(allPics[i]).addClass('hide-illustration');
              };
          }

      }
    });
} /* END ILLUSTRATION FEATURES */

// run if on ILLUSTRATION page
if ( $('#illustration-body').length ) { 
  illustrationFeatures();
}


//**************** PHOTOGRAHY SHOW ******************//
//***************************************************//

var photographyFeatures  = function () {

  var photoUrls = [];
  var photoUrl;
  var photoShownArrayPos = "";
  
  var loadPhotoFolder = function (folder, folderLength, prefix) {
    for ( i=1; i < (folderLength+1); i++ ) {
      var currentUrl = '../img/photography/' + folder + '/' + prefix + i + '.jpg';
      photoUrls.push(currentUrl);
    };
  }

  //load photos urls in to array
  loadPhotoFolder('nz-web', 32, 'nz-');
  loadPhotoFolder('rome-web', 21, 'rome-');
  loadPhotoFolder('canada-web', 30, 'canada-');

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
                $(this).appendTo('#photo-grid-wrap');
                // click to see large version
                var photoItem = $('#photo-grid-wrap img');
                photoItem.unbind();
                //clicking an image shows large image
                photoItem.click(function(){
                  showPhotos(this);
                });
            });
            // $('#photo-grid-wrap').append('<img src="' + photoUrls[i] + '" alt="Just another photo">');
          };
          photosLeft = photosLeft - initPhotoLoad;
      }      
  };

  //choose intitial load based on screen size
  if (window.innerWidth >= 450) { var initPhotoLoad = 8; };
  if (window.innerWidth >= 800) { var initPhotoLoad = 16; };
  if (window.innerWidth >= 1000) { var initPhotoLoad = 20; };
  if (window.innerWidth >= 1200) { var initPhotoLoad = 24; };

  loadPhotoBatch(0,initPhotoLoad);

  // load more if scrolling near bottom of page
  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      loadPhotoBatch((totalPhotos - photosLeft), initPhotoLoad);
    };
  };


 

  var showPhotos = function(clickedItem) {
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

} /**************** END PHOTOGRAPHYFEATURES ****************/

// run if on photo page
if ( $('#photog-body').length ) { 
    photographyFeatures();
};


// funky console message
console.log('%cThanks for inspecting my site!','font-family: "Open sans",Helvetica,Arial,sans-serif;font-weight: 400;font-size:21px;color:#3f88e8;');


});   //close document.ready