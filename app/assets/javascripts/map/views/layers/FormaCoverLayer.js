/**
 * The Forma Coverage layer module for use on canvas.
 *
 * @return FormaCoverLayer class (extends CanvasLayerClass)
 */
define([
  'views/layers/class/CartoDBLayerClass',
], function(CartoDBLayerClass) {

  'use strict';

  var FormaCoverLayer = CartoDBLayerClass.extend({

    options: {
      sql: 'SELECT *, \'{tableName}\' AS layer, \'{tableName}\' AS name FROM {tableName}'
    }

  });

  return FormaCoverLayer;

});