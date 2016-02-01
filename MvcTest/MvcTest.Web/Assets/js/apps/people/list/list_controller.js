PeopleManager.module("PeopleApp.List", function (List, PeopleManager, Backbone, Marionette, $, _) {
  List.Controller = {
    listPeople: function () {
      var loadingView = new PeopleManager.Common.Views.Loading();
      PeopleManager.regions.main.show(loadingView);

      var fetchingPeople = PeopleManager.request("people:entities");

      var peopleListLayout = new List.Layout();

      $.when(fetchingPeople).done(function (people) {

        var peopleListView = new List.People({
          collection: people
        });

        peopleListLayout.on("show", function () {
          peopleListLayout.peopleRegion.show(peopleListView);
        });


        peopleListView.on("childview:person:edit", function (childView, id) {
          PeopleManager.trigger("person:edit", id);
        });

        PeopleManager.regions.main.show(peopleListLayout);
      });

    }
  }
});