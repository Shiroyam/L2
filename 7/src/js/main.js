import L from "leaflet";
import { InfoMarker } from "./info";
import { EditMarker } from "./edit";
import { Marker } from "./marker";
import { Popup } from "./popup";
import { List } from "./list";
import { LocalStorageMarker } from "./localStorage";
import { Utils } from "./utils";

const infoMarker = InfoMarker();
const editMarker = EditMarker();
const localDB = LocalStorageMarker();
const list = List();
const popup = Popup();
const marker = Marker();
const utils = Utils();

if (!localDB.get("markers")) {
  localDB.create("markers", []);
}

const map = L.map("map").setView([55.751244, 37.618423], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

list.show(marker.markers, map);

const handleClickMap = (e) => {
  const latlng = e.latlng;

  popup.markerForm(latlng, map);

  list.show(marker.markers, map);

  const form = document.querySelector("#form-create");
  form.addEventListener("submit", (event) => handleCreate(event, latlng));
};

map.on("click", handleClickMap);

const handleCreate = (e, latlng) => {
  e.preventDefault();

  const type = document.querySelector("#marker-type").value;
  const name = document.querySelector("#marker-name").value;
  const description = document.querySelector("#marker-description").value;
  const color = document.querySelector("#marker-color").value;
  const id = utils.createIdArray(marker.markers);

  const data = { type, name, description, color, id };

  const _marker = marker.create(latlng, data, map);

  _marker.on("click", () => {
    handleInfo(_marker);
    handleEdit(_marker);
  });

  _marker.on("dragend", () => {
    handleDragend(_marker, latlng);
  });

  marker.addItem(_marker);

  list.show(marker.markers, map);

  localDB.addItem("markers", { ...data, latlng });

  popup.close();
};

const handleInfo = (_marker) => {
  infoMarker.show(_marker);

  const cancel = document.querySelector("#info-cancel");
  cancel.addEventListener("click", () => list.show(marker.markers, map));

  const remove = document.querySelector("#info-remove");
  remove.addEventListener("click", () => {
    _marker.remove();
    localDB.removeItem("markers", _marker.id);
    marker.removeItem(_marker.id)
    list.show(marker.markers, map);
  });
};

const handleEdit = (_marker) => {
  const edit = document.querySelector("#info-edit");
  edit.addEventListener("click", () => {
    editMarker.show();
    editMarker.populate(_marker);

    const save = document.querySelector("#save-edit");
    save.addEventListener("click", () => {
      editMarker.change(_marker);
      list.show(marker.markers, map);
    });

    const cancel = document.querySelector("#cancel-edit");
    cancel.addEventListener("click", () => list.show(marker.markers, map));
  });
};

const handleDragend = (_marker) => {
  const obj = localDB.get("markers");

  obj.forEach((value) => {
    if (value.id === _marker.id) {
      const { dataset } = document.querySelector(`#marker-list-${_marker.id}`);

      value.latlng.lat = _marker._latlng.lat;
      value.latlng.lng = _marker._latlng.lng;
      dataset.lng = _marker._latlng.lng;
      dataset.lat = _marker._latlng.lat;
    }
  });

  localStorage.setItem("markers", JSON.stringify(obj));
};

const showMarkers = (data) => {
  const _marker = marker.create(
    data.latlng,
    {
      type: data.type,
      name: data.name,
      description: data.description,
      color: data.color,
      id: data.id,
    },
    map
  );

  _marker.on("click", () => {
    handleInfo(_marker);
    handleEdit(_marker);
  });

  _marker.on("dragend", () => {
    handleDragend(_marker, data.latlng);
  });

  marker.addItem(_marker);

  list.show(marker.markers, map);
};

if (localDB.get("markers")) {
  localDB.get("markers").forEach((marker) => {
    showMarkers(marker);
  });
}
