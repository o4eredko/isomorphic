const options = [
  {
    key: "red-button",
    label: "sidebar.redButton",
    leftIcon: "ion-toggle-filled"
  },
  {
    key: "feedmaker",
    label: "sidebar.feedMaker",
    leftIcon: "ion-ios-paper",
  },
  {
    key: "google-crafter",
    label: "sidebar.googleCrafter",
    leftIcon: "ion-arrow-graph-up-right",
    children: [
      { key: "google-crafter/settings", label: "sidebar.googleCrafter.settings" },
      { key: "google-crafter/generations", label: "sidebar.googleCrafter.generations" },
    ],
  },
  {
    key: "facebook-crafter",
    label: "sidebar.facebookCrafter",
    leftIcon: "ion-arrow-graph-up-right",
  },
  {
    key: "rabbit-ws",
    label: "Rabbit Ws",
    leftIcon: "ion-ios-paper",
  }
];
export default options;
