tableViz = function(elm, data) {
  $(document).ready(function() {
    var $overallPage = $('.view_count_overall');
    var $bbconePage = $('.view_count_bbcone');
    var $bbctwoPage = $('.view_count_bbctwo');
    var $bbcthreePage = $('.view_count_bbcthree');
    var $bbcfourPage = $('.view_count_bbcfour');
    var $bbcnewsPage = $('.view_count_bbcnews');
    var $cbbcPage = $('.view_count_cbbc');
    var $cbeebiesPage = $('.view_count_cbeebies');
    var $header = $('.view_count_table_header');

    $bbconePage.hide();
    $bbctwoPage.hide();
    $bbctwoPage.hide();
    $bbcthreePage.hide();
    $bbcfourPage.hide();
    $bbcnewsPage.hide();
    $cbbcPage.hide();
    $cbeebiesPage.hide();

    bindEventListener($header, $overallPage, $bbconePage, $bbctwoPage, $bbcthreePage,
      $bbcfourPage, $bbcnewsPage,
      $cbbcPage,
      $cbeebiesPage);
    addDataOverallTable();
  });

  function bindEventListener($header, $overallPage, $bbconePage, $bbctwoPage, $bbcthreePage,
    $bbcfourPage, $bbcnewsPage,
    $cbbcPage,
    $cbeebiesPage) {

    var $overall = $('#view-count-home');
    var $bbcone = $('#view-count-bbcone');
    var $bbctwo = $('#view-count-bbctwo');
    var $bbcthree = $('#view-count-bbcthree');
    var $bbcfour = $('#view-count-bbcfour');
    var $bbcnews = $('#view-count-bbcnews');
    var $cbbc = $('#view-count-cbbc');
    var $cbeebies = $('#view-count-cbeebies');
    var turn = 1;

    $header.on('click', function() {
      turn *= -1;
      var length = $(this).prevAll().length;
      sortTable(turn, length);
    });

    $overall.on('click', function() {
      hidePage($bbconePage, $bbconePage, $bbctwoPage, $bbcthreePage, $bbcfourPage,
        $bbcnewsPage,
        $cbbcPage,
        $cbeebiesPage);
      showPage($overallPage);

    });

    $bbcone.on('click', function() {
      var channelName = bbcone;
      hidePage($overallPage, $bbctwoPage, $bbcthreePage, $bbcfourPage,
        $bbcnewsPage,
        $cbbcPage,
        $cbeebiesPage);
      showPage($bbconePage);
      getChannelDetails(channelName, $bbconePage);
    });

    $bbctwo.on('click', function() {
      var channelName = bbctwo;
      hidePage($overallPage, $bbconePage, $bbconePage, $bbcthreePage, $bbcfourPage,
        $bbcnewsPage,
        $cbbcPage,
        $cbeebiesPage);
      showPage($bbctwoPage);
      getChannelDetails(channelName, $bbctwoPage);
    });

    $bbcthree.on('click', function() {
      var channelName = bbcthree;
      hidePage($overallPage, $bbconePage, $bbctwoPage, $bbcthreePage,
        $bbcfourPage,
        $bbcnewsPage,
        $cbbcPage,
        $cbeebiesPage);
      showPage($bbcthreePage);
      getChannelDetails(channelName, $bbcthreePage);
    });

    $bbcfour.on('click', function() {
      var channelName = bbcfour;
      hidePage($overallPage, $bbconePage, $bbctwoPage, $bbcthreePage,
        $bbcnewsPage,
        $cbbcPage,
        $cbeebiesPage);
      showPage($bbcfourPage);
      getChannelDetails(channelName, $bbcfourPage);
    });

    $bbcnews.on('click', function() {
      var channelName = bbcnews24;
      hidePage($overallPage, $bbconePage, $bbctwoPage, $bbcthreePage, $bbcfourPage,
        $cbbcPage,
        $cbeebiesPage);
      showPage($bbcnewsPage);
      getChannelDetails(channelName, $bbcnewsPage);
    });

    $cbbc.on('click', function() {
      var channelName = cbbc;
      hidePage($overallPage, $bbconePage, $bbctwoPage, $bbcthreePage, $bbcfourPage,
        $bbcnewsPage,
        $cbeebiesPage);
      showPage($cbbcPage);
      getChannelDetails(channelName, $cbbcPage);
    });

    $cbeebies.on('click', function() {
      var channelName = cbeebies;
      hidePage($overallPage, $bbconePage, $bbctwoPage, $bbcthreePage, $bbcfourPage,
        $bbcnewsPage,
        $cbbcPage);
      showPage($cbeebiesPage);
      getChannelDetails(channelName, $cbeebiesPage);
    });
  }

  var hidePage = function() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].hide();
    }
  };

  var showPage = function() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].show();
    }
  };

  function addDataOverallTable() {
    $.map(data, function(month, index) {
      $.each(month, function(channel, figure) {
        $('.view_count_table_body tr').each(function() {
          var $channelHeading = $(this);
          var $channelHeadingId = $(this).attr('id');
          if ($channelHeadingId === channel) {
            $channelHeading.append('<td>' + figure +
              '</td>');
          }
        });
      });
    });

  }

  function sortTable(turn, length) {
    var $rows = $('.view_count_table tbody  tr').get();
    var index = this.cellIndex;
    $rows.sort(function(a, b) {
      var A = getVal(a);
      var B = getVal(b);

      if (A < B) {
        return -1 * turn;
      }

      if (A > B) {
        return 1 * turn;
      }

      return 0;

    });

    function getVal(sortVariable) {
      var cell = $(sortVariable).children('td').eq(length).text().toUpperCase();
      if ($.isNumeric(cell)) {
        cell = parseInt(cell, 10);
      }

      return cell;
    }

    $.each($rows, function(index, row) {
      $('.view_count_table').children('tbody').append(row);
    });
  }

  function getChannelDetails(name, page) {
    var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    var channelData = [];
    var cells = $(name).find('td');
    $.each(cells, function(index, value) {
      channelData.push(parseInt($(value).text()));
      return channelData;
    });
    showChanneDetails(channelData, monthsNames, page);
  }

  function showChanneDetails(channelData, monthsNames, page) {
    console.log(channelData);
    console.log(monthsNames);
    console.log(page);
  }

};
