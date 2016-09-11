import '../pages/scss/app/app';
import util from '../misc/util';
import polyfill from '../misc/polyfill';
import auth from '../misc/auth';
import app from '../factory/app';

((window, util, auth, factory) => {

  polyfill.polyfill();

  window.onload = hashchange;

  window.onhashchange = hashchange;

  function hashchange() {
    console.log(`########################## HASH: ${util.gethash()} ##########################`);
    if (auth()) {
      const page = factory.get(util.getpagehash());
      if (page) page.show();
    }
  }
})(window, util, auth, app);
