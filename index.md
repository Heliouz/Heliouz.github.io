---
layout: about
permalink: /
profile:
  align: right
  image: profile.png
published: true
---

<script>
var speed = 1;

/* Call this function with a string containing the ID name to
 * the element containing the number you want to do a count animation on.*/
function incEltNbr(id) {
  elt = document.getElementById(id);
  endNbr = Number(document.getElementById(id).innerHTML);
  incNbrRec(500, endNbr, elt);
}

/*A recursive function to increase the number.*/
function incNbrRec(i, endNbr, elt) {
  if (i <= endNbr) {
    elt.innerHTML = i;
    setTimeout(function() {//Delay a bit before calling the function again.
      incNbrRec(i + 1, endNbr, elt);
    }, speed);
  }
}

/*Function called on button click*/
function incNbr(){
  incEltNbr("nbr");
}

incEltNbr("nbr"); /*Call this funtion with the ID-name for that element to increase the number within*/
</script>
  
Ingeniero mecánico y maestro en ciencia e ingeniería de materiales por la UNAM. Mi especialidad son los materiales metálicos y me dedico a estudiar aceros avanzados. Actualmente estoy investigando sobre aceros de temple y particionado en la UPC, en Barcelona.

También divulgo sobre ciencia e ingeniería en [TikTok](https://www.tiktok.com/@heliouz_){:target="_blank"}, donde tengo más de <b id="nbr">910</b>__k__ seguidores. Desde [por qué se encogen los billetes de $20 pesos al calentarse](https://www.sdpnoticias.com/estilo-de-vida/por-que-se-encoge-un-billete-de-20-pesos-al-calentarse-cientifico-lo-explica/){:target="_blank"}, hasta los diferentes procesos de soldadura. 

>Seguro tengo un video que lo explica.

En mis ratos libres y no tan libres también programo en python, donde he hecho [bots de twitter](https://twitter.com/BigakuSan){:target="_blank"}, aplicaciones para diseñar aleaciones de aceros avanzados y hasta mapas de México.
