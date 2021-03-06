<template>
    <Map :stationsSelected="stationsSelected"/>
</template>

<script>
import Map from '../components/Map';
export default {
    components:{
        Map
    },
    computed:{
        stationsSelected(){
            console.log('no computed', this.$store.getters.getStationsSelected);
            return this.$store.getters.getStationsSelected;
        }
    }
}
</script>

<style>
</style>