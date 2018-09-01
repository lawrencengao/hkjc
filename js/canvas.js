;(function(window){
  'use strict';
  var wayFinderLocation = (window.location.hash[1] || 1) |0;
  var floor = window.location.search.substring(1).toLowerCase() || '2f';

  var CanvasMap = function(){

    var imgHelper = new imageHelper,
        //canvas
        canvas = imgHelper.getCanvas(),
        //context
        context = imgHelper.getContext(),
        //Images paths
        mapImages = imgHelper.getImagePath(),
        //Images Position
        imagePos = imgHelper.getImagePosition();

    //Run Once
    this.init = function() {
      if (floor !== '1f') {
        $( "#dialog" ).dialog({
          resizable: false,
          height: 250,
          modal: true,
          position: { my: "top-300"},
          buttons: {
            'Yes / 有': function() {
              $( this ).dialog( "close" );
            },
            'No / 沒有': function() {
              $( this ).dialog( "close" );
              mapImages['food-kiosk']= imgHelper.createImage('images/map/m1_closed.png');
              imagePos.wayFinder[3].facility['food-kiosk'] = {
                bubble: {'x':712 , 'y':444, 'height': 170},
                route: {
                  points: [
                    {'x':682 , 'y':443},
                    {'x':687 , 'y':446}
                  ],
                  arrow:[
                    [{'x':682 , 'y':443},{'x':687 , 'y':446}]
                  ]
                }
              };
            }
          }
        });
      }

      this.drawMapIcons();
      this.drawYouAreHereIcons();

      //Draw Map Text
      var self = this;
      mapImages['lift'][lang].onloadCallback(function(){
        self.drawMapText('lift', lang);
      });
      mapImages['terrace'][lang].onloadCallback(function(){
        self.drawMapText('terrace', lang);
      });
      mapImages['track'][lang].onloadCallback(function(){
        self.drawCommonMapText('track', lang);
      });
      mapImages['stairarm'].onloadCallback(function(){
        context['2f']['stair'].drawImage(mapImages['stairarm'],0,0);
      });
      this.drawYouAreHereText();

      $('.ground-floor-container').removeClass('active');
      $('.first-floor-container').removeClass('active');
      $('.second-floor-container').removeClass('active');
      $('.sixth-floor-container').removeClass('active');
      setTimeout(function() {
        if (floor === '1f') {
          $('.first-floor-container').addClass('active');
          $('.map-container').addClass('f1-active');
          $('.floor').text('1/F');
        } else {
          $('.second-floor-container').addClass('active');
          $('.map-container').addClass('f2-active');
          $('.floor').text('2/F');
        }
      });
    }

    //functions for clean the canvas
    this.clearCanvas = function(ctxt,cvs){
      ctxt.clearRect(0, 0, cvs.width, cvs.height);
    }

    /*this.drawSubtitleText = function(text, context, canvas) {
      this.clearCanvas(context, canvas);
      mapImages['subtitles'].onloadCallback(function(){
        ctxt.drawImage(mapImages['subtitles'],781, 450);
        //ctxt.drawImage(mapImages['subtitles'],781, 450);
        ctxt.fillText( translator('at-gf').toUpperCase(), wayFinderPos.x +85, wayFinderPos.y - lineHeight +20);
        //ctxt.fillText( translator('at-gf').toUpperCase(), wayFinderPos.x +85, wayFinderPos.y - lineHeight +20);

      });

    }*/
    this.newPlayingAniId = [];

    this.clearDestination = function () {
      for (var i in this.newPlayingAniId) {
        clearTimeout(this.newPlayingAniId[i]);
      }
      this.redrawMapText(lang, true);
      this.clearCanvas(context['2f']['block'],canvas['2f']['block']);
      this.clearCanvas(context['2f']['destination-bubble'],canvas['2f']['destination-bubble']);
      this.clearCanvas(context['2f']['guide'],canvas['2f']['guide']);
      this.clearCanvas(context['gf']['guide'],canvas['gf']['guide']);
      this.clearCanvas(context['6f']['guide'],canvas['6f']['guide']);
      this.clearGroundFloor();
      this.drawYouAreHereArrow();

      // $('.second-floor-container').addClass('active');
      // $('.first-floor-container').removeClass('active');
      $('.ground-floor-container').removeClass('active');
      $('.first-floor-container').removeClass('active');
      $('.second-floor-container').removeClass('active');
      $('.sixth-floor-container').removeClass('active');
      $('.map-container')
        .removeClass('gf-active')
        .removeClass('gf-lift-active')
        .removeClass('f1-active')
        .removeClass('f2-active')
        .removeClass('f6-lift-active')
        .removeClass('f6-active');
      $('.first-floor-container > div')
        .removeClass('female-toilet')
        .removeClass('male-toilet')
        .removeClass('disable-toilet')
        .removeClass('customer-service-counter')
        .removeClass('betting-counter');
      setTimeout(function() {
        if (floor === '1f') {
          $('.first-floor-container').addClass('active');
          $('.map-container').addClass('f1-active');
          $('.floor').text('1/F');
        } else {
          $('.second-floor-container').addClass('active');
          $('.map-container').addClass('f2-active');
          $('.floor').text('2/F');
        }
      });
    };

    this.goTo = function(dest, name) {
      this.clearDestination();

      if (floor === '1f') {
        $('.first-floor-container > div')
          .removeClass('female-toilet')
          .removeClass('male-toilet')
          .removeClass('disable-toilet')
          .removeClass('customer-service-counter')
          .removeClass('betting-counter')
          .addClass(dest);
      }
      if(name === 'leading-edge') {
        $('.tip-list').removeClass('f6').addClass('fg');
        $('.tip-3 .text').attr('data-text','access-lift-to-gf').html(translator('access-lift-to-gf'));
        $('.tip-3 .buuble').attr('data-text','access-lift-to-gf').html(translator('access-lift-to-gf'));
        this.changeTips(2);
      } else if(name === 'farrier-on-6'){
        $('.tip-list').removeClass('fg').addClass('f6');
        $('.tip-3 .text').attr('data-text','access-lift-to-6f').html(translator('access-lift-to-6f'));
        $('.tip-3 .bubble').attr('data-text','access-lift-to-6f').html(translator('access-lift-to-6f'));
        this.changeTips(2);
      }

      if (imagePos.wayFinder[wayFinderLocation].facility[dest] == undefined) {
        this.drawYouAreHereArrow();
      } else {
        this.drawRoute(dest,name);
      }

      //Draw Block
      this.drawBlock(dest,NaN,name);

      //Draw bubble if on 2/f
      if(dest != 'other-public-venue') {
        this.drawDestinationBubble(dest);
      }
    };

    this.drawDestinationBubble = function(dest) {
      var boothPos = imagePos.wayFinder[wayFinderLocation].facility[dest].bubble,
          height = boothPos.height;

      //Draw bubble
      context['2f']['destination-bubble'].drawImage(mapImages['destination-bubble'], boothPos.x-30 , boothPos.y-height-60, 60,60);

      //Pointing
      context['2f']['destination-bubble'].beginPath();
      context['2f']['destination-bubble'].moveTo(boothPos.x, boothPos.y );
      context['2f']['destination-bubble'].lineTo(boothPos.x, boothPos.y-height );

      //Line Style
      context['2f']['destination-bubble'].strokeStyle = '#063192';
      context['2f']['destination-bubble'].lineWidth = 2.5;

      context['2f']['destination-bubble'].stroke();

      //Draw icons
      context['2f']['destination-bubble'].drawImage(mapImages['pictogram'][dest], boothPos.x-27.5 , boothPos.y-height-57.5, 55,55);

      this.dropIn(canvas['2f']['destination-bubble']);
    }
    this.changeTips = function(step) {
      $('.tip-list').removeClass('step-1').removeClass('step-2').removeClass('step-3').removeClass('step-4').removeClass('step-5').removeClass('step-6').removeClass('step-7');
      if(step != 0) {
        $('.tip-list').addClass('step-'+step);
      } else {
        $('.tip-list').removeClass('fg').removeClass('f6');
      }
    }
    this.drawBlock = function(dest, height, name) {
      var self = this;
      var initialHeight = 30;
      if (height < 0) {

        if (dest==='other-public-venue') {

        } else if (dest==='other-public-venue-gf') {
          $('.lift-tunnel').removeClass('active');
          self.drawRouteGF(dest);
        } else if (dest==='other-public-venue-6f') {
          $('.lift-tunnel').removeClass('active');
          self.drawRoute6F(dest);
        }
        return;
      }
      if (!mapImages[dest] && dest != 'other-public-venue-6f' ) return;

      if (Number.isNaN(height)) {
        height = initialHeight;
      }


      if(dest==='other-public-venue') {
        self.clearCanvas(context['common']['lift-icon'], canvas['common']['lift-icon']);
        context['common']['lift-icon'].globalCompositeOperation = 'normal';
        context['common']['lift-icon'].drawImage(mapImages[dest], 0, 0, 1080, 1023, 0, height, 1080, 1023);
        context['common']['lift-icon'].globalCompositeOperation = 'destination-in';
        context['common']['lift-icon'].drawImage(mapImages[dest], 0, 0, 1080, 1023, 0, 0, 1080, 1023);
        this.newPlayingAniId.push(setTimeout(function(){
          self.drawBlock(dest, height - 0.75,name);
        }, 10));
      } else if(dest === 'other-public-venue-gf') {
        self.clearCanvas(context['gf']['block'], canvas['gf']['block']);
        context['gf']['block'].globalCompositeOperation = 'normal';
        context['gf']['block'].drawImage(mapImages[dest], 0, 0, 1080, 1023, 0, height, 1080, 1023);
        context['gf']['block'].globalCompositeOperation = 'destination-in';
        context['gf']['block'].drawImage(mapImages[dest], 0, 0, 1080, 1023, 0, 0, 1080, 1023);
        this.newPlayingAniId.push(setTimeout(function(){
          self.drawBlock(dest, height - 0.75,name);
        }, 10));
      } else if(dest === 'other-public-venue-6f') {
        self.clearCanvas(context['6f']['block'], canvas['6f']['block']);
        this.newPlayingAniId.push(setTimeout(function(){
          self.drawBlock(dest,height - 20, name);
        }, 10));
      } else {
        this.clearCanvas(context['2f']['map-text'],canvas['2f']['map-text']);
        this.clearCanvas(context['gf']['map-text'],canvas['gf']['map-text']);
        this.clearCanvas(context['6f']['map-text'],canvas['6f']['map-text']);
        this.clearCanvas(context['common']['map-text'],canvas['common']['map-text']);
        this.clearCanvas(context['2f']['map-icon'],canvas['2f']['map-icon']);
        this.drawMapText('lift', lang);
        this.drawCommonMapText('track', lang);

        self.clearCanvas(context['2f']['block'], canvas['2f']['block']);
        context['2f']['block'].globalCompositeOperation = 'normal';
        context['2f']['block'].drawImage(mapImages[dest], 0, 0, 1080, 1023, 0, height, 1080, 1023);

        if (dest === '2f-terrace' && height < initialHeight / 2) {
          this.drawMapText('terrace', lang, height - initialHeight / 2);
          this.drawMapIcon('2f', 'smoking-icon', height - initialHeight / 2);
        } else {
          this.drawMapText('terrace', lang);
          this.drawMapIcon('2f', 'smoking-icon');
        }

        context['2f']['block'].globalCompositeOperation = 'destination-in';
        context['2f']['block'].drawImage(mapImages[dest], 0, 0, 1080, 1023, 0, 0, 1080, 1023);

        this.newPlayingAniId.push(setTimeout(function(){
          self.drawBlock(dest, height - 0.75,name);
        }, 10));
      }

    }
    this.drawLiftArrow = function(height, goingDown, name) {
      if (goingDown == undefined) {
        goingDown = true;
      }
      var self = this,
          previousPoint,
          currentPoint;
      if(height > 50) {
        this.clearCanvas(context['gf']['block'], canvas['gf']['block']);
        this.clearCanvas(context['gf']['you-are-here-bubble'], canvas['gf']['you-are-here-bubble']);
        this.clearCanvas(context['gf']['you-are-here-text'], canvas['gf']['you-are-here-text']);
        this.clearCanvas(context['6f']['block'], canvas['6f']['block']);
        this.clearCanvas(context['6f']['you-are-here-bubble'], canvas['6f']['you-are-here-bubble']);
        this.clearCanvas(context['6f']['you-are-here-text'], canvas['6f']['you-are-here-text']);
        this.newPlayingAniId.push(setTimeout(function(){
          $('#map-layer-commonLiftArrow').removeClass('active');
          //self.newPlayingAniId.push(setTimeout(function(){
          //},1200));
        },18000));

        if(name === 'leading-edge') {
          this.newPlayingAniId.push(setTimeout(function(){
            self.clearCanvas(context['common']['lift-arrow'], canvas['common']['lift-arrow']);
            self.drawBlock('other-public-venue-gf');
          },1200));
        } else if (name === 'farrier-on-6') {
          this.newPlayingAniId.push(setTimeout(function(){
            self.clearCanvas(context['common']['lift-arrow'], canvas['common']['lift-arrow']);
            self.drawBlock('other-public-venue-6f');
          },1200));
        }

        return;
      }
      this.clearCanvas(context['common']['lift-arrow'], canvas['common']['lift-arrow']);
      if (Number.isNaN(height)) {
        height = 0;
      }

      if(goingDown) {
        previousPoint = {x:800, y:420};
        currentPoint = {x:800, y:420+height};
      } else {
        previousPoint = {x:800, y:395};
        currentPoint = {x:800, y:395-height};
      }

      context['common']['lift-arrow'].setLineDash([8, 5]);


      context['common']['lift-arrow'].beginPath();
      context['common']['lift-arrow'].moveTo(previousPoint.x,previousPoint.y);
      context['common']['lift-arrow'].lineTo(currentPoint.x,currentPoint.y);


      //Line Style
      context['common']['lift-arrow'].shadowBlur=3;
      context['common']['lift-arrow'].shadowColor='#555';
      context['common']['lift-arrow'].shadowOffsetY = 5;
      context['common']['lift-arrow'].strokeStyle = '#9e005d';
      context['common']['lift-arrow'].lineWidth = 2.5;
      context['common']['lift-arrow'].stroke();

      context['common']['lift-arrow'].setLineDash([]);


      var tx    = currentPoint.x - previousPoint.x,
          ty    = currentPoint.y - previousPoint.y,
          rad   = Math.atan2(ty,tx),

          //Draw the arrow
          theta_arrowR = rad -2.4,
          theta_arrowL = rad +2.4,
          arrowLeftLenght  = 6, //constant to create an arrow
          arrowRightLenght = 6;

      //Draw arrow
      context['common']['lift-arrow'].beginPath();
      context['common']['lift-arrow'].lineWidth = 1.5;
      context['common']['lift-arrow'].moveTo(currentPoint.x + arrowRightLenght * Math.cos(theta_arrowR),currentPoint.y+ arrowRightLenght * Math.sin(theta_arrowR));
      context['common']['lift-arrow'].lineTo(currentPoint.x,currentPoint.y);
      context['common']['lift-arrow'].lineTo(currentPoint.x + arrowLeftLenght * Math.cos(theta_arrowL),currentPoint.y + arrowLeftLenght * Math.sin(theta_arrowL));
      context['common']['lift-arrow'].stroke();


      // clear the shadow
      context['common']['lift-arrow'].shadowBlur = 0;
      context['common']['lift-arrow'].shadowColor = 0;
      context['common']['lift-arrow'].shadowOffsetY = 0;

      this.newPlayingAniId.push(setTimeout(function(){
        self.drawLiftArrow(height + 2, goingDown,name);
      }, 30));
    }
    //Animating the guideline
    this.toPoints = function(points, currentIndex, currDistance, ctxt, cvs, speed, withGuide,name){
      if(currentIndex >= points.length ){
        return;
      }

      //Clear the canvas everytime
      this.clearCanvas(ctxt,cvs);

      //how far should it go per iteration
      var distancePerIteration = 6;

      currDistance+=distancePerIteration;

      ctxt.setLineDash([]);
      ctxt.shadowBlur=5;
      ctxt.shadowColor='#555';
      ctxt.shadowOffsetY = 5;
      ctxt.strokeStyle = '#9e005d';
      ctxt.lineWidth = 2.5;

      ctxt.beginPath();
      ctxt.moveTo(points[0].x , points[0].y);
      ctxt.lineTo(points[1].x , points[1].y);

      ctxt.stroke();

      ctxt.beginPath();
      ctxt.moveTo(points[1].x , points[1].y);
      //Draw previous lines
      for(var i = 2; i < points.length && i <= currentIndex; i++) {
        ctxt.lineTo(points[i].x , points[i].y);
      }

      //Calculation for the angle
      var nextPoint    = points[currentIndex+1],
          currentPoint = points[currentIndex],
          tx    = nextPoint.x - currentPoint.x,
          ty    = nextPoint.y - currentPoint.y,
          dist  = Math.sqrt( tx*tx + ty*ty ),
          rad   = Math.atan2(ty,tx),

          //Calculation for the line in certain length
          currX = currentPoint.x + currDistance * Math.cos(rad),
          currY = currentPoint.y + currDistance * Math.sin(rad),

          //Draw the arrow
          theta_arrowR = rad -2.4,
          theta_arrowL = rad +2.4,
          arrowLeftLenght  = 7+(1-rad), //constant to create an arrow
          arrowRightLenght = 7-(1-rad),
          self = this;

      //Draw the calculated line
      ctxt.lineTo(currX , currY);

      ctxt.setLineDash([8, 5]);
      ctxt.stroke();

      // clear the shadow
      ctxt.shadowBlur = 0;
      ctxt.shadowColor = 0;
      ctxt.shadowOffsetY = 0;
      ctxt.setLineDash([]);

      this.drawArrow({x:currentPoint.x, y:currentPoint.y}, {x:currX, y:currY},ctxt);

      if (currDistance >= dist) {
        //Go to next point if the current line finished.
        currentIndex++;
        currDistance = 0;
        if(withGuide) {
          if(currentIndex == 2) {
            this.changeTips(4);
          } else if (currentIndex == 10) {
            this.changeTips(5);
          } else if (currentIndex == 12) {
            this.changeTips(6);
          }
        }
      }

      //End of animation
      if(currentIndex >= points.length-1){
        // clear the shadow style
        if(withGuide) {
          this.changeTips(7);
        }
        if(name != undefined) {
          this.drawOtherVenueTransition(name);
        }
        ctxt.restore();
        return;
      }

      //Run it every 10ms
      this.newPlayingAniId.push(setTimeout(function(){
        self.toPoints(points, currentIndex, currDistance, ctxt, cvs, speed, withGuide, name);
      }, speed));
    }
    this.drawRoute = function(dest, name) {
      var startPointdistanceToCorridor =  22.5, //Radius: Distance between corridor and wayFinder
          endPointdistanceToCorridor =  12.3,

          theta_xy1 = 0.52, //Angles
          theta_xy2 = 3.66,

          x1 = imagePos['wayFinder'][wayFinderLocation].x, //From wayFinder
          y1 = imagePos['wayFinder'][wayFinderLocation].y,

          corridorX1 = x1 + startPointdistanceToCorridor  * Math.cos(theta_xy1),
          corridorY1 = y1 + startPointdistanceToCorridor  * Math.sin(theta_xy1);

      //Put all calculated path together
      var points = [
        {x:x1, y: y1-151},
        {x:x1, y: y1-1},
        {x: x1, y: y1},
        {x: corridorX1, y: corridorY1}
      ];
      for(var i=0; i<imagePos.wayFinder[wayFinderLocation].facility[dest].route.points.length;i++) {
        points.push(imagePos.wayFinder[wayFinderLocation].facility[dest].route.points[i]);
      }
      if(dest === 'other-public-venue') {
        this.toPoints(points,1,0,context['2f']['guide'], canvas['2f']['guide'], 40, false, name);
        return;
      }
      context['2f']['guide'].save();

      //Line style
      context['2f']['guide'].shadowBlur=5;
      context['2f']['guide'].shadowColor='#555';
      context['2f']['guide'].shadowOffsetY = 5;
      context['2f']['guide'].strokeStyle = '#9e005d';
      context['2f']['guide'].lineWidth = 2.5;

      //animate them
      //this.toPoints( points,1,0);

      this.drawPoints(points, context['2f']['guide'], canvas['2f']['guide']);
      context['2f']['guide'].stroke();
      for(var i=0; i<imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow.length;i++) {
        this.drawArrow(imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow[i][0], imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow[i][1],context['2f']['guide']);
      }
      context['2f']['guide'].restore();
      this.fadeIn(canvas['2f']['guide']);
    }
    this.drawRouteGF = function(dest) {
      //Put all calculated path together
      var lineHeight = imagePos.wayFinder[wayFinderLocation].facility[dest].bubble.height,
          points = imagePos.wayFinder[wayFinderLocation].facility[dest].route.points,
          wayFinderPos = imagePos.wayFinder[wayFinderLocation].facility[dest].bubble;
      context['gf']['guide'].save();

      //Line style
      context['gf']['guide'].shadowBlur=5;
      context['gf']['guide'].shadowColor='#555';
      context['gf']['guide'].shadowOffsetY = 5;
      context['gf']['guide'].strokeStyle = '#9e005d';
      context['gf']['guide'].lineWidth = 2.5;

      //animate them
      this.toPoints( points,1,0, context['gf']['guide'], canvas['gf']['guide'], 50, true);

      //this.drawPoints(points, context['gf']['guide'], canvas['gf']['guide']);
      /*context['gf']['guide'].stroke();
      for(var i=0; i<imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow.length;i++) {
        this.drawArrow(imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow[i][0], imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow[i][1], context['gf']['guide']);
      }*/


      this.drawYouAreHereText();
      /*var self = this;
      this.newPlayingAniId.push(setTimeout(function(){
        self.changeTips(2);
      },2000));*/
      var doneOnload = (function () {
        var callCount = 0;
        return function () {
          callCount++;
          if (callCount > 1) {
            context['gf']['you-are-here-bubble'].drawImage(mapImages['you-are-here-bg'],        wayFinderPos.x - 2, wayFinderPos.y - lineHeight - 10, 150, 50);
            context['gf']['you-are-here-bubble'].drawImage(mapImages['you-are-here-pictogram'], wayFinderPos.x - 2, wayFinderPos.y - lineHeight - 10, 150, 50);
          }
        }
      })();

      mapImages['you-are-here-bg'].onloadCallback(doneOnload);
      mapImages['you-are-here-pictogram'].onloadCallback(doneOnload);


      context['gf']['guide'].restore();
      //this.fadeIn(canvas['gf']['guide']);
      this.fadeIn(canvas['gf']['you-are-here-text']);
      this.fadeIn(canvas['gf']['you-are-here-bubble']);
    }
    this.drawRoute6F = function(dest) {
      //Put all calculated path together
      var lineHeight = imagePos.wayFinder[wayFinderLocation].facility[dest].bubble.height,
          points = imagePos.wayFinder[wayFinderLocation].facility[dest].route.points,
          wayFinderPos = imagePos.wayFinder[wayFinderLocation].facility[dest].bubble;
      context['6f']['guide'].save();

      //Line style
      context['6f']['guide'].shadowBlur=5;
      context['6f']['guide'].shadowColor='#555';
      context['6f']['guide'].shadowOffsetY = 5;
      context['6f']['guide'].strokeStyle = '#9e005d';
      context['6f']['guide'].lineWidth = 2.5;

      //animate them
      //this.toPoints( points,1,0, context['6f']['guide'], canvas['6f']['guide'], 10);

      this.drawPoints(points, context['6f']['guide'], canvas['6f']['guide']);
      context['6f']['guide'].stroke();
      for(var i=0; i<imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow.length;i++) {
        this.drawArrow(imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow[i][0], imagePos.wayFinder[wayFinderLocation].facility[dest].route.arrow[i][1], context['6f']['guide']);
      }


      this.drawYouAreHereText();

      /*this.newPlayingAniId.push(setTimeout(function(){
        $('.tip-2').addClass('active');
      },500));*/
      var doneOnload = (function () {
        var callCount = 0;
        return function () {
          callCount++;
          if (callCount > 1) {
            context['6f']['you-are-here-bubble'].drawImage(mapImages['you-are-here-bg'],        wayFinderPos.x - 2, wayFinderPos.y - lineHeight - 10, 150, 50);
            context['6f']['you-are-here-bubble'].drawImage(mapImages['you-are-here-pictogram'], wayFinderPos.x - 2, wayFinderPos.y - lineHeight - 10, 150, 50);
          }
        }
      })();

      mapImages['you-are-here-bg'].onloadCallback(doneOnload);
      mapImages['you-are-here-pictogram'].onloadCallback(doneOnload);


      context['6f']['guide'].restore();
      //this.fadeIn(canvas['6f']['guide']);
      this.fadeIn(canvas['6f']['you-are-here-text']);
      this.fadeIn(canvas['6f']['you-are-here-bubble']);
    }
    this.fadeIn = function(canvas,curentAlpha){
      curentAlpha = curentAlpha || 0;

      if (curentAlpha>=1) {return;}
      canvas.style.opacity = curentAlpha;
      curentAlpha+=0.02;
      var self = this;
      this.newPlayingAniId.push(setTimeout(function(){
        self.fadeIn(canvas,curentAlpha);
      }, 10));
    };

    this.drawPoints = function(points, ctxt, cvs) {
      //this.clearCanvas(context['common']['lift-icon'], canvas['common']['lift-icon']);
      this.clearCanvas(context['common']['lift-arrow'], canvas['common']['lift-arrow']);
      this.clearCanvas(ctxt,cvs);
      ctxt.beginPath();
      ctxt.moveTo(points[0].x , points[0].y);

      //Draw previous lines
      for(var i = 0; i < points.length; i++) {
        ctxt.lineTo(points[i].x , points[i].y);
      }

    };

    this.drawArrow = function (previousPoint, currentPoint, ctxt) {
      var tx    = currentPoint.x - previousPoint.x,
          ty    = currentPoint.y - previousPoint.y,
          rad   = Math.atan2(ty,tx),

          //Draw the arrow
          theta_arrowR = rad -2.4,
          theta_arrowL = rad +2.4,
          arrowLeftLenght  = 6, //constant to create an arrow
          arrowRightLenght = 6;

      //Draw arrow
      ctxt.beginPath();
      ctxt.lineWidth = 1.5;
      ctxt.moveTo(currentPoint.x + arrowRightLenght * Math.cos(theta_arrowR),currentPoint.y+ arrowRightLenght * Math.sin(theta_arrowR));
      ctxt.lineTo(currentPoint.x,currentPoint.y);
      ctxt.lineTo(currentPoint.x + arrowLeftLenght * Math.cos(theta_arrowL),currentPoint.y + arrowLeftLenght * Math.sin(theta_arrowL));
      ctxt.stroke();
    };

    //Language changing
    this.changeLang = function (toLang) {
      this.redrawMapText(toLang);
      this.drawYouAreHereText();

      var $activeFacility = $('.active[data-anchor]');
      /*if ($activeFacility.attr('data-anchor') === 'other-public-venue') {
        canvasMap.drawOtherVenueTransition($activeFacility.attr('data-venue'));
      }*/
    }

    this.redrawMapIcons = function () {
      this.clearCanvas(context['2f']['map-icon'],canvas['2f']['map-icon']);
      this.clearCanvas(context['gf']['map-icon'],canvas['gf']['map-icon']);
      this.clearCanvas(context['6f']['map-icon'],canvas['6f']['map-icon']);
      this.drawMapIcons();
    }

    //Redraw it when switching languages
    this.redrawMapText = function (lang, shouldReset) {
      this.clearCanvas(context['2f']['map-text'],canvas['2f']['map-text']);
      this.clearCanvas(context['gf']['map-text'],canvas['gf']['map-text']);
      this.clearCanvas(context['6f']['map-text'],canvas['6f']['map-text']);
      this.clearCanvas(context['common']['map-text'],canvas['common']['map-text']);
      this.drawMapText('lift', lang);
      this.drawMapText('terrace', lang, shouldReset ? 0 : mapImages['terrace'].currentHeight);
      this.drawCommonMapText('track', lang);
    }

    this.drawMapText = function(type, lang, height) {
      var location = imagePos.wayFinder[wayFinderLocation].text[type];
      var image = mapImages[type][lang];
      if (typeof height !== 'undefined') {
        mapImages[type].currentHeight = height;
        context['2f']['map-text'].drawImage(image, location.x, location.y+height, image.width*2, image.height*2);
      } else {
        mapImages[type].currentHeight = 0;
        context['2f']['map-text'].drawImage(image, location.x, location.y, image.width*2, image.height*2);
      }
      if(type === 'lift') {
        context['gf']['map-text'].drawImage(image, location.x, location.y, image.width*2, image.height*2);
        context['6f']['map-text'].drawImage(image, location.x, location.y, image.width*2, image.height*2);
      }
    }
    this.drawCommonMapText = function(type, lang) {
      var location = imagePos.wayFinder[wayFinderLocation].text[type];
      var image = mapImages[type][lang];
      context['common']['map-text'].drawImage(image, location.x, location.y, image.width*2, image.height*2);
    }

    //for init
    this.drawMapIcons = function() {
      var self = this;
      mapImages['lift-icon'].onloadCallback(function(){
        self.drawMapIcon('2f', 'lift-icon');
        self.drawMapIcon('gf', 'lift-icon');
        self.drawMapIcon('6f', 'lift-icon');
      });
      mapImages['smoking-icon'].onloadCallback(function(){
        self.drawMapIcon('2f', 'smoking-icon');
      });
    }

    this.drawMapIcon = function(floor, type, dy) {
      var positions = {
        'lift-icon': [{ x: 783, y: 408 }, { x: 803, y: 396 }],
        'smoking-icon': { x: 828, y: 305 }
      }
      var mapImage = mapImages[type];
      var position = positions[type];

      dy = dy ? dy : 0;
      if (type === 'lift-icon') {
        context[floor]['map-icon'].drawImage(mapImage, position[0].x, position[0].y + dy);
        context[floor]['map-icon'].drawImage(mapImage, position[1].x, position[1].y + dy);
      } else {
        context[floor]['map-icon'].drawImage(mapImage, position.x, position.y + dy);
      }
    }

    //for init
    this.drawYouAreHereIcons = function() {
      var lineHeight = 190;
      var wayFinderPos = imagePos['wayFinder'][wayFinderLocation];
      var doneOnload = (function () {
        var callCount = 0;
        return function () {
          callCount++;
          if (callCount > 1) {
            context['2f']['you-are-here-bubble'].drawImage(mapImages['you-are-here-bg'],        wayFinderPos.x - 2, wayFinderPos.y - lineHeight - 10, 150, 50);
            context['2f']['you-are-here-bubble'].drawImage(mapImages['you-are-here-pictogram'], wayFinderPos.x - 2, wayFinderPos.y - lineHeight - 10, 150, 50);
          }
        }
      })();

      mapImages['you-are-here-bg'].onloadCallback(doneOnload);
      mapImages['you-are-here-pictogram'].onloadCallback(doneOnload);

      this.drawYouAreHereArrow();
    }
    this.clearGroundFloor = function(){
      this.clearCanvas(context['common']['lift-icon'], canvas['common']['lift-icon']);
      this.clearCanvas(context['common']['lift-arrow'], canvas['common']['lift-arrow']);
      this.clearCanvas(context['gf']['guide'], canvas['gf']['guide']);
      this.clearCanvas(context['gf']['block'], canvas['gf']['block']);
      //this.clearCanvas(context['gf']['map-text'], canvas['gf']['map-text']);
      this.clearCanvas(context['gf']['you-are-here-bubble'], canvas['gf']['you-are-here-bubble']);
      this.clearCanvas(context['gf']['you-are-here-text'], canvas['gf']['you-are-here-text']);

      this.clearCanvas(context['6f']['guide'], canvas['6f']['guide']);
      this.clearCanvas(context['6f']['block'], canvas['6f']['block']);
      this.clearCanvas(context['6f']['you-are-here-bubble'], canvas['6f']['you-are-here-bubble']);
      this.clearCanvas(context['6f']['you-are-here-text'], canvas['6f']['you-are-here-text']);
      this.changeTips(0);
      $('.lift-tunnel').removeClass('active').removeClass('fg').removeClass('f6');
      $('#map-layer-commonLiftArrow').removeClass('active');
      $('.sixth-floor-container').removeClass('active');
      $('.map-container').removeClass('f6-active').removeClass('f6-lift-active');

    }

    this.drawYouAreHereArrow = function(){
      var lineHeight = 190;
      var wayFinderPos = imagePos['wayFinder'][wayFinderLocation];

      context['2f']['guide'].beginPath();
      context['2f']['guide'].moveTo(wayFinderPos.x,wayFinderPos.y-151);
      context['2f']['guide'].lineTo(wayFinderPos.x,wayFinderPos.y);

      //Line Style
      context['2f']['guide'].shadowBlur=3;
      context['2f']['guide'].shadowColor='#555';
      context['2f']['guide'].shadowOffsetY = 5;
      context['2f']['guide'].strokeStyle = '#9e005d';
      context['2f']['guide'].lineWidth = 2.5;

      context['2f']['guide'].stroke();

      // clear the shadow
      context['2f']['guide'].shadowBlur = 0;
      context['2f']['guide'].shadowColor = 0;
      context['2f']['guide'].shadowOffsetY = 0;

      var wayFinderHead = (JSON.parse(JSON.stringify(wayFinderPos)));
      wayFinderHead.y -=100;
      this.drawArrow(wayFinderHead,wayFinderPos, context['2f']['guide']);
    }
    this.drawOtherVenueTransition = function(string) {
      var boothPos = imagePos['wayFinder'][wayFinderLocation].facility['other-public-venue'].bubble,
          height = 180;
      /*Line Style
      context['2f']['destination-bubble'].strokeStyle = '#063192';
      context['2f']['destination-bubble'].lineWidth = 2.5;

      route
      context['2f']['destination-bubble'].beginPath();
      context['2f']['destination-bubble'].moveTo(boothPos.x, boothPos.y+25 );
      context['2f']['destination-bubble'].lineTo(boothPos.x, boothPos.y+height );
      context['2f']['destination-bubble'].stroke();*/

      //Draw the Text
      context['2f']['destination-bubble'].fillStyle = 'white';
      context['2f']['destination-bubble'].font = '14px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
      var self = this;
      if (string === 'farrier-on-6') {
        //context['2f']['destination-bubble'].drawImage(mapImages['to-lift'], boothPos.x-4, boothPos.y+height-1, 190, 50);
        //context['2f']['destination-bubble'].fillText( translator('farrier-on-6-location').toUpperCase(), boothPos.x + 25, boothPos.y + height + 30);
        this.newPlayingAniId.push(setTimeout(function(){
          $('.lift-tunnel').addClass('active');
          $('#map-layer-commonLiftArrow').addClass('active');
          var goingDown = false;
          self.changeTips(3);
          self.drawLiftArrow(0,goingDown,string);
          self.newPlayingAniId.push(setTimeout(function(){
            $('.map-container').addClass('f6-lift-active');
            $('.lift-tunnel').removeClass('fg').addClass('f6');
            $('.second-floor-container').removeClass('active');
            $('.sixth-floor-container').addClass('active');
            $('.map-container').addClass('f6-active');
          },1200));
        },200));

      } else if (string === 'leading-edge') {
        //context['2f']['destination-bubble'].drawImage(mapImages['to-ground'], boothPos.x-4, boothPos.y+height-1, 190, 50);
        //context['2f']['destination-bubble'].fillText(textLines[i], boothPos.x + (hasTab? 18 : 10), startingHeight);

        var text           = translator('leading-edge-location').toUpperCase(),
            textLines      = text.split('\n'),
            tagCount       = (text.match(/\t/g) || []).length,
            lineheight     = (105 - tagCount * 15) / (textLines.length - tagCount),
            startingHeight = boothPos.y + height + 30 - lineheight;

        for (var i in textLines) {
          var hasTab = textLines[i][0]==='\t';

          startingHeight += (hasTab? 15:lineheight);
        }
        this.newPlayingAniId.push(setTimeout(function(){
          //$('.lift-tunnel').addClass('active');
          $('#map-layer-commonLiftArrow').addClass('active');
          var goingDown = true;
          self.changeTips(3);
          self.drawLiftArrow(0,goingDown,string);
          self.newPlayingAniId.push(setTimeout(function(){
            $('.second-floor-container').removeClass('active');
            $('.ground-floor-container').addClass('active');
            $('.map-container').addClass('gf-active');
            $('.lift-tunnel').removeClass('f6').addClass('fg');
            //self.newPlayingAniId.push(setTimeout(function(){
              $('.lift-tunnel').addClass('active');
              $('.map-container').addClass('gf-lift-active');
            //}),5000);
          },600));
        },200));
      }

      //this.dropIn(canvas['2f']['destination-bubble']);
    }

    this.dropIn = function (cvs, currentTop) {
      var self = this;

      if (currentTop >= 0) return;

      currentTop = currentTop || -50;

      cvs.style.top = currentTop;

      this.newPlayingAniId.push(setTimeout(function(){
        self.dropIn(cvs, currentTop + 1);
      }), 10);
    }

    //Redraw it when switching languages
    this.drawYouAreHereText = function() {
      var lineHeight = 190;
      var wayFinderPos = imagePos['wayFinder'][wayFinderLocation];
      this.clearCanvas(context['2f']['you-are-here-text'],canvas['2f']['you-are-here-text']);
      this.clearCanvas(context['gf']['you-are-here-text'],canvas['gf']['you-are-here-text']);
      this.clearCanvas(context['6f']['you-are-here-text'],canvas['6f']['you-are-here-text']);
      context['2f']['you-are-here-text'].fillStyle = 'white';
      context['2f']['you-are-here-text'].textAlign = 'center';
      context['gf']['you-are-here-text'].fillStyle = 'white';
      context['gf']['you-are-here-text'].textAlign = 'center';
      context['6f']['you-are-here-text'].fillStyle = 'white';
      context['6f']['you-are-here-text'].textAlign = 'center';

      if (lang === 'en') {
        context['2f']['you-are-here-text'].font = '12px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
        context['gf']['you-are-here-text'].font = '12px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
        context['6f']['you-are-here-text'].font = '12px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
      } else {
        context['2f']['you-are-here-text'].font = '16px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
        context['gf']['you-are-here-text'].font = '16px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
        context['6f']['you-are-here-text'].font = '16px AvenirNext,NotoSans-T-Chinese,NotoSans-S-Chinese';
      }


      context['2f']['you-are-here-text'].fillText( translator('you-are-here').toUpperCase(), wayFinderPos.x +85, wayFinderPos.y - lineHeight +20);
      var lineHeight = imagePos.wayFinder[wayFinderLocation].facility['other-public-venue-gf'].bubble.height,
          wayFinderPos = imagePos.wayFinder[wayFinderLocation].facility['other-public-venue-gf'].bubble;
      context['gf']['you-are-here-text'].fillText( translator('at-gf').toUpperCase(), wayFinderPos.x +85, wayFinderPos.y - lineHeight +20);

      lineHeight = imagePos.wayFinder[wayFinderLocation].facility['other-public-venue-6f'].bubble.height;
      wayFinderPos = imagePos.wayFinder[wayFinderLocation].facility['other-public-venue-6f'].bubble;
      context['6f']['you-are-here-text'].fillText( translator('at-6f').toUpperCase(), wayFinderPos.x +85, wayFinderPos.y - lineHeight +20);

    }

    this.init();
  }
  window.CanvasMap = CanvasMap;
})(window);
