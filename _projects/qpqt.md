---
layout: post
title: QPQT: Quench Partitioning Quench Temperature Calculator
description: Calculadora de fracciones de fase y temperaturas de temple para el diseño de aceros de temple y particionado.
---

QPQT es una calculadora desarrollada como parte de mi tesis de maestría que tiene como finalidad facilitar y agilizar el diseño de aceros de temple y particionado (Q&P).

La calculadora tiene como entradas los porcentajes en peso del acero teórico y calcula de forma inmediata las fracciones de fase, la temperatura ideal de temple y el porcentaje de carbono. 

Asimismo, tiene la posibilidad de graficar tanto la temperatura ideal de temple como la fracción maxima de austenita retenida con respecto al porcentaje de carbono de la aleación.

### Funcionamiento

La calculadora se programo en Python con base en el método propuesto por [Speer et al.](https://doi.org/10.1016/S1359-6454(03)00059-4) para el particionado del carbono en aceros. 

El calculo de la temperatura de inicio de transformación martensítica ( $M_{s}$ ), así como el coeficiente $\alpha$ se hacen con base en las expresiones desarrolladas por [van Bohemen](https://doi.org/10.1179/1743284711Y.0000000097).
