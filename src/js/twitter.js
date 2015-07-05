
  /*********************************************************************
  *  #### Twitter Post Fetcher v13.0 ####
  *  Coded by Jason Mayes 2015. A present to all the developers out there.
  *  www.jasonmayes.com
  *  Please keep this disclaimer with my code if you use it. Thanks. :-)
  *  Got feedback or questions, ask here:
  *  http://www.jasonmayes.com/projects/twitterApi/
  *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
  *  Updates will be posted to this site.
  *********************************************************************/
  (function(w,n){"function"===typeof define&&define.amd?define([],n):"object"===typeof exports?module.exports=n():n()})(this,function(){function w(a){return a.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,g){return g}).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function n(a){a=a.getElementsByTagName("a");for(var c=a.length-1;0<=c;c--)a[c].setAttribute("target","_blank")}function m(a,c){for(var g=[],f=new RegExp("(^| )"+c+"( |$)"),h=a.getElementsByTagName("*"),b=0,k=h.length;b<
  k;b++)f.test(h[b].className)&&g.push(h[b]);return g}var B="",k=20,C=!0,u=[],x=!1,v=!0,q=!0,y=null,z=!0,D=!0,A=null,E=!0,F=!1,r=!0,G=!0,H={fetch:function(a){void 0===a.maxTweets&&(a.maxTweets=20);void 0===a.enableLinks&&(a.enableLinks=!0);void 0===a.showUser&&(a.showUser=!0);void 0===a.showTime&&(a.showTime=!0);void 0===a.dateFunction&&(a.dateFunction="default");void 0===a.showRetweet&&(a.showRetweet=!0);void 0===a.customCallback&&(a.customCallback=null);void 0===a.showInteraction&&(a.showInteraction=
  !0);void 0===a.showImages&&(a.showImages=!1);void 0===a.linksInNewWindow&&(a.linksInNewWindow=!0);void 0===a.showPermalinks&&(a.showPermalinks=!0);if(x)u.push(a);else{x=!0;B=a.domId;k=a.maxTweets;C=a.enableLinks;q=a.showUser;v=a.showTime;D=a.showRetweet;y=a.dateFunction;A=a.customCallback;E=a.showInteraction;F=a.showImages;r=a.linksInNewWindow;G=a.showPermalinks;var c=document.createElement("script");c.type="text/javascript";c.src="//cdn.syndication.twimg.com/widgets/timelines/"+a.id+"?&lang="+(a.lang||
  "en")+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+Math.random();document.getElementsByTagName("head")[0].appendChild(c)}},callback:function(a){var c=document.createElement("div");c.innerHTML=a.body;"undefined"===typeof c.getElementsByClassName&&(z=!1);a=[];var g=[],f=[],h=[],b=[],p=[],t=[],e=0;if(z)for(c=c.getElementsByClassName("tweet");e<c.length;){0<c[e].getElementsByClassName("retweet-credit").length?b.push(!0):b.push(!1);if(!b[e]||b[e]&&D)a.push(c[e].getElementsByClassName("e-entry-title")[0]),
  p.push(c[e].getAttribute("data-tweet-id")),g.push(c[e].getElementsByClassName("p-author")[0]),f.push(c[e].getElementsByClassName("dt-updated")[0]),t.push(c[e].getElementsByClassName("permalink")[0]),void 0!==c[e].getElementsByClassName("inline-media")[0]?h.push(c[e].getElementsByClassName("inline-media")[0]):h.push(void 0);e++}else for(c=m(c,"tweet");e<c.length;)a.push(m(c[e],"e-entry-title")[0]),p.push(c[e].getAttribute("data-tweet-id")),g.push(m(c[e],"p-author")[0]),f.push(m(c[e],"dt-updated")[0]),
  t.push(c[e].getElementsByClassName("permalink")[0]),void 0!==m(c[e],"inline-media")[0]?h.push(m(c[e],"inline-media")[0]):h.push(void 0),0<m(c[e],"retweet-credit").length?b.push(!0):b.push(!1),e++;a.length>k&&(a.splice(k,a.length-k),g.splice(k,g.length-k),f.splice(k,f.length-k),b.splice(k,b.length-k),h.splice(k,h.length-k),t.splice(k,t.length-k));c=[];e=a.length;for(b=0;b<e;){if("string"!==typeof y){var d=f[b].getAttribute("datetime"),l=new Date(f[b].getAttribute("datetime").replace(/-/g,"/").replace("T",
  " ").split("+")[0]),d=y(l,d);f[b].setAttribute("aria-label",d);if(a[b].innerText)if(z)f[b].innerText=d;else{var l=document.createElement("p"),I=document.createTextNode(d);l.appendChild(I);l.setAttribute("aria-label",d);f[b]=l}else f[b].textContent=d}d="";C?(r&&(n(a[b]),q&&n(g[b])),q&&(d+='<div class="user">'+w(g[b].innerHTML)+"</div>"),d+='<p class="tweet">'+w(a[b].innerHTML)+"</p>",v&&(d=G?d+('<p class="timePosted"><a href="'+t[b]+'">'+f[b].getAttribute("aria-label")+"</a></p>"):d+('<p class="timePosted">'+
  f[b].getAttribute("aria-label")+"</p>"))):a[b].innerText?(q&&(d+='<p class="user">'+g[b].innerText+"</p>"),d+='<p class="tweet">'+a[b].innerText+"</p>",v&&(d+='<p class="timePosted">'+f[b].innerText+"</p>")):(q&&(d+='<p class="user">'+g[b].textContent+"</p>"),d+='<p class="tweet">'+a[b].textContent+"</p>",v&&(d+='<p class="timePosted">'+f[b].textContent+"</p>"));E&&(d+='<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to='+p[b]+'" class="twitter_reply_icon"'+(r?' target="_blank">':
  ">")+'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id='+p[b]+'" class="twitter_retweet_icon"'+(r?' target="_blank">':">")+'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id='+p[b]+'" class="twitter_fav_icon"'+(r?' target="_blank">':">")+"Favorite</a></p>");F&&void 0!==h[b]&&(l=h[b],void 0!==l?(l=l.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0],l=decodeURIComponent(l).split('"')[1]):l=void 0,d+='<div class="media"><img src="'+l+'" alt="Image from tweet" /></div>');
  c.push(d);b++}if(null===A){a=c.length;g=0;f=document.getElementById(B);for(h="<ul>";g<a;)h+="<li>"+c[g]+"</li>",g++;f.innerHTML=h+"</ul>"}else A(c);x=!1;0<u.length&&(H.fetch(u[0]),u.splice(0,1))}};return window.twitterFetcher=H});




  function dateFormatter(date) {
    return date.toTimeString();
  }

  // ##### Advanced example 2 #####
  // Similar as previous, except this time we pass a custom function to render the
  // tweets ourself! Useful if you need to know exactly when data has returned or
  // if you need full control over the output.

  //latest photo
  var config1 = {
    "id": '610193103820062720',
    "domId": 'example1',
    "maxTweets": 10,
    "enableLinks": true,
    "showUser": true,
    "showTime": true,
    "dateFunction": '',
    "showRetweet": false,
    "showImages": true,
    "dateFunction": dateFormatter,
    "customCallback": handleTweets,
    "showInteraction": false
  };

  
