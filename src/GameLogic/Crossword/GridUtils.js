export { insertRow, insertColumn, deleteRow, deleteColumn, changeBlackTile, wordNumbers, replacer, reviver };
//n x m
//how does inserting row affect other rows
function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

function insertRow(idArray, n, m, row) {
  const insertAt = row; // Could be any index
  const nextArray = [
    // Items before the insertion point:
    ...idArray.slice(0, insertAt),
    // New item:
    [...Array(m + 1).keys()].map((i, index) => {
      return [crypto.randomUUID(), 0, 0, 0, 0];
    }),
    ...idArray.slice(insertAt)
  ];
  //wordNumbers(nextArray, n+1, m);
  return wordNumbers(nextArray, n + 1, m);
}

function insertColumn(idArray, n, m, column) {
  const insertAt = column;
  const nextArray = idArray.map((row, i) => {
    // Items before the insertion point:
    return [...row.slice(0, insertAt), [crypto.randomUUID(), 0, 0, 0, 0], ...row.slice(insertAt)]
  })
  return wordNumbers(nextArray, n, m + 1);
  //return nextArray;
}

function deleteRow(idArray, n, m, row) {
  const nextArray = idArray.filter((r, index) => index !== row - 1)
  return wordNumbers(nextArray, n - 1, m);
  //return nextArray;
}

function deleteColumn(idArray, n, m, column) {
  const nextArray = idArray.map((row, i) => {
    return row.filter((c, j) => j !== column - 1)
  })
  return wordNumbers(nextArray, n, m - 1);
  //return nextArray;
}

//take in grid size, dark grids, return numbers
//what should return be? what should input dark be?
//how help find which are right to highlight? 

//idArray: 0 is white, 1 is black
//assume always passing in structuredClone
function changeBlackTile(idArray, n, m, i, j) {
  const newId = idArray[i][j].map((id, index) => { return index === 1 ? (1 + id) % 2 : id })
  const newArray = idArray.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
      if (rowIndex === i && columnIndex === j) {
        return newId;
      }
      else {
        return column;
      }
    })
  })
  //idArray[i][j][1] = (1 + idArray[i][j][1]) % 2
  return wordNumbers(newArray, n, m,)
}

//set words, either 0 or actual number
function wordNumbers(idArray, n, m,) {
  //what about specially set words? 
  //if (i !== 'false' && j !== 'false')
  //copyArray[i][j][1] = (1 + copyArray[i][j][1]) % 2
  let count = 1;
  let numRow = 0;
  let numColumn = [...Array(m).keys()]
  let listAcross = []
  let listDown = []
  const newArray = idArray.map((row, i) => {
    return row.map((column, j) => {
      if (i >= n || j >= m)
        return column;
      const newElement = [...idArray[i][j]]
      newElement[2] = 0; newElement[3] = 0; newElement[4] = 0;
      if (idArray[i][j][1] === 0) {
        if (j === 0 || idArray[i]?.[j - 1]?.[1] === 1 || i === 0 || idArray?.[i - 1][j]?.[1] === 1) {
          if (j === 0 || idArray[i]?.[j - 1]?.[1] === 1) {
            newElement[3] = count;
            listAcross.push([i, j, count])
            numRow = count;
          }
          if (i === 0 || idArray?.[i - 1][j]?.[1] === 1) {
            newElement[4] = count;
            listDown.push([i, j, count])
            numColumn[j] = count;
          }
          newElement[2] = count++
        }
        if (!newElement[3])
          newElement[3] = numRow;
        if (!newElement[4])
          newElement[4] = numColumn[j];
      }
      return newElement;

    })
  })

  return { newArray, listAcross, listDown };
  //return word array
}

function nextFocus(idArray, n, m, pos, dir) {
  if (dir === 'vertical') {

  }
  else if (dir === 'horizontal') {

  }
}
//how to take care of get next when fill in one?
// must be similar, easy to do 
//idealy each tile has information which num row, which num column it is in. 

//hard features: 
//jump to next field in word, don't jump word after
//update words when row added, stuff blacked out

//array has couple pieces information: unique id, black or not, whether has number or not, ideally which number row is in, which number column is in. end of row: just unique id? 

