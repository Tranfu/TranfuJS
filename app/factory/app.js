import helloworld from '../pages/js/helloworld';

const app = {

  cache: {},

  get(key) {
    if (!this.cache[key]) {
      switch (key) {
        case 'helloworld':
          this.cache[key] = new helloworld();
          break;
        default:
          console.error('## PAGE NOT FOUND');
      }
    }
    return this.cache[key];
  }
};

export default app;
