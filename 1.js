var contentEl = document.getElementById("content"),
  heroEl = document.querySelector(".hero"),
  heroHeight = heroEl.clientHeight,
  dropdown = document.getElementById("dropdown"),
  buttonsHeight = document.querySelector(".buttons").clientHeight
sections = document.querySelectorAll(".content-section");

var os = new OnScreen({
  tolerance: 0,
  debounce: 100,
  container: window
});

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

// main function
function scrollToY(scrollTargetY, speed, easing) {
  console.log(speed);
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY,
    scrollTargetY = scrollTargetY || 0,
    speed = speed || 2000,
    easing = easing || 'easeOutSine',
    currentTime = 0;

  // min time .1, max time .8 seconds
  var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var PI_D2 = Math.PI / 2,
    easingEquations = {
      easeOutSine: function (pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function (pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: function (pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);

      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      console.log('scroll done');
      window.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}

document.querySelectorAll(".jump-link").forEach(function(item) {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    var section = e.target.getAttribute("href"),
      sectionTop = document.querySelector(section).offsetTop
    activeTab = e.target.dataset.showTab;
    dropdown.setAttribute("data-active-option", activeTab);
    scrollToY(sectionTop - 64, 500, 'easeInOutQuint');
  });
});

document.querySelectorAll(".dropdown__option").forEach(function(item) {
  item.addEventListener("click", function(e) {
    document.querySelector(".dropdown").classList.remove("dropdown--open");
  });
});

document.querySelectorAll(".js-close-content").forEach(function(item) {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(".visible").classList.remove("visible");
    contentEl.classList.remove("open");
  });
});

document.getElementById("open-search").addEventListener("click", function(e) {
  return;
  document.querySelector("body").classList.add("searching");
  heroEl.style.height = heroHeight + "px";
});

document.getElementById("dropdown-active").addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector(".dropdown").classList.toggle("dropdown--open");
});

os.on("leave", ".buttons", function() {
  document.getElementById("sticky-nav").classList.add("sticky-nav--active");
});

os.on("enter", ".buttons", function() {
  document.getElementById("sticky-nav").classList.remove("sticky-nav--active");
});

var travelGuidesTop = $("#travel-guides").offset().top,
    neighborhoodsTop = $("#neighborhoods").offset().top,
    activitiesTop = $("#activities").offset().top,
    priceGuideTop = $("#price-guide").offset().top,
    visitorGuidesTop = $("#visitor-guides").offset().top,
    localTipsTop = $("#local-tips").offset().top;

window.addEventListener("scroll", function() {
  $.each(sections, function(index, section) {
    if(window.scrollY >= travelGuidesTop - 74) {
      dropdown.setAttribute("data-active-option", 1);
    }
    if(window.scrollY >= neighborhoodsTop - 74) {
      dropdown.setAttribute("data-active-option", 2);
    }
    if(window.scrollY >= activitiesTop - 74) {
      dropdown.setAttribute("data-active-option", 3);
    }
    if(window.scrollY >= priceGuideTop - 74) {
      dropdown.setAttribute("data-active-option", 4);
    }
    if(window.scrollY >= visitorGuidesTop - 74) {
      dropdown.setAttribute("data-active-option", 5);
    }
    if(window.scrollY >= localTipsTop - 74) {
      dropdown.setAttribute("data-active-option", 6);
    }
  });
});
