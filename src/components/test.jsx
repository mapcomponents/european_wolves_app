import React from "react";
import { MlVectorTileLayer } from "@mapcomponents/react-maplibre";

function LabelLayer() {
  return (
    <MlVectorTileLayer
      mapId="map_1"
      url="https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf"
      //layerId="labels"
      insertBeforeLayer="marker-labels"
      layers={{
        forestArea:{
          "id": "landcover-wood",
          "type": "fill",
          "metadata": {
            "mapbox:group": "1444849388993.3071"
          },
          "source": "openmaptiles",
          "source-layer": "landcover",
          "filter": [
            "==",
            "class",
            "wood"
          ],
          "paint": {
            "fill-color": "#6a4",
            "fill-opacity": 0.1,
            "fill-outline-color": "hsla(0, 0%, 0%, 0.03)",
            "fill-antialias": {
              "base": 1,
              "stops": [
                [
                  0,
                  false
                ],
                [
                  9,
                  true
                ]
              ]
            }
          }
        },
        roadLabels: {
          id: "road_major_label",
          type: "symbol",
          "source-layer": "transportation_name",
          filter: ["all", ["==", "$type", "LineString"]],
          layout: {
            "symbol-placement": "line",
            "text-field": "{name:latin} {name:nonlatin}",
            "text-font": ["Klokantech Noto Sans Regular"],
            "text-transform": "uppercase",
            "text-letter-spacing": 0.1,
            "text-size": {
              base: 1.6,
              stops: [
                [10, 8],
                [20, 14],
              ],
            },
            "text-rotation-alignment": "map",
          },
          paint: {
            "text-color": "#000",
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 2,
          },
        },
        highways_minor: {
          id: "highway-name-minor-en",
          type: "symbol",
          "source-layer": "transportation_name",
          minzoom: 15,
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["in", "class", "minor", "service", "track"],
          ],
          layout: {
            "text-size": {
              base: 1,
              stops: [
                [13, 12],
                [14, 13],
              ],
            },
            "text-font": ["Open Sans Regular"],
            "text-field": "{name:de} {name:nonlatin}",
            "symbol-placement": "line",
            "text-rotation-alignment": "map",
          },
          paint: {
            "text-halo-blur": 0.5,
            "text-color": "#765",
            "text-halo-width": 1,
          },
        },
        highways_major: {
          id: "highway-name-major",
          type: "symbol",

          "source-layer": "transportation_name",
          minzoom: 12.2,
          filter: [
            "all",
            ["in", "class", "primary", "secondary", "tertiary", "trunk"],
          ],
          layout: {
            "text-size": {
              base: 1,
              stops: [
                [13, 12],
                [14, 13],
              ],
            },
            "text-font": ["Open Sans Regular"],
            "text-field": "{name:latin} {name:nonlatin}",
            "symbol-placement": "line",
            "text-rotation-alignment": "map",
          },
          paint: {
            "text-halo-blur": 0.5,
            "text-color": "#765",
            "text-halo-width": 1,
          },
        },
        highways_shield: {
          id: "highway-shield",
          type: "symbol",

          "source-layer": "transportation_name",
          minzoom: 10,
          filter: [
            "all",
            ["<=", "ref_length", 6],
            ["==", "$type", "LineString"],
          ],
          layout: {
            "text-size": [
              "interpolate",
              ["exponential", 0.5],
              ["zoom"],
              10,
              10,
              20,
              14,
            ],
            "icon-image": "road_{ref_length}",
            "icon-rotation-alignment": "viewport",
            "symbol-spacing": 200,
            "text-font": ["Open Sans Semibold"],
            "symbol-placement": {
              base: 1,
              stops: [
                [10, "point"],
                [11, "line"],
              ],
            },
            "text-rotation-alignment": "viewport",
            "icon-size": 1,
            "text-field": "{ref}",
          },
          paint: {},
        },
        highways_name_path: {
          id: "highway-name-path",
          type: "symbol",

          "source-layer": "transportation_name",
          minzoom: 15.5,
          filter: ["all", ["==", "class", "path"]],
          layout: {
            "text-size": {
              base: 1,
              stops: [
                [13, 12],
                [14, 13],
              ],
            },
            "text-font": ["Open Sans Regular"],
            "text-field": "{name:latin} {name:nonlatin}",
            "symbol-placement": "line",
            "text-rotation-alignment": "map",
          },
          paint: {
            "text-halo-color": "#f8f4f0",
            "text-color": "hsl(30, 23%, 62%)",
            "text-halo-width": 0.5,
          },
        },
        place_other: {
          id: "place-other",
          type: "symbol",

          "source-layer": "place",
          filter: ["all", ["!in", "class", "city", "town", "village"]],
          layout: {
            "text-letter-spacing": 0.1,
            "text-size": {
              base: 1.2,
              stops: [
                [12, 10],
                [15, 14],
              ],
            },
            "text-font": ["Open Sans Bold"],
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-transform": "uppercase",
            "text-max-width": 9,
          },
          paint: {
            "text-color": "#633",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)",
          },
        },
        place_village: {
          id: "place-village",
          type: "symbol",
          metadata: {
            "mapbox:group": "1444849242106.713",
          },

          "source-layer": "place",
          filter: ["all", ["==", "class", "village"]],
          layout: {
            "text-font": ["Open Sans Regular"],
            "text-size": {
              base: 1.2,
              stops: [
                [10, 12],
                [15, 22],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-max-width": 8,
          },
          paint: {
            "text-color": "#333",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)",
          },
        },
        place_town: {
          id: "place-town",
          type: "symbol",
          metadata: {
            "mapbox:group": "1444849242106.713",
          },

          "source-layer": "place",
          filter: ["all", ["==", "class", "town"]],
          layout: {
            "text-font": ["Open Sans Regular"],
            "text-size": {
              base: 1.2,
              stops: [
                [10, 14],
                [15, 24],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-max-width": 8,
          },
          paint: {
            "text-color": "#333",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)",
          },
        },
        place_city: {
          id: "place-city",
          type: "symbol",
          metadata: {
            "mapbox:group": "1444849242106.713",
          },

          "source-layer": "place",
          filter: ["all", ["!=", "capital", 2]],
          layout: {
            "text-font": ["Open Sans Semibold"],
            "text-size": {
              base: 1.2,
              stops: [
                [7, 14],
                [11, 24],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-max-width": 8,
          },
          paint: {
            "text-color": "#333",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)",
          },
        },
        place_city_capital: {
          id: "place-city-capital",
          type: "symbol",
          metadata: {
            "mapbox:group": "1444849242106.713",
          },

          "source-layer": "place",
          filter: ["all", ["==", "capital", 2], ["==", "class", "city"]],
          layout: {
            "text-font": ["Open Sans Semibold"],
            "text-size": {
              base: 1.2,
              stops: [
                [7, 14],
                [11, 24],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-max-width": 8,
            "icon-image": "star_11",
            "text-offset": [0.4, 0],
            "icon-size": 0.8,
            "text-anchor": "left",
          },
          paint: {
            "text-color": "#333",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)",
          },
        },
        waterways: {
          id: "waterway-name",
          type: "symbol",
          "source-layer": "waterway",
          minzoom: 13,
          filter: ["all", ["==", "$type", "LineString"]],
          layout: {
            "text-font": ["Open Sans Italic"],
            "text-size": 14,
            "text-field": "{name:latin} {name:nonlatin}",
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "line",
            "text-letter-spacing": 0.2,
            "symbol-spacing": 350,
          },
          paint: {
            "text-color": "#333",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.8)",
          },
        },
        lakes: {
          id: "water-name-lakeline",
          type: "symbol",

          "source-layer": "water_name",
          filter: ["all", ["==", "$type", "LineString"]],
          layout: {
            "text-font": ["Open Sans Italic"],
            "text-size": 14,
            "text-field": "{name:latin} {name:nonlatin}",
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "line",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2,
          },
          paint: {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)",
          },
        },
        water_other: {
          id: "water-name-other",
          type: "symbol",
          "source-layer": "water_name",
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["!in", "class", "ocean"],
            ["!has", "name:de"],
          ],
          layout: {
            "text-font": ["Open Sans Italic"],
            "text-size": {
              stops: [
                [0, 10],
                [6, 14],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "point",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2,
            visibility: "visible",
          },
          paint: {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)",
          },
        },
        poi_level1: {
          id: "poi-level-1",
          type: "symbol",
          "source-layer": "poi",
          minzoom: 14,
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["all", ["<=", "rank", 14], ["has", "name"]],
          ],
          layout: {
            "text-padding": 2,
            "text-font": ["Open Sans Semibold"],
            "text-anchor": "top",
            "icon-image": "{class}_11",
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-offset": [0, 0.6],
            "text-size": 12,
            "text-max-width": 9,
          },
          paint: {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff",
          },
        },
      }}
      sourceOptions={{ minzoom: 0, maxzoom: 14 }}
    />
  );
}

export default LabelLayer;
