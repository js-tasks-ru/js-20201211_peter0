class Tooltip {

  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    return this;
  }

  initialize() {
    document.addEventListener('pointerover', this.onMouseOver);
    document.addEventListener('pointerout', this.onMouseOut);
  }

  onMouseOver = event => {
    const dataTooltip = event.target.closest('[data-tooltip]');
    if (dataTooltip) {
      this.render(dataTooltip.dataset.tooltip);
      this.moveTooltip(event);
      document.addEventListener('pointermove', this.onMouseMove);
    }
  };

  onMouseMove = event => {
    this.moveTooltip(event);
  };

  onMouseOut = () => {
    this.removeTooltip();
  };

  render(text) {
    this.element = document.createElement('div');
    this.element.classList.add('tooltip');
    this.element.innerHTML = text;

    document.body.append(this.element);
  }

  moveTooltip(event) {
    this.element.style.left = event.clientX + 10 + 'px';
    this.element.style.top = event.clientY + 10 + 'px';
  }

  removeTooltip() {
    if (this.element) {
      this.element.remove();
      document.removeEventListener('pointermove', this.onMouseMove);
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.onMouseOver);
    document.removeEventListener('pointerout', this.onMouseOut);
    this.removeTooltip();
  }
}

const tooltip = new Tooltip();

export default tooltip;
