import GlitchedWriter, {
  wait
} from "https://cdn.skypack.dev/glitched-writer@2.0.29";

// Glitched Writer npm module:
// https://www.npmjs.com/package/glitched-writer

const Writer = new GlitchedWriter('#glitch_this', { letterize: true }, logString);

(async  ()=> {
  await wait(1000);
  await Writer.write("my old friend.");
  
  await wait(1200);
  await Writer.write("This is only the beginning.");
  
  await wait(1500);
  await Writer.write("Please, say something...");
  
  input.removeAttribute("disabled");
})();

function logString(string) {
  logs.innerHTML += `<p>${string}</p>`;
}

input.addEventListener(
  "input",
  _.debounce(() => 
    Writer.write(input.value)
  , 500)
);
