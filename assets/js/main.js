/* PAGE SWITCHING */
var pageMap = { home: 'page-home', projects: 'page-projects', pubs: 'page-pubs', contact: 'page-contact' };
var navIdx = { home: 0, pubs: 1, projects: 2, contact: 3 };
var currentLang = 'es';

function showPage(key, options) {
  if (!pageMap[key]) return;

  Object.values(pageMap).forEach(function(id) {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById(pageMap[key]).classList.add('active');
  document.querySelectorAll('.h-nav a').forEach(function(a) {
    a.classList.remove('active');
  });
  document.querySelectorAll('.h-nav a')[navIdx[key]].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(triggerReveal, 80);

  if (!options || options.updateHash !== false) {
    setPageHash(key);
  }
}

function setPageHash(key) {
  var target = '#' + key;
  if (window.location.hash !== target) {
    history.pushState(null, '', target);
  }
}

/* SCROLL REVEAL */
function triggerReveal() {
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.page-view.active .reveal, .page-view.active .reveal-group').forEach(function(el) {
    el.classList.remove('visible');
    io.observe(el);
  });
}
setTimeout(triggerReveal, 60);

/* MODAL */
var lastModalCard = null;

function openModal(el, options) {
  options = options || {};
  lastModalCard = el;
  var lang = currentLang;

  var projectId = el.getAttribute('data-id');
  var simulator = el.getAttribute('data-simulator');
  var isStampAlbum = simulator === 'stamp_album';
  var type = el.getAttribute('data-type-' + lang) || el.getAttribute('data-type-es');
  var year = el.getAttribute('data-year');
  var title = el.getAttribute('data-title-' + lang) || el.getAttribute('data-title-es');
  var desc = el.getAttribute('data-desc-' + lang) || el.getAttribute('data-desc-es');
  var tags = el.getAttribute('data-tags-' + lang) || el.getAttribute('data-tags-es');
  var imgAlt = el.getAttribute('data-image-alt');
  var link = el.getAttribute('data-link');
  var linkLbl = el.getAttribute('data-link-label-' + lang) || el.getAttribute('data-link-label-es');
  var linkOff = el.getAttribute('data-link-disabled') === 'true';
  var embed = el.getAttribute('data-embed');

  var imagesRaw = el.getAttribute('data-images');
  var images = [];
  try { images = JSON.parse(imagesRaw) || []; } catch(e) { images = []; }

  var sectionsRaw = el.getAttribute('data-sections-' + lang) || el.getAttribute('data-sections-es');
  var sections = [];
  try { sections = JSON.parse(sectionsRaw) || []; } catch(e) { sections = []; }

  document.getElementById('modal-type').textContent = type;
  document.getElementById('modal-year').textContent = year;
  document.querySelector('.modal').classList.toggle('modal-simulator', isStampAlbum);

  var html = '<h2 class="modal-title">' + title + '</h2>';
  html += '<p class="modal-desc">' + desc + '</p>';

  if (tags) {
    var tagsArr = tags.split(',');
    html += '<div class="modal-tags">';
    tagsArr.forEach(function(t) {
      html += '<span class="modal-tag">' + t.trim() + '</span>';
    });
    html += '</div>';
  }

  if (isStampAlbum) {
    html += renderStampAlbumSimulator(lang);
  } else {
    if (images.length > 0) {
      var i = 0;
      while (i < images.length) {
        var img = images[i];
        if (img.group) {
          var groupName = img.group;
          html += '<div class="modal-image-row">';
          while (i < images.length && images[i].group === groupName) {
            html += '<img class="modal-image" src="' + images[i].src + '" alt="' + (images[i].alt || '') + '" loading="lazy">';
            i++;
          }
          html += '</div>';
        } else {
          html += '<img class="modal-image" src="' + img.src + '" alt="' + (img.alt || '') + '" loading="lazy">';
          i++;
        }
      }
    } else if (embed && embed !== '' && embed !== 'null') {
      html += '<div class="modal-embed"><iframe src="' + embed + '" allowfullscreen loading="lazy"></iframe></div>';
    } else if (imgAlt) {
      html += '<div class="modal-image-placeholder"><span>' + imgAlt + '</span></div>';
    }

    sections.forEach(function(s) {
      html += '<div class="modal-section-label">' + s.label + '</div>';
      html += '<div class="modal-detail"><p>' + s.text + '</p></div>';
    });

    if (linkLbl) {
      var disabled = linkOff ? ' disabled' : '';
      var href = (link && link !== '' && link !== 'null') ? link : '#';
      var target = !linkOff ? ' target="_blank"' : '';
      html += '<a class="modal-link' + disabled + '" href="' + href + '"' + target + '>' + linkLbl + '</a>';
    }
  }

  document.getElementById('modal-body').innerHTML = html;
  document.querySelector('.modal').scrollTop = 0;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  if (isStampAlbum) {
    initStampAlbumSimulator();
  }

  if (options.updateHash !== false && projectId) {
    setProjectHash(projectId);
  }
}

