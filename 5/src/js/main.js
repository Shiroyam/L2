import WaveSurfer from "wavesurfer.js";
import * as tracksHTML from "./tracks.js";
import * as playlistsHTML from "./playlist.js";
import data from "../data.json";

playlistsHTML.render(data.playlists);
tracksHTML.render(data.playlists[0].tracks);

document.querySelectorAll(".playlist").forEach((value) => {
  value.addEventListener("click", () => {
    tracksHTML.render(data.playlists[value.id].tracks);
  })
});

const audioPlayer = document.getElementById("audioPlayer");

const tracks = document.getElementById("tracks");

const controls = document.querySelector("#controls")

const wavesurfer = WaveSurfer.create({
  height: 150,
  container: "#waveform",
  waveColor: "#c8c9ca",
  progressColor: "#0b0b0b",
  cursorColor: "#adaeae",
  media: audioPlayer,
});

tracks.addEventListener("click", async (event) => {
  const target = event.target;
  const trackUrl = target.getAttribute("data-src");
  controls.style.display = "block"

  audioPlayer.src = trackUrl;

  await wavesurfer.load(trackUrl);
  audioPlayer.play();
});
