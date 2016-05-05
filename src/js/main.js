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
  'interactive-design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ];


  //************** DESIGN SECTION ***************//

  //make project titles clickable
  $(".project-title").click(function () {
      $(this).toggleClass('js-project-open');
      $(this).next().toggleClass('js-project-open');
  });

  // Show hidden project //
  var isLoaded = false;
  
  $(document).keypress((function(e) {
      var pass = "showme";
      var typed = "";

      return function(e) {
          typed += String.fromCharCode(e.which);
          
          if (typed.indexOf(pass) >= 0) {
            loadWork();
          }
      };
  })());

  // also do if click menu button - for mobile //
  $('#show-hidden-work').click(function() {
    if ($('#secret-sauce')) {
      loadWork();
    } else {
      console.log('wrong page');
    }
  })

  var loadWork = function() {
    if (isLoaded == false) {
      $('#secret-sauce').load("work-projects.html", function() {
          $('#secret-sauce .project-title').click(function() {
            $(this).toggleClass('js-project-open');
            $(this).next().toggleClass('js-project-open');
          })
          isLoaded = true;
      });
    }  
  };





  // End hidden project //




  // ********** IE test ******** //

  // function isIE () {
  //   var myNav = navigator.userAgent.toLowerCase();
  //   return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  // }

  // if (isIE () < 9) {
  //  // is IE version less than 9
  // } else {
  //  // is IE 9 and later or not IE
  // }



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

          for (i=0; i<allPics.length; i++) {
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

    // define max num of images
    var imgTotal;

    if ( $('#main-photo').attr('class').indexOf('rome-21') >=0 ) {
      imgTotal = 21;
    } else if ( $('#main-photo').attr('class').indexOf('nz-32') >=0 ) {
      imgTotal = 32;
    }



    // if you hit button then get direction and call function
    $('[id*=photo-swap-]').click( function(event) {
      if ($(this).attr('id').indexOf('left') > -1 ) {
        movePhoto(-1);  
      }
      else if ($(this).attr('id').indexOf('right') > -1 ) {
        movePhoto(1);  
      }
    });

    // if arrows clicked get direction and call function
    document.onkeydown = function(e) {
        switch (e.keyCode) {

            case 37: //left
              if ($('body').attr('id') == 'photog-body') {
                movePhoto(-1);
              };  
              break;

            case 39: //right
              if ($('body').attr('id') == 'photog-body') {
                movePhoto(1);
              };  
              break;
        }
    };



    // move to next image based on direction
    var movePhoto = function(direction) {

      //get existing image number
      var currentNum = parseInt($('#main-photo').attr('src')
      .replace('img/rome-web/rome-', '')
      .replace('img/nz-web/nz-', '')
      .replace('.jpg', '')
      );

      //get next image number
      var nextNum = currentNum + direction;

      //loop at start and end of number of images
      if (nextNum < 1) {
        nextNum = imgTotal;
      } else if (nextNum > imgTotal) {
        nextNum = 1;
      }

      // select image and swap out for next one
      $('#main-photo').fadeOut(500, function(){
          nextSrc = $(this).attr('src').replace( currentNum, nextNum);
          $(this).attr('src', nextSrc ).bind('onreadystatechange load', function(){
             if (this.complete) $(this).fadeIn(500);
          });
      });   
    };

} /* END PHOTOGRAPHYFEATURES*/

// run if on photo page
if ( $('#photog-body').length ) { 
    photographyFeatures();
}




});   //close document.ready