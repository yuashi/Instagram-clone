import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js";

//app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1267478",
  key: "ed2848a3ed3ef27c8b82",
  secret: "310f9a3676fca2f9d944",
  cluster: "ap2",
  useTLS: true,
});

//middlewares
app.use(express.json());
app.use(cors());

//db config
const connection_url =
  "mongodb+srv://ayushi:jiTuYnVoDHlwayYW@cluster0.vystc.mongodb.net/instaDB?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");

  const changeStream = mongoose.connection.collection("posts").watch();

  changeStream.on("change", (change) => {
    console.log("ChangeStream triggered.....");
    console.log(change);
    console.log("Changed !");

    if (change.operationType === "insert") {
      console.log("Uploading image to mongodb");
      const postDetails = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      });
    } else {
      console.log("Error triggering the pusher");
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));
app.post("/upload", (req, res) => {
  const dbObj = req.body;
  dbModel.create(dbObj, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));

//jiTuYnVoDHlwayYW
