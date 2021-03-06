'use strict';

define([
  'backbone'
], function(Backbone) {

  var OrganizationCollection = Backbone.Model.extend({

    url: '/api/private/organizations',

    parse: function(response) {
      response.organizations_count = _.map(response.organizations_count, _.bind(function(p){
        return {
          name: p.name,
          id: p.id,
          url: '/organizations/'+p.id,
          urlfiltered: this.setUrl('organizations[]',p.id),
          class: p.name.toLowerCase().replace(/\s/g, "-").replace("(", "").replace(")", "").replace(/\//g, "-"),
          count: p.projects_count
        }
      }, this ));
      return response.organizations_count;
    },

    setUrl: function(param_name, id){
      var href = location.origin + location.pathname;
      var search = this.getParams();

      return (search) ? href+'?'+search+'&'+param_name+'='+id : href+'?'+param_name+'='+id;
    },

    getParams: function() {
      var obj = this.objetize(location.search.substring(1));
      var str = [];
      for(var p in obj) {
        var notAllowedFilters = ['page', 'status'];
        if (obj.hasOwnProperty(p) && !_.contains(notAllowedFilters, p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
      return str.join("&");
    },

    objetize: function(string) {
      return (!!string) ? JSON.parse('{"' + decodeURI(string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {};
    }


  });


  return OrganizationCollection;

});
