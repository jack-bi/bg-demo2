const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
  $section = $('section');

let numOfPages = $section.length - 1;
let currentPage = 0;
let scrollLock = false;

function scrollPagePC() {
  //滑鼠滾動
  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if (scrollLock) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
      navigatePage('up')
    else
      navigatePage('down')
  });
  //鍵盤上下鍵
  $(document).on("keydown", function (e) {
    if (scrollLock) return;
    if (e.which === 38)
      navigatePage('up')
    else if (e.which === 40)
      navigatePage('down')
  });
}

function navigatePage(direction) {
  if (scrollLock) return;
  if (direction === 'up' && currentPage > 0) {
    currentPage--;
    if (currentPage >= 1) {
      $("header#Header").addClass("two").removeClass("hidden");
      $(".clint").removeClass("hidden");
    } else {
      $("header#Header").removeClass("two").removeClass("hidden");
      $(".clint").removeClass("hidden");
    }
  } else if (direction === 'down' && currentPage < numOfPages) {
    currentPage++;
    if (numOfPages === currentPage ) {
      $("header#Header").addClass("hidden");
      $(".clint").addClass("hidden");
    }
    if (currentPage >= 0) $("header#Header").addClass("two");
  } else {
    return;
  }
  smoothScroll();
}

function smoothScroll() {
  scrollLock = true;
  $body.stop().animate({
    scrollTop: $section.eq(currentPage).offset().top
  }, 1000, 'swing', function () {
    scrollLock = false;
  });
};


let navBottom = $("li.add")

function scrollPageH5() {
  //滑鼠滾動
  var element = document.getElementById('fiBlock');
  var distanceToTop = element.offsetTop;
  window.addEventListener('scroll', function (e) {
    if (window.scrollY > distanceToTop)
      $('.h5 .bglogo').addClass('change')
    if (window.scrollY < distanceToTop)
      $('.h5 .bglogo').removeClass('change')
  });
}
function phoneNav() {
  $(".h5 .clint").click(function () {
    $('.clint').toggleClass('active')
    $('.rBlock').toggleClass('active')
    $('body.h5 #Header').toggleClass('active')
    $('body.h5').toggleClass('dontMove')
  });
  $(".h5 .add").click(function () {
      $(this).toggleClass('open')
      $(".h5 .add").not(this).removeClass("open");
    });
  $(".h5 .bi-search").click(function () {
    $('.seachBlock').toggleClass('close')
  });
}

function reload() {
  window.addEventListener('load', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });
}

$(function () {
  function checkWindowSize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 821) {
      $('body').addClass('pc');
      $('body').attr('id','pc')
      $('body').removeClass('h5');
      $('body').removeAttr('h5');
      scrollPagePC()
      animatePC()
    } else {
      $('body').addClass('h5');
      $('body').attr('id','h5');
      $('body').removeClass('pc');
      $('body').removeAttr('pc');
      phoneNav()
      scrollPageH5()
      animateH5()
      H5swiper()
      H5AddButton()
      // moveGames()
    //   movebanner('.h5 .four .gamesBtn', function() {
    //     console.log('向左滑动');
    //     moveBanner('n')
    // }, function() {
    //     console.log('向右滑动');
    //     moveBanner('p')
    // });
    }
  }
  $(window).resize(checkWindowSize);
  checkWindowSize();
  reload();
});

