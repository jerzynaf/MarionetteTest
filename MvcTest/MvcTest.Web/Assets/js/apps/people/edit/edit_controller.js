﻿PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.Controller = {
    editPerson: function (id) {
      var loadingView = new PeopleManager.Common.Views.Loading();
      PeopleManager.regions.main.show(loadingView);

      var fetchingPerson = PeopleManager.request("person:entity", id);
      $.when(fetchingPerson).done(function (person) {
        var view;
        if (person !== undefined) {
          //var rawColours = person.get("colours");
          //var colours = PeopleManager.request("colours:entities", rawColours);
          //person.set("colours", colours);
          view = new Edit.Form({
            model: person
          });

          view.on("form:submit", function (data) {
            //TODO
            if (person.save(data)) {
              PeopleManager.trigger("people:list");
            }
            else {
              //TODO
              //view.triggerMethod("form:data:invalid", contact.validationError);
            }
          });


          view.on("people:list", function () {
            PeopleManager.trigger("people:list");
          });


          view.on("show", function () {

            var rawColours = person.get("colours");
            var colours = PeopleManager.request("colours:entities", rawColours);
            var coloursView = new Edit.ColoursView({
              collection: colours
            });
            view.coloursRegion.show(coloursView);
          });
        }
        else {
          view = new PeopleManager.PeopleApp.Edit.MissingPersonView();
        }

        PeopleManager.regions.main.show(view);
      });
    }
  };
});