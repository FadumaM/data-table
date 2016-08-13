tableViz = function(elm, data) {
  $(document).ready(function() {
    var $header = $('.view_count_table_header');
    bindEventListener($header);
    addDataOverallTable();
  });

  function bindEventListener($header) {
    var turn = 1;
    $header.on('click', function() {
      turn *= -1;
      var length = $(this).prevAll().length;
      sortTable(turn, length);
    });
  }

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

};