function closeModal(options) {
  options = options || {};
  var overlay = document.getElementById('modal-overlay');
  var wasOpen = overlay.classList.contains('open');

  overlay.classList.remove('open');
  document.querySelector('.modal').classList.remove('modal-simulator');
  document.body.style.overflow = '';
  lastModalCard = null;
  cancelStampAlbumSimulation();

  if (wasOpen && options.updateHash !== false && getHashRoute()[0] === 'projects' && getHashRoute()[1]) {
    history.pushState(null, '', '#projects');
  }
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

function setProjectHash(projectId) {
  var target = '#projects/' + projectId;
  if (window.location.hash !== target) {
    history.pushState(null, '', target);
  }
}

function getHashRoute() {
  var raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return [];
  try { raw = decodeURIComponent(raw); } catch(e) {}
  return raw.split('/').filter(Boolean);
}

function findProjectCard(projectId) {
  var cards = document.querySelectorAll('.proj-card[data-id]');
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute('data-id') === projectId) return cards[i];
  }
  return null;
}

function handleHashRoute() {
  var route = getHashRoute();
  if (!route.length) {
    if (document.getElementById('modal-overlay').classList.contains('open')) {
      closeModal({ updateHash: false });
    }
    showPage('home', { updateHash: false });
    return;
  }

  var page = route[0];
  var projectId = route[1];

  if (pageMap[page]) {
    showPage(page, { updateHash: false });
  }

  if (page === 'projects' && projectId) {
    var card = findProjectCard(projectId);
    if (card) {
      setTimeout(function() {
        openModal(card, { updateHash: false });
      }, 90);
    }
  } else if (document.getElementById('modal-overlay').classList.contains('open')) {
    closeModal({ updateHash: false });
  }
}

window.addEventListener('hashchange', handleHashRoute);
window.addEventListener('popstate', handleHashRoute);

/* STAMP ALBUM SIMULATOR */
var stampAlbumConfig = {
  totalStamps: 980,
  stampsPerPack: 7,
  pricePerPack: 25,
  runs: 8000,
  seed: 42,
  sliderScale: 3
};

var stampAlbumState = {
  exchanged: 0,
  timer: null,
  job: 0
};

var stampAlbumComparisonData = [
  [0, 0, 25375, 34375], [1, 10, 15850, 17675], [2, 20, 13550, 14850],
  [3, 29, 12275, 13325], [4, 39, 11250, 12125], [5, 49, 10450, 11225],
  [6, 59, 9825, 10500], [7, 69, 9275, 9900], [8, 78, 8850, 9425],
  [9, 88, 8425, 8950], [10, 98, 8050, 8550], [11, 108, 7725, 8175],
  [12, 118, 7400, 7850], [13, 127, 7150, 7550], [14, 137, 6875, 7275],
  [15, 147, 6650, 7025], [16, 157, 6400, 6750], [17, 167, 6200, 6525],
  [18, 176, 6025, 6325], [19, 186, 5825, 6125], [20, 196, 5650, 5925],
  [21, 206, 5475, 5750], [22, 216, 5300, 5550], [23, 225, 5150, 5400],
  [24, 235, 5000, 5250], [25, 245, 4850, 5100], [26, 255, 4725, 4950],
  [27, 265, 4575, 4800], [28, 274, 4475, 4675], [29, 284, 4350, 4550],
  [30, 294, 4225, 4425], [31, 304, 4100, 4300], [32, 314, 4000, 4175],
  [33, 323, 3900, 4075], [34, 333, 3775, 3950], [35, 343, 3675, 3850],
  [36, 353, 3575, 3750], [37, 363, 3475, 3650], [38, 372, 3400, 3550],
  [39, 382, 3300, 3450], [40, 392, 3225, 3350], [41, 402, 3125, 3250],
  [42, 412, 3050, 3175], [43, 421, 2975, 3100], [44, 431, 2875, 3000],
  [45, 441, 2800, 2925], [46, 451, 2725, 2850], [47, 461, 2650, 2775],
  [48, 470, 2575, 2700], [49, 480, 2500, 2625], [50, 490, 2425, 2550],
  [51, 500, 2375, 2475], [52, 510, 2300, 2400], [53, 519, 2225, 2325],
  [54, 529, 2175, 2250], [55, 539, 2100, 2200], [56, 549, 2025, 2125],
  [57, 559, 1975, 2050], [58, 568, 1925, 2000], [59, 578, 1850, 1925],
  [60, 588, 1800, 1875], [61, 598, 1725, 1800], [62, 608, 1675, 1750],
  [63, 617, 1625, 1700], [64, 627, 1575, 1625], [65, 637, 1525, 1575],
  [66, 647, 1450, 1525], [67, 657, 1400, 1475], [68, 666, 1350, 1425],
  [69, 676, 1300, 1375], [70, 686, 1250, 1300], [71, 696, 1200, 1250],
  [72, 706, 1150, 1200], [73, 715, 1125, 1150], [74, 725, 1075, 1100],
  [75, 735, 1025, 1050], [76, 745, 975, 1000], [77, 755, 925, 950],
  [78, 764, 875, 925], [79, 774, 825, 875], [80, 784, 800, 825],
  [81, 794, 750, 775], [82, 804, 700, 725], [83, 813, 675, 700],
  [84, 823, 625, 650], [85, 833, 575, 600], [86, 843, 525, 550],
  [87, 853, 500, 525], [88, 862, 450, 475], [89, 872, 425, 425],
  [90, 882, 375, 400], [91, 892, 350, 350], [92, 902, 300, 325],
  [93, 911, 275, 275], [94, 921, 225, 225], [95, 931, 200, 200],
  [96, 941, 150, 150], [97, 951, 125, 125], [98, 960, 75, 75],
  [99, 970, 50, 50], [100, 980, 0, 0]
];

