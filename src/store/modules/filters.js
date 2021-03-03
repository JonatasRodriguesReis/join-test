import axios from 'axios';
const state = {
    typesStation: [],
    stations: []
};

const mutations = { 
    setTypesStation(state, data){
        state.typesStation = data;
    },
    setStations(state, data){
        state.stations = data;
    }
};

const actions = { 
    async loadTypesStation({commit}){
        axios.get('https://raw.githubusercontent.com/jacksonks/geojson/master/station_type.json')
        .then(response => {
            console.log('types:',response.data)
            commit('setTypesStation',response.data.station_type);
        }).catch(error => {
            console.error(error);
        });
    },
    async loadStations({commit}){
        axios.get('https://raw.githubusercontent.com/jacksonks/geojson/master/station.json')
        .then(response => {
            console.log(response.data)
            commit('setStations',response.data.station);
        }).catch(error => {
            console.error(error);
        });
    }
};

const getters = { 
    getTypesStation: (state) => state.typesStation,
    getStations: (state) => state.stations  
}

export default {
    state,
    mutations,
    actions,
    getters
}