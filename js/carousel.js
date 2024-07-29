var carousel = $(".carousel"),
caroitem = $(".carousel > div"),
  content = $(".content > div"),
  currdeg = 0;
var items = ['a','b','c','d','e','f']
// Initial call to set the content visibility according to the default rotation degree
updateContentVisibility(currdeg, 360 / $(".carousel .item").length);

$(".next").on("click", { d: "n" }, rotate);
$(".prev").on("click", { d: "p" }, rotate);

function rotate(e) {
  var totalItems = $(".carousel .item").length;
  var degreesPerItem = 360 / totalItems;

  if (e.data.d == "n") {
    currdeg -= 60;
  } else if (e.data.d == "p") {
    currdeg += 60;
  }

  carousel.css({
    "-webkit-transform": "rotateY(" + currdeg + "deg)",
    "-moz-transform": "rotateY(" + currdeg + "deg)",
    "-o-transform": "rotateY(" + currdeg + "deg)",
    "transform": "rotateY(" + currdeg + "deg)"
  });

  updateContentVisibility(currdeg, degreesPerItem);
}

function updateContentVisibility(degrees, degreesPerItem) {
  var adjustedDegrees = (360 + degrees % 360) % 360; // Normalize degrees

  var totalItems = $(".carousel .item").length;
  
  // Calculate the current item's index based on the rotation
  // The modulus ensures the index wraps around correctly
  var currentItemIndex = Math.round(adjustedDegrees / degreesPerItem) % totalItems;
  // Since we're rotating in multiples of 60 degrees, let's correct the index calculation
  // Ensure it maps correctly from the degrees to the index of the item and content
  currentItemIndex = ((360 - adjustedDegrees) / 60) % totalItems;
  for(n of caroitem){
    n.classList.remove('light')
  }
  caroitem[currentItemIndex].classList.add('light')
  content.hide(); // Hide all content
  $(content[currentItemIndex]).show(); // Show current content based on index
}




var startX, startY;

carousel.on("touchstart", function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

carousel.on("touchend", function(event) {
  var endX = event.changedTouches[0].clientX;
  var endY = event.changedTouches[0].clientY;

  var deltaX = endX - startX;
  var deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      rotate({ data: { d: "p" } });
    } else {
      rotate({ data: { d: "n" } });
    }
  }
});

carousel.on("touchmove", function(event) {
  var currentX = event.touches[0].clientX;
  var currentY = event.touches[0].clientY;

  var deltaX = currentX - startX;
  var deltaY = currentY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    event.preventDefault(); // 阻止默认的触摸事件
  } else {
    return
  }
});
