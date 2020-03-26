import PlatformTable from "src/RedButton/PlatformTable";
import BingTable from "src/RedButton/BingTable";


const platforms = [
  {
    name: "Bing Ads",
    apiUrl: "http://localhost:8003/api/",
    handler: BingTable,
    clientId: "6a18e453-8652-442b-9733-913913cc6a6a",
    redirectUrl: "http://localhost:3000/dashboard/red-button"
  },
  {
    name: "Google Ads",
    apiUrl: "http://localhost:8000/api/",
  },
  {
    name: "Yandex Direct",
    apiUrl: "http://localhost:8001/api/",
  },
  {
    name: "Facebook Ads",
    apiUrl: "http://localhost:8002/api/",
  },
];

export default platforms
