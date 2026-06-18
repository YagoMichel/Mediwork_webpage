/* servicios.js */

let bsModal = null;

function openServiceModal(card) {
  const title       = card.getAttribute('data-title');
  const category    = card.getAttribute('data-category');
  const icon        = card.getAttribute('data-icon');
  const img         = card.getAttribute('data-img');
  const description = JSON.parse(card.getAttribute('data-description'));
  const features    = JSON.parse(card.getAttribute('data-features'));

  const stat1Val   = card.getAttribute('data-stat1-val');
  const stat1Label = card.getAttribute('data-stat1-label');
  const stat2Val   = card.getAttribute('data-stat2-val');
  const stat2Label = card.getAttribute('data-stat2-label');
  const stat3Val   = card.getAttribute('data-stat3-val');
  const stat3Label = card.getAttribute('data-stat3-label');

  // Header
  document.getElementById('serviceModalLabel').textContent = title;
  document.getElementById('modalCategory').textContent     = category;
  document.getElementById('modalHeaderImg').src            = img;
  document.getElementById('modalHeaderImg').alt            = title;
  document.getElementById('modalHeaderIcon').className     = `fas ${icon}`;

  // Descripción
  let descHtml = '';
  description.forEach(p => { descHtml += `<p style="margin-bottom:.65rem">${p}</p>`; });
  document.getElementById('modalDescription').innerHTML = descHtml;

  // Stats
  document.getElementById('stat1Val').textContent   = stat1Val   || '—';
  document.getElementById('stat1Label').textContent = stat1Label || '';
  document.getElementById('stat2Val').textContent   = stat2Val   || '—';
  document.getElementById('stat2Label').textContent = stat2Label || '';
  document.getElementById('stat3Val').textContent   = stat3Val   || '—';
  document.getElementById('stat3Label').textContent = stat3Label || '';

  // Features grid
  const featureIcons = [
    'fa-check-circle','fa-star','fa-shield-check','fa-circle-check',
    'fa-badge-check','fa-seal-check','fa-list-check','fa-circle-dot'
  ];
  let featHtml = '';
  features.forEach((f, i) => {
    featHtml += `
      <div class="modal-feature-item">
        <div class="feat-icon"><i class="fas ${featureIcons[i % featureIcons.length]}"></i></div>
        <span>${f}</span>
      </div>`;
  });
  document.getElementById('modalFeatures').innerHTML = featHtml;

  // Mostrar
  bsModal = new bootstrap.Modal(document.getElementById('serviceModal'));
  bsModal.show();
}

function closeServiceModal() {
  if (bsModal) bsModal.hide();
}

function toggleFaq(el) {
  const answer = el.nextElementSibling;
  el.classList.toggle('open');
  answer.classList.toggle('open');
}
