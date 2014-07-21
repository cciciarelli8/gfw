/**
 * The JSON map layer module.
 * @return JSONLayerClass (extends Class).
 */
define([
  'Class',
  'underscore'
], function(Class, _) {

  'use strict';

  var MarkersLayerClass = Class.extend({


    defaults: {},

    init: function(layer, map) {
      this.markers = [];
      this.map = map;
      this.options = _.extend({}, this.defaults, this.options || {});
    },

    _getLayer: function() {
      if (this.service) {
        this.service.fetchStories(
          _.bind(this._setMarker, this),
          this._handlerError
        );
      } else {
        throw 'Service is required';
      }
    },

    _handlerError: function(xhr, textStatus) {
      throw textStatus;
    },

    _setMarker: function(stories) {
      this.markers = _.map(stories, function(story) {
        var markerOption = _.extend({}, this.options, {
          position: new google.maps.LatLng(story.lat, story.lng),
          map: this.map
        });
        return new google.maps.Marker(markerOption);
      }, this);
    },

    addLayer: function() {
      this._getLayer();
    },

    removeLayer: function() {
      _.each(this.markers, function(marker) {
        marker.setMap(null);
      });
    }

  });

  return MarkersLayerClass;
});