---
layout: post
title: ¿cuándo un mapa deja de serlo?
description: Generador de mapas de méxico (pero feos)
---

###### ¿En qué momento un mapa deja de ser un mapa?, ¿en qué momento méxico que deja de ser méxico?


###### ¿Existe ese momento?



###### No sé, tú dime: 



<div id="observablehq-map-b7b285ad" align="center" style="width: auto; margin: 0 auto; box-sizing: border-box;"></div>

<div id="observablehq-viewof-roughness-b7b285ad"></div>
<div id="observablehq-viewof-fillWeight-b7b285ad"></div>
<div id="observablehq-viewof-hachureGap-b7b285ad"></div>
<div id="observablehq-viewof-bowing-b7b285ad"></div>
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
