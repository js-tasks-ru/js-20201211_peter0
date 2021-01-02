export default class NotificationMessage {

  static activeNotification;

  constructor(message, {duration = 1000, type = 'success'} = {}) {
    NotificationMessage.removeActiveNotification();

    this.message = message;
    this.duration = duration;
    this.durationSec = duration / 1000;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationSec}s">
          <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">success</div>
            <div class="notification-body">
              ${this.message}
            </div>
          </div>
        </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    NotificationMessage.activeNotification = this.element;
  }

  show(element = document.body) {
    element.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  static removeActiveNotification() {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
  }

  destroy() {
    this.remove();
    NotificationMessage.activeNotification = null;
  }

}
