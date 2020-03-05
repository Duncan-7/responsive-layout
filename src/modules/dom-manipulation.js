export const clearPreviews = () => {
  const container = document.getElementById('preview-container');
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
}

export const createPreview = (courseInfo) => {
  const container = document.getElementById('preview-container');
  const preview = document.createElement('div');
  preview.setAttribute('class', 'preview');

  const imageContainer = document.createElement('div');
  imageContainer.setAttribute('class', 'preview-image');
  const image = document.createElement('img');
  image.setAttribute('src', 'assets/' + courseInfo.imageSrc);
  const caption = document.createElement('div');
  switch (courseInfo.type) {
    case 'tax':
      caption.setAttribute('class', 'tax caption');
      break;
    case 'communication':
      caption.setAttribute('class', 'communication caption');
      break;
    case 'technology':
      caption.setAttribute('class', 'technology caption');
      break;
  }
  caption.textContent = courseInfo.type.toUpperCase();
  imageContainer.appendChild(image);
  imageContainer.appendChild(caption);

  const previewText = document.createElement('div');
  previewText.setAttribute('class', 'preview-text');

  const heading = document.createElement('h3');
  heading.setAttribute('class', 'bold');
  heading.textContent = courseInfo.title;

  const description = document.createElement('p');
  description.setAttribute('class', 'description');
  description.textContent = courseInfo.description;

  const price = document.createElement('p');
  price.setAttribute('class', 'price');
  const priceText = document.createElement('span');
  priceText.setAttribute('class', 'bold');
  priceText.textContent = 'Price: ';
  const priceNumber = document.createElement('span');
  priceNumber.textContent = '£' + courseInfo.price;
  price.appendChild(priceText);
  price.appendChild(priceNumber);

  previewText.appendChild(heading);
  previewText.appendChild(description);
  previewText.appendChild(price);

  preview.appendChild(imageContainer);
  preview.appendChild(previewText);

  container.appendChild(preview);
}

export const createLoadMoreButton = () => {
  const button = document.createElement('div');
  button.setAttribute('class', 'button outline');
  button.setAttribute('id', 'load-more');
  button.textContent = 'Load more';
  button.setAttribute('style', 'text-align: center;')
  return button;
}

export const createError = () => {
  const container = document.getElementById('preview-container');
  const error = document.createElement('p');
  error.textContent = "There was an error finding course data. Please reload the page."
  container.appendChild(error);
}

export const removeLoadMoreButton = () => {
  const button = document.getElementById('load-more');
  button.parentNode.removeChild(button);
}

export const highlightCategory = (type) => {
  let categories = document.getElementsByClassName('category');
  categories = Array.from(categories);
  categories.forEach(category => {
    if (category.id == type) {
      category.className = "category selected";
    } else {
      category.className = "category";
    };
  });
}