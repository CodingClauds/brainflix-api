// Imports
const express = require("express");
const router = express.Router();
const fs = require("fs"); // Read and Write files
const { v4: uuidv4 } = require("uuid"); // Creates Random ID

// Filepath to .json data, this will have the source of truth and persist data as well!
const videoFilePath = "./data/videos.json";

// Parse Function that will allows us to convert data from String to an object, so we can use in javascript.
const readVideoDetails = () => {
  return JSON.parse(fs.readFileSync(videoFilePath));
};

// const readVideoDetails = JSON.parse(fs.readFileSync(videoFilePath));

const writeNewVideo = (addedVideo) => {
  // Get existing videos that are in the .json file.
  let existingVideos = readVideoDetails();

  existingVideos.push(addedVideo);

  let updatedVideos = JSON.stringify(existingVideos);
  console.log(updatedVideos);
  fs.writeFileSync(videoFilePath, updatedVideos);
};

// Get all Videos
router.route("/").get((req, res) => {
  res.send(readVideoDetails());
});

// Getting one Video with :id
router.route("/:id").get((req, res) => {
  const selectVideoId = req.params.id;

  const foundVideo = readVideoDetails().find(
    (video) => video.id === selectVideoId
  );
  res.send(foundVideo);
});

// Creating one Video and persisting it to database
router.route("/").post((req, res) => {
  const videoObject = {
    id: uuidv4(),
    title: req.body.title,
    channel: "",
    image: "http://localhost:8080/images/image5.jpeg",
    description: req.body.description,
    views: "",
    likes: "",
    duration: "",
    video: "",
    timestamp: new Date(),
    comments: [
      {
        name: "Martin Evergreen",
        comment:
          "I’ve loved trains ever since I was a child. I dreamed about riding one around the world. This is the most fantastic thing I’ve seen yet, and I’m watching it ON a train!",
        likes: 3,
        timestamp: 1632512763000,
      },
      {
        name: "Emily Harper",
        comment:
          "Let’s collaborate on a video for saving money on cheap train tickets! I’ll have my associates contact yours.",
        likes: 0,
        timestamp: 1632496261000,
      },
    ],
  };
  writeNewVideo(videoObject);

  // Success status when new video is posted
  res.status(201).send("Added Content");
});

module.exports = router;
