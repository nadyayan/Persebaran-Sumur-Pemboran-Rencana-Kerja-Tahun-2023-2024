// import modul
import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js";
import GeoJSONLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/GeoJSONLayer.js";
import Search from "https://js.arcgis.com/4.33/@arcgis/core/widgets/Search.js";
import Graphic from "https://js.arcgis.com/4.33/@arcgis/core/Graphic.js";
import Home from "https://js.arcgis.com/4.33/@arcgis/core/widgets/Home.js";
import Legend from "https://js.arcgis.com/4.33/@arcgis/core/widgets/Legend.js";
import Expand from "https://js.arcgis.com/4.33/@arcgis/core/widgets/Expand.js";
import BasemapGallery from "https://js.arcgis.com/4.33/@arcgis/core/widgets/BasemapGallery.js";

// Tampilan peta
const map = new Map({
  basemap: "hybrid"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [104, -3.5],
  zoom: 7,
});

// Layer titik (sumur bor)
const lokasiLayer = new GeoJSONLayer({
  url: "./KOORDEF.geojson",
  title: "Lokasi Sumur",
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: "red",
      size: 8,
      outline: { color: "white", width: 1 }
    }
  },
  popupTemplate: {
    title: "📍 {NAME}",
    content: `
      <div style="font-family: Arial, sans-serif; font-size:13px;">
        <div style="color: black; font-weight: bold; padding: 6px 10px; border-radius: 4px; margin-bottom: 8px; text-align: center;">
          LOKASI SUMUR
        </div>
        <b>Barrel Oil Per Day</b><hr style="margin:4px 0;">
        <table style="width:100%; border-collapse: collapse;">
          <tr><td><b>BOPD</b></td><td>: {BOPD}</td></tr>
        </table>
        <br>
        <b>WGS 84</b><hr style="margin:4px 0;">
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="width:90px;"><b>Easting</b></td><td>: {EASTING}</td></tr>
          <tr><td><b>Northing</b></td><td>: {NORTHING}</td></tr>
        </table>
        <br>
        <b>Bessel</b><hr style="margin:4px 0;">
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="width:90px;"><b>Easting</b></td><td>: {easting_1}</td></tr>
          <tr><td><b>Northing</b></td><td>: {northing_1}</td></tr>
        </table>
      </div>
    `
  }
});

// Layer area baru
const areaLayer = new GeoJSONLayer({
  url: "./ALL_BARU.geojson",
  title: "Wellpad Lokasi Baru",
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [0, 0, 255, 0.2],
      outline: { color: "blue", width: 2 }
    }
  },
  popupTemplate: {
    title: "🗺️ {NAMA_AREA}",
    content: `
      <div style="font-family: Arial, sans-serif; font-size:13px;">
        <div style="color: black; font-weight: bold; padding: 6px 10px; border-radius: 4px; margin-bottom: 8px; text-align: center;">
          WELLPAD 
        </div>
        <hr style="margin:4px 0;">
        <div style="margin-left:8px;">
          <table style="width:100%; border-collapse: collapse;">
            <tr><td><b>Nama</b></td><td>: {NAMA}</td></tr>
            <tr><td><b>Field</b></td><td>: {FIELD}</td></tr>
            <tr><td><b>Desa</b></td><td>: {DESA}</td></tr>
            <tr><td><b>Kecamatan</b></td><td>: {KECAMATAN}</td></tr>
            <tr><td><b>Kabupaten</b></td><td>: {KABUPATEN}</td></tr>
            <tr><td><b>Status Lahan</b></td><td>: {STATUS_LHN}</td></tr>
            <tr><td><b>Luas Lahan (M²)</b></td><td>: {LUAS_LHN(}</td></tr>
            <tr><td><b>Jumlah Pemilik</b></td><td>: {JMLH_PML}</td></tr>
            <tr><td><b>Tanggal Bayar</b></td><td>: {TGL_PMBYRN}</td></tr>
            <tr><td><b>Tahun RK</b></td><td>: {TAHUN_RK}</td></tr>
            <tr><td><b>Kontraktor</b></td><td>: {NAMA_KONTR}</td></tr>
            <tr><td><b>No. Kontraktor</b></td><td>: {NO_KONTRAK}</td></tr>
            <tr><td><b>Dok. Pembebasan</b></td><td>: <a href="{FILE}" target="_blank">📂 Buka</a></td></tr>
            <tr><td><b>Const. Report</b></td><td>: <a href="{SPK}" target="_blank">📂 Buka</a></td></tr>
          </table>
        </div>
      </div>
    `
  }
});

