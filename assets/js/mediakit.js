/* ══ SCROLL REVEAL ══ */
(function () {
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.mk-reveal, .mk-reveal-group').forEach(function (el) {
    revealIO.observe(el);
  });
})();

/* ══ COUNT-UP ANIMATION ══ */
(function () {
  var DURATION = 1600;

  function formatNumber(n, suffix, target) {
    if (suffix) {
      var decimals = (target % 1 !== 0) ? 1 : 0;
      return n.toFixed(decimals) + suffix;
    }
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toFixed(0);
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / DURATION, 1);
      var value = target * easeOut(progress);
      el.textContent = prefix + formatNumber(value, suffix, target);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animateCount(e.target);
        countIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.mk-count').forEach(function (el) {
    el.textContent = el.getAttribute('data-prefix') || '0';
    countIO.observe(el);
  });
})();

/* ══ REACTIVE PLATFORM SWITCHER ══ */
(function () {
  var data = {
    todas: {
      gender: { m: 66, f: 34 },
      age: [
        { label: '18–24', value: 39.4 },
        { label: '25–34', value: 46.1 },
        { label: '35–44', value: 10.6 },
        { label: '45+',   value: 3.9 }
      ],
      location: [
        { label: 'México',    value: 54.0 },
        { label: 'Colombia',  value: 6.0 },
        { label: 'Chile',     value: 5.0 },
        { label: 'Argentina', value: 5.0 },
        { label: 'Perú',      value: 4.0 }
      ]
    },
    tiktok: {
      gender: { m: 66, f: 34 },
      age: [
        { label: '18–24', value: 42.2 },
        { label: '25–34', value: 45.4 },
        { label: '35–44', value: 9.1 },
        { label: '45+',   value: 3.3 }
      ],
      location: [
        { label: 'México',    value: 53.6 },
        { label: 'Colombia',  value: 5.2 },
        { label: 'Argentina', value: 4.7 },
        { label: 'Perú',      value: 3.9 },
        { label: 'Chile',     value: 3.6 }
      ]
    },
    instagram: {
      gender: { m: 64, f: 36 },
      age: [
        { label: '18–24', value: 26.5 },
        { label: '25–34', value: 49.3 },
        { label: '35–44', value: 17.9 },
        { label: '45+',   value: 3.5 }
      ],
      location: [
        { label: 'México',    value: 54.8 },
        { label: 'Colombia',  value: 8.2 },
        { label: 'Chile',     value: 8.0 },
        { label: 'Argentina', value: 6.3 },
        { label: 'Perú',      value: 4.2 }
      ]
    },
    facebook: {
      gender: { m: 76, f: 24 },
      age: [
        { label: '18–24', value: 25.8 },
        { label: '25–34', value: 50.0 },
        { label: '35–44', value: 17.3 },
        { label: '45+',   value: 6.9 }
      ],
      location: [
        { label: 'México',    value: 54.0 },
        { label: 'Colombia',  value: 6.0 },
        { label: 'Chile',     value: 5.0 },
        { label: 'Argentina', value: 5.0 },
        { label: 'Perú',      value: 4.0 }
      ]
    }
  };

  var maxAge = 55;
  var maxLoc = 60;

  function updateBars(platform) {
    var d = data[platform];
    if (!d) return;

    document.querySelector('.mk-gender-m').textContent = d.gender.m + '%';
    document.querySelector('.mk-gender-f').textContent = d.gender.f + '%';

    var ageBars = document.querySelectorAll('.mk-age-bar');
    d.age.forEach(function (item, i) {
      if (ageBars[i]) {
        ageBars[i].querySelector('.mk-bar-fill').style.width = (item.value / maxAge * 100) + '%';
        ageBars[i].querySelector('.mk-bar-value').textContent = item.value + '%';
      }
    });

    var locBars = document.querySelectorAll('.mk-loc-bar');
    d.location.forEach(function (item, i) {
      if (locBars[i]) {
        locBars[i].querySelector('.mk-bar-fill').style.width = (item.value / maxLoc * 100) + '%';
        locBars[i].querySelector('.mk-bar-value').textContent = item.value + '%';
        locBars[i].querySelector('.mk-bar-label').textContent = item.label;
      }
    });
  }

  document.querySelectorAll('.mk-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.mk-pill').forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');
      updateBars(pill.getAttribute('data-platform'));
    });
  });
})();
