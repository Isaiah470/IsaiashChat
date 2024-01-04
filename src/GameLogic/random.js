function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Fischer-Yates shuffle
function shuffle(array) {
  var i = array.length,
      j = 0,
      temp;
  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

export {rand, };