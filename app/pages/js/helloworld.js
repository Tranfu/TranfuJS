import $ from 'jquery';
import page from './page';
import hpage from '../hdbs/pages/helloworld.handlebars';
import hello from '../hdbs/views/hello.handlebars';
import world from '../hdbs/views/world.handlebars';

export default class helloworld extends page {

  constructor() {
    super({

      name: 'helloworld',

      page: hpage,

      cache: true,

      region: {
        hello: 'hello', world: 'world',
      },

      view: {
        hello, world
      }
    });
  }

  afterset() {
    super.afterset();
  }

  afterdisplay() {
    super.afterdisplay();
    this.sethelloview();
    this.setworldview();
  }

  addeventlistener() {
    super.addeventlistener();
  }

  sethelloview() {
    this.setview(this.region.hello, this.view.hello, {content:'hello'});
  }

  setworldview() {
    this.setview(this.region.world, this.view.world, {content:'world'});
  }
}
