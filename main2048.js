//游戏数据
var board = new Array();
var score = 0; //分数
//避免多次叠加
var hasConflicted = new Array();
//移动端触控
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function(){
  prepareForMobile();
  newgame();
});

function prepareForMobile(){
  if(documentWidth > 500){
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSideLength = 100;
  }
  //先调整装着16个小方块的大方块的样式
  $("#grid-container").css('width', gridContainerWidth - 2 * cellSpace);
  $("#grid-container").css('height', gridContainerWidth - 2 * cellSpace);
  $("#grid-container").css('padding', cellSpace);
  $("#grid-container").css('border-radius', gridContainerWidth * 0.02);
  
  //调整小方块的样式
  $(".grid-cell").css('width', cellSideLength);
  $(".grid-cell").css('height', cellSideLength);
  $(".grid-cell").css('border-radius', cellSideLength * 0.02);

}

function newgame(){
  //开始新游戏时： 1.初始化棋盘格  2. 随机生成两个格子数字
  init();

  //随机生成
  generateOneNumber();
  generateOneNumber();
}

function init(){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      //通过id拿到每一个小格子
      var gridCell = $("#grid-cell-"+i+"-"+j);
      //计算每个小格子的Top和Left值
      gridCell.css('top', getPosTop(i, j)+"px");
      gridCell.css('left', getPosLeft(i, j)+"px");
      // console.log(getPosTop(i, j),getPosLeft(i, j),i,j);

    }
  }
    //将board变成二维数组
    for(var i = 0; i < 4; i++){
      board[i] = new Array();
      hasConflicted[i] = new Array();
      for(var j = 0; j < 4; j++){
        board[i][j] = 0;
        hasConflicted[i][j] = false;
      }
    }
    //更新数据
    updateBoardView();
    score = 0;
  }


function updateBoardView(){
  //根据board的值对number－cell进行动态操作
  //要考虑每一次的情况
  $(".number-cell").remove();
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
// $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');      
    $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
    var theNumberCell = $("#number-cell-"+i+"-"+j);
      if(board[i][j] == 0){
        //为0 不显示
        theNumberCell.css("width", "0px");
        theNumberCell.css("height", "0px");
        // theNumberCell.css("top", getPosTop(i,j)+50);
        // theNumberCell.css("left", getPosLeft(i,j)+50);
        theNumberCell.css("top", getPosTop(i,j)+ cellSideLength / 2);
        theNumberCell.css("left", getPosLeft(i,j)+cellSideLength / 2);



      }else{
        //不为0 显示
        // theNumberCell.css("width", "100px");
        // theNumberCell.css("height", "100px");
        theNumberCell.css("width", cellSideLength);
        theNumberCell.css("height", cellSideLength);


        //完全覆盖grid-cell
        theNumberCell.css("top", getPosTop(i,j));
        theNumberCell.css("left", getPosLeft(i,j));
        //设置背景色
        theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
        //返回前景色
        theNumberCell.css("color", getNumberColor(board[i][j]));
        //显示数字
        theNumberCell.text(board[i][j]);
      }
      hasConflicted[i][j] = false;
    }
  }

  $(".number-cell").css("line-height", cellSideLength + "px");
  $(".number-cell").css("font-size", 0.6 * cellSideLength + "px");

}

function generateOneNumber(){
  //当前如果有空间 就可以生成随机数
  //随机位置 随机数字
  if(nospace(board)){
    //无空余空间
    return false;
  }
  //随机位置[0,4)->整数
  var randx = parseInt(Math.floor(Math.random() * 4));
  var randy = parseInt(Math.floor(Math.random() * 4));
  //查看该位置是否可用
  while(true){
    if(board[randx][randy] == 0){
      //可用 跳出循环
      break;
    }
    //当前位置不可用， 重新生成位置
    randx = parseInt(Math.floor(Math.random() * 4));
    randy = parseInt(Math.floor(Math.random() * 4));
  }
  //随机生成2-4 如果生成的随机数小于0.5 就为2， 否则为4 
  var randNumber = Math.random() < 0.5 ? 2 : 4;

  //显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx, randy, randNumber);
  return true;
}


$(document).keydown(function(event){
  //按钮按下事件
  switch(event.keyCode){
    case 37: //left
      if(moveLeft()){
          //能否向左移动
          setTimeout(generateOneNumber, 210);
          //game over?
          setTimeout(isgameover, 300);
        };
      break;
    case 38: //up
      if(moveUp()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
          //game over?
        setTimeout(isgameover, 300);
      };
      return false;//阻止默认行为
      break;
    case 39: //right
      if(moveRight()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
          //game over?
        setTimeout(isgameover, 300);
      };
      break;
    case 40: //down
      if(moveDown()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
          //game over?
        setTimeout(isgameover, 300);
      };
      return false;
      break;
    default: break;
  }
});

