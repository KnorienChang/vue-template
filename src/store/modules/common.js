const state = {
  count: 1
};

const getters = {
  count: state => state.count,
  // 注意：这里如果对state进行处理，也会更改state的值。
  // 理论上不应该产生这样的副作用，所以派生state的时候，不能对state进行赋值操作，而应该在mutations里进行修改
  // 而主动触发应该在actions里提交到mutations
  deriveCount: state => state.count + 1
};

const mutations = {
  ADD(state, payload) {
    // eslint-disable-next-line no-console
    console.log(payload, state.count);
    state.count++;
  }
};

const actions = {
  add({ commit }, payload) {
    // 异步操作
    commit('ADD', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
