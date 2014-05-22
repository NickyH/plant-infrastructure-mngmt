//dom ready functions
$(function(){
    $('#nation-search').on('keyup', table_search_vals);
    $('#document-search').on('keyup', doc_table_search_vals);
    $('[data-slidepanel="panel"]').slidepanel({
        orientation: 'bottom',
        mode: 'overlay'
    })
    // $('[data-slidepanel]').slidepanel({
    //     orientation: 'right',
    //     mode: 'overlay'
    // })
  insert_filter_list_fixed();
});

function switch_mobile_fixed() {
  if ($(this).hasClass('current')) {
    return;
  }
  else {
    $('.switch-container').removeClass('current');
    $(this).addClass('current');
    var asset_type = $('.current span').text();
    show_asset_map(asset_type);
  }
}

function show_asset_map(asset) {
  if (asset === 'Mobile' ) {
    insert_map_mobile();
  }
  else {
    insert_map_fixed();
  }
}

function insert_map_mobile() {
  insert_filter_list_mobile()
}

function insert_map_fixed() {
  insert_filter_list_fixed()
}

function insert_filter_list_fixed() {
  $('#insert-filter-list').empty();
  $.get('map_filters_fixed.html', function(data) {
    $('#insert-filter-list').html(data);
  });
}

function insert_filter_list_mobile() {
  $('#insert-filter-list').empty();
  $.get('map_filters_mobile.html', function(data) {
    $('#insert-filter-list').html(data);
  });
}

function open_notify_dialog() {
  // bootbox.alert('Burner fuel consumption below theoretical minimum.');
  bootbox.dialog({
  message: "Burner fuel consumption below theoretical minimum",
  title: "Drum Burner Alert",
  closeButton: false,
  className: "compliance-alert-bootbox",
  buttons: {
    success: {
      label: "View Report",
      className: "btn-success",
      callback: goto_compliance_page
      },
      "Close": {
        className: "btn-info",
        callback: function() {}
      }
    }
  });
}

function open_expire_dialog() {
  // bootbox.alert('Burner fuel consumption below theoretical minimum.');
  bootbox.dialog({
  message: "This document is due to expire within three months",
  title: "Document expiring soon",
  closeButton: false,
  className: "compliance-alert-bootbox",
  buttons: {
      "Close": {
        className: "btn-info",
        callback: function() {}
      }
    }
  });
}

function goto_site_page() {
  remove_bottom();
  $('#insert-map').empty();
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('site.html', function(data) {
    $('#insert-content').html(data);
  });
}

function remove_bottom() {
  $('#insert-bottom').empty();
  $('#slidepanel').removeClass('cb_slide_panel').empty();
}

function goto_plant_page() {
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('plant.html', function(data) {
    $('#insert-content').html(data);
  });
}

function goto_workshop_page() {
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('workshop.html', function(data) {
    $('#insert-content').html(data);
  });
}

function goto_compliance_page() {
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('compliance.html', function(data) {
    $('#insert-content').html(data);
  });
}

function goto_asset_page() {
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('asset.html', function(data) {
    $('#insert-content').html(data);
  });
}

function goto_mobile_asset_page() {
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('mobile_asset.html', function(data) {
    $('#insert-content').html(data);
  });
}

function goto_stats_page() {
  $('#insert-map').empty();
  $('#insert-content').empty();
  $.get('stats.html', function(data) {
    $('#insert-content').html(data);
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

function toggle_tab_site() {
  $('ul.nav-tabs.site-tabs li.active').removeClass('active');
  $(this).parent('li').addClass('active');

  var tab_name = $(this).attr('id');
  if (tab_name === 'tab-siteplan') {
    $('#form-siteplan').removeClass('hidden');
    $('#form-siteprocess').addClass('hidden');
  }
  if (tab_name === 'tab-siteprocess') {
    $('#form-siteplan').addClass('hidden');
    $('#form-siteprocess').removeClass('hidden');
  }
}

function toggle_tab_mobile() {
  $('ul.nav-tabs.site-tabs li.active').removeClass('active');
  $(this).parent('li').addClass('active');

  var tab_name = $(this).attr('id');
  if (tab_name === 'tab-mobile-info') {
    $('#form-mobile-info').removeClass('hidden');
    $('#form-mobile-maint').addClass('hidden');
    $('#form-mobile-stats').addClass('hidden');
  }
  if (tab_name === 'tab-mobile-maint') {
    $('#form-mobile-info').addClass('hidden');
    $('#form-mobile-maint').removeClass('hidden');
    $('#form-mobile-stats').addClass('hidden');
  }
  if (tab_name === 'tab-mobile-stats') {
    $('#form-mobile-info').addClass('hidden');
    $('#form-mobile-maint').addClass('hidden');
    $('#form-mobile-stats').removeClass('hidden');
    chartUtilisationPerAsset.render();
    chartIdleTimeRunning.render();
    chartIdleTimeMin.render();
    chartTonnesLaid.render();
    chartRinePavers.render();
    chartRiseWaPavers.render();
  }
}

function toggle_tab_stats() {
  $('ul.nav-tabs.site-tabs li.active').removeClass('active');
  $(this).parent('li').addClass('active');

  var tab_name = $(this).attr('id');
  if (tab_name === 'tab-plant-stats-elec') {
    $('#form-plant-stats-elec').removeClass('hidden');
    $('#form-plant-stats-burn').addClass('hidden');
    $('#form-plant-stats-waste').addClass('hidden');
  }
  if (tab_name === 'tab-plant-stats-burn') {
    $('#form-plant-stats-elec').addClass('hidden');
    $('#form-plant-stats-burn').removeClass('hidden');
    $('#form-plant-stats-waste').addClass('hidden');
  }
  if (tab_name === 'tab-plant-stats-waste') {
    $('#form-plant-stats-elec').addClass('hidden');
    $('#form-plant-stats-burn').addClass('hidden');
    $('#form-plant-stats-waste').removeClass('hidden');
    chartWasteByCategory.render();
    rankings_table_colour();
  }
}

function rankings_table_colour() {
  var ytd = $('table td.ytd');
  $(ytd).each(function() {
    if (parseInt($(this).text().replace('%', '')) >= 75 ) {
      $(this).parent('tr.ranking').addClass('green');
    }
    if (parseInt($(this).text().replace('%', '')) < 75 && parseInt($(this).text().replace('%', '')) >= 45 ) {
      $(this).parent('tr.ranking').addClass('orange');
    }
    if (parseInt($(this).text().replace('%', '')) < 45 ) {
      $(this).parent('tr.ranking').addClass('red');
    }
  });
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