import app from "./src/app.js";
import { connectToDB } from "./src/config/database.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectToDB();

app.listen(8080, (req, res) => {
  console.log("server is running on port 8080");
});
