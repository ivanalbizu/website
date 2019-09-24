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
    let moment = require('moment');
    moment.lang('es', {
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    });
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