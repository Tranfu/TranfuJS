import $ from 'jquery';
import util from '../../misc/util';

export default class page {

  constructor({name, page, region, view, cache}) {
    console.log(`=> 2. NEW PAGE MANAGER: ${name}`);
    this.page = `[data-page="${name}"]`;
    this.hpg = page;
    this.region = region;
    this.view = view;
    this.cache = cache;
    this.state = {};
  }

  show(ispreload) {
    if ($(this.page).length) {
      this.display();
    } else {
      this.setpage();
      if (!ispreload) this.display();
    }
  }

  setpage() {
    if (this.cache) {
      console.log(`=> 3. SET CACHE PAGE`);
      const $div = $('<div></div>');
      $div.html(this.hpg());
      const $cacheView = $(util.cacheView);
      $div.appendTo($cacheView);
      const $region = $cacheView.children().last();
      $region.attr('data-region', $region.children().first().attr('data-page'));
    } else {
      console.log('=> 3. SET PAGE');
      const $appView = $(util.appView);
      $appView.html(this.hpg());
    }

    this.afterset();
  }

  setview(region, view, data) {
    console.log(`   => SET VIEWS: ${this.page} [data-region="${region}"]`);
    console.log(data);
    $(this.page).find(`[data-region="${region}"]`).html(view(data));
  }

  afterset() {
    console.log('=> 4. AFTER SET');
    this.addeventlistener();
  }

  addeventlistener() {
    console.log('   => ADD EVENT LISTENER');
  }

  display() {
    console.log('=> 5. DISPLAY');
    const $appView = $(util.appView);
    const $cacheView = $(util.cacheView);
    if(this.cache) {
      console.log(`   => HIDE PAGE & DISPLAY ${util.getpagehash()} CACHE PAGE`);
      $appView.addClass('dn');
      $cacheView.children().addClass('dn');
      $cacheView.removeClass('dn').children(`[data-region="${util.getpagehash()}"]`).removeClass('dn');
    } else {
      console.log(`   => HIDE CACHE PAGE & DISPLAY ${util.getpagehash()} PAGE`);
      $cacheView.addClass('dn').children().addClass('dn');
      $appView.removeClass('dn');
    }

    this.afterdisplay();
  }

  afterdisplay() {
    console.log('=> 6. AFTER DISPLAY');
  }

  $region(region) {
    return $(this.page).find(`[data-region="${region}"]`);
  }
}
