export {clone, left, right, up, down, addTile, checkLose}

function clone(items) {
  return items.map(item => Array.isArray(item) ? clone(item) : item);
}

const animStr = (i) => `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;

//what must state array keep track of? from, to? 

//maybe grid is the useref
//fix logic

//grid is actually array
//if merged: [2] is second id, grid[3]
//how to animate text? text should be image or something, background image
//grid [0] is id  grid[1] value 

//tile is added even when no change is made! oh well, whatever
function left(n, m, grid) {
  let nextPos = 0;
  let nextVal = 0;
  let changeMade = false;
  let maxChange = 0;
  //2d coords to 1d: m*i + j;
  for (let i = 0; i <n; i ++) {
    nextPos = 0;
    nextVal = grid[i][nextPos][1];
    for (let j = 1; j < m; j++) {

      if (grid[i][j][1] === 0) {
        continue;
      } 
      else {

        //merge case
        if (grid[i][j][1] === nextVal) {
          changeMade = true;
          grid[i][nextPos][0] = grid[i][j][0];
          grid[i][nextPos][1] = 2*grid[i][j][1];
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
           maxChange = Math.max(j - nextPos, maxChange)
          nextPos++;

        }

        else if (nextVal === 0) {
          changeMade = true;
          grid[i][nextPos][0] = grid[i][j][0];
          grid[i][nextPos][1] = grid[i][j][1]; 
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
        }

        else {
          nextPos++;
          grid[i][nextPos][0] = grid[i][j][0];
          grid[i][nextPos][1] = grid[i][j][1]; 
         // grid[i][j][0] = 0;
          if (j!== nextPos) {
            changeMade = true;
            grid[i][j][1] = 0;
            grid[i][j][0] = 0;
          }
        }
        nextVal = grid[i][nextPos][1];
        maxChange = Math.max(j - nextPos, maxChange)
      }


    }
  }
  return {grid, changeMade, maxChange};
}

function right(n, m, grid) {
  let nextPos = 0;
  let nextVal = 0;
  let changeMade = false;
  let maxChange = 0;
  //2d coords to 1d: m*i + j;
  for (let i = 0; i <n; i ++) {
    //diff
    nextPos = m-1;

    nextVal = grid[i][nextPos][1];
    //diff
    for (let j = m-2; j >= 0; j--) {
      if (grid[i][j][1] === 0) {
        continue;
      } 
      else {

        //merge case
        if (grid[i][j][1] === nextVal) {
          changeMade = true;
          grid[i][nextPos][0] = grid[i][j][0];
          grid[i][nextPos][1] = 2*grid[i][j][1];
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
          //diff
           maxChange = Math.max(nextPos - j, maxChange)
          nextPos--;
        }

        else if (nextVal === 0) {
          changeMade = true;
          grid[i][nextPos][0] = grid[i][j][0];
          grid[i][nextPos][1] = grid[i][j][1]; 
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
        }

        else {

          //diff
          nextPos--;
          grid[i][nextPos][0] = grid[i][j][0];
          grid[i][nextPos][1] = grid[i][j][1]; 
         // grid[i][j][0] = 0;
          if (j!== nextPos) {
            changeMade = true;
            grid[i][j][1] = 0;
            grid[i][j][0] = 0;
          }
        }
        nextVal = grid[i][nextPos][1];
         maxChange = Math.max(nextPos - j, maxChange)
      }


    }
  }
  return {grid, changeMade, maxChange};
}

function up(n, m, grid) {
  let nextPos = 0;
  let nextVal = 0;
  let changeMade = false;
  let maxChange = 0;
  //2d coords to 1d: m*i + j;
  for (let j = 0; j < m; j ++) {
    //diff
    nextPos = 0;

    nextVal = grid[nextPos][j][1];
    //diff
    for (let i = 1; i < n; i++) {
      if (grid[i][j][1] === 0) {
        continue;
      } 
      else {

        //merge case
        if (grid[i][j][1] === nextVal) {
          changeMade = true;
          grid[nextPos][j][0] = grid[i][j][0];
          grid[nextPos][j][1] = 2*grid[i][j][1];
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
          //diff
           maxChange = Math.max(i - nextPos, maxChange)
          nextPos++;

        }

        else if (nextVal === 0) {
          changeMade = true;
          grid[nextPos][j][0] = grid[i][j][0];
          grid[nextPos][j][1] = grid[i][j][1]; 
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
        }

        else {

          //diff
          nextPos++;
          grid[nextPos][j][0] = grid[i][j][0];
          grid[nextPos][j][1] = grid[i][j][1]; 
         // grid[i][j][0] = 0;
          if (i !== nextPos) {
            changeMade = true;
            grid[i][j][1] = 0;
            grid[i][j][0] = 0;
          }
        }
        nextVal = grid[nextPos][j][1];
         maxChange = Math.max(i - nextPos, maxChange)
      }


    }
  }
  return {grid, changeMade, maxChange};
}

function down(n, m, grid) {
  let nextPos = 0;
  let nextVal = 0;
  let changeMade = false;
  let maxChange = 0;
  //2d coords to 1d: m*i + j;
  for (let j = 0; j < m; j ++) {
    //diff
    nextPos = n-1;

    nextVal = grid[nextPos][j][1];
    //diff
    for (let i = n-2; i >= 0; i--) {
      if (grid[i][j][1] === 0) {
        continue;
      } 
      else {

        //merge case
        if (grid[i][j][1] === nextVal) {
          changeMade = true;
          grid[nextPos][j][0] = grid[i][j][0];
          grid[nextPos][j][1] = 2*grid[i][j][1];
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
          //diff
           maxChange = Math.max(nextPos - i, maxChange)
          nextPos--;
        }

        else if (nextVal === 0) {
          changeMade = true;
          grid[nextPos][j][0] = grid[i][j][0];
          grid[nextPos][j][1] = grid[i][j][1]; 
          grid[i][j][1] = 0;
          grid[i][j][0] = 0;
        }

        else {

          //diff
          nextPos--;
          grid[nextPos][j][0] = grid[i][j][0];
          grid[nextPos][j][1] = grid[i][j][1]; 
         // grid[i][j][0] = 0;
          if (i !== nextPos) {
            changeMade = true;
            grid[i][j][1] = 0;
            grid[i][j][0] = 0;
          }
        }
        nextVal = grid[nextPos][j][1];
        maxChange = Math.max(nextPos - i, maxChange)
      }


    }
  }
  return {grid, changeMade, maxChange};
}

function addTile(n, m, gridMore) {
  // 
  let {grid, changeMade, maxChange} = gridMore
  maxChange = maxChange*25+50;
  //console.log(maxChange)
  if (!changeMade) return gridMore;
  let emptyGrid = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j][1] === 0) {
        emptyGrid.push([i, j]);
      } 
    }
  }
  let randIndex = Math.floor(Math.random() * emptyGrid.length);
  let twoOrFour = Math.floor(Math.random() * 10)
  if (emptyGrid.length) {
    grid[emptyGrid[randIndex][0]][emptyGrid[randIndex][1]][0] = crypto.randomUUID()
    grid[emptyGrid[randIndex][0]][emptyGrid[randIndex][1]][1] = twoOrFour ? 2 : 4
    //console.log('lol')
  }
  //twoOrFour is 0 if a four
  return {grid, maxChange};
}

function checkLose(n, m, grid) {
  //check of any zero
  //then check any two elements next to each other are same!
  let isLost = 'lost';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      //check above, left,only? ?
      let currVal = grid[i][j][1]
      if (currVal === 0 || grid?.[i-1]?.[j]?.[1] === currVal || grid[i]?.[j-1]?.[1] === currVal) {
        isLost = 'continue';
      } 
      if (currVal === 2048) {
        isLost = 'won';
        return isLost
      }
    }
  }
  return isLost;
}