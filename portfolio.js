document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.closest('.portfolio-category');
      if (!category) return;

      category.querySelectorAll('img[data-src]').forEach((image) => {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      });

      category.classList.add('is-expanded');
    });
  });
});
