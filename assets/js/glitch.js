import GlitchedWriter, {
  wait
} from "https://cdn.skypack.dev/glitched-writer@2.0.29";

// Glitched Writer npm module:
// https://www.npmjs.com/package/glitched-writer

const Writer = new GlitchedWriter('#glitch_this', { letterize: true });
(async  ()=> {
  Writer.endless(true);
  
  await wait(1000);
  await Writer.write("capas");
  
  await wait(1200);
  await Writer.write("mapas");
  
  await wait(1500);
  await Writer.write("datos");
  
})();
