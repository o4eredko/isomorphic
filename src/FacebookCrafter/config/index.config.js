export default {
  pingUrl: "http://skyline.jo:8888/ping",
  httpUrl: "http://skyline.jo:8888/graphql/",
  wsUrl: "ws://skyline.jo:8888/graphql/",
  csvFields: {
    required: ["city", "adset_name", "ad_title", "ad_url"],
    nonRequired: ["creative_display_url"],
  }
}
