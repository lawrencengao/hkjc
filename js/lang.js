;(function(window){
  /* == Translation == */
  function translator(key, lang) {
    lang = lang || window.lang;

    var langs = {
      'en': {
        'current-venue' : 'Current Venue',
        'f1-current-venue': 'farrier on 1',
        'other-public-venue' : 'Other Public Venues',

        'food-kiosk' : 'Food Kiosk',
        'female-toilet' : 'Female Toilet',
        'male-toilet' : 'Male Toilet',
        'disable-toilet' : 'Disabled Toilet',
        'customer-service-counter' : 'Customer Service Counter',
        'self-ticketing-kiosk' : 'Self-ticketing Kiosk',
        'self-vending-betting-terminal' : 'Self-vending Betting Terminal',
        'betting-counter' : 'Betting Counter',
        'internet-access-via-ipad' : 'Internet Services',
        '2f-terrace' : 'Terrace Seats',

        'direction-to-${}' : '<span>Direction to </span><span>${}</span>',
        'direction-to-other': 'Direction to other public venues',
        'location-${}': 'location : ${}',
        'you-are-here': 'You are here',
        'browsing-by-facilities': 'Browsing By Facilities',

        'leading-edge': 'LEADING EDGE',
        'leading-edge-description': 'Equipped with diversified equipment and serving various cuisines, the Leading Edge offers magnificent racing watching experience. Customers can pre-book in advance to the prime view of racings. With just right decorous complexity interior design, Leading Edge is equipped with more than 150 LED and more than 200 table TVs are broadcasting updates of various racings in real-time. Numbers of Race Course Ticketing Kiosks are offering betting assistance for racing fans.',
        'use-lift-to':'use life to',
        'farrier-on-6': 'farrier on 6',
        'farrier-on-6-description-1': 'Featuring large HDTVs and all-rounded betting facilities, the Public Betting Hall at Happy Valley Racecourse is a place for you to keep abreast with the latest update racing information and paddock happenings.',
        'farrier-on-6-description-2': 'The newly renovated Farrier on 6, located at 6/F Grandstand of Happy Valley Racecourse, includes 3 spacious spectator zones providing racing information and different seating that are of convenience to public racegoers. A giant 80” screen at entrance provides exciting racing updates while the balcony offers a sweeping view of the racecourse.',

        'sunny' :'Sunny',
        'cloudy' :'cloudy',
        'partly-cloudy' :'partly cloudy',
        'rainy' :'rainy',
        'stormy' :'stormy',
        'thunder' :'thunder',

        'farrier-on-6-location': 'access lift to 6/F',
        'leading-edge-location': 'ACCESS LIFT TO G/F',
        'at-gf':'AT G/F',
        'access-lift-to-gf':'ACCESS LIFT TO G/F',
        'access-lift-to-4f-5f':'ACCESS LIFT TO 4/F OR 5/F',
        'at-6f':'AT 6/F',
        'access-lift-to-6f':'ACCESS LIFT TO 6/F',

        'walk-to-lift': 'walk to lift',
        'exit-left-turn-left': 'Exit left, turn left',
        'continue-to-walk-on': 'continue to walk on',
        'go-to-lift-f26-f27':'go to lift f26, f27',
        'replay':'Replay'

      },
      'cht': {
        'current-venue' : '現場',
        'f1-current-venue': '一樓大堂',
        'other-public-venue' : '其他公眾場地',

        'food-kiosk' : '小食亭',
        'female-toilet' : '女洗手間',
        'male-toilet' : '男洗手間',
        'disable-toilet' : '殘疾人士洗手間',
        'customer-service-counter' : '客戶服務處',
        'self-ticketing-kiosk' : '入場購票易',
        'self-vending-betting-terminal' : '自助投注售票機',
        'betting-counter' : '投注櫃位',
        'internet-access-via-ipad' : '網上資訊服務',
        '2f-terrace' : '露台座位',
        'direction-to-other': '前往其他公共场地',
        'direction-to-${}': '前往${}',
        'leading-edge-description': '多元化設施，匯合各款中西美饌雜於一身；先駿廊能令你擁有全新的非凡觀賽體驗。客人可預訂座位，優先選擇心目中的最佳位置，俯瞰賽事實況。簡約設計的空間內裝置超過150部大型LED顯示屏幕及超過200部座台電視，播放最新賽事資訊。場內更增設多部自助售票機，為爭分奪秒的馬迷提供投注便利。',
        'leading-edge': '先駿廊',
        'farrier-on-6': '六樓大堂',
        'location-${}': '地點：${}',
        'farrier-on-6-description-1': '跑馬地馬場大看台投注大堂佔地廣闊，場內設有多部高清大電視，讓您參考即時賠率及沙圈動態，加上多元化投注設施，投注更得心應手。',
        'farrier-on-6-description-2': '六樓大堂全新裝修，特設三大觀賽專區，寬敞開揚。場內設有80 吋巨型電視屏幕，讓您時刻捕捉賽事走勢動態。觀景露台讓您居高臨下飽覽馬場景色，俯瞰衝線一刻。',

        'you-are-here': '您在此',
        'use-lift-to':'乘搭升降機至',
        'browsing-by-facilities':'請選擇設施',

        'sunny' :'晴朗',
        'cloudy' :'多雲',
        'partly-cloudy' :'有雲',
        'rainy' :'有雨',
        'stormy' :'暴雨',
        'thunder' :'雷暴',

        'farrier-on-6-location': '乘電梯到 6/F',
        'leading-edge-location': '乘電梯到 G/F',
        'at-gf':'在 G/F',
        'access-lift-to-gf':'乘電梯到 G/F',
        'access-lift-to-4f-5f':'乘電梯到 4/F 或 5/F',
        'at-6f':'在 6/F',
        'access-lift-to-6f':'乘電梯到 6/F',

        'walk-to-lift': '步行至電梯',
        'exit-left-turn-left': '左面出口，轉左',
        'continue-to-walk-on': '繼續向前走',
        'go-to-lift-f26-f27':'到達電梯 f26、f27',
        'replay':'重播'
      },
      'chs': {
        'current-venue' : '现场',
        'f1-current-venue': '一楼大堂',
        'other-public-venue' : '其他公众场地',

        'food-kiosk' : '小食亭',
        'female-toilet' : '女洗手间',
        'male-toilet' : '男洗手间',
        'disable-toilet' : '残疾人士洗手间',
        'customer-service-counter' : '客户服务处',
        'self-ticketing-kiosk' : '入场购票易',
        'self-vending-betting-terminal' : '自助投注售票机',
        'betting-counter' : '投注柜位',
        'internet-access-via-ipad' : '网上资讯服务',
        '2f-terrace' : '阳台座位',
        'direction-to-other': '前往其他公共场地',
        'direction-to-${}': '前往${}',
        'leading-edge-description': '多元化设施，汇合各款中西美馔杂于一身；先骏廊能令你拥有全新的非凡观赛体验。客人可预订座位，优先选择心目中的最佳位置，俯瞰赛事实况。简约设计的空间内装置超过150部大型LED显示屏幕及超过200部座台电视，播放最新赛事资讯。场内更增设多部自助售票机，为争分夺秒的马迷提供投注便利。',
        'leading-edge': '先骏廊',
        'farrier-on-6': '六楼大堂',
        'location-${}': '地点：${}',
        'farrier-on-6-description-1': '跑马地马场大看台投注大堂占地广阔，场内设有多部高清大电视，让您参考即时赔率及沙圈动态，加上多元化投注设施，投注更得心应手。',
        'farrier-on-6-description-2': '六楼大堂全新装修，特设三大观赛专区，宽敞开扬。场内设有80 吋巨型电视屏幕，让您时刻捕捉赛事走势动态。观景露台让您居高临下饱览马场景色，俯瞰冲线一刻。',

        'you-are-here':'你在这里',
        'use-lift-to':'请用升降机往',
        'browsing-by-facilities':'请选择设施',

        'sunny' :'晴朗',
        'cloudy' :'多云',
        'partly-cloudy' :'有云',
        'rainy' :'有雨',
        'stormy' :'暴雨',
        'thunder' :'雷暴',

        'farrier-on-6-location': '乘电梯到 6/F',
        'leading-edge-location': '乘电梯到 G/F',
        'at-gf':'在 G/F',
        'access-lift-to-gf':'乘电梯到 G/F',
        'access-lift-to-4f-5f':'乘电梯到 4/F 或 5/F',
        'at-6f':'在 6/F',
        'access-lift-to-6f':'乘电梯到 6/F',

        'walk-to-lift': '步行至电梯',
        'exit-left-turn-left': '左面出口，转左',
        'continue-to-walk-on': '继续向前走',
        'go-to-lift-f26-f27':'到达电梯 f26、f27',
        'replay':'重播'
      }
    };
    window.langs= langs;
    var translatedText = handlePlaceholder(key, lang) || langs[lang][key];
    return translatedText==undefined? key: translatedText;

    function handlePlaceholder (key, lang) {
      var placeholder = /\$\{(.*?)\}/g;
      var match = placeholder.exec(key);
      if (!match || !match[1]) {
        return undefined;
      }

      var hostString = langs[lang][key.replace(match[1], '')];
      if (!hostString) {
        return undefined;
      }
      return hostString.replace('${}', translator(match[1], lang));
    }
  }

  $('[data-lang]').on('click',function() {
    window.lang = $(this).attr('data-lang');
    $('[data-text]').each(function() {
      $(this).html( translator($(this).attr('data-text'),lang) );
    });
    canvasMap.changeLang(lang);
    $('[data-lift]').each(function() {
      if($(this).hasClass('active')) {
        var to = $(this).attr('data-lift');
        canvasMap.drawOtherVenueBubble(to);
      }
    });
    $('body').attr('data-displaying-lang', lang);
  });
  window.lang = 'cht';
  window.translator = translator;
})(window);
