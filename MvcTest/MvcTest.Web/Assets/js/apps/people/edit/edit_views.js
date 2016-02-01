PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.Form = Marionette.LayoutView.extend({
    template: "#person-edit-view",

    regions: {
      coloursRegion: "#colours-region"
    },

    events: {
      "click button.js-saveChanges": "submitClicked",
      "click button.js-cancel": "cancelClicked",
      "click #is-authorised-label": "isAuthorisedLabelClicked",
      "click #is-enabled-label": "isEnabledLabelClicked"
    },

    submitClicked: function (e) {
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      //TODO
      //additional logic for colours!
      this.trigger("form:submit", data);
    },

    cancelClicked: function (e) {
      e.preventDefault();
      this.trigger("people:list");
    },

    isAuthorisedLabelClicked: function (e) {
      e.preventDefault();
      //TODO
    },

    isEnabledLabelClicked: function (e) {
      e.preventDefault();
      //TODO
    },
});

Edit.ColourView = Marionette.ItemView.extend({
  tagName: "div",
  className: "form-group",
  template: "#colour-item",

  events: {
    "click input": "checkboxClicked"
  },

  checkboxClicked: function (e) {
    this.model.set("isChecked", e.target.checked);
  }

});

Edit.ColoursView = Marionette.CollectionView.extend({
  childView: Edit.ColourView
});

Edit.MissingPersonView = Marionette.ItemView.extend({
  template: "#missing-person-view"
});

});