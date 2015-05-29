'use strict';

define([
  'backbone',

  'views/map',
  'views/filters',
  'views/menu-fixed',
  'views/downloads',
  'views/embed-map',
  'views/search',
  'views/layer-overlay',
  'views/timeline',
  'views/donors-sidebar',
  'views/gallery',
  'views/sidebarHighlights',
  'views/sidebarSectors',
  'views/sidebarLocations',
  'views/sidebarOrganizations',
], function(Backbone, MapView, FiltersView, MenuFixedView, DownloadsView, EmbedMapView, SearchView, LayerOverlayView, TimelineView, DonorsSidebarView, GalleryView, SidebarHighlights, SidebarSectors, SidebarLocations, SidebarOrganizations) {

  var Router = Backbone.Router.extend({

    routes: {
      '': 'lists',
      'sectors/:id': 'lists',
      'sectors/:id/*params': 'lists',
      'organizations/:id': 'lists',
      'organizations/:id/*params': 'lists',
      'donors/:id': 'lists',
      'donors/:id/*params': 'lists',
      'location/:id': 'lists',
      'location/:id/*params': 'lists',
      'projects/:id': 'project',
      'projects/:id/*params': 'project',
      'location/:region/:id': 'lists',
      'location/:region/:id/*regions': 'lists',
      'search': 'search',
      'p/:page': 'page'
    },

    initialize: function() {
      var pushState = !!(window.history && window.history.pushState);

      Backbone.history.start({
        pushState: pushState
      });
    },

    lists: function() {
      new MapView();
      new FiltersView();
      new DownloadsView();
      new EmbedMapView();
      new LayerOverlayView();
      new DonorsSidebarView();
      new SidebarHighlights();
      new SidebarSectors();
      new SidebarLocations();
      new SidebarOrganizations();
    },

    project: function() {
      this.lists();
      new TimelineView();
      new GalleryView();
    },

    search: function() {
      new SearchView();
    },

    page: function() {
      new MenuFixedView();

      $('#faqAccordion').accordion({
        heightStyle: 'content'
      });
    }

  });

  return Router;

});