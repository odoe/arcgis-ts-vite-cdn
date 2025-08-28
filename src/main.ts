import "./style.css";

import type Bookmarks_ from "@arcgis/core/widgets/Bookmarks";
import type Expand_ from "@arcgis/core/widgets/Expand";
import type MapView_ from "@arcgis/core/views/MapView";
import type WebMap_ from "@arcgis/core/WebMap";

async function load() {
  const [Bookmarks, Expand, MapView, WebMap] = await window.$arcgis.import<
    [typeof Bookmarks_, typeof Expand_, typeof MapView_, typeof WebMap_]
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
