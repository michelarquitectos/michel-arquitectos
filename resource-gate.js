document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('resourceModal');
  var form = document.getElementById('resourceDownloadForm');
  var selectedResource = document.getElementById('selectedResource');
  var selectedDownload = document.getElementById('selectedDownload');
  var modalTitle = document.getElementById('resourceModalTitle');
  var status = document.getElementById('resourceStatus');
  var readyBox = document.getElementById('resourceDownloadReady');
  var downloadLink = document.getElementById('resourceDownloadLink');

  if (!modal || !form || !selectedResource || !selectedDownload || !modalTitle || !status || !readyBox || !downloadLink) {
    return;
  }

  function openModal(resourceName, downloadUrl) {
    selectedResource.value = resourceName;
    selectedDownload.value = downloadUrl;
    modalTitle.textContent = 'Descargar: ' + resourceName;
    status.textContent = '';
    readyBox.hidden = true;
    downloadLink.href = downloadUrl;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.download-action').forEach(function (button) {
    button.addEventListener('click', function () {
      var resourceName = button.getAttribute('data-resource') || 'Recurso Michel Arquitectos';
      var downloadUrl = button.getAttribute('data-download') || '#';
      openModal(resourceName, downloadUrl);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (element) {
    element.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = 'Datos recibidos. Descarga liberada.';
    readyBox.hidden = false;
    downloadLink.href = selectedDownload.value;

    var formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    }).catch(function () {});
  });
});