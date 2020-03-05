import APICall from './modules/async';
import * as domManipulation from './modules/dom-manipulation';

let data;
let currentlyDisplayed;
let sortBy;

const renderData = () => {
  domManipulation.clearPreviews();
  sortData();
  currentlyDisplayed = data.slice(0, 10);
  createPreviews(currentlyDisplayed);
  addLoadMoreButton();
}

const createPreviews = (dataArray) => {
  dataArray.forEach(course => {
    domManipulation.createPreview(course);
  });
}

APICall()
  .then(response => {
    data = response.data;
    renderData();
  })
  .catch(error => {
    console.log(error);
  });

const addLoadMoreButton = () => {
  if (data.length > currentlyDisplayed.length) {
    const container = document.getElementById('preview-container');
    const button = domManipulation.createLoadMoreButton();
    button.addEventListener('click', showMore)
    container.appendChild(button);
  }
}

const showMore = () => {
  const currentLength = currentlyDisplayed.length;
  const newLength = currentLength + 10
  const toAdd = data.slice(currentLength, newLength);
  currentlyDisplayed = data.slice(0, newLength);
  domManipulation.removeLoadMoreButton();
  createPreviews(toAdd);
  addLoadMoreButton();
}

const showCategory = (category) => {
  domManipulation.clearPreviews();
  domManipulation.highlightCategory(category);
  if (category == 'all') {
    renderData();
    return;
  }
  const toShow = data.filter(course => course.type === category);
  createPreviews(toShow);
  currentlyDisplayed = toShow;
}

const sortData = () => {
  switch (sortBy) {
    case "alphabetical":
      data.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "price-increasing":
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "price-decreasing":
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)).reverse();
      break;
    default:
      break;
  }
}

let categories = document.getElementsByClassName('category');
categories = Array.from(categories);
categories.forEach(category => {
  category.addEventListener('click', e => {
    showCategory(e.target.id);

  });
});

const sort = document.getElementById('sort-by');
sort.addEventListener('change', e => {
  sortBy = e.target.value;
  showCategory('all');
});