function stampAlbumTexts(lang) {
  if (lang === 'en') {
    return {
      constantsLabel: 'assumptions',
      album: 'album',
      stamps: 'stamps',
      pack: 'pack',
      price: 'price',
      runs: 'runs',
      exchangeLabel: 'interchange',
      help: 'Choose how many stamps you plan to get through trades.',
      exchangeStamps: 'stamps traded',
      exchangePercent: 'percentage traded',
      resultsLabel: 'result',
      median: 'median',
      medianResult: 'median (50% certainty)',
      p95: '95% certainty',
      simulating: 'simulating...',
      updated: 'updated',
      chartLabel: 'Completion probability vs total cost',
      xAxis: 'probability of completing the album',
      yAxis: 'total cost (MXN pesos)',
      comparisonLabel: 'trade impact',
      comparisonChartLabel: 'Median and 95% cost by traded percentage',
      exchangeAxis: 'percentage traded',
      comparisonNote: 'At the beginning, almost every pack has new stamps, but as the album starts to fill up, each missing stamp becomes harder and harder to find. That final stretch is what makes the album difficult to complete, so even trading a few stamps can greatly reduce the expected cost.',
      comparisonHighlights: 'album cost with traded stamps',
      note: 'Each pack is modeled as 7 independent uniform draws from the 980 possible stamps.',
      packSingular: 'pack',
      packPlural: 'packs'
    };
  }

  return {
    constantsLabel: 'supuestos',
    album: 'album',
    stamps: 'estampas',
    pack: 'sobre',
    price: 'precio',
    runs: 'corridas',
    exchangeLabel: 'intercambio',
    help: 'Puedes elegir cuantas estampas vas a conseguir intercambiando.',
    exchangeStamps: 'estampas intercambiadas',
    exchangePercent: 'porcentaje intercambiado',
    resultsLabel: 'resultado',
    median: 'mediana',
    medianResult: 'mediana (50% de seguridad)',
    p95: '95% de seguridad',
    simulating: 'simulando...',
    updated: 'actualizado',
    chartLabel: 'Probabilidad de completar vs costo total',
    xAxis: 'Probabilidad de completar el álbum',
    yAxis: 'costo total (Pesos MXN)',
    comparisonLabel: 'impacto del intercambio',
    comparisonChartLabel: 'Mediana y 95% de costo por porcentaje intercambiado',
    exchangeAxis: 'porcentaje intercambiado',
    comparisonNote: 'Al principio casi todos los sobres tienen estampas nuevas pero conforme el album se empieza a llenar, cada estampa faltante se vuelve cada vez mas dificil de encontrar.<br><br>Esa ultima parte es lo que hace dificil completar el album, por eso incluso intercambiar pocas estampas puede bajar muchisimo el costo esperado.',
    comparisonHighlights: 'precio del album intercambiando estampas',
    note: 'Cada sobre se modela como 7 sorteos uniformes e independientes entre las 980 estampas posibles.',
    packSingular: 'sobre',
    packPlural: 'sobres'
  };
}

