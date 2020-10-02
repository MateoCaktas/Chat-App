import Request from '../../services';

const state = {
  loggedUser: {
    id: 0,
    firstName: '',
    lastName: '',
    fullName: '',
    isAdmin: false,
    password: '',
    email: ''
  }
};

const getters = {
  loggedUser: state => state.loggedUser,
  isAdmin: state => state.loggedUser.isAdmin,
  isLoggedIn: state => state.loggedUser.id !== 0
};

const actions = {
  logUser({ commit }, userCredentials) {
    const httpRequest = new Request('/login');

    httpRequest.sendRequest('post', userCredentials)
      .then(res => res.json())
      .then(res => {
        document.cookie = `token=${res.jwt}`;
        commit('setUser', res.user);
      })
      .catch(err => console.log(err));
  },
  updateUser({ commit }, user) {
    commit('setUser', user);
  },
  logoutUser({ commit }) {
    const user = {
      id: 0,
      firstName: '',
      lastName: '',
      fullName: '',
      isAdmin: false,
      password: '',
      email: ''
    };
    document.cookie = 'token=Expired; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    commit('setUser', user);
  }
};

const mutations = {
  setUser: (state, user) => (state.loggedUser = user)
};

export default {
  state,
  getters,
  actions,
  mutations
};
