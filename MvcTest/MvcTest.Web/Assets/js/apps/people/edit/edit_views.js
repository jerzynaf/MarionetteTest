PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.Form = Marionette.LayoutView.extend({
    template: "#person-edit-view",

    regions: {
      coloursRegion: "#colours-region"
    },

    ui: {
      isAuthorisedCheckbox: "#is-authorised",
      isEnabledCheckbox: "#is-enabled"
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
      var region = this.getRegion("coloursRegion");
      var coloursView = region.currentView;
      var colours = coloursView.collection;
      data.colours = colours.toJSON();
      this.trigger("form:submit", data);
    },

    cancelClicked: function (e) {
      e.preventDefault();
      PeopleManager.trigger("people:list");
    },

    isAuthorisedLabelClicked: function (e) {
      e.preventDefault();
      this.ui.isAuthorisedCheckbox.toggle();
    },

    isEnabledLabelClicked: function (e) {
      e.preventDefault();
      this.ui.isEnabledCheckbox.toggle();
    }
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
    template: "#missing-person-view",
    events: {
      "click #return": "return"
    },
    return: function() {
      PeopleManager.trigger("people:list");
    }
});

});