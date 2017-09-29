const castLog = `background: #20AA20; color: white; padding: 1px 6px 2px 8px; border-radius: 6px;`;

CastTools = {
  async init() {
    UrlCaster.set(location.href.replace('app', 'chromecast'));
    console.log(`%ccasting enabled`, castLog);
  }
};