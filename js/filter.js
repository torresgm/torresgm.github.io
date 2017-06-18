let currentFilters = [];
const units = {
  blur: 'px',
  brightness: '%',
  contrast: '%',
  grayscale: '%',
  'hue-rotate': 'deg',
  invert: '%',
  opacity: '%',
  saturate: '%',
  sepia: '%'
};

function setRanges() {
  const image = getImage();
  const filterRanges = document.querySelectorAll('#filterRanges input[type="range"]');
  filterRanges.forEach(function (filterRange) {
    const filter = filterRange.id;
    filterRange.oninput = function () {
      const filterRangeValue = document.querySelector(`#${filter}RangeValue`);
      const range = filterRange.value;
      filterRangeValue.innerHTML = range;
      filterImage(filter, image, range);
    }
  })
}

function getRange(filter, range) {
  let unit = '';
  if (filter === 'blur') {
    range /= 10;
  } else if (filter === 'hue-rotate') {
    range = (range / 100) * 360;
  }
  return range + units[filter];
}

function findByFilterName(filter) {
  return function (currentFilter) {
    return currentFilter.name === filter;
  }
}

function addFilter(filter, range) {
  currentFilters.push({ name: filter, range: range });
}

function filterImage(filter, image, range) {
  const canvas = getCanvas();
  const context = canvas.getContext('2d');
  let appliedFilter = context.filter === 'none' ? '' : context.filter;
  let newFilter = '';
  if (appliedFilter === '') {
    newFilter = `${filter}(${getRange(filter, range)})`;
    addFilter(filter, range);
  } else {
    const filterIndex = currentFilters.findIndex(findByFilterName(filter));
    if (filterIndex === -1) {
      addFilter(filter, range);
    } else {
      currentFilters[filterIndex].range = range;
    }
    currentFilters.map(function (currentFilter) {
      newFilter += `${currentFilter.name}(${getRange(currentFilter.name, currentFilter.range)})`;
    })
  }
  context.filter = newFilter;
  context.drawImage(image, 0, 0);
}

function resetFilter() {
  const context = getCanvas().getContext('2d');
  currentFilters = [];
  context.filter = 'none';
}

function resetInputRanges() {
  const filterRangeValues = document.querySelectorAll('.rangeValue');
  const filterRanges = document.querySelectorAll('#filterRanges input[type="range"]');
  Object.keys(filterRanges).map(function (index) {
    filterRanges[index].value = 50;
    filterRangeValues[index].innerHTML = 50;
  });
}