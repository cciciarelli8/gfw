gfw.ui.model.Carrousel = cdb.core.Model.extend({
  defaults: {
    hidden: true,
    video: false
  }
});

gfw.ui.view.Carrousel = cdb.core.View.extend({
  el: $('.carrousel'),

  defaults: {
    speed: 300
  },

  events: {
    'click .previous' : 'onPrevious',
    'click .next' : 'onNext',
  },

  initialize: function() {
    var that = this;

    _.bindAll( this, 'onPrevious', 'onNext', 'onTab');

    this.step = 1;

    this.options = _.extend(this.options, this.defaults);

    this.model = new gfw.ui.model.Carrousel();

    if (this.options.video) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    this.render();
    this._initBindings();
  },

  _initBindings: function() {
    var that = this;

    // tabs outside carrousel :(
    this.$tab.on('click', function(e) {
      that.onTab(e.originalEvent);
    });
  },

  onNext: function(e) {
    e.preventDefault();

    this.$carrousel.find('li:nth-child(' + this.step + ')').fadeOut(this.defaults.speed);
    (this.step >= this.$images.length) ? this.step = 1 : this.step++;
    this.$carrousel.find('li:nth-child(' + this.step + ')').fadeIn(this.defaults.speed);
  },

  onPrevious: function(e) {
    e.preventDefault();

    this.$carrousel.find('li:nth-child(' + this.step + ')').fadeOut(this.defaults.speed);
    (this.step === 1) ? this.step = this.$images.length : this.step--;
    this.$carrousel.find('li:nth-child(' + this.step + ')').fadeIn(this.defaults.speed);
  },

  onTab: function(e) {
    var that = this;

    e.preventDefault();

    var $el = $(e.target);

    if ($el.hasClass('selected')) return;

    this.$tab.removeClass('selected');
    $el.addClass('selected');

    var active = $el.attr('data-tab');
        $active = this.$carrousel.find('li.' + active),
        $current = this.$carrousel.find('li:nth-child(' + this.step + ')');


    if (this.options.video) {
      var $video = $current.find('iframe').attr('id');
      document.getElementById($video).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

    $current.fadeOut(this.defaults.speed);
    $active.fadeIn(this.defaults.speed);
    this.step = $active.index()+1;
  },

  render: function() {
    var that = this;

    this.$previous = this.$('.previous');
    this.$next     = this.$('.next');

    this.$carrousel = this.$('ul');
    this.$images    = this.$('li');
    this.$tab       = $('.header_block__link');

    this.$carrousel.find('li:nth-child(1)').fadeIn(this.defaults.speed);

    return this.$el;
  }
});