//事件监听器
document.addEventListener('touchstart', function(event){
  //event.touches用来存储触控的信息，是一个数组，可以保存多点触控的信息 这里只需要单指
  startx = event.touches[0].pageX;
  starty = event.touches[0].pageY;
});
document.addEventListener('touchend', function(event){
  //触摸结束时，调用changedTouches里的信息
  endx = event.changedTouches[0].pageX;
  endy = event.changedTouches[0].pageY;

  var deltax = endx - startx;
  var deltay = endy - starty;
//判断，避免用户点击屏幕也会触发以下的事件
  if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
    return;
  }

  //如果deltay>deltax，说明在y方向移动，反之
  if(Math.abs(deltax) >= Math.abs(deltay)){
    //在x方向
    if(deltax > 0){
      //向右滑动
      if(moveRight()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
          //game over?
        setTimeout(isgameover, 300);
        
      };
      return false;
    }else{
      //向左
      if(moveLeft()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
        //game over?
        setTimeout(isgameover, 300);
      };
    }
    return false;
  }else{
    //在y方向
    if(deltay > 0){
      //向下
      if(moveDown()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
          //game over?
        setTimeout(isgameover, 300);
      };
      return false;
    }else{
      //向上
      if(moveUp()){
        //能否向左移动
        setTimeout(generateOneNumber, 210);
          //game over?
        setTimeout(isgameover, 300);
      };
      return false;
    }
  }
});

function isgameover(){
  //无空间并且无法合并
  if(nospace(board) && nomove(board)){
    gameover();
  }
}
function gameover(){
  alert("Game Over!");
}



function moveLeft(){
  //判断是否能向左移动
  if(!canMoveLeft(board)){
    //不可以向左移动
    return false;
  }
  //判断可以移动到左边的哪
  //落脚位置是否为空 落脚数字和待定数字是否相等 落脚数字及右侧都为空?
  for(var i = 0; i < 4; i++){
    for(var j = 1; j < 4; j++){
      if(board[i][j] != 0){
        //如果当前格子有数字，则对它左侧的所有格子进行判断
        for(var k = 0; k < j; k++){
          if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
            //左侧为空 且 无障碍物--->move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
            
          }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
            //与左侧相同，且无障碍物
            //move+++add
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][k] + board[i][j];
            board[i][j] = 0;
            //数字叠加 加分
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function moveUp(){
  //判断是否可以向上移动
  if(!canMoveUp(board)){
    return false;
  }
  for(var j = 0; j < 4; j++){
    for(var i = 1; i < 4; i++){
      //如果当前的格子有数字 就进行进一步判断
      if(board[i][j] != 0){
        // 看它最多移动到哪
        for(var k = 0; k < i; k++){
          //如果有空的，并且中间没障碍物
          if(board[k][j] == 0 && noBlockVertival(j, k, i, board)){
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[k][j] == board[i][j] && noBlockVertival(j, k, i, board) && !hasConflicted[k][j]){
            showMoveAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            //数字叠加 加分
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function moveRight(){
  //先判断是否可以向右移动
  if(!canMoveRight(board)){
    //不可以的话
    return false;
  }
  for(var i = 0; i < 4; i++){
    for(var j = 2; j >= 0; j--){
      //判断当前的格子是否有值
      if(board[i][j] != 0){
        //判断是否可以移动到哪？
        for(var k = 3; k > j; k--){
          if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
            //右边的格子为空， 并且无障碍
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
            showMoveAnimation(i, j, i, k);
            board[i][k] *= 2;
            console.log(board[i][k]);
            board[i][j] = 0;
            //数字叠加 加分
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function moveDown(){
  if(!canMoveDown(board)){
    return false;
  }
  for(var j = 0; j < 4; j++){
    for(var i = 2; i >= 0; i--){
      if(board[i][j] != 0 ){
        for(var k = 3; k > i; k--){
          if(board[k][j] == 0 && noBlockVertival(j, i, k, board)){
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }else if(board[i][j] == board[k][j] && noBlockVertival(j, i, k, board) && !hasConflicted[k][j]){
            showMoveAnimation(i, j, k, j);
            board[k][j] *= 2;
            board[i][j] = 0;
            //数字叠加 加分
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;

          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}