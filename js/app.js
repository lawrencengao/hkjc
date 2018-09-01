;(function(window){
  'use strict';

  /* == Time and Weather == */
  $(function(){
    var divDate        = $('.info-now .date'),
        divDateOfWeek  = $('.info-now .day-of-week'),
        divCondition   = $('.info-now .info-text.condition'),
        divTemperature = $('.info-now .info-text.temperature'),
        divHumidity    = $('.info-now .info-text.humidity');

    var wayFinderLocation = (window.location.hash[1] || 1) |0;
    var floor = window.location.search.substring(1).toLowerCase() || '2f';

    //Update for first time
    updateDate();
    updateWeather();

    //Update frequently
    setInterval(updateDate, 500); //0.5s
    setInterval(updateWeather, 60000); //1mins

    //Datetime
    function updateDate() {
      var d = new Date(),
          dateString = d.format("dd/MM/yy"),
          daysOfWeek = {
            'en': [
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat'
            ],
            'cht': [
              '星期日',
              '星期一',
              '星期二',
              '星期三',
              '星期四',
              '星期五',
              '星期六'
            ],
            'chs': [
              '星期日',
              '星期一',
              '星期二',
              '星期三',
              '星期四',
              '星期五',
              '星期六'
            ]
          };

      divDate.text(dateString);
      divDateOfWeek.text(daysOfWeek[lang][d.getDay()]);
    }

    //Weather
    function updateWeather() {
      var weather ={
        'sunny': {
          text: 'sunny',
          img:'images/pictogram-weather/sunny.svg'
        },
        'clouds': {
          text: 'cloudy',
          img:'images/pictogram-weather/cloudy.svg'
        },
        'fog': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'mist': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'haze': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'clear': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'snow': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'smoke': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'sand': {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'dust':  {
          text: 'partly-cloudy',
          img:'images/pictogram-weather/partly-cloudy.svg'
        },
        'rain':{
          text: 'rainy',
          img:'images/pictogram-weather/rainy.svg'
        },
        'drizzle': {
          text: 'rainy',
          img:'images/pictogram-weather/rainy.svg'
        },
        'stormy': {
          text: 'stormy',
          img:'images/pictogram-weather/stormy.svg'
        },
        'thunderstorm': {
          text: 'thunder',
          img:'images/pictogram-weather/thunder.svg'
        }
      };

      $.get('http://api.openweathermap.org/data/2.5/weather?lat=22.274424&lon=114.180665&appid=0ab46e3b9fc2d8abf105389ef560dbaa')
        .done(function (data){
          var temperature = data.main.temp - 273.15,
              humidity = data.main.humidity,
              condition = data.weather[0].main.toLowerCase();

          if (weather[condition] == undefined) {
            condition = 'clouds';
          }

          $('.pictogram-weather.condition').css('background-image','url('+weather[condition].img+')');
          $('.info-text.condition').attr('data-text',weather[condition].text);
          divCondition.text(translator(weather[condition].text));
          divTemperature.text(Math.round(temperature));
          divHumidity.text(Math.round(humidity));
          $('.weather-info').show();
        }).fail(function(){
          $('.weather-info').hide();
        });
    }

    $('nav.side .venue li[data-trigger]').click(function () {
      if($(this).hasClass('active')) { return; }
      canvasMap.clearGroundFloor();
      $('.second-floor-container').addClass('active');
      $('.ground-floor-container').removeClass('active');
      $('.sixth-floor-container').removeClass('active');
      $('.map-container').removeClass('gf-active').removeClass('f1-active').removeClass('f6-active').removeClass('done');

      var venue = $(this).attr('data-trigger');

      $('.venue-photos').removeClass('active');
      $('.venue-photos').children().removeClass('active');
      $('.'+venue+'.venue-photos').addClass('active');

      $('nav.side .venue li[data-trigger]').removeClass('active');
      $(this).addClass('active');

      $('nav.locations .venue').removeClass('active')
        .filter('.' + venue).addClass('active');

      $('.guide-title').html(translator($(this).attr('data-title-text')));
      $('.guide-title').attr('data-text', $(this).attr('data-title-text'));

      $('.anchor').removeClass('active').removeClass('blur');
      canvasMap.clearDestination();
      canvasMap.redrawMapIcons();
    });

    var lastAnchorTriggerPid;
    $('.anchor').click(function(){
      if (lastAnchorTriggerPid) {
        clearTimeout(lastAnchorTriggerPid);
      }

      if($(this).hasClass('active')) {
        lastAnchorTriggerPid = setTimeout(clearPath, 180000); //3mins
        return;
      }
      canvasMap.clearGroundFloor();
      $('.anchor').removeClass('active').removeClass('blur');
      $(this).addClass('active');

      var venue = $(this).attr('data-anchor'),
          venueName = $(this).attr('data-venue')?$(this).attr('data-venue'):'';
      canvasMap.goTo(venue,venueName);

      $('.venue-photos').children().removeClass('active');
      $('.venue-photos').children('.' + venue).addClass('active');

      if (!$(this).is('[data-no-title]')) {
        var key = 'direction-to-${' + $(this).parent().children('[data-text]').attr('data-text') + '}';
        $('.guide-title')
          .html(translator(key))
          .attr('data-text', key);
      }

      if(venue === 'other-public-venue') {
        $('.other-venue .anchor:not(.active)').addClass('blur');
        var key = 'direction-to-${' + $(this).attr('data-title-text') + '}';
        $('.guide-title')
          .html(translator(key))
          .attr('data-text', key);
      }

      lastAnchorTriggerPid = setTimeout(clearPath, 180000); //3mins
    })

    $('.tip-replay').on('click',function(){
      if (lastAnchorTriggerPid) {
        clearTimeout(lastAnchorTriggerPid);
      }
      canvasMap.clearGroundFloor();

      var venue = $('.anchor.active').attr('data-anchor'),
          venueName = $('.anchor.active').attr('data-venue')?$('.anchor.active').attr('data-venue'):'';
      canvasMap.goTo(venue,venueName);

      if (!$('.anchor.active').is('[data-no-title]')) {
        var key = 'direction-to-${' + $('.anchor.active').parent().children('[data-text]').attr('data-text') + '}';
        $('.guide-title')
          .html(translator(key))
          .attr('data-text', key);
      }

      if(venue === 'other-public-venue') {
        $('.other-venue .anchor:not(.active)').addClass('blur');
        var key = 'direction-to-${' + $('.anchor.active').attr('data-title-text') + '}';
        $('.guide-title')
          .html(translator(key))
          .attr('data-text', key);
      }

      lastAnchorTriggerPid = setTimeout(clearPath, 180000); //3mins
    });

    $('li[data-lang]').click(function () {
      $(this).addClass('active');
      $('li[data-lang]').not(this).removeClass('active');
    });


    if (window.location.search) {
      $('body').on('contextmenu', function(e){
        e.preventDefault();
        $(e.target).click();
        return false;
      });
    }


    function clearPath () {
      canvasMap.clearDestination();
      $('.anchor').removeClass('active').removeClass('blur');
    }

    window.canvasMap = new CanvasMap();

    $('body').addClass(floor === '1f' ? 'f1' : 'f2');
    $('[data-trigger=current-venue]').click();
    $('[data-lang="cht"]').click();
  });
})(window);