<<<<<<< HEAD
var loopRepeat = 9000;
var loopLength = 0; //initially zero to load first image
=======
// var loopRepeat = 16000;
// var loopLength = 8000;
>>>>>>> origin/master

  //DEFINE VARIABLES ************//

  function handleTweets(tweets){

    //get number of tweets in last seconds



    //HERE WE GET THE TIME VALUE OF EACH TWEET
      var twtTime= tweets[0];
       twtTime = twtTime.split('class="timePosted">')[1];
       twtTime = twtTime.split('">')[1];
       twtTime = twtTime.split(' ')[0];

       //split in to seconds
       var a = twtTime.split(':'); // split it at the colons
       // minutes are worth 60 seconds. Hours are worth 60 minutes.
       var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 


      


      for ( i=0; i<tweets.length; i++) {
        

            if (tweets[i] != undefined) {
                var twtContent = tweets[i];
                //if it contains a photo
                if (twtContent.search('class="media">') > 0) { 
                  //if it contains hastag
                  if (twtContent.search('ibphoto') > 0) {

                    var twtText = twtContent.split('class="tweet">')[1];
                    twtText = twtText.split('</p>')[0].split('<a href')[0];

                    allImagesTweet.push(twtText);

                    twtContent = twtContent.split('class="media">')[1];
                    twtContent = twtContent.split('img src="')[1];
                    twtContent = twtContent.split('.jpg')[0];
                    twtContent = twtContent += ".jpg";

                    allImages.push(twtContent);               
                  }
                  

                }
            }
            else {
              twtContent = "";
            }

            
          } //end for loops

<<<<<<< HEAD
          //set photo first
          if ( loopLength === 0 ) {
            console.log('firstrun-1');
            $('#twitter-photo').attr('src',allImages[0]).load(function(){
               if (this.complete) $(this).fadeIn(500);
               $('#photo-info-tweet').text(allImagesTweet[0]);
               console.log('firstrun-2');
            }); 
          }

          //now set loop to normal length
          loopLength = 3000;
               


          changePhotos(allImages, allImagesTweet);
=======
          // changePhotos(allImages, allImagesTweet);


          //set photo first

          $('#twitter-photo').fadeOut(500, function(){
            $(this).attr('src',allImages[0]).bind('onreadystatechange load', function(){
               if (this.complete) $(this).fadeIn(500);
               $('#photo-info-tweet').text(allImagesTweet[0]);
              });
          });    

          

          startLoop();
          
>>>>>>> origin/master

        

  } //*** END HANDLE TWEETS **//





  function changePhotos(allImages, allImagesTweet) {

<<<<<<< HEAD



    loopRepeat = allImages.length * loopLength;
    console.log(loopRepeat)

    

    //loop time is interval divided by image number
    // var loopLength = (loopRepeat / allImages.length);
    
    var loopTimes = allImages.length;
=======
    $('#photo-info-tweet').addClass("js-transform-0");

    $('#twitter-photo').fadeOut(500, function(){
      $(this).attr('src',allImages[photoCount]).bind('onreadystatechange load', function(){
          if (this.complete) $(this).fadeIn(500);
          $('#photo-info-tweet').text(allImagesTweet[photoCount]);
          $('#photo-info-tweet').removeClass("js-transform-0");
      });
    });        
  
>>>>>>> origin/master

    if(photoCount == allImages.length -1){
         photoCount = 0;
    }
    else{
        photoCount++;
    }
  }   /* end changephotos*/


