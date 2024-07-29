let next = document.getElementsByClassName('NEX')[0];
let prev = document.getElementsByClassName('PRE')[0];
let btn = document.getElementsByClassName('gamesBtn')[0];
let btnItem = document.getElementsByClassName('gamesBtnItem');
let move = 0
let now = 1
prev.addEventListener('click',()=>{
  moveBanner('p')
})
next.addEventListener('click',()=>{
  moveBanner('n')
})

function moveBanner(T){
  if(T === 'p'){
    if(now<=1){
      now = 5
    }else{
      now-=1
    }
      move+=72
      btn.style.transform = `rotateY(${move}deg)`;
      opaIten(now-1)
    }
  else if(T === 'n'){
    if(now>=5){
      now = 1
    }else{
      now+=1
    }
      move-=72
      btn.style.transform = `rotateY(${move}deg)`;
      opaIten(now-1)
    }  
}


function opaIten(n){
  for(i of btnItem){
    i.classList.remove('light')
  }
  btnItem[n].classList.add('light')
}


function calculateSwipeDirection(startX, endX) {
  var threshold = 50; // 设置阈值，用于确定滑动的最小距离

  if (Math.abs(startX - endX) < threshold) {
      // 如果滑动距离小于阈值，则认为是无效滑动
      return 'invalid';
  } else if (endX > startX) {
      // 如果结束点的 x 坐标大于起始点的 x 坐标，则认为是向右滑动
      return 'right';
  } else {
      // 否则认为是向左滑动
      return 'left';
  }
}

// 示例：监听触摸事件
function moveGames(){
  var startX;
  let box = document.getElementsByClassName('h5')[0].querySelector('.four .gamesBtn')
  box.addEventListener('touchstart', function(event) {
  startX = event.touches[0].clientX;
});

box.addEventListener('touchend', function(event) {
  var endX = event.changedTouches[0].clientX;
  var direction = calculateSwipeDirection(startX, endX);

  document.addEventListener('touchmove', function(event) {
          event.preventDefault(); 
  })
  // 根据滑动方向执行相应的操作
  switch (direction) {
      case 'left':
          // console.log('向左滑动');
          moveBanner('n')
          break;
      case 'right':
          // console.log('向右滑动');
          moveBanner('p')
          break;
      case 'invalid':
          // console.log('无效滑动');
          break;
      default:
          break;
  }
});
}
