gfw.ui.view.SearchIndex = cdb.core.View.extend({
  el: document.body,

  events : {
    'click #btn-search' : '_open',
    'click #btn-close-search' : '_close',
    'keyup #search' : '_search'
  },

  initialize: function() {
    this.$btnSearch = $('#btn-search');
    this.$search = $('#search');
    this.$searchBox = $('#search-box');
    this.$close = $('#btn-close-search');
    this.url = '/search/';
  },

  _open: function(e){
    var that = this;
    if (!this.$btnSearch.hasClass('is-active')) {
      this.$btnSearch.addClass('is-active');
      this.$searchBox.addClass('is-visible');
      setTimeout(function(){
        that.$search.focus();
      },500)
    }else{
      this._search();
    }
  },
  _close : function(){
    this.$search.val('').blur();
    this.$btnSearch.removeClass('is-active');
    this.$searchBox.removeClass('is-visible');

  },
  _search : function(e){
    var searchText = this.$search.val();
    if (e) {
      if(e.keyCode == 27 || e.which == 27) {
        this._close();
      }      
    };

    if (searchText.length > 1) {
      if(e){
        if(e.keyCode == 27 || e.which == 27) {
          this._close();
        }
        if(e.keyCode == 13 || e.which == 13) {
          this._gosearch(searchText);
        }
      }else{
        this._gosearch(searchText);
      }
    };
  },
  _gosearch : function(text){
    window.location = this.url+decodeURIComponent(text).replace(/ +/g, '-').toLowerCase();  
  }
});