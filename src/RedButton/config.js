import BingTable from "src/RedButton/BingTable";


const platforms = [
  {
    name: "Google Ads",
    apiUrl: "http://skyline.jo:8000/api/",
  },
  {
    name: "Yandex Direct",
    apiUrl: "http://skyline.jo:8001/api/",
  },
  {
    name: "Facebook Ads",
    apiUrl: "http://skyline.jo:8002/api/",
  },
  {
    name: "Bing Ads",
    apiUrl: "http://skyline.jo:8003/api/",
    handler: BingTable,
  },
];

export default platforms
