export default function decorate(block) {
    const heroImg = block.querySelector('picture');
    const heroBg = document.createElement('div');
    heroImg.parentElement.remove();
    heroBg.append(heroImg);
    heroBg.className = 'custom-hero-image';
    block.prepend(heroBg);
}