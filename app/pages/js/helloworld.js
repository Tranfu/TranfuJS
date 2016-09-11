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

      panels: {
        hello: 'hello', world: 'world',
      },

      views: {
        hello, world
      },

      panelviews: {
        hello: 'hello', world: 'world',
      },

      events: {
        'click h2': 'hello',
        'click [data-panel="world"] img' : 'world',
      },

      behaviors: ['http'],
    });
  }

  http() {

    setTimeout(() => {
      this.setpage({name: 'helloworld'});
    }, 3000);

    setTimeout(() => {
      this.sethelloview({content: 'hello'});
      this.setworldview({content: 'world'});
    }, 2000);
  }

  sethelloview(data) {
    this.setview(this.panels.hello, this.views.hello, data);
  }

  setworldview(data) {
    this.setview(this.panels.world, this.views.world, data);
  }

  hello({currentTarget}) {
    console.log(currentTarget);
  }

  world({currentTarget}) {
    console.log(currentTarget);
  }
}
