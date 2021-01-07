export default class SortableTable {
  constructor(header = [], { data = []} = {}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  get template() {
    return `
    <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getTableHeader()}
        </div>
        <div data-element="body" class="sortable-table__body">
            ${this.getTableBody(this.data)}
        </div>
    </div>
    `;
  }

  getTableHeader() {
    return this.header.map(item => this.getTableHeaderRow(item)).join('');
  }

  getTableBody(data) {
    return data.map(item => this.getTableBodyRow(item)).join('');
  }

  getTableHeaderRow(item) {
    return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
          <span>${item.title}</span>
          ${this.getSortArrow()}
        </div>
    `;
  }

  getSortArrow() {
    return `
       <span data-element="arrow" class="sortable-table__sort-arrow">
         <span class="sort-arrow"></span>
       </span>
    `;
  }

  getTableBodyRow(item) {
    const row = this.header
      .map(({id, template}) => template ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`)
      .join('');

    return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${row}
      </a>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    this.subElements.body.innerHTML = this.getTableBody(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data];
    const sortType = this.header.find(item => item.id === field).sortType;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) =>
      (sortType === 'string')
        ? direction * a[field].localeCompare(b[field], 'ru')
        : direction * (a[field] - b[field])
    );
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}

