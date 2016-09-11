import $ from 'jquery';

const util = {

  // page/region
  gethash() {
    return window.location.hash.replace('#', '');
  },

  // page
  getpagehash() {
    return this.gethash().split('/')[0];
  },

  navigateto(hash) {
    console.log(`=> NAVIGATE TO PAEG: ${hash}`);
    window.location.hash = `#${hash}`;
  },
};

export default util;
