let stickData;

let scrollHandler = () => {
  if (stickData.initializedStickyHeader) {
    let current = stickData.collection[stickData.lastIndex];
    let previous = stickData.collection[stickData.lastIndex - 1];
    if (window.pageYOffset >= current.offsetTop) {
      current.classList.add('sticky');
      stickData.lastIndex++;
      stickData.lastPageYOffset = window.pageYOffset;
    } else if (
      (stickData.lastPageYOffset > window.pageYOffset) &&
      previous &&
      previous.classList.contains('sticky') &&
      (window.pageYOffset <= current.offsetTop)
    ) {
      previous.classList.remove('sticky');
      stickData.lastIndex--;
    }
    stickData.lastPageYOffset = window.pageYOffset;
  }
};

function getDomElements(point){
  stickData = {
    collection: Array.from(point).sort((a, b) => a.offsetTop - b.offsetTop),
    lastIndex: 0,
    initializedStickyHeader: true,
    lastPageYOffset: 0
  };
}

function initialize() {
  stickData.initializedStickyHeader = true;
  scrollHandler();
  if(stickData.lastIndex -1 > 0){
    stickData.collection[stickData.lastIndex -1].classList.add('sticky');
  }
}

function disable() {
  stickData.initializedStickyHeader = false;
  scrollHandler();
  stickData.collection.forEach(element => {
    element.classList.remove('sticky');
  });
}

getDomElements(document.getElementsByClassName('header'));

document.addEventListener('scroll', scrollHandler);