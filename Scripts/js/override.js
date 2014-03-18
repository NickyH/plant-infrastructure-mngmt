//dom ready functions
$(function(){
    // $('#map-canvas').on('click', show_map_qtip);
    $('#nation-search').on('keyup', table_search_vals);
    $('#document-search').on('keyup', doc_table_search_vals);
    $('[data-slidepanel]').slidepanel({
        orientation: 'bottom',
        mode: 'push'
    })
    $('.open-notify').on('click', open_notify_dialog);
});

function open_notify_dialog() {
  bootbox.confirm('This will permanently close off this issue', function (response) {

  });
}

function toggle_tab_compliance() {
  $('ul.nav-tabs.compliance-tabs li.active').removeClass('active');
  $(this).parent('li').addClass('active');

  var tab_name = $(this).attr('id');
  if (tab_name === 'tab-epa') {
    $('#form-epa').removeClass('hidden');
    $('#form-permits').addClass('hidden');
    $('#form-dg').addClass('hidden');
  }
  if (tab_name === 'tab-permits') {
    $('#form-epa').addClass('hidden');
    $('#form-permits').removeClass('hidden');
    $('#form-dg').addClass('hidden');
  }
  if (tab_name === 'tab-dg') {
    $('#form-epa').addClass('hidden');
    $('#form-permits').addClass('hidden');
    $('#form-dg').removeClass('hidden');
  }
}

function toggle_rw_select() {
  event.preventDefault();
  $(this).toggleClass('inactive');
  $('.show-all').addClass('inactive');
  $('.show-none').addClass('inactive');

  if ($(this).hasClass('show-all')) {
    $('.filter-list').find('.pill-select').removeClass('inactive');
    $('.show-all').removeClass('inactive');
    $('.show-none').addClass('inactive');
  }

  if ($(this).hasClass('show-none')) {
    $('.filter-list').find('.pill-select').addClass('inactive');
    $('.show-none').removeClass('inactive');
    $('.show-all').addClass('inactive');
  }

  if($(this).hasClass('inactive')) {
    $(this).children('.pull-right').html('&#10008');
  }

  else {
    $(this).children('.pull-right').html('&#10004');
  }
  filter_map_markers();
}

function filter_map_markers() {
    var markers_array = [];
    $('.pill-select:not(.inactive)').each(function() {
    markers_array.push( $(this).children('.filter-text').text() );
    });

    redraw_map_markers(markers_array);
}

function redraw_map_markers(markers_array) {
    var mapOptions = {
          center: new google.maps.LatLng(-28.000, 140.000),
          zoom: 5
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        var image = {
          url: '../Content/images/plant-red.png',
          size: new google.maps.Size( 30, 30 )
        };

        var plants_filtered = [];

        for (var i = 0; i < plants.length; i++) {
            for (var j = 0; j < markers_array.length; j++) {
                if (markers_array[j] === plants[i][3] || markers_array[j] === plants[i][4] || markers_array[j] === plants[i][5] || markers_array[j] === plants[i][6] || markers_array[j] === plants[i][7] ) {
                    plants_filtered.push(plants[i]);
                    }
                }
            }

            for (var i = 0; i < plants_filtered.length; i++) {
             var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(plants_filtered[i][1], plants_filtered[i][2]),
                 map: map,
                 icon: image,
                 title: plants_filtered[i][0]
               });
             }
}

function show_map_qtip() {
    $(this).qtip({
      content: {
        text: $('#plant'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-plant qtip-rounded qtip-shadow qtip-light'
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#plant').addClass('hidden');
          }
      },
      overwrite: false,
      position: {
          my: 'center center',
          at: 'center center',
          target: $(this)
      }
  });
    $('#plant').removeClass('hidden');
}

function insert_left() {
  $('#insert-left').empty();
  $.get('left_bar.html', function(data) {
    $('#insert-left').html(data);
  });
}

function insert_top() {
  $.get('top_bar.html', function(data) {
    $('#insert-top').html(data);
  });
}

function insert_bottom() {
  $.get('bottom_bar.html', function(data) {
    $('#insert-bottom').html(data);
  });
}

function insert_map() {
    $('#insert_map').vectorMap({
        map: 'au_mill_en'
    })
}

function table_search_vals() {
    var tableID = $('#table-filter-1').attr('id');
    var thisObj = $('#nation-search');
    table_search(thisObj, tableID);
}

function doc_table_search_vals() {
    var tableID = $('#table-filter-2').attr('id');
    var thisObj = $('#document-search');
    table_search(thisObj, tableID);
}

function table_search(thisObj, tableID) {
  var $rows = $("#"+tableID+" tr");
  var val = '^(?=.*\\b' + $.trim($(thisObj).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;

  $rows.show().filter(function() {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
  }).hide();
  $('thead tr').show();
}

function enable_epa_fields() {
  $('#form-epa').children('.form-group').children().children('input.form-control').removeAttr('disabled');
}

function disable_epa_fields() {
  $('#form-epa').children('.form-group').children().children('input.form-control').attr('disabled', 'disabled');
}