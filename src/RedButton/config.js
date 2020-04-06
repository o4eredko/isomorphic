import BingTable from "src/RedButton/BingTable";


const platforms = {
  google: {
    name: "Google Ads",
    apiUrl: "http://skyline.jo:8000/api/",
  },
  yandex: {
    name: "Yandex Direct",
    apiUrl: "http://skyline.jo:8001/api/",
  },
  facebook: {
    name: "Facebook Ads",
    apiUrl: "http://skyline.jo:8002/api/",
  },
  bing: {
    name: "Bing Ads",
    apiUrl: "http://skyline.jo:8003/api/",
    handler: BingTable,
  },
};

export default platforms
