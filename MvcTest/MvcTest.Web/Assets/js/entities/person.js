﻿PeopleManager.module("Entities", function (Entities, PeopleManager, Backbone, Marionette, $, _) {
  Entities.Person = Backbone.Model.extend({
    urlRoot: "api/PeopleApi"
  });

  Entities.PeopleCollection = Backbone.Collection.extend({
    url: "api/PeopleApi",
    model: Entities.Person
  });

  var API = {

    getPeopleEntities: function () {
      var people = new Entities.PeopleCollection();
      var defer = $.Deferred();
      people.fetch({
        success: function (data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      return promise;
    },

    getPersonEntity: function (personId) {
      var person = new Entities.Person({ id: personId });
      var defer = $.Deferred();
      person.fetch({
        success: function (data) {
          defer.resolve(data);
        },
        error: function (data) {
          defer.resolve(undefined);
        }
      });
      return defer.promise();
    }

  };

  PeopleManager.reqres.setHandler("people:entities", function () {
    return API.getPeopleEntities();
  });

  PeopleManager.reqres.setHandler("person:entity", function (id) {
    return API.getPersonEntity(id);
  });
});