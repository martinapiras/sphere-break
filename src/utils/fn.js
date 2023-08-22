export const shuffle = (array) => {
  let i = array.length;

  while (i) {
    const j = Math.floor(Math.random() * i--);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

// checks if any entry coins are selected before allowing border coins to be selected
export const isSelected = (array) => !!array.find((item) => item.selected);
