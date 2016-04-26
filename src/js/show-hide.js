$( document ).ready(function() {


  $(document).keypress((function(e) {
      var pass = "showme";
      var typed = "";

      var projectHTML = '<div class="box hidden-box">Box 2</div><div class="box hidden-box">Box 3</div>';

      return function(e) {
          typed += String.fromCharCode(e.which);
          // console.log(typed);
          if (typed === pass) {
            console.log
              $('#secret-sauce').append(projectHTML)
              $('.hidden-box').fadeIn(500);
          }
      };
  })());

});