function renderStampAlbumSimulator(lang) {
  var t = stampAlbumTexts(lang);
  var count = clamp(Math.round(stampAlbumState.exchanged), 0, stampAlbumConfig.totalStamps);
  var percent = percentFromCount(count);

  var html = '<div class="stamp-sim" id="stamp-sim">';
  html += '<div class="modal-section-label">' + t.exchangeLabel + '</div>';
  html += '<p class="stamp-help">' + t.help + '</p>';
  html += '<div class="stamp-controls">';
  html += '<label class="stamp-field" for="stamp-exchange-count"><span>' + t.exchangeStamps + '</span><input id="stamp-exchange-count" class="stamp-input" type="number" min="0" max="' + stampAlbumConfig.totalStamps + '" step="1" value="' + count + '"></label>';
  html += '<label class="stamp-field" for="stamp-exchange-percent"><span>' + t.exchangePercent + '</span><input id="stamp-exchange-percent" class="stamp-input" type="number" min="0" max="100" step="0.1" value="' + trimNumber(percent) + '"></label>';
  html += '</div>';
  html += '<input id="stamp-exchange-range" class="stamp-range" type="range" min="0" max="100" step="0.1" value="' + trimNumber(sliderPositionFromPercent(percent)) + '" aria-label="' + t.exchangePercent + '">';
  html += '<div class="stamp-status" aria-live="polite"><span class="stamp-spinner" aria-hidden="true"></span><span id="stamp-status-text">' + t.simulating + '</span></div>';
  html += '<div class="modal-section-label">' + t.resultsLabel + '</div>';
  html += '<div class="stamp-results">';
  html += '<div class="stamp-metric"><span>' + t.medianResult + '</span><strong id="stamp-median-price">-</strong><em id="stamp-median-packs">-</em></div>';
  html += '<div class="stamp-metric"><span>' + t.p95 + '</span><strong id="stamp-p95-price">-</strong><em id="stamp-p95-packs">-</em></div>';
  html += '</div>';
  html += '<div class="stamp-chart" id="stamp-chart" role="img" aria-label="' + t.chartLabel + '"></div>';
  html += '<p class="stamp-note">' + t.note + '</p>';
  html += '<div class="modal-section-label">' + t.comparisonLabel + '</div>';
  html += '<p class="stamp-help">' + t.comparisonNote + '</p>';
  html += '<div class="stamp-chart stamp-comparison-chart" role="img" aria-label="' + t.comparisonChartLabel + '">' + renderStampAlbumComparisonChart(t) + '</div>';
  html += '<div class="stamp-impact-label">' + t.comparisonHighlights + '</div>';
  html += renderStampAlbumImpactMetrics(t);
  html += '</div>';

  return html;
}

function initStampAlbumSimulator() {
  var root = document.getElementById('stamp-sim');
  if (!root) return;

  var countInput = document.getElementById('stamp-exchange-count');
  var percentInput = document.getElementById('stamp-exchange-percent');
  var rangeInput = document.getElementById('stamp-exchange-range');

  function setCount(nextCount, delay) {
    var count = clamp(Math.round(Number(nextCount) || 0), 0, stampAlbumConfig.totalStamps);
    stampAlbumState.exchanged = count;
    syncStampAlbumInputs(count);
    scheduleStampAlbumSimulation(delay);
  }

  function setPercent(nextPercent, delay) {
    var percent = clamp(Number(nextPercent) || 0, 0, 100);
    setCount(Math.round(stampAlbumConfig.totalStamps * percent / 100), delay);
  }

  countInput.addEventListener('input', function() {
    setCount(countInput.value, 120);
  });
  countInput.addEventListener('change', function() {
    setCount(countInput.value, 0);
  });
  percentInput.addEventListener('input', function() {
    setPercent(percentInput.value, 120);
  });
  percentInput.addEventListener('change', function() {
    setPercent(percentInput.value, 0);
  });
  rangeInput.addEventListener('input', function() {
    setPercent(percentFromSliderPosition(rangeInput.value), 80);
  });

  syncStampAlbumInputs(stampAlbumState.exchanged);
  scheduleStampAlbumSimulation(0);
}

