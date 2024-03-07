export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // advirsor locator column & form DOM changes
  const advisorColumn = block.closest('.advisor-locator');

  if (advisorColumn != null) {
    const advisorHeading = advisorColumn.querySelector('#start-planning-to-reach-your-goals-get-personalized-advice');
    const advisorForm = advisorColumn.querySelector('.form-wrapper');

    advisorHeading.parentNode.insertBefore(advisorForm, advisorHeading.nextSibling);
  }
}
