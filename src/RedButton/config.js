import PlatformTable from "src/RedButton/PlatformTable";
import BingTable from "src/RedButton/BingTable";


const platforms = [
  {
    name: "Bing Ads",
    apiUrl: "http://localhost:8003/api/",
    handler: BingTable,
  },
  {
    name: "Google Ads",
    apiUrl: "http://localhost:8000/api/",
    handler: PlatformTable,
  },
  {
    name: "Yandex Direct",
    apiUrl: "http://localhost:8001/api/",
    handler: PlatformTable,
  },
  {
    name: "Facebook Ads",
    apiUrl: "http://localhost:8002/api/",
    handler: PlatformTable,
  },
];

export default platforms
