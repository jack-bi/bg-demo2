$(document).ready(function() {
  var $carousel = $('.foBox');
  // var $items = $('.footerLogo');
  // var itemWidth = $items.outerWidth(true);

  // // 克隆第一个元素并添加到最后
  // $items.last().after($items.first().clone());

  // // 计算轮播容器的新宽度
  // var newWidth = $items.length * itemWidth;

  // // 设置轮播容器的宽度
  // $carousel.width(newWidth);
var marginLeftValue = parseInt($carousel.css('marginLeft'));

let marquee = setInterval(()=>{
  if(marginLeftValue<-4176){
    $carousel.css('marginLeft', 0);
    marginLeftValue = 0
  }
  else{
    $carousel.css('marginLeft', marginLeftValue--);
  }
},25)


$('.footerLogo').mouseenter(function() {
  // 鼠标进入事件处理
  clearInterval(marquee);
}).mouseleave(function() {
  marquee = setInterval(()=>{
    if(marginLeftValue<-4176){
      $carousel.css('marginLeft', 0);
      marginLeftValue = 0
    }
    else{
      $carousel.css('marginLeft', marginLeftValue--);
    }
  },25)
});

  // 设置定时器，每隔一段时间执行一次动画
  // setInterval(animateCarousel,1000);
});
