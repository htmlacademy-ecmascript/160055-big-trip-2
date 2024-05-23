function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

export {getRandomArrayElement, getRandomNumber};
