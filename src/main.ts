import "./style.css";

async function load() {
  const [Bookmarks, Expand, MapView, WebMap] = await window.$arcgis.import<
    [typeof __esri.Bookmarks, typeof __esri.Expand, typeof __esri.MapView, typeof __esri.WebMap]
  >([
    "@arcgis/core/widgets/Bookmarks.js",
    "@arcgis/core/widgets/Expand.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/WebMap.js",
  ]);

  const webmap = new WebMap({
    portalItem: {
      id: "e691172598f04ea8881cd2a4adaa45ba", // World Topographic Map
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap,
  });

  const bookmarks = new Bookmarks({
    view: view,
    editingEnabled: true,
  } as __esri.BookmarksProperties);

  const expand = new Expand({
    view: view,
    content: bookmarks,
    expanded: true,
  });

  view.ui.add(expand, "top-right");

  // bonus - how many bookmarks in the webmap?
  view.when(() => {
    if (webmap.bookmarks && webmap.bookmarks.length) {
      console.log("Bookmarks: ", webmap.bookmarks.length);
    } else {
      console.log("No bookmarks in this webmap.");
    }
  });
}

load();