function addAnimation(obj, key, block, add = true) {
  // 定义所有可能的动画类
  let animationClasses = ['animate__bounceInLeft', 'animate__bounceInRight', 'animate__backInUp', 'animate__fadeIn', 'animate__bounce', 'animate__slideInLeft', 'animate__slideInRight', 'animate__fadeInBottomLeft', 'animate__fadeInTopRight', 'animate__flipInY', 'animate__delay-2s'];
  // 移除所有可能的动画类
  if (!add) {
    obj.each(function() {
      animationClasses.forEach(className => $(this).removeClass(className));
      // 还原样式
      $(this).css({
        display: '',
        opacity: ''
      });
    });
    return;
  }
  let animationClass = '';
  let displayStyle = '';
  let opacityValue = '';
  switch(block) {
    case 'two':
      animationClass = key === 'L' ? 'animate__bounceInLeft' : 'animate__bounceInRight';
      displayStyle = 'block';
      animationClasses.push('animate__delay-2s');
      break;
    case 'fiv':
      if(obj.length > 0) {
        obj[0].classList.add('animate__backInUp');
      }
      return; // 特殊情况直接返回
    default:
      break;
  }

  switch(key) {
    case 'L':
      animationClass = 'animate__slideInLeft';
      opacityValue = '1';
      break;
    case 'R':
      animationClass = 'animate__slideInRight';
      opacityValue = '1';
      break;
    case 'fademain':
      animationClass = 'animate__fadeIn';
      displayStyle = 'flex';
      break;
    case 'BL':
      animationClass = 'animate__fadeInBottomLeft';
      opacityValue = '1';
      break;
    case 'TR':
      animationClass = 'animate__fadeInTopRight';
      opacityValue = '1';
      break;
    case 'flipY':
      animationClass = 'animate__flipInY';
      displayStyle = 'block';
      break;
    case 'bigBG':
      animationClass = 'animate__bounce';
      opacityValue = '1';
      break;
    default:
      // 如果没有匹配的key，直接返回
      return;
  }

  // 应用动画效果
  obj.each(function() {
    if(displayStyle) $(this).css('display', displayStyle);
    if(opacityValue) $(this).css('opacity', opacityValue);
    $(this).addClass(animationClass);
  });
}

function animatePC() {
  window.addEventListener('scroll', function () {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    // 检查每个动画区间，确定是否添加或移除动画
    addAnimation($('.two .L'), 'L', 'two', scrollY >= windowHeight && scrollY >= windowHeight * 4);
    addAnimation($('.two .R'), 'R', 'two', scrollY >= windowHeight && scrollY >= windowHeight * 4);
    addAnimation($('.two .bigBG'), 'bigBG', '', scrollY >= windowHeight && scrollY >= windowHeight * 4);

    addAnimation($('.the .textBlock'), 'L', '', scrollY >= windowHeight * 2 && scrollY < windowHeight * 3);
    addAnimation($('.the .MainBackRight'), 'TR', '', scrollY >= windowHeight * 2 && scrollY < windowHeight * 3);
    addAnimation($('.the .MainBackLeft'), 'BL', '', scrollY >= windowHeight * 2 && scrollY < windowHeight * 3);
    addAnimation($('.the .MainBackLeft p'), 'L', '', scrollY >= windowHeight * 2 && scrollY < windowHeight * 3);
    addAnimation($('.the .MainBackRight p'), 'R', '', scrollY >= windowHeight * 2 && scrollY < windowHeight * 3);

    addAnimation($('.four .gamesBtn .swiper-slide'), 'flipY', '', scrollY >= windowHeight * 3 && scrollY < windowHeight * 4);

    addAnimation($('.five .Block'), '', 'fiv', scrollY >= windowHeight);
  });
  
}

function animateH5() {
  window.addEventListener('scroll', function () {
    if (window.scrollY >= $('#twBlock .a').offset().top - 750) $('#twBlock .a').addClass('animate__fadeInUp')
    if (window.scrollY >= $('#twBlock .b').offset().top - 750) $('#twBlock .b').addClass('animate__fadeInUp')
    if (window.scrollY >= $('#twBlock .c').offset().top - 750) $('#twBlock .c').addClass('animate__fadeInUp')
    if (window.scrollY >= $('#twBlock .d').offset().top - 750) $('#twBlock .d').addClass('animate__fadeInUp')
    if (window.scrollY >= $('#twBlock .e').offset().top - 750) $('#twBlock .e').addClass('animate__fadeInUp')
    if (window.scrollY >= $('#twBlock .f').offset().top - 750) $('#twBlock .f').addClass('animate__fadeInUp')
    // if (window.scrollY >= $('#thBlock .aBlock').offset().top - 550) $('#thBlock .aBlock').addClass('animate__fadeInUp')
    // if (window.scrollY >= $('#thBlock .bBlock').offset().top - 550) $('#thBlock .bBlock').addClass('animate__fadeInUp')
    // if (window.scrollY >= $('#fuBlock .gamesBtn').offset().top - 550) $('#fuBlock .gamesBtn').addClass('animate__fadeInUp')
    // if (window.scrollY >= $('#fiBlock .rightBlock').offset().top - 550) $('#fiBlock .rightBlock').addClass('animate__fadeInUp')
    // if (window.scrollY >= $('#fiBlock .leftBlock').offset().top - 550) $('#fiBlock .leftBlock').addClass('animate__fadeInUp')
  })
}