// Layer area eksisting
const areaLayer2 = new GeoJSONLayer({
  url: "./ALL_EKSISTING.geojson",
  title: "Wellpad Lokasi Eksisting",
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [0, 255, 0, 0.2],
      outline: { color: "green", width: 2 }
    }
  },
  popupTemplate: {
    title: "🗺️ {NAMA_AREA}",
    content: `
      <div style="font-family: Arial, sans-serif; font-size:13px;">
        <div style="color: black; font-weight: bold; padding: 6px 10px; border-radius: 4px; margin-bottom: 8px; text-align: center;">
          WELLPAD 
        </div>
        <hr style="margin:4px 0;">
        <div style="margin-left:8px;">
          <table style="width:100%; border-collapse: collapse;">
            <tr><td><b>Nama</b></td><td>: {NAMA}</td></tr>
            <tr><td><b>Field</b></td><td>: {FIELD}</td></tr>
            <tr><td><b>Desa</b></td><td>: {DESA}</td></tr>
            <tr><td><b>Kecamatan</b></td><td>: {KECAMATAN}</td></tr>
            <tr><td><b>Kabupaten</b></td><td>: {KABUPATEN}</td></tr>
            <tr><td><b>Status Lahan</b></td><td>: {STATUS_LHN}</td></tr>
            <tr><td><b>Tahun RK</b></td><td>: {TAHUN_RK}</td></tr>
            <tr><td><b>Kontraktor</b></td><td>: {NAMA_KONTR}</td></tr>
            <tr><td><b>No. Kontraktor</b></td><td>: {NO_KONTRAK}</td></tr>
            <tr><td><b>Dok Pembebasan</b></td><td>: <a href="{FILE}" target="_blank">📂 Buka</a></td></tr>
            <tr><td><b>Const. Report</b></td><td>: <a href="{SPK}" target="_blank">📂 Buka</a></td></tr>
          </table>
        </div>
      </div>
    `
  }
});

// Tambahkan layer ke peta
map.addMany([areaLayer, areaLayer2, lokasiLayer]);

// Widget Home
const homeWidget = new Home({
  view: view,
  title: "Jangkauan Default"
});
view.ui.add(homeWidget, { position: "top-right", index: 1 });

// Widget Zoom
view.ui.move("zoom", { position: "top-right", index: 2 });

// Widget Legend
const legend = new Legend({ view });
const expandLegend = new Expand({ 
  view: view, 
  content: legend, 
  expandTooltip: "Legenda" });
view.ui.add(expandLegend, { position: "top-right", index: 3 });

// Widget BasemapGallery
const basemapGallery = new BasemapGallery({ view });
const expandBasemap = new Expand({ 
  view:view, 
  content: basemapGallery, 
  expandTooltip: "Basemap" });
view.ui.add(expandBasemap, { position: "top-right", index: 4 });

// Search widget setelah layer siap
lokasiLayer.when(() => {
  const searchWidget = new Search({
    view: view,
    includeDefaultSources: false,
    sources: [{
      layer: lokasiLayer,
      searchFields: ["NAME"],
      displayField: "NAME",
      suggestionTemplate: "{NAME}",
      outFields: ["*"],
      name: "Lokasi Sumur",
      placeholder: "Cari lokasi sumur..."
    }]
  });

  const expandSearch = new Expand({
    view,
    content: searchWidget,
    expandIconClass: "esri-icon-search",
    expandTooltip: "Cari Lokasi Sumur"
  });

  view.ui.add(expandSearch, { position: "top-right", index: 0 });

  // Highlight hasil pencarian
  let highlightGraphic;
  searchWidget.on("select-result", (event) => {
    const feature = event.result.feature;
    if (highlightGraphic) view.graphics.remove(highlightGraphic);

    highlightGraphic = new Graphic({
      geometry: feature.geometry,
      symbol: { type: "simple-marker", color: "yellow", size: 16, outline: { color: "black", width: 2 } },
      attributes: feature.attributes,
      popupTemplate: lokasiLayer.popupTemplate
    });

    view.graphics.add(highlightGraphic);

    view.goTo({ target: feature.geometry, zoom: 16 }, { duration: 800 })
      .then(() => {
        view.popup.dockEnabled = false;
        view.popup.open({ features: [highlightGraphic], location: feature.geometry });
      })
      .catch(() => {
        view.popup.dockEnabled = false;
        view.popup.open({ features: [highlightGraphic], location: feature.geometry });
      });
  });
});

// Zoom ke extent titik
lokasiLayer.when(() => {
  if (lokasiLayer.fullExtent) view.goTo(lokasiLayer.fullExtent, { duration: 6000 });
});

// Popup tetap aktif saat klik layer
view.popup.autoOpenEnabled = true;

view.on("click", (event) => {
  view.hitTest(event).then((response) => {
    if (response.results.length > 0) {
      const feature = response.results[0].graphic;
      view.popup.dockEnabled = false;
      view.popup.open({ features: [feature], location: event.mapPoint });
    } else {
      view.popup.close();
    }
  });
});