function syncStampAlbumInputs(count) {
  var percent = percentFromCount(count);
  var countInput = document.getElementById('stamp-exchange-count');
  var percentInput = document.getElementById('stamp-exchange-percent');
  var rangeInput = document.getElementById('stamp-exchange-range');

  if (countInput) countInput.value = count;
  if (percentInput) percentInput.value = trimNumber(percent);
  if (rangeInput) rangeInput.value = trimNumber(sliderPositionFromPercent(percent));
}

function scheduleStampAlbumSimulation(delay) {
  var root = document.getElementById('stamp-sim');
  if (!root) return;

  if (stampAlbumState.timer) {
    clearTimeout(stampAlbumState.timer);
  }

  var job = ++stampAlbumState.job;
  setStampAlbumLoading(true);

  stampAlbumState.timer = setTimeout(function() {
    var raf = window.requestAnimationFrame || function(cb) { return setTimeout(cb, 0); };
    raf(function() {
      if (job !== stampAlbumState.job || !document.getElementById('stamp-sim')) return;
      var result = runStampAlbumSimulation(stampAlbumState.exchanged);
      if (job !== stampAlbumState.job || !document.getElementById('stamp-sim')) return;
      renderStampAlbumResults(result);
    });
  }, delay);
}

function cancelStampAlbumSimulation() {
  if (stampAlbumState.timer) {
    clearTimeout(stampAlbumState.timer);
    stampAlbumState.timer = null;
  }
  stampAlbumState.job++;
}

function setStampAlbumLoading(isLoading) {
  var root = document.getElementById('stamp-sim');
  var status = document.getElementById('stamp-status-text');
  if (!root || !status) return;

  root.classList.toggle('is-loading', isLoading);
  if (isLoading) {
    status.textContent = stampAlbumTexts(currentLang).simulating;
  }
}

function runStampAlbumSimulation(exchanged) {
  var config = stampAlbumConfig;
  var target = clamp(config.totalStamps - exchanged, 0, config.totalStamps);
  var rng = seededRandom(config.seed);
  var packsByRun = new Uint16Array(config.runs);
  var seen = new Uint16Array(config.totalStamps);

  for (var run = 0; run < config.runs; run++) {
    if (target === 0) {
      packsByRun[run] = 0;
      continue;
    }

    var mark = run + 1;
    var unique = 0;
    var packs = 0;

    while (unique < target) {
      packs++;
      for (var stamp = 0; stamp < config.stampsPerPack; stamp++) {
        var id = Math.floor(rng() * config.totalStamps);
        if (seen[id] !== mark) {
          seen[id] = mark;
          unique++;
        }
      }
    }

    packsByRun[run] = packs;
  }

  var sortedPacks = Array.prototype.slice.call(packsByRun).sort(function(a, b) { return a - b; });
  var medianPacksExact = percentile(sortedPacks, 0.5);
  var p95PacksExact = percentile(sortedPacks, 0.95);

  return {
    exchanged: exchanged,
    target: target,
    sortedPacks: sortedPacks,
    medianPacksExact: medianPacksExact,
    p95PacksExact: p95PacksExact,
    medianPacks: Math.round(medianPacksExact),
    p95Packs: Math.round(p95PacksExact),
    medianPrice: medianPacksExact * config.pricePerPack,
    p95Price: p95PacksExact * config.pricePerPack
  };
}

function renderStampAlbumResults(result) {
  var t = stampAlbumTexts(currentLang);
  document.getElementById('stamp-median-price').textContent = formatCurrency(result.medianPrice);
  document.getElementById('stamp-p95-price').textContent = formatCurrency(result.p95Price);
  document.getElementById('stamp-median-packs').textContent = formatPackCount(result.medianPacks, t);
  document.getElementById('stamp-p95-packs').textContent = formatPackCount(result.p95Packs, t);
  document.getElementById('stamp-status-text').textContent = t.updated;
  setStampAlbumLoading(false);
  renderStampAlbumChart(result);
}

