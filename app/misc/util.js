import $ from 'jquery';

const util = {

  appView: 'main[data-region="page"]',

  cacheView: 'section[data-cache]',

  // page/region
  gethash() {
    return window.location.hash.replace('#', '');
  },

  // page
  getpagehash() {
    return this.gethash().split('/')[0];
  },

  // region
  getregionhash() {
    return this.gethash().split('/')[1];
  },

  // page/region
  getpageregionhash() {
    return `${this.getpageHash()}/${this.getregionhash()}`;
  },

  navigateto(hash) {
    console.log(`=> NAVIGATE TO PAEG: ${hash}`);
    window.location.hash = `#${hash}`;
  },

  showmodal(view, event, isunclose) {
    if(event) event.stopPropagation();
    if (isunclose) {
      $('[data-view="modal"]').find('.close').addClass('dn');
    } else {
      $('[data-view="modal"]').find('.close').removeClass('dn');
    }
    $('[data-region="modal"]').removeClass('dn');
    $('[data-region="dialog"]').html(view);
    // Disable the drag effect on video page.
    $('[data-page="video"]').removeClass('drag');
  },

  hidemodal() {
    // Enable the drag effect on video page.
    $('[data-region="modal"]').addClass('dn');
    if (!$('[data-page="video"]').hasClass('drag'))
      $('[data-page="video"]').addClass('drag');
  },

  playaudio(iscalled, isplay) {
    let name = 'call';
    if (iscalled) name = 'called';
    const audio = $('[data-page="audio"]').find(`[data-audio="${name}"]`)[0];
    if (isplay) audio.play();
    else audio.pause();
  },
};

export default util;
