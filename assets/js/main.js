/* ══ PAGE SWITCHING ══ */
var pageMap = { home:'page-home', projects:'page-projects', pubs:'page-pubs', contact:'page-contact' };
var navIdx  = { home:0, pubs:1, projects:2, contact:3 };

function showPage(key) {
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
}

/* ══ SCROLL REVEAL ══ */
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

/* ══ MODAL ══ */
var lastModalCard = null;

function openModal(el) {
  lastModalCard = el;
  var lang = currentLang;

  var type    = el.getAttribute('data-type-' + lang) || el.getAttribute('data-type-es');
  var year    = el.getAttribute('data-year');
  var title   = el.getAttribute('data-title-' + lang) || el.getAttribute('data-title-es');
  var desc    = el.getAttribute('data-desc-' + lang) || el.getAttribute('data-desc-es');
  var tags    = el.getAttribute('data-tags-' + lang) || el.getAttribute('data-tags-es');
  var imgAlt  = el.getAttribute('data-image-alt');
  var link    = el.getAttribute('data-link');
  var linkLbl = el.getAttribute('data-link-label-' + lang) || el.getAttribute('data-link-label-es');
  var linkOff = el.getAttribute('data-link-disabled') === 'true';
  var embed   = el.getAttribute('data-embed');

  var imagesRaw = el.getAttribute('data-images');
  var images = [];
  try { images = JSON.parse(imagesRaw) || []; } catch(e) { images = []; }

  var sectionsRaw = el.getAttribute('data-sections-' + lang) || el.getAttribute('data-sections-es');
  var sections = [];
  try { sections = JSON.parse(sectionsRaw) || []; } catch(e) { sections = []; }

  document.getElementById('modal-type').textContent = type;
  document.getElementById('modal-year').textContent = year;

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

  document.getElementById('modal-body').innerHTML = html;
  document.querySelector('.modal').scrollTop = 0;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  lastModalCard = null;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ══ BILINGUAL TOGGLE ══ */
var currentLang = 'es';

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
    openModal(lastModalCard);
  }
}

document.querySelectorAll('.lang-pill span').forEach(function(s) {
  s.addEventListener('click', function() {
    setLang(this.getAttribute('data-lang'));
  });
});
