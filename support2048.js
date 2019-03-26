//获取屏幕的可用宽度 
documentWidth = window.screen.availWidth;
//100% 92% 18% 4%
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j){
  //获取top的值 
  // return 20+120*i;
  return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(i, j){
  //获取top的值 
  // return 20+120*j;
  return cellSpace + j * (cellSpace + cellSideLength);

}

function getNumberBackgroundColor(number){
  switch(number){
    case 2: return '#eee4da'; break;
    case 4: return '#ede0c8'; break;
    case 8: return '#f2b179'; break;
    case 16: return '#f59563'; break;
    case 32: return '#f67c5f'; break;
    case 64: return '#f65e3b'; break;
    case 128: return '#edcf72'; break;
    case 256: return '#edcc61'; break;
    case 512: return '#9c0'; break;
    case 1024: return '#33b5e5'; break;
    case 2048: return '#09c'; break;
    case 4096: return '#a6c'; break;
    case 8192: return '#93c'; break;

  }
  return "black";
}

function getNumberColor(number){
  if(number <= 4){
    return "#776e65";
  }
  return "white";
}

function nospace(){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(board[i][j] == 0){
        //如果有0值，说明还有空间 返回false
        return false;
      }
    }
  }
  return true;
}

//判断是否向左移动
function canMoveLeft(board){
  //左边是否没有数字？|| 左边数字是否和自己相等＝＝叠加
  for(var i = 0; i < 4; i++){
    for(var j = 1; j < 4; j++){
      //如果当前元素存在数字 那么就要考虑
      if(board[i][j] != 0){
        //如果它左侧的数字为0或与左侧数字相同， 则可以向左移动
        if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveUp(board){
  //判断是否可以向上移动
  
  //先便利格子，查看是否有上面为0的格子或者上面的格子和自己的值一样
  for(var i = 1; i < 4; i++){
    for(var j = 0; j < 4; j++){
      //如果当前遍历到的格子不为0，那么就要继续判断
      if(board[i][j] != 0){
        //上面的格子是否有0的或者上面的值和自己的值一样
        if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveRight(board){
  for(var i = 0; i < 4; i++){
    for(var j = 2; j >= 0; j--){
      //如果当前元素存在数字 那么就要考虑
      if(board[i][j] != 0){
        //如果它左侧的数字为0或与左侧数字相同， 则可以向左移动
        if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveDown(board){
  for(var j = 0; j < 4; j++){
    for(var i = 2; i >= 0; i--){
      if(board[i][j] != 0){
        if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}

function noBlockHorizontal(row, col1, col2, board){
  //判断是否有障碍 
  for(var i = col1 + 1; i < col2; i++) {
    if(board[row][i] != 0){
      //一旦有不等于0的 就说明有障碍物
      return false;
    }
  }
  return true; 
}


function noBlockVertival(col, row1, row2, board){
  //判断是否有障碍 
  for(var i = row1 + 1; i < row2; i++) {
    if(board[i][col] != 0){
      //一旦有不等于0的 就说明有障碍物
      return false;
    }
  }
  return true; 
}

function nomove(board){
  if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
    return false
  }
  return true;
}