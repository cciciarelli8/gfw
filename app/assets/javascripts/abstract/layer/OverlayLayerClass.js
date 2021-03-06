/**
 * The HTML5 Canvas map layer module.
 *
 * @return OverlayLayer class (extends Class).
 */
define([
  'Class',
  'underscore',
  'map/views/layers/CustomInfowindow'
], function(Class, _, CustomInfowindow) {

  'use strict';

  var OverlayLayerClass = Class.extend({

    defaults: {
      infowindow: false,
      infowindowContent: null,
      infowindowAPI: null,
      analysis: false
    },

    init: function(layer, options, map) {
      this.map = map;
      this.layer = layer;
      this.name = layer.slug;
      this.tileSize = new google.maps.Size(256, 256);
      this.options = _.extend({}, this.defaults, this.options || {});
    },

    addLayer: function(position, success) {
      if (this._getOverlayIndex() < 0) {
        this._getLayer().then(_.bind(function(layer) {
          this.map.overlayMapTypes.insertAt(position, layer);
          if (this.options.infowindow) {
            this.setInfowindow();
          }
          success();
        }, this));
      }

    },

    removeLayer: function() {
      var overlayIndex = this._getOverlayIndex();
      this.removeInfowindow();
      if (overlayIndex > -1) {
        google.maps.event.clearListeners(this.map, 'click');
        this.map.overlayMapTypes.removeAt(overlayIndex);
      }
    },

    /**
     * Create a infowindow object
     * and add to Map
     *
     * @return {object}
     */
    setInfowindow: function() {
      if (!this.infowindow && this.options.infowindowAPI) {

        google.maps.event.addListener(this.map, 'click', _.bind(function(ev) {
          if (!(!! ev.latLng)) {
            return;
          }
          var params = {
            lat: ev.latLng.lat(),
            lon: ev.latLng.lng()
          };

          this.removeInfowindow();

          this.options.infowindowAPI.execute(params, _.bind(function(data) {
            data[0].analysis = this.options.analysis;
            this.infowindow = new CustomInfowindow(ev.latLng, this.map, {
              infowindowData: data[0]
            });
          }, this));

        }, this));
      }
    },

    removeInfowindow: function() {
      if (this.infowindow) {
        this.infowindow.remove();
      }
    },

    _getOverlayIndex: function() {
      var overlaysLength = this.map.overlayMapTypes.getLength();
      if (overlaysLength > 0) {
        for (var i = 0; i< overlaysLength; i++) {
          var layer = this.map.overlayMapTypes.getAt(i);
          if (layer && layer.name === this.getName()) {
            return i;
          }
        }
      }
      return -1;
    },

    getName: function() {
      return this.name;
    }

  });

  return OverlayLayerClass;

});
