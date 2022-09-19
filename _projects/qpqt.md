---
layout: post
title: QPQT Steel Calculator
description: Calculadora para el rápido diseño de aceros de temple y particionado.
---


QPQT es una calculadora desarrollada como parte de mi tesis de maestría que tiene como finalidad facilitar y agilizar el diseño de aceros de temple y particionado (Q&P).

La calculadora tiene como entradas los porcentajes en peso de los elementos aleantes del acero teórico y calcula de forma inmediata las fracciones de fase, la temperatura ideal de temple y el porcentaje de carbono. 

<p align="center">
<img src="/assets/images/qpqt/ss.png" alt="screenshot qpqt" width="100%"/>
</p>

### Otras funciones

Asimismo, la calculadora tiene la posibilidad de graficar tanto la temperatura ideal de temple como la fracción maxima de austenita retenida con respecto al porcentaje de carbono de la aleación.

<p align="center">
<img src="/assets/images/qpqt/qttc.png" alt="screenshot qpqt" width="48%"/>
<img src="/assets/images/qpqt/qtta.png" alt="screenshot qpqt" width="48%"/>
</p>

### Funcionamiento

La calculadora se programo en Python con base en el método propuesto por [Speer et al.](https://doi.org/10.1016/S1359-6454(03)00059-4) para el particionado del carbono en aceros. 


El calculo de la temperatura de inicio de transformación martensítica ( $M_{s}$ ), así como el coeficiente $\alpha$ se hacen con base en las expresiones desarrolladas por [van Bohemen](https://doi.org/10.1179/1743284711Y.0000000097).


La interfaz gráfica se realizo con la paquetería Dash lo que da com resultado gráficas interactivas accesibles mediante un servidor web desde cualquier dispositivo:

<p align="center">
<img src="/assets/images/qpqt/zoom.gif" alt="screenshot qpqt" width="50%"/>
</p>

