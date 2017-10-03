(() => {

const castLog = `background: #f57f17; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`;
const log = console.log.bind(console, '%cCastTools', castLog);

let CastTools = {
  async init() {
    UrlCaster.set(location.href.replace('app', 'chromecast'));
    log(`casting enabled`);
  },
  cast() {
    UrlCast.cast();
    log(`casting`);
  }
};

this.CastTools = CastTools;

})();