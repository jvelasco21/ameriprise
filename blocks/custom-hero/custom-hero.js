export default function decorate(block) {
  const heroImg = block.querySelector('picture');
  const heroBg = document.createElement('div');
  const heroContent = block.querySelector('div:not(.custom-hero-image)');
  const loginForm = block.closest('main').querySelector('.login-form');

  heroImg.parentElement.remove();
  heroBg.append(heroImg);
  heroBg.className = 'custom-hero-image';
  block.prepend(heroBg);
  heroContent.className = 'custom-hero-content';
  heroContent.append(loginForm);
}
