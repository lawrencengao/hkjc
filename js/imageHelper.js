;(function(window){
  /* == Image Path == */
  var imageHelper = function() {

    this.canvas = {
      'common' :{
        'map-text'                : $('#map-layer-commonMapText')[0],
        'lift-icon'               : $('#map-layer-commonLiftIcon')[0],
        'lift-arrow'              : $('#map-layer-commonLiftArrow')[0]
      },
      '2f' :{
        'map-icon'                : $('#map-layer-mapIcons')[0],
        'map-text'                : $('#map-layer-mapText')[0],
        'guide'                   : $('#map-layer-guide')[0],
        'block'                   : $('#map-layer-block')[0],
        'stair'                   : $('#map-layer-stair')[0],
        'you-are-here-bubble'     : $('#map-layer-you-are-here')[0],
        'you-are-here-text'       : $('#map-layer-you-are-here-text')[0],
        'destination-bubble'      : $('#map-layer-dest-bubble')[0]
      },
      'gf' :{
        'map-icon'                : $('#map-layer-mapIcons-gf')[0],
        'map-text'                : $('#map-layer-mapText-gf')[0],
        'guide'                   : $('#map-layer-guide-gf')[0],
        'block'                   : $('#map-layer-block-gf')[0],
        'you-are-here-bubble'     : $('#map-layer-you-are-here-gf')[0],
        'you-are-here-text'       : $('#map-layer-you-are-here-text-gf')[0]
      },
      '6f' :{
        'map-icon'                : $('#map-layer-mapIcons-6f')[0],
        'map-text'                : $('#map-layer-mapText-6f')[0],
        'guide'                   : $('#map-layer-guide-6f')[0],
        'block'                   : $('#map-layer-block-6f')[0],
        'you-are-here-bubble'     : $('#map-layer-you-are-here-6f')[0],
        'you-are-here-text'       : $('#map-layer-you-are-here-text-6f')[0]
      }
    };

    this.context = {
      'common' : {
        'map-text'                : this.canvas['common']['map-text'].getContext('2d'),
        'lift-icon'               : this.canvas['common']['lift-icon'].getContext('2d'),
        'lift-arrow'              : this.canvas['common']['lift-arrow'].getContext('2d'),
      },
      '2f' : {
        'map-icon'                : this.canvas['2f']['map-icon'].getContext('2d'),
        'map-text'                : this.canvas['2f']['map-text'].getContext('2d'),
        'guide'                   : this.canvas['2f']['guide'].getContext('2d'),
        'block'                   : this.canvas['2f']['block'].getContext('2d'),
        'stair'                   : this.canvas['2f']['stair'].getContext('2d'),
        'you-are-here-bubble'     : this.canvas['2f']['you-are-here-bubble'].getContext('2d'),
        'you-are-here-text'       : this.canvas['2f']['you-are-here-text'].getContext('2d'),
        'destination-bubble'      : this.canvas['2f']['destination-bubble'].getContext('2d'),
      },
      'gf' : {
        'map-icon'                : this.canvas['gf']['map-icon'].getContext('2d'),
        'map-text'                : this.canvas['gf']['map-text'].getContext('2d'),
        'guide'                   : this.canvas['gf']['guide'].getContext('2d'),
        'block'                   : this.canvas['gf']['block'].getContext('2d'),
        'you-are-here-bubble'     : this.canvas['gf']['you-are-here-bubble'].getContext('2d'),
        'you-are-here-text'       : this.canvas['gf']['you-are-here-text'].getContext('2d'),
      },
      '6f' : {
        'map-icon'                : this.canvas['6f']['map-icon'].getContext('2d'),
        'map-text'                : this.canvas['6f']['map-text'].getContext('2d'),
        'guide'                   : this.canvas['6f']['guide'].getContext('2d'),
        'block'                   : this.canvas['6f']['block'].getContext('2d'),
        'you-are-here-bubble'     : this.canvas['6f']['you-are-here-bubble'].getContext('2d'),
        'you-are-here-text'       : this.canvas['6f']['you-are-here-text'].getContext('2d')
      }
    };



    this.createImage = function(src) {
      var img   = new Image();
      img.src   = src;
      img.loaded = false;

      img.callback = function () {};
      img.onloadCallback = function (callback) {
        this.callback = callback;

        if (this.isLoaded) {
          this.callback();
        }
      };
      img.onload = function () {
        img.isLoaded = true;
        this.callback();
      };
      return img;
    };

    //Images paths
    this.images = {
      'lift' :{
        'en'                            : this.createImage('images/map-icon/lift-letter-en.svg'),
        'cht'                           : this.createImage('images/map-icon/lift-letter-cht.svg'),
        'chs'                           : this.createImage('images/map-icon/lift-letter-chs.svg'),
      },

      'terrace' :{
        'en'                            : this.createImage('images/map-icon/terrace-en.svg'),
        'cht'                           : this.createImage('images/map-icon/terrace-cht.svg'),
        'chs'                           : this.createImage('images/map-icon/terrace-chs.svg'),
      },

      'track' :{
        'en'                            : this.createImage('images/map-icon/track-en.svg'),
        'cht'                           : this.createImage('images/map-icon/track-cht.svg'),
        'chs'                           : this.createImage('images/map-icon/track-chs.svg'),
      },

      'pictogram': {
        'food-kiosk'                    : this.createImage('images/pictogram/food_kiosk_white.svg'),
        'female-toilet'                 : this.createImage('images/pictogram/female_toilet_white.svg'),
        'male-toilet'                   : this.createImage('images/pictogram/male_toilet_white.svg'),
        'disable-toilet'                : this.createImage('images/pictogram/disable_toilet_white.svg'),
        'customer-service-counter'      : this.createImage('images/pictogram/customer_service_white.svg'),
        'self-ticketing-kiosk'          : this.createImage('images/pictogram/st_white.svg'),
        'self-vending-betting-terminal' : this.createImage('images/pictogram/sv_white.svg'),
        'betting-counter'               : this.createImage('images/pictogram/betting_counter_white.svg'),
        'internet-access-via-ipad'      : this.createImage('images/pictogram/wifi_white.svg'),
        '2f-terrace'                    : this.createImage('images/pictogram/terrace_white.svg'),
      },

      'venue-photo': {
        'food-kiosk'                    : this.createImage('images/pictogram/food_kiosk_white.svg'),
      },

      'lift-icon'                       : this.createImage('images/map-icon/lift-pictogram.svg'),
      'smoking-icon'                    : this.createImage('images/map-icon/free-smoking-area-pictogram.svg'),

      'you-are-here-bg'                 : this.createImage('images/map-icon/you-are-here-bg.png'),
      'you-are-here-pictogram'          : this.createImage('images/map-icon/you-are-here-pictogram.svg'),

      'destination-bubble'              : this.createImage('images/destination-icon.png'),

      'food-kiosk'                      : this.createImage('images/map/m1.png'),
      'female-toilet'                   : this.createImage('images/map/m2.png'),
      'male-toilet'                     : this.createImage('images/map/m3.png'),
      'disable-toilet'                  : this.createImage('images/map/m4.png'),
      'customer-service-counter'        : this.createImage('images/map/m5.png'),
      'self-ticketing-kiosk'            : this.createImage('images/map/m6.png'),
      'self-vending-betting-terminal'   : this.createImage('images/map/m7.png'),
      'betting-counter'                 : this.createImage('images/map/m8.png'),
      'internet-access-via-ipad'        : this.createImage('images/map/m9.png'),
      '2f-terrace'                      : this.createImage('images/map/m10.png'),

      'stairarm'                        : this.createImage('images/map/stairarm.png'),

      'other-public-venue'              : this.createImage('images/map/m-other-public-venue.png'),
      'other-public-venue-leading-edge' : this.createImage('images/map/m-other-public-venue-leading-edge.png'),
      'other-public-venue-gf'           : this.createImage('images/map/m-other-public-venue-gf.png'),

      'to-lift'                         : this.createImage('images/map-icon/to-lift.png'),
      'to-ground'                       : this.createImage('images/map-icon/to-lift.png')
    };

    this.imagePos = {
      'wayFinder': {
        1 :{
          x:817,
          y:342,
          text :{
            'lift'      :{ x:1600,  y:800 },
            'terrace'   :{ x:970,   y:937 },
            'track'     :{ x:770,   y:590 },
          },
          facility :{
            'betting-counter': {
                bubble  :{ x:587,   y:520,  height:270 },
                route   :{
                          points: [
                            { x:560,  y:509 },
                            { x:571,  y:515 }
                          ],
                          arrow:[
                            [
                              { x:560,  y:509 },
                              { x:571,  y:515 }
                            ]
                          ]
                        }
            },
            'food-kiosk': {
                bubble  :{ x:712,  y:444,  height:170 },
                route   :{
                          points: [
                            { x:680 + (12.3 * Math.cos(3.66)),  y:455 + (12.3 * Math.sin(3.66)) },
                            { x:680,  y:455 }
                          ],

                          arrow: [
                            [
                              { x:680 + (12.3 * Math.cos(3.66)),  y:455 + (12.3 * Math.sin(3.66)) },
                              { x:680, y:455 }
                            ]
                          ]
                        }
            },
            'female-toilet':  {
                bubble  :{ x:902,   y:344,  height:70 },
                route   :{
                          points: [
                            { x:859 + (12.3 * Math.cos(3.66)),  y:352 + (12.3 * Math.sin(3.66)) },
                            { x:859,  y:352 }
                          ],

                          arrow: [
                            [
                              { x:859 + (12.3 * Math.cos(3.66)),  y:352 + (12.3 * Math.sin(3.66)) },
                              { x:859,  y:352 }
                            ]
                          ]
                        }
            },
            'male-toilet':  {
                bubble  :{ x:946,   y:324,  height:50 },
                route   :{
                          points: [
                            { x:817 + (28 * Math.cos(0.52)),  y:342 + (28 * Math.sin(0.52))  },
                            { x:940 + (9.3 * Math.cos(3.66)), y:310 + (9.3 * Math.sin(3.66)) },
                            { x:940,  y:310 }
                          ],

                          arrow: [
                            [
                              { x:940 + (12.3 * Math.cos(3.66)),  y:310 + (12.3 * Math.sin(3.66)) },
                              { x:940,  y:310 }
                            ]
                          ]
                        }
            },
            'disable-toilet': {
                bubble  :{ x:498,   y:580,  height:180 },
                route   :{
                          points: [
                            { x:477 + (19.3 * Math.cos(3.66)),  y:577 + (19.3 * Math.sin(3.66))},
                            { x:477,  y:577 }
                          ],

                          arrow: [
                            [
                              { x:477 + Math.cos(3.66), y:577 + Math.sin(3.66) },
                              { x:477,  y:577 }
                            ]
                          ]
                        }
            },
            'customer-service-counter':  {
                bubble  :{ x:534,   y:547,  height:180 },
                route   :{
                          points: [
                            { x:514 + (13.3 * Math.cos(3.66)),  y:550 + (13.3 * Math.sin(3.66)) },
                            { x:514,  y:550 }
                          ],

                          arrow: [
                            [
                              { x:514 + Math.cos(3.66), y:550 + Math.sin(3.66) },
                              { x:514,  y:550 }
                            ]
                          ]
                        }
            },
            'self-ticketing-kiosk':  {
                bubble  :{ x:810,   y:377,  height:270 },
                route   :{
                          points: [
                            { x:795,  y:378 },
                            { x:804,  y:382 }
                          ],
                          arrow:[
                            [
                              { x:795,  y:378 },
                              { x:804,  y:382 }
                            ]
                          ]
                        }
            },
            'self-vending-betting-terminal':  {
                bubble  :{ x:775,   y:368,  height:220 },
                route   :{
                          points: [
                            { x:808,  y:371 },
                            { x:808 + 10 * Math.cos(3.66),  y:371 + 10 * Math.sin(3.66) },
                            { x:808,  y:371 },
                            { x:760,  y:401 },
                            { x:760 + 10 * Math.cos(3.66),  y:401 + 10 * Math.sin(3.66) },
                          ],

                          arrow: [
                            [
                              { x:808,  y:371 },
                              { x:808 + 10 * Math.cos(3.66),  y:371 + 10 * Math.sin(3.66) }
                            ],
                            [
                              { x:760,  y:401 },
                              { x:760 + 10 * Math.cos(3.66),  y:401 + 10 * Math.sin(3.66) },
                            ]
                          ]
                        }
            },
            'internet-access-via-ipad': {
                bubble  :{ x:463,   y:544,  height:230 },
                route   :{
                          points: [
                            { x:839,  y:355 },
                            { x:478,  y:561 },
                            { x:470,  y:554 },
                            { x:478,  y:561 },
                            { x:515,  y:540 },
                            { x:507,  y:533 },
                          ],
                          arrow:[
                            [
                              { x:478,  y:561 },
                              { x:470,  y:554 }
                            ],
                            [
                              { x:515,  y:540 },
                              { x:507,  y:533 }
                            ]
                          ]
                        }
            },
            '2f-terrace':  {
                bubble  :{ x:740,   y:373,  height:230 },
                route   :{
                          points: [
                            { x:770,  y:395 },
                            { x:770 + 10 * Math.cos(3.66),  y:395 + 10 * Math.sin(3.66) },
                            { x:770,  y:395 },
                            { x:850,  y:345 },
                            { x:850 + 10 * Math.cos(3.66),  y:345 + 10 * Math.sin(3.66) }
                          ],

                          arrow: [
                            [
                              { x:770,  y:395},
                              { x:770 + 10 * Math.cos(3.66),  y:395 + 10 * Math.sin(3.66) },
                            ],
                            [
                              { x:850, y:345},
                              { x:850 + 10 * Math.cos(3.66),   y:345 + 10 * Math.sin(3.66) }
                            ]
                          ]
                        }
            },
            'other-public-venue':  {
                bubble  :{ x:790,   y:400,  height:300 },
                route   :{
                          points: [
                            { x:771,  y:392 },
                            { x:778,  y:397 }
                          ],
                          arrow:[
                            [
                              { x:771, y:392 },
                              { x:778, y:397 }
                            ]
                          ]
                        }
            },
            'other-public-venue-gf':  {
                bubble  :{ x:796,   y:395,  height:200 },
                route   :{
                          points: [
                            { x:796,  y:234 },
                            { x:796,  y:395 },
                            { x:780,  y:385 },
                            { x:705,  y:428 },
                            { x:712,  y:433 },
                            { x:665,  y:460 },

                            { x:614,  y:430 },
                            { x:585,  y:447 },
                            { x:591,  y:451 },
                            { x:585,  y:456 },
                            { x:631,  y:484 },

                            { x:252,  y:705 },
                            { x:263,  y:710 },
                            { x:248,  y:718 },
                            { x:291,  y:743 },
                            { x:258,  y:765 },
                            { x:249,  y:759 }
                          ],
                          arrow:[
                            [
                              { x:258,  y:765 },
                              { x:249,  y:759 }
                            ]
                          ]
                        }
            },
            'other-public-venue-6f':  {
                bubble  :{ x:796,   y:395,  height:200 },
                route   :{
                          points: [
                            { x:796,  y:234 },
                            { x:796,  y:395 }
                          ],
                          arrow:[
                            [
                              { x:796,  y:195 },
                              { x:796,  y:395 }
                            ]
                          ]
                        }
            }
          }
        },
        2: {
          x:546,
          y:499,
          text: {
            'lift'      :{ x:1600,  y:800  },
            'terrace'   :{ x:755,   y:1063 },
            'track'     :{ x:770,   y:590  },
          },
          facility: {
            'betting-counter': {
                bubble  :{ x:587,   y:520,  height:270 },
                route   :{
                          points: [
                            { x:571,  y:513 }
                          ],
                          arrow:[
                            [
                              { x:560,  y:509 },
                              { x:571,  y:513 }
                            ]
                          ]
                        }
            },
            'food-kiosk': {
                bubble  :{ x:712,   y:444,  height:170 },
                route   :{
                          points: [
                            { x:682,  y:443 },
                            { x:687,  y:446 }
                          ],
                          arrow:[
                            [
                              { x:682,  y:443 },
                              { x:687,  y:446 }
                            ]
                          ]
                        }
            },
            'female-toilet':  {
                bubble  :{ x:556,   y:563,  height:110 },
                route   :{
                          points: [
                            { x:488,  y:555 },
                            { x:510,  y:568 }
                          ],
                          arrow:[
                            [
                              { x:488,  y:555 },
                              { x:510,  y:568 }
                            ]
                          ]
                        }
            },
            'male-toilet':  {
                bubble  :{ x:645,   y:515,  height:80 },
                route   :{
                          points: [
                            { x:623,  y:478 },
                            { x:634,  y:485 }
                          ],
                          arrow:[
                            [
                              { x:623,  y:478 },
                              { x:634,  y:485 }
                            ]
                          ]
                        }
            },
            'disable-toilet': {
                bubble  :{ x:498,   y:580,  height:180 },
                route   :{
                          points: [
                            { x:476,  y:562 },
                            { x:485,  y:569 }
                          ],
                          arrow:[
                            [
                              { x:476,  y:562 },
                              { x:485,  y:569 }
                            ]
                          ]
                        }
            },
            'customer-service-counter':  {
                bubble  :{ x:534,   y:547,  height: 260 },
                route   :{
                          points: [
                            { x:512,  y:540 },
                            { x:521,  y:545 }
                          ],
                          arrow:[
                            [
                              { x:512,  y:540 },
                              { x:521,  y:545 }
                            ]
                          ]
                        }
            },
            'self-ticketing-kiosk':  {
                bubble  :{ x:810,   y:377,  height:180 },
                route   :{
                          points: [
                            { x:795,  y:378 },
                            { x:802,  y:381 }
                          ],
                          arrow:[
                            [
                              { x:795,  y:378 },
                              { x:804,  y:382 }
                            ]
                          ]
                        }
            },
            'self-vending-betting-terminal':  {
                bubble  :{ x:632,   y:448,  height:220 },
                route   :{
                          points: [
                            { x:717,  y:424 },
                            { x:707,  y:419 },
                            { x:717,  y:424 },
                            { x:633,  y:472 },
                            { x:624,  y:468 },
                            { x:633,  y:472 },
                            { x:623,  y:478 },
                            { x:632,  y:483 }
                          ],

                          arrow: [
                              [
                                { x:717,  y:424 },
                                { x:707,  y:419 }
                              ],
                              [
                                { x:633,  y:472 },
                                { x:624,  y:468 }
                              ],
                              [
                                { x:623,  y:478 },
                                { x:632,  y:483 }
                              ]
                          ]
                        }
            },
            'internet-access-via-ipad': {
                bubble  :{ x:463,   y:544,  height:230 },
                route   :{
                          points: [
                            { x:478,  y:561 },
                            { x:470,  y:554 },
                            { x:478,  y:561 },
                            { x:515,  y:540 },
                            { x:507,  y:533 },
                          ],
                          arrow:[
                            [
                              { x:478,  y:561 },
                              { x:470,  y:554 }
                            ],
                            [
                              { x:515,  y:540 },
                              { x:507,  y:533 }
                            ]
                          ]
                        }
            },
            '2f-terrace':  {
                bubble  :{ x:490,   y:515,  height:230 },
                route   :{
                          points: [
                            { x:444,  y:580 },
                            { x:435,  y:574 },
                            { x:444,  y:580 },
                            { x:499,  y:548 },
                            { x:490,  y:543 },
                            { x:499,  y:548 },
                            { x:538,  y:526 },
                            { x:530,  y:522 },
                            { x:538,  y:526 },
                            { x:660,  y:457 },
                            { x:652,  y:452 },
                            { x:660,  y:457 },
                            { x:619,  y:480 },
                            { x:610,  y:474 }
                          ],
                          arrow:[
                            [
                              { x:444,  y:580 },
                              { x:435,  y:574 }
                            ],
                            [
                              { x:499,  y:548 },
                              { x:490,  y:543 }
                            ],
                            [
                              { x:538,  y:526 },
                              { x:530,  y:522 }
                            ],
                            [
                              { x:660,  y:457 },
                              { x:652,  y:452 }
                            ],
                            [
                              { x:619,  y:480 },
                              { x:610,  y:474 }
                            ]
                          ]
                        }
            },
            'other-public-venue':  {
                bubble  :{ x:790,   y:400,  height:300 },
                route   :{
                          points: [
                            { x:771,  y:392 },
                            { x:778,  y:397 }
                          ],
                          arrow:[
                            [
                              { x:771,  y:392 },
                              { x:778,  y:397 }
                            ]
                          ]
                        }
            },
            'other-public-venue-gf':  {
                bubble  :{ x:796,   y:395,  height:200 },
                route   :{
                          points: [
                            { x:796,  y:234 },
                            { x:796,  y:395 },
                            { x:780,  y:385 },
                            { x:705,  y:428 },
                            { x:712,  y:433 },
                            { x:665,  y:460 },

                            { x:614,  y:430 },
                            { x:585,  y:447 },
                            { x:591,  y:451 },
                            { x:585,  y:456 },
                            { x:631,  y:484 },

                            { x:252,  y:705 },
                            { x:263,  y:710 },
                            { x:248,  y:718 },
                            { x:291,  y:743 },
                            { x:258,  y:765 },
                            { x:249,  y:759 }
                          ],
                          arrow:[
                            [
                              { x:258,  y:765 },
                              { x:249,  y:759 }
                            ]
                          ]
                        }
            },
            'other-public-venue-6f':  {
                bubble  :{ x:796,   y:395,  height:200 },
                route   :{
                          points: [
                            { x:796,  y:234 },
                            { x:796,  y:395 }
                          ],
                          arrow:[
                            [
                              { x:796,  y:195 },
                              { x:796,  y:395 }
                            ]
                          ]
                        }
            }
          }
        },
        3: {
          x:241,
          y:674,
          text: {
            'lift'      :{ x:1600,  y:800 },
            'terrace'   :{ x:970,   y:937 },
            'track'     :{ x:770,   y:590 },
          },
          facility: {
            'betting-counter': {
                bubble  :{ x:587,   y:520,  height:270 },
                route   :{
                          points: [
                            { x:560,  y:509 },
                            { x:571,  y:515 }
                          ],
                          arrow:[
                            [
                              { x:560,  y:509 },
                              { x:571,  y:515 }
                            ]
                          ]
                        }
            },
            'food-kiosk': {
                bubble  :{ x:268,   y:694,  height:310 },
                route   :{
                          points: [
                            { x:260,  y:686 }
                          ],
                          arrow:[
                            [
                              { x:241,  y:674 },
                              { x:260,  y:686 }
                            ]
                          ]
                        }
            },
            'female-toilet':  {
                bubble  :{ x:412,   y:644,  height:290 },
                route   :{
                          points: [
                            { x:381,  y:616 },
                            { x:397,  y:626 }
                          ],
                          arrow:[
                            [
                              { x:384,  y:620 },
                              { x:397,  y:626 }
                            ]
                          ]
                        }
            },
            'male-toilet':  {
                bubble  :{ x:465,   y:608,  height:250 },
                route   :{
                          points: [
                            { x:430,  y:586 },
                            { x:446,  y:595 }
                          ],
                          arrow:[
                            [
                              { x:430,  y:586 },
                              { x:446,  y:595 }
                            ]
                          ]
                        }
            },
            'disable-toilet': {
                bubble  :{ x:498,   y:580,  height:180 },
                route   :{
                          points: [
                            { x:476,  y:562 },
                            { x:485,  y:569 }
                          ],
                          arrow:[
                            [
                              { x:476,  y:562 },
                              { x:485,  y:569 }
                            ]
                          ]
                        }
            },
            'customer-service-counter':  {
                bubble  :{ x:534,   y:547,  height:160 },
                route   :{
                          points: [
                            { x:512,  y:540 },
                            { x:521,  y:545 }
                          ],
                          arrow:[
                            [
                              { x:512,  y:540 },
                              { x:521,  y:545 }
                            ]
                          ]
                        }
            },
            'self-ticketing-kiosk':  {
                bubble  :{ x:810,   y:377,  height:180 },
                route   :{
                          points: [
                            { x:796,  y:377 },
                            { x:802,  y:381 }
                          ],
                          arrow:[
                            [
                              { x:795,  y:378 },
                              { x:804,  y:382 }
                            ]
                          ]
                        }
            },
            'self-vending-betting-terminal':  {
                bubble  :{ x:217,   y:686,  height:320 },
                route   :{
                          points: [
                            { x:440,  y:582 },
                            { x:453,  y:590 },
                            { x:440,  y:582 },
                            { x:285,  y:671 },
                            { x:299,  y:680 },
                            { x:285,  y:671 },
                            { x:275,  y:677 },
                            { x:262,  y:670 },
                            { x:275,  y:677 },
                            { x:261,  y:685 },
                            { x:267,  y:688 },
                            { x:227,  y:712 },
                            { x:217,  y:706 },
                            { x:189,  y:722 },
                            { x:180,  y:717 },
                            { x:189,  y:722 },
                            { x:153,  y:744 },
                            { x:144,  y:738 }
                          ],

                          arrow: [
                            [
                              { x:440,  y:582 },
                              { x:453,  y:590 }
                            ],
                            [
                              { x:285,  y:671 },
                              { x:299,  y:680 }
                            ],
                            [
                              { x:275,  y:677 },
                              { x:262,  y:670 }
                            ],
                            [
                              { x:189,  y:722 },
                              { x:180,  y:717 }
                            ],
                            [
                              { x:153,  y:744 },
                              { x:144,  y:738 }
                            ]
                          ]
                        }
            },
            'internet-access-via-ipad': {
                bubble  :{ x:463,   y:544,  height:230 },
                route   :{
                          points: [
                            { x:263,  y:687 },
                            { x:478,  y:561 },
                            { x:470,  y:554 },
                            { x:478,  y:561 },
                            { x:515,  y:540 },
                            { x:507,  y:533 },
                          ],
                          arrow:[
                            [
                              { x:478,  y:561 },
                              { x:470,  y:554 }
                            ],
                            [
                              { x:515,  y:540 },
                              { x:507,  y:533 }
                            ]
                          ]
                        }
            },
            '2f-terrace':  {
                bubble  :{ x:217,   y:686,  height:300 },
                route   :{
                          points: [
                            { x:267,  y:688 },
                            { x:286,  y:676 },
                            { x:276,  y:671 },
                            { x:286,  y:676 },
                            { x:267,  y:688 },
                            { x:227,  y:712 },
                            { x:217,  y:706 },
                            { x:214,  y:708 },
                            { x:205,  y:703 },
                            { x:214,  y:708 },
                            { x:170,  y:735 },
                            { x:162,  y:730 }
                          ],
                          arrow:[
                            [
                              { x:286,  y:676 },
                              { x:276,  y:671 }
                            ],
                            [
                              { x:214,  y:708 },
                              { x:205,  y:703 }
                            ],
                            [
                              { x:170,  y:735 },
                              { x:162,  y:730 }
                            ]
                          ]
                        }
            },
            'other-public-venue':  {
                bubble  :{ x:790,   y:400,  height:300 },
                route   :{
                          points: [
                            { x:771,  y:392 },
                            { x:778,  y:397 }
                          ],
                          arrow:[
                            [
                              { x:771,  y:392 },
                              { x:778,  y:397 }
                            ]
                          ]
                        }
            },
            'other-public-venue-gf':  {
                bubble  :{ x:796,   y:395,  height:200 },
                route   :{
                          points: [
                            { x:796,  y:234 },
                            { x:796,  y:395 },
                            { x:780,  y:385 },
                            { x:705,  y:428 },
                            { x:712,  y:433 },
                            { x:665,  y:460 },

                            { x:614,  y:430 },
                            { x:585,  y:447 },
                            { x:591,  y:451 },
                            { x:585,  y:456 },
                            { x:631,  y:484 },

                            { x:252,  y:705 },
                            { x:263,  y:710 },
                            { x:248,  y:718 },
                            { x:291,  y:743 },
                            { x:258,  y:765 },
                            { x:249,  y:759 }
                          ],
                          arrow:[
                            [
                              { x:258,  y:765 },
                              { x:249,  y:759 }
                            ]
                          ]
                        }
            },
            'other-public-venue-6f':  {
                bubble  :{ x:796,   y:395,  height:200 },
                route   :{
                          points: [
                            { x:796,  y:234 },
                            { x:796,  y:395 }
                          ],
                          arrow:[
                            [
                              { x:796,  y:195 },
                              { x:796,  y:395 }
                            ]
                          ]
                        }
            }
          }
        }
      }
    };

    this.getImagePath = function() {
      return this.images;
    }
    this.getImagePosition = function() {
      return this.imagePos;
    }
    this.getCanvas = function() {
      return this.canvas;
    }
    this.getContext = function() {
      return this.context;
    }
  }

  window.imageHelper = imageHelper;
})(window);
