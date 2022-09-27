import GlitchedWriter, {
  wait
} from "https://cdn.skypack.dev/glitched-writer@2.0.29";

// Glitched Writer npm module:
// https://www.npmjs.com/package/glitched-writer

const Writer = new GlitchedWriter('#glitch_this', { letterize: true }, logString);
writer.endless(true)
(async  ()=> {
  await wait(1000);
  await Writer.write("capas");
  
  await wait(1200);
  await Writer.write("m̸̢̡̧̗̪͕̳͖̺̞̺͈̼̝̖͎̜̤̙͉͇̀̀̓̿̐̆̌̄͆͛͌̈́͊͌̈́͘͝ͅǎ̸͖̩̳̲̩̰̘͓͚͓͔̟̞̦̲͓̖͕͔͙̉̌͛̐̐̀͘͘͜͝p̵͉̌̅̃̅̋̀̌͠͠ą̵̰͙̯̖̖̜̹̤̥̖̣̰̥̰͖̗̫̓͌̒̅ͅs̵̡̺͓͔̩̩͇̻̺̮̖̤̺̹̗͕̬̦̅̉̊̌̈́̈́̒͆̓̃̐͝");
  
  await wait(1500);
  await Writer.write("datos");
  
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