function renderStampAlbumChart(result) {
  var mount = document.getElementById('stamp-chart');
  if (!mount) return;

  var t = stampAlbumTexts(currentLang);
  var sorted = result.sortedPacks;
  var config = stampAlbumConfig;
  var layout = getStampChartLayout('live');
  var width = layout.width;
  var height = layout.height;
  var margin = layout.margin;
  var plotW = width - margin.left - margin.right;
  var plotH = height - margin.top - margin.bottom;
  var minPrice = sorted[0] * config.pricePerPack;
  var maxPrice = sorted[sorted.length - 1] * config.pricePerPack;
  var spread = maxPrice - minPrice;
  var padding = spread > 0 ? spread * 0.12 : Math.max(config.pricePerPack * 4, maxPrice * 0.2);
  var yScale = niceScaleDomain(Math.max(0, minPrice - padding), maxPrice + padding);
  var yMin = yScale.min;
  var yMax = yScale.max;
  var yTicks = yScale.ticks;
  var plotBottom = height - margin.bottom;

  function x(prob) {
    return margin.left + prob * plotW;
  }

  function y(price) {
    if (yMax === yMin) return margin.top + plotH / 2;
    return margin.top + (1 - (price - yMin) / (yMax - yMin)) * plotH;
  }

  var sampleCount = Math.min(sorted.length, 240);
  var path = '';
  for (var i = 0; i < sampleCount; i++) {
    var idx = sampleCount === 1 ? 0 : Math.round(i * (sorted.length - 1) / (sampleCount - 1));
    var prob = sorted.length === 1 ? 1 : idx / (sorted.length - 1);
    var price = sorted[idx] * config.pricePerPack;
    path += (i === 0 ? 'M ' : ' L ') + roundSvg(x(prob)) + ' ' + roundSvg(y(price));
  }

  var svg = '<svg class="stamp-chart-svg" viewBox="0 0 ' + width + ' ' + height + '" aria-hidden="true">';
  svg += '<rect class="stamp-chart-bg" x="0" y="0" width="' + width + '" height="' + height + '"></rect>';

  yTicks.forEach(function(tick) {
    svg += '<line class="stamp-grid-line" x1="' + margin.left + '" y1="' + roundSvg(y(tick)) + '" x2="' + (width - margin.right) + '" y2="' + roundSvg(y(tick)) + '"></line>';
    svg += '<text class="stamp-axis-text" x="' + (margin.left - 10) + '" y="' + roundSvg(y(tick) + 3) + '" text-anchor="end">' + formatCurrencyShort(tick) + '</text>';
  });

  layout.xTicks.forEach(function(tick) {
    svg += '<line class="stamp-grid-line vertical" x1="' + roundSvg(x(tick)) + '" y1="' + margin.top + '" x2="' + roundSvg(x(tick)) + '" y2="' + plotBottom + '"></line>';
    svg += '<text class="stamp-axis-text" x="' + roundSvg(x(tick)) + '" y="' + (height - 28) + '" text-anchor="middle">' + Math.round(tick * 100) + '%</text>';
  });

  svg += '<line class="stamp-axis-line" x1="' + margin.left + '" y1="' + plotBottom + '" x2="' + (width - margin.right) + '" y2="' + plotBottom + '"></line>';
  svg += '<line class="stamp-axis-line" x1="' + margin.left + '" y1="' + margin.top + '" x2="' + margin.left + '" y2="' + plotBottom + '"></line>';
  svg += '<path class="stamp-curve" d="' + path + '"></path>';
  svg += renderStampMarker(0.5, result.medianPrice, x, y, plotBottom, margin.left, 'median', '50%');
  svg += renderStampMarker(0.95, result.p95Price, x, y, plotBottom, margin.left, 'p95', '95%');
  svg += '<text class="stamp-axis-title x-title" x="' + (margin.left + plotW / 2) + '" y="' + (height - 5) + '" text-anchor="middle">' + t.xAxis + '</text>';
  svg += '<text class="stamp-axis-title y-title" x="14" y="' + (margin.top + plotH / 2) + '" text-anchor="middle" transform="rotate(-90 14 ' + (margin.top + plotH / 2) + ')">' + t.yAxis + '</text>';
  svg += '</svg>';

  mount.innerHTML = svg;
}

