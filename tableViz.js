$(document).ready(function() {
  var data = {};
  $.getJSON('data.json', function(json) {
    data = json;
    start();
  });

  function start() {
    var header = $('.overall_header');
    addDataOverallTable();
    initiateSortTable(header);
    getGraphDetails();
  }

  function initiateSortTable(header) {
    header.on('click', function() {
      changeArrow();
      var turn = 1;
      turn *= -1;
      var length = $(this).prevAll().length;
      sortTable(turn, length);
    });
  }


  function changeArrow() {
    var arrow = $('#right_arrow');
    var activeArrowSrc = "/images/play-button-active.svg";
    arrow.removeClass("pulse");
    arrow.removeAttr('src');
    arrow.attr('src', activeArrowSrc);
  }

  function addDataOverallTable() {
    $.map(data, function(month, index) {
      $.each(month, function(channel, figure) {
        $('.table_body tr').each(function() {
          var channelHeading = $(this);
          var channelHeadingId = $(this).attr('class');
          if (channelHeadingId === channel) {
            channelHeading.append('<td>' + figure +
              '</td>');
          }
        });
      });
    });

  }

  function sortTable(turn, length) {
    var rows = $('.view_count_table tbody  tr').get();
    var index = this.cellIndex;
    rows.sort(function(a, b) {
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

    $.each(rows, function(index, row) {
      $('.view_count_table').children('tbody').append(row);
    });
  }

  function getGraphDetails() {
    var channelNames = [];
    var sections = $('.view_count_channels');
    $.each(sections, function() {
      return channelNames.push($(this).attr('id'));
    });

    appendDetails(sections, channelNames);
  }

  function appendDetails(sections, channelNames) {
    $.map(channelNames, function(channelName, index) {
      $.each(sections, function(index, section) {
        var channelSection = $(this).attr('id');
        var graph = $(section).find('tbody');
        $.map(data, function(month, index) {
          if (channelName === channelSection) {
            graph.append(
              '<tr class="qtr" id="g' + index + '"><th scope="row">' + index +
              '</th><td class="graph_views bar" style="height: ' +
              parseInt(month[
                  channelName] /
                5) + 'px;"><p>' + month[channelName] + '</p></td></tr>');
          }
        });
      });
    });
  }

});
