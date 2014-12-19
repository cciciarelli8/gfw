/**
 * The VideoGridView view.
 */
define([
  'jquery',
  'backbone',
  'mps'
], function($,Backbone,mps) {

  'use strict';

  var VideoGridView = Backbone.View.extend({

    el: '#videoGridView',

    initialize: function() {
      if (!this.$el.length) {
        return
      }
      this.$players = $('.player-iframe');

      // INITS
      this.loadYoutubeAPI();
    },

    loadYoutubeAPI: function(){
      mps.subscribe('YoutubeAPI/ready', _.bind(function(){
        this.loadPlayers();
      },this));
    },

    loadPlayers: function(id) {
      _.each(this.$players, _.bind(function(v){
        var id = $(v).attr('id');
        var video = $(v).data('default');
        new YT.Player(id, {
          videoId: video,
          width: 356,
          height: 200,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showInfo: 0
          }
        });
      }, this ));
    }

    
  });

  return VideoGridView;

});