function renderStampAlbumComparisonChart(t) {
  var data = stampAlbumComparisonData.filter(function(point) {
    return point[0] <= 30;
  });
  var layout = getStampChartLayout('comparison');
  var width = layout.width;
  var height = layout.height;
  var margin = layout.margin;
  var plotW = width - margin.left - margin.right;
  var plotH = height - margin.top - margin.bottom;
  var plotBottom = height - margin.bottom;
  var yMax = 35000;
  var yTicks = layout.yTicks;

  function x(percent) {
    return margin.left + (percent / 30) * plotW;
  }

  function y(price) {
    return margin.top + (1 - price / yMax) * plotH;
  }

  function pathFor(valueIndex) {
    var path = '';
    data.forEach(function(point, index) {
      path += (index === 0 ? 'M ' : ' L ') + roundSvg(x(point[0])) + ' ' + roundSvg(y(point[valueIndex]));
    });
    return path;
  }

  var svg = '<svg class="stamp-chart-svg" viewBox="0 0 ' + width + ' ' + height + '" aria-hidden="true">';
  svg += '<rect class="stamp-chart-bg" x="0" y="0" width="' + width + '" height="' + height + '"></rect>';

  yTicks.forEach(function(tick) {
    svg += '<line class="stamp-grid-line" x1="' + margin.left + '" y1="' + roundSvg(y(tick)) + '" x2="' + (width - margin.right) + '" y2="' + roundSvg(y(tick)) + '"></line>';
    svg += '<text class="stamp-axis-text" x="' + (margin.left - 10) + '" y="' + roundSvg(y(tick) + 3) + '" text-anchor="end">' + formatCurrencyShort(tick) + '</text>';
  });

  layout.xTicks.forEach(function(tick) {
    svg += '<line class="stamp-grid-line vertical" x1="' + roundSvg(x(tick)) + '" y1="' + margin.top + '" x2="' + roundSvg(x(tick)) + '" y2="' + plotBottom + '"></line>';
    svg += '<text class="stamp-axis-text" x="' + roundSvg(x(tick)) + '" y="' + (height - 28) + '" text-anchor="middle">' + tick + '%</text>';
  });

  svg += '<line class="stamp-axis-line" x1="' + margin.left + '" y1="' + plotBottom + '" x2="' + (width - margin.right) + '" y2="' + plotBottom + '"></line>';
  svg += '<line class="stamp-axis-line" x1="' + margin.left + '" y1="' + margin.top + '" x2="' + margin.left + '" y2="' + plotBottom + '"></line>';
  svg += '<path class="stamp-comparison-line stamp-comparison-median" d="' + pathFor(2) + '"></path>';
  svg += '<path class="stamp-comparison-line stamp-comparison-p95" d="' + pathFor(3) + '"></path>';
  svg += '<g class="stamp-chart-legend">';
  svg += '<line class="stamp-comparison-median" x1="' + layout.legend.lineStart + '" y1="' + layout.legend.medianY + '" x2="' + layout.legend.lineEnd + '" y2="' + layout.legend.medianY + '"></line><text x="' + layout.legend.textX + '" y="' + (layout.legend.medianY + 3) + '">' + t.median + '</text>';
  svg += '<line class="stamp-comparison-p95" x1="' + layout.legend.lineStart + '" y1="' + layout.legend.p95Y + '" x2="' + layout.legend.lineEnd + '" y2="' + layout.legend.p95Y + '"></line><text x="' + layout.legend.textX + '" y="' + (layout.legend.p95Y + 3) + '">' + t.p95 + '</text>';
  svg += '</g>';
  svg += '<text class="stamp-axis-title x-title" x="' + (margin.left + plotW / 2) + '" y="' + (height - 5) + '" text-anchor="middle">' + t.exchangeAxis + '</text>';
  svg += '<text class="stamp-axis-title y-title" x="14" y="' + (margin.top + plotH / 2) + '" text-anchor="middle" transform="rotate(-90 14 ' + (margin.top + plotH / 2) + ')">' + t.yAxis + '</text>';
  svg += '</svg>';

  return svg;
}

function renderStampAlbumImpactMetrics(t) {
  var points = [5, 10, 15, 20];
  var html = '<div class="stamp-impact-grid">';

  points.forEach(function(percent) {
    var point = stampAlbumComparisonData.find(function(row) {
      return row[0] === percent;
    });
    if (!point) return;

    html += '<div class="stamp-impact">';
    html += '<span>' + percent + '%</span>';
    html += '<strong>' + formatCurrency(point[2]) + '</strong>';
    html += '<em>' + t.medianResult + ' · ' + formatCurrency(point[3]) + ' ' + t.p95 + '</em>';
    html += '</div>';
  });

  html += '</div>';
  return html;
}

