import Vue from 'vue';
import Vuex from 'vuex';
import Filters from './modules/filters';
import SelectedFilters from './modules/local/selected-filters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        Filters, 
        SelectedFilters
    }
});

export default store;