export const aboutController = {
  // method to load the about page
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About PlaceMark",
      };
      return h.view("about-view", viewData);
    },
  },
};