function getStampChartLayout(kind) {
  var isPhone = window.matchMedia && window.matchMedia('(max-width: 480px)').matches;

  if (kind === 'comparison') {
    return isPhone ? {
      width: 380,
      height: 330,
      margin: { top: 54, right: 14, bottom: 58, left: 58 },
      xTicks: [0, 10, 20, 30],
      yTicks: [0, 10000, 20000, 30000, 35000],
      legend: {
        lineStart: 205,
        lineEnd: 235,
        textX: 245,
        medianY: 18,
        p95Y: 38
      }
    } : {
      width: 680,
      height: 380,
      margin: { top: 54, right: 18, bottom: 58, left: 72 },
      xTicks: [0, 5, 10, 15, 20, 25, 30],
      yTicks: [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000],
      legend: {
        lineStart: 500,
        lineEnd: 530,
        textX: 540,
        medianY: 18,
        p95Y: 38
      }
    };
  }

  return isPhone ? {
    width: 380,
    height: 300,
    margin: { top: 22, right: 14, bottom: 56, left: 58 },
    xTicks: [0, 0.5, 1]
  } : {
    width: 680,
    height: 320,
    margin: { top: 20, right: 18, bottom: 52, left: 72 },
    xTicks: [0, 0.25, 0.5, 0.75, 1]
  };
}

function renderStampMarker(prob, price, x, y, plotBottom, plotLeft, kind, label) {
  var xPos = roundSvg(x(prob));
  var yPos = roundSvg(y(price));
  var labelY = yPos < 42 ? yPos + 18 : yPos - 10;
  return '<g class="stamp-marker stamp-marker-' + kind + '">' +
    '<line class="stamp-marker-line" x1="' + xPos + '" y1="' + yPos + '" x2="' + xPos + '" y2="' + plotBottom + '"></line>' +
    '<line class="stamp-marker-line" x1="' + plotLeft + '" y1="' + yPos + '" x2="' + xPos + '" y2="' + yPos + '"></line>' +
    '<circle cx="' + xPos + '" cy="' + yPos + '" r="4.2"></circle>' +
    '<text x="' + xPos + '" y="' + roundSvg(labelY) + '" text-anchor="middle">' + label + '</text>' +
    '</g>';
}

function seededRandom(seed) {
  var state = seed >>> 0;
  return function() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function percentile(sorted, p) {
  if (!sorted.length) return 0;
  var index = (sorted.length - 1) * p;
  var lower = Math.floor(index);
  var upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function niceScaleDomain(minValue, maxValue) {
  if (maxValue <= minValue) {
    maxValue = minValue + 1;
  }

  var rawStep = (maxValue - minValue) / 4;
  var magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  var fraction = rawStep / magnitude;
  var niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  var step = niceFraction * magnitude;
  var min = minValue <= 0 ? 0 : step * Math.floor(minValue / step);
  var max = step * Math.ceil(maxValue / step);
  var ticks = [];

  for (var value = min; value <= max + step * 0.5; value += step) {
    ticks.push(value);
  }

  return { min: min, max: max, ticks: ticks };
}

function percentFromCount(count) {
  return count / stampAlbumConfig.totalStamps * 100;
}

function percentFromSliderPosition(value) {
  var position = clamp(Number(value) || 0, 0, 100) / 100;
  var scale = stampAlbumConfig.sliderScale;
  return (Math.exp(scale * position) - 1) / (Math.exp(scale) - 1) * 100;
}

function sliderPositionFromPercent(percent) {
  var normalized = clamp(Number(percent) || 0, 0, 100) / 100;
  var scale = stampAlbumConfig.sliderScale;
  return Math.log(1 + normalized * (Math.exp(scale) - 1)) / scale * 100;
}

function trimNumber(value) {
  var fixed = (Math.round(value * 10) / 10).toFixed(1);
  return fixed.replace(/\.0$/, '');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundSvg(value) {
  return Math.round(value * 10) / 10;
}

function formatNumber(value) {
  return Math.round(value).toLocaleString(currentLang === 'en' ? 'en-US' : 'es-MX');
}

function formatCurrency(value) {
  return new Intl.NumberFormat(currentLang === 'en' ? 'en-US' : 'es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value);
}

function formatCurrencyShort(value) {
  if (value >= 1000) return '$' + Math.round(value / 1000) + 'k';
  return '$' + Math.round(value);
}

function formatPackCount(value, texts) {
  return formatNumber(value) + ' ' + (value === 1 ? texts.packSingular : texts.packPlural);
}

/* BILINGUAL TOGGLE */
function setLang(lang) {
  currentLang = lang;

  document.querySelectorAll('.lang-pill span').forEach(function(s) {
    s.classList.toggle('on', s.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-es]').forEach(function(el) {
    el.textContent = el.getAttribute('data-' + lang);
  });

  document.querySelectorAll('[data-es-html]').forEach(function(el) {
    el.innerHTML = el.getAttribute('data-' + lang + '-html');
  });

  if (lastModalCard && document.getElementById('modal-overlay').classList.contains('open')) {
    openModal(lastModalCard, { updateHash: false });
  }
}

setTimeout(handleHashRoute, 0);
