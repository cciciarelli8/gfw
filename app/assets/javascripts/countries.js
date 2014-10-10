//= require jquery/dist/jquery
//= require geojson
//= require d3/d3
//= require topojson/topojson
//= require scrollIt.min
//= require jquery.qtip.min
//= require simple_statistics

//= require gfw
//= require gfw/helpers
//= require gfw/ui/widget
//= require gfw/ui/sourcewindow
//= require gfw/ui/share
//= require gfw/ui/umd_options

//= require_tree ./countries
//= require_tree ./search


$(document).ready(function() {

  window.ga = window.ga || function() {};
  //SearchBox
  window.search_index = new gfw.ui.view.SearchIndex();

  cdb.init(function() {
    if ($('.is-index-action').length > 0) {
      window.countries_index = new gfw.ui.view.CountriesIndex();
    }
    if ($('.is-overview-action').length > 0 || $('.countries_overview').length > 0) {
      window.countries_overview = new gfw.ui.view.CountriesOverview();
    }
    if ($('.is-show-action').length > 0) {
      window.countries_show = new gfw.ui.view.CountriesShow({
        iso: ISO
      });
    }
  });

});
