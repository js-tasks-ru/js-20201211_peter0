export default class ColumnChart {
  constructor({ data = [], label = '', link = '#', value = 0, chartHeight = 50 } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.chartHeight = chartHeight;

    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          <a href="${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
            </div>
        </div>
      </div>
    `;
    this.fillChartBody(element, this.data);

    this.element = element.firstElementChild;
  }

  update(data) {
    this.fillChartBody(this.element, data);
  }

  fillChartBody(element, data) {
    if (data.length > 0) {
      const columnProps = this.getColumnProps(data);
      const columnChartBodyElement = element.querySelector('.column-chart__chart');
      columnChartBodyElement.innerHTML = null;
      columnProps.forEach(prop => {
        columnChartBodyElement.innerHTML += `<div style="--value: ${prop.value}" data-tooltip="${prop.percent}"></div>`;
      });
    } else {
      element.querySelector('.column-chart').classList.add('column-chart_loading');
    }
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
}
