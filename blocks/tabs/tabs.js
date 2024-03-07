// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // insights tabs on homepage
  const insightsTabs = block.closest('.insights-tabs');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');
    if (!hasWrapper(tabpanel.lastElementChild)) {
      tabpanel.lastElementChild.innerHTML = `<p>${tabpanel.lastElementChild.innerHTML}</p>`;
    }
    if (insightsTabs != null) {
      const pic = tabpanel.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('p');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('tab-picture');
        }
      }
    }

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  // retirement tabs on homepage
  const retirementTabContent = block.closest('.retirement-tabs');

  if (retirementTabContent != null) {
    const tabButtonContent = retirementTabContent.querySelector('.default-content-wrapper');
    tablist.prepend(tabButtonContent);
  }

  // insights tabs function
  if (insightsTabs != null) {
    const tabOneFooter = insightsTabs.querySelector('.default-content-wrapper:last-of-type');
    const tabOneVideo = insightsTabs.querySelector('.embed-wrapper');
    const tabOne = document.getElementById('tabpanel-insights');

    tabOne.prepend(tabOneVideo);
    tabOne.append(tabOneFooter);
  }

  block.prepend(tablist);
}
