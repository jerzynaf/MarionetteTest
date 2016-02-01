PeopleManager.module("PeopleApp.List", function (List, PeopleManager, Backbone, Marionette, $, _) {
  List.Layout = Marionette.LayoutView.extend({
    template: "#people-layout",

    regions: {
      peopleRegion: "#people-region"
    }
  });

  List.PersonView = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#people-list-item",

    events: {
      "click a": "editPerson"
    },

    editPerson: function (id) {
      this.trigger("person:edit", this.model.id);
    }

  });

  var NoPeopleView = Marionette.ItemView.extend({
    template: "#people-list-none",
    tagName: "tr",
    className: "alert"
  });

  List.People = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#people-list",
    childView: List.PersonView,
    childViewContainer: "tbody"
  });
});