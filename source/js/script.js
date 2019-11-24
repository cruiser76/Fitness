'use strict';
var videoPreview = document.querySelector('.gym__video img');
if (document.body.clientWidth < 768) {
  videoPreview.src = 'img/video-preview-mobile@1x.jpg';
}
