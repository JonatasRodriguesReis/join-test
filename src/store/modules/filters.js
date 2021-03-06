import axios from 'axios';
const state = {
    typesStation: [],
    stations: [],
    rawStations: []
};

const mutations = { 
    setTypesStation(state, data){
        state.typesStation = data;
    },
    setStations(state, data){
        state.stations = data;
    },
    setRawStations(state, data){
        state.rawStations = data;
    }
};

const actions = { 
    async loadTypesStation({commit}){
        const response = await axios.get('https://raw.githubusercontent.com/JonatasRodriguesReis/stations-files/main/station_type.json')
        console.log('types:',response.data)
        commit('setTypesStation',response.data.station_type);
    },
    async loadStations({commit}){
        axios.get('https://raw.githubusercontent.com/JonatasRodriguesReis/stations-files/main/station.json')
        .then(response => {
            commit('setStations',response.data.station);
        }).catch(error => {
            console.error(error);
        });
    },
    async loadRawStations({commit}){
        axios.get('https://raw.githubusercontent.com/JonatasRodriguesReis/stations-files/main/station_list.geojson')
        .then(response => {
            commit('setRawStations',response.data);
        }).catch(error => {
            console.error(error);
        });
    }
};

const getters = { 
    getTypesStation: (state) => state.typesStation,
    getStations: (state) => state.stations,
    getRawStations: (state) => state.rawStations  
}

export default {
    state,
    mutations,
    actions,
    getters
}