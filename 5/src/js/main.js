import WaveSurfer from "wavesurfer.js";
import { Track } from "./tracks.js";
import { Playlist } from "./playlist.js";
import data from "../data.json";

const track = Track()
const playlist = Playlist()

playlist.render(data.playlists);
track.render(data.playlists[0].tracks);

document.querySelectorAll(".playlist").forEach((value) => {
  value.addEventListener("click", () => {
    track.render(data.playlists[value.id].tracks);
  })
});

const audioPlayer = document.querySelector("#audioPlayer");
const tracks = document.querySelector("#tracks");
const controls = document.querySelector("#controls")

const wavesurfer = WaveSurfer.create({
  height: 150,
  container: "#waveform",
  waveColor: "#c8c9ca",
  progressColor: "rgb(25, 118, 210)",
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
