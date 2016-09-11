import $ from 'jquery';
import util from '../../misc/util';

export default class page {

  constructor({name, page, panels, views, panelviews, events, behaviors = []}) {
    console.log(`=> 2. NEW PAGE MANAGER: ${name}`);
    this.page = `[data-page="${name}"]`;
    this.hpg = page;
    this.panels = panels;
    this.views = views;
    this.panelviews = panelviews;
    this.events = events;
    this.behaviors = behaviors;
    this.state = {};
  }

  show() {
    this.setpagetodocument();
    this.setviews();
    this.addeventlistener();
    this.execute();
  }

  setpagetodocument(data) {
    console.log('=> 3. SET PAGE');
    $('main[data-panel="page"]').html(this.hpg(data));
  }

  setviews() {
    console.log('=> 4. SET VIEWS');
    for (let panel in this.panelviews) {
      if (this.panelviews.hasOwnProperty(panel)) {
        this.setview(panel, this.views[this.panelviews[panel]], null);
      }
    }
  }

  addeventlistener() {
    console.log('=> 5. ADD EVENT LISTENER');
    for (let e in this.events) {
      if (this.events.hasOwnProperty(e)) {
        const evtuis = e.split(' ');
        if (evtuis.length === 3) {
          $(this.page).find(evtuis[1]).on(evtuis[0], evtuis[2], this[this.events[e]]);
        } else {
          $(this.page).on(evtuis[0], evtuis[1], this[this.events[e]]);
        }
      }
    }
  }

  execute() {
    console.log('=> 6. EXECUTE AFTER PAGE READY');
    this.behaviors.forEach(behavior => {
      this[behavior]();
    })
  }

  setpage(data) {
    console.log('=> RESET PAGE');
    console.log('=> DETACH VIEWS');
    const $views = $('[data-view]');
    $views.detach();
    this.setpagetodocument(data);
    console.log('=> APPEND VIEWS TO PAGE');
    $views.each((index, elem) => {
      $(elem).appendTo($(`[data-panel="${$(elem).attr('data-view')}"]`));
    });
    this.addeventlistener();
  }

  setview(panel, view, data) {
    console.log(`      => SET VIEW: ${panel}`);
    $(this.page).find(`[data-panel="${panel}"]`).html(view(data));
  }

  $panel(panel) {
    return $(this.page).find(`[data-panel="${panel}"]`);
  }
}
