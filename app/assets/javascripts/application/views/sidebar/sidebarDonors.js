'use strict';

define([
  'jqueryui',
  'backbone',
  'handlebars',
  'application/abstract/conexion',
  'application/services/sidebarService',
  'text!application/templates/sidebar/sidebarDonors.handlebars'
  ], function(jqueryui,Backbone, handlebars, conexion, service, tpl) {

  var SidebarDonors = Backbone.View.extend({

    el: '#sidebar-donors',

    template: Handlebars.compile(tpl),

    events: {
      'click #see-more-donors' : 'toggleDonors'
    },

    initialize: function(options) {
      if (!this.$el.length) {
        return
      }
      this.conexion = options.conexion;
      this.conexion.getDonorsData(_.bind(function(data){
        console.log(data);
        if (!!data.data.length) {
          this.data = data.data;
          this.render(false);
        } else {
          this.$el.remove()
        }
      }, this ));
    },

    parseData: function(more){
      return {
        donors: (more) ? this.data : this.data.slice(0,10),
        see_more: (this.data.length < 10) ? false : !more
      };
    },

    render: function(more){
      this.$el.html(this.template(this.parseData(!!more)));
    },

    // Events
    toggleDonors: function(e){
      e && e.preventDefault();
      this.render(true);
    },

  });

  return SidebarDonors;

});
