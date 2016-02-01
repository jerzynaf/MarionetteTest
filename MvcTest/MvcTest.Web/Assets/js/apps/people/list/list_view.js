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

    editPerson: function (e) {
      e.preventDefault();
      this.trigger("person:edit", this.model.id);
    }
  });

  List.NoPeopleView = Marionette.ItemView.extend({
    template: "#people-list-none",
    tagName: "tr",
    className: "alert"
  });

  List.People = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#people-list",
    childView: List.PersonView,
    childViewContainer: "tbody",
    emptyView: List.NoPeopleView
  });
});