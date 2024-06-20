const express = require("express")
const cors = require("cors")
const rootRouterV1 = require("./routes")

const app = express();

app.use(cors());
app.use(express.json());

app.post("/health", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.use("/api/v1", rootRouterV1);

/* Starting the express server */
app.listen(process.env.PORT, (err) => {
  console.log(err || `Server is running on port ${process.env.PORT}`);
});
