import '../pages/scss/app/app';
import util from '../misc/util';
import auth from '../misc/auth';
import app from '../factory/app';


((window, util, auth, factory) => {

  if (auth()) {
    window.onload = hashchange;
    window.onhashchange = hashchange;
  }

  function hashchange() {
    console.log(`########################## HASH: ${util.getpagehash()} ##########################`);
    if (auth()) route(util.getpagehash());
  }

  function route(hash) {
    switch (hash) {
      case 'helloworld':
        factory.get('helloworld').show();
        break;
      default:
        console.error(`INVALID HASH: ${hash}`);
    }
  }
})(window, util, auth, app);
