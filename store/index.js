export const state = () => ({
  bloglist: []
});

export const mutations = {
  set(state,list) {
    state.bloglist = list;
  }
};

export const actions = {
  async nuxtServerInit ({ commit }) {
    const fm = require('front-matter');
    const moment = require('moment');
    let files = await require.context('~/articles/', false, /\.md$/);
    let posts = files.keys().map( key => {
      let res = files(key);
      res.slug = key.slice(2, -3);
      return res;
    }).map(post => {
      let attributes = fm(post.default).attributes;
      attributes.slug = post.slug;
      attributes.ctime = moment(attributes.ctime)
      return attributes;
    }).sort((a, b) => b.ctime - a.ctime)
    await commit('set',posts);
  }
};