PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.Controller = {

    editPerson: function (id) {
      var loadingView = new PeopleManager.Common.Views.Loading();
      PeopleManager.regions.main.show(loadingView);

      var fetchingPerson = PeopleManager.request("person:entity", id);
      $.when(fetchingPerson).done(function (person) {
        var view;
        if (person !== undefined) {
          view = new Edit.Form({
            model: person
          });

          view.on("form:submit", function (data) {
            $.when(person.save(data)).done(function() {
              PeopleManager.trigger("people:list");
            });
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