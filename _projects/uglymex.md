---
layout: post
title: Ugly Mexico Map Gen
description: Generador de mapas de méxico (pero feos)
---

### Tú también puedes hacer tu propio mapa de méxico (feo): 



<div id="observablehq-map-b7b285ad" align="center" style="width: 100%; margin: 0 auto; box-sizing: border-box;"></div>

Muevele aquí, muevele allá.

<div id="observablehq-viewof-fillWeight-b7b285ad"></div>
<div id="observablehq-viewof-hachureGap-b7b285ad"></div>
<div id="observablehq-viewof-bowing-b7b285ad"></div>
<div id="observablehq-viewof-roughness-b7b285ad"></div>
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/d/76d838853470aad8.js?v=3";
new Runtime().module(define, name => {
  if (name === "map") return new Inspector(document.querySelector("#observablehq-map-b7b285ad"));
  if (name === "viewof fillWeight") return new Inspector(document.querySelector("#observablehq-viewof-fillWeight-b7b285ad"));
  if (name === "viewof hachureGap") return new Inspector(document.querySelector("#observablehq-viewof-hachureGap-b7b285ad"));
  if (name === "viewof bowing") return new Inspector(document.querySelector("#observablehq-viewof-bowing-b7b285ad"));
  if (name === "viewof roughness") return new Inspector(document.querySelector("#observablehq-viewof-roughness-b7b285ad"));
});
</script>
