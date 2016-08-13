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

};
