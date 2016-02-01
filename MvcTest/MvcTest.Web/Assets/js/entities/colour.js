PeopleManager.module("Entities", function (Entities, PeopleManager, Backbone, Marionette, $, _) {
  Entities.Colour = Backbone.Model.extend({
  });

  Entities.ColoursCollection = Backbone.Collection.extend({
    model: Entities.Colour
  });

  var API = {
    getColoursEntities: function (rawColours) {
      var colours = new Entities.ColoursCollection(rawColours);
      return colours;
    }
  };

  PeopleManager.reqres.setHandler("colours:entities", function (rawColours) {
    return API.getColoursEntities(rawColours);
  });

});