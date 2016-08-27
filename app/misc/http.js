import $ from 'jquery';

const http = {

  request(url, args, type) {
    this.before();
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: type ? 'post' : 'get',
        data: args ? args : {},
        cache: false
      }).done(data => {
        resolve(typeof(data) === 'string' ? JSON.parse(data) : data);
      }).fail(response => {
        reject(typeof(data) === 'string' ? JSON.parse(data) : data);
      }).always(() => {
        this.after();
      });
    });
  },

  before() {
    const $progress = $('[data-progress]');
    const $bar = $progress.find('[data-progress-bar]');
    $progress.stop(true, false);
    $bar.stop(true, false);
    $progress.css('opacity', '1');
    $bar.css('width', '0px');
    $bar.animate({width: '15%'}, 400);
  },

  after() {
    const $progress = $('[data-progress]');
    const $bar = $progress.find('[data-progress-bar]');
    $bar.animate({width: '100%'}, 800, () => {
      $progress.animate({opacity: '0'}, 600);
    });
  },
};

export default http;
