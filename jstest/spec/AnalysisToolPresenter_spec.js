/**
 * Unit test coverage for AnalysisToolPresenter.
 */
define([
  'jquery',
  'underscore',
  'mps',
  'presenters/AnalysisToolPresenter',
  'helpers/api_responses'
], function($, _, mps, Presenter) {

  /* global describe, it, expect, beforeEach, jasmine */

  'use strict';

  describe('AnalysisToolPresenter', function() {
    this.viewSpy = {};

    beforeEach(function() {
      this.presenter = new Presenter(this.viewSpy);
    });

    describe('StatusModel', _.bind(StatusModelDesc, this));
    describe('_publishAnalysis', _.bind(PublishAnalysisDesc, this));
    // describe('Presenter mps subscriptions', _.bind(PresenterSubscriptionsDesc, this));
    describe('_setBaselayer', _.bind(SetBaselayerDesc, this));
  });

  /**
   * Test Presenter StatusModel.
   */
  function StatusModelDesc() {
    it('is defined', function() {
      expect(this.presenter.status).toBeDefined();
    });

    it('correct default values', function() {
      expect(this.presenter.status.toJSON()).toEqual({
        baselayer: null,
        analysis: null,
        currentDate: null,
        threshold: null,
        overlay: null,
        polygon: null,
        multipolygon: null
      });
    });
  };

  /**
   * Test presenter's subscriptions events.
   */
  // function PresenterSubscriptionsDesc() {
  //   it('LayerNav/Change triggers _setBaselayer to set the new baselayer', function() {
  //     mps.publish('LayerNav/Change', [layerSpecMock])
  //     expect(this.presenter._setBaselayer).toHaveBeenCalled();
  //   });
  // };

  /**
   * Test the _publishAnalysis function.
   */
  function PublishAnalysisDesc() {
    it('analysis resource constructed correctly', function() {

    });

    it('publish analysis correctly', function() {

    });

    it("publish 'Place/update' to update the url with the current analysis", function() {

    });
  };

  /**
   * Test _setBaselayer method sets the correct baselayer from layerSpec.
   */
  function SetBaselayerDesc() {

  }

});
