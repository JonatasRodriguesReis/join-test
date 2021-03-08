const state = {
    stationsSelected: []
};

const mutations = { 
    setStationsSelected(state, data){
        state.stationsSelected = data;
    }
};

const actions = { 
    async setStationsSelected({commit}, data){
        commit('setStationsSelected',data);
    }
};

const getters = { 
    getStationsSelected: (state) => state.stationsSelected  
}

export default {
    state,
    mutations,
    actions,
    getters
}