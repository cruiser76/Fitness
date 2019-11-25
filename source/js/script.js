'use strict';
var videoPreview = document.querySelector('.gym__video img');

// слайдер с тренерами
var slideCount = 0;
var className = '';
var SlideType = [
  {className: 'coach__item--desktop', slideCount: 4},
  {className: 'coach__item--tablet', slideCount: 2},
  {className: 'coach__item--mobile', slideCount: 1}
];

if (document.body.clientWidth < 768) {
  videoPreview.src = 'img/video-preview-mobile@1x.jpg';
  slideCount = SlideType[2].slideCount;
  className = SlideType[2].className;
} else if (document.body.clientWidth > 767 && document.body.clientWidth < 1024) {
  slideCount = SlideType[1].slideCount;
  className = SlideType[1].className;
} else if (document.body.clientWidth > 1023) {
  slideCount = SlideType[0].slideCount;
  className = SlideType[0].className;
}

var coachLeftBtn = document.querySelector('.coach__btn--left');
var coachRightBtn = document.querySelector('.coach__btn--right');

var startIndex = 0;

var onCoachLeftBtnClick = function () {
  var coachList = document.querySelectorAll('.coach__item');

  for (var i = startIndex; i < startIndex + slideCount; i++) {
    if (i < coachList.length) {
      coachList[i].classList.remove(className);
    } else {
      coachList[i - coachList.length].classList.remove(className);
    }

    if (i + slideCount < coachList.length) {
      coachList[i + slideCount].classList.add(className);
    } else {
      coachList[i + slideCount - coachList.length].classList.add(className);
    }
  }
  startIndex = (startIndex + slideCount) < coachList.length ? (startIndex + slideCount) : (startIndex + slideCount - coachList.length);
};

var onCoachRightBtnClick = function () {
  var coachList = document.querySelectorAll('.coach__item');

  for (var i = startIndex; i < startIndex + slideCount; i++) {
    if (i < coachList.length) {
      coachList[i].classList.remove(className);
    } else {
      coachList[i - coachList.length].classList.remove(className);
    }

    if (i - slideCount >= 0) {
      coachList[i - slideCount].classList.add(className);
    } else {
      coachList[coachList.length + (i - slideCount)].classList.add(className);
    }
  }
  startIndex = (startIndex - slideCount) >= 0 ? (startIndex - slideCount) : (coachList.length + (startIndex - slideCount));
};

coachLeftBtn.addEventListener('click', onCoachLeftBtnClick);
coachRightBtn.addEventListener('click', onCoachRightBtnClick);

// плавный якорь
// выбираем все ссылки к якорю на странице
var linkNav = document.querySelectorAll('[href^="#anchor-"]');

// скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
var V = 0.5;
for (var p = 0; p < linkNav.length; p++) {
  linkNav[p].addEventListener('click', function (evt) { // по клику на ссылку
    evt.preventDefault();// отменяем стандартное поведение
    var w = window.pageYOffset;// производим прокрутка
    var hash = evt.currentTarget.href.replace(/[^#]*(.*)/, '$1');// к id элемента, к которому нужно перейти
    var t = document.querySelector(hash).getBoundingClientRect().top; // отступ от окна браузера до id
    var start = null;
    requestAnimationFrame(step);// подробнее про функцию анимации [developer.mozilla.org]
    function step(time) {
      if (start === null) {
        start = time;
      }
      var progress = time - start;
      var r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r);
      if (r !== w + t) {
        requestAnimationFrame(step);
      } else {
        location.hash = hash; // URL с хэшем
      }
    }
  }, false);
}

// обработчики формы
var userName = document.querySelector('#username');
var tel = document.querySelector('#phone');
var feedBackForm = document.querySelector('.form__container form');

var isStorageSupport = true;
var storage = {};

try {
  storage.userName = localStorage.getItem('userName');
  storage.tel = localStorage.getItem('tel');
  storage.question = localStorage.getItem('question');
} catch (error) {
  isStorageSupport = false;
}

if (feedBackForm) {
  IMask(tel, {
    mask: '+{0}(000)000-00-00',
  });

  if (isStorageSupport) {
    userName.value = storage.userName;
    tel.value = storage.tel;
  }

  feedBackForm.addEventListener('submit', function (evt) {
    if (!userName.value || !tel.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('tel', tel.value);
      }
    }
  });
}

// слайдер с отзывами
var startReviewIndex = 0;
var reviewBtnLeft = document.querySelector('.reviews__btn--left');
var reviewBtnRight = document.querySelector('.reviews__btn--right');

var onReviewBtnLeftClick = function () {
  var reviewItems = document.querySelectorAll('.reviews__item');
  reviewItems[startReviewIndex].classList.add('reviews__item--hide');
  startReviewIndex = (startReviewIndex + 1) < reviewItems.length ? startReviewIndex + 1 : startReviewIndex + 1 - reviewItems.length;
  reviewItems[startReviewIndex].classList.remove('reviews__item--hide');
};

var onReviewBtnRightClick = function () {
  var reviewItems = document.querySelectorAll('.reviews__item');
  reviewItems[startReviewIndex].classList.add('reviews__item--hide');
  startReviewIndex = (startReviewIndex - 1) < 0 ? reviewItems.length - 1 : startReviewIndex - 1;
  reviewItems[startReviewIndex].classList.remove('reviews__item--hide');
};

reviewBtnLeft.addEventListener('click', onReviewBtnLeftClick);
reviewBtnRight.addEventListener('click', onReviewBtnRightClick);