<<<<<<< HEAD
          $('#twitter-photo').fadeOut(500, function(){

            $(this).attr('src',allImages[i]).load(function(){
               if (this.complete) $(this).fadeIn(500);
               console.log('change' + loopLength)
               $('#photo-info-tweet').text(allImagesTweet[i]);
               $('#photo-info-tweet').removeClass("js-transform-0");
              });
          });               
          if (--i) photoLoop(i);      //  decrement i and call myLoop again if i > 0
       }, loopLength)
    })(loopTimes);
=======

  //****** open and close info panel ****//
  $('#photo-info-btn').click(function(){
      $('#photo-info').toggleClass('js-info-open');
>>>>>>> origin/master

      if ($('#info-btn-letter').text() == "i") {
          $('#info-btn-letter').text('x');
      } else {
          $('#info-btn-letter').text('i');
      }
      
  })




  function runTweet() {
    twitterFetcher.fetch(config1);
<<<<<<< HEAD
    console.log('runtweet' + loopRepeat)

    window.clearInterval(runTweet, loopRepeat);
    window.setInterval(runTweet, loopRepeat);
=======
>>>>>>> origin/master
  }

  function startLoop() {
    window.setInterval( function(){
      changePhotos(allImages, allImagesTweet, photoCount)
    }, 7000 );
   }

  var photoCount = 0;
  var allImages = [];
  var allImagesTweet = [];

  runTweet();
 
  

<<<<<<< HEAD
  
=======
>>>>>>> origin/master


