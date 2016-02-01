PeopleManager.module("Common.Views", function (Views, PeopleManager, Backbone, Marionette, $, _) {
  Views.Loading = Marionette.ItemView.extend({
    template: "#loading-view",

    onShow: function () {
      $("#spinner").spin();
    }
  });
});