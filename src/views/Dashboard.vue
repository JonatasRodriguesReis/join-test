<template>
    <div>
        <Map :stationsSelected="stationsSelected"/>
        <v-dialog
            v-if="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm'"
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-fab-transition >
                    <v-btn
                        
                        style="background-color: #17a2b8; margin-bottom: 78px;"
                        v-bind="attrs"
                        v-on="on"
                        dark
                        absolute
                        bottom
                        right
                        fab
                    >
                        <v-icon>fas fa-filter</v-icon>
                    </v-btn>
                </v-fab-transition>
            </template>
            <v-card>
                <v-row>
                    <v-btn
                        class="mt-3 ml-3"
                        icon
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>

                <FormFilter @closeDialog="dialog=$value"/>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Map from '../components/Map';
import FormFilter from '../components/FormFilter';
export default {
    data: () => ({
        dialog: false
    }),
    components:{
        Map, FormFilter
    },
    computed:{
        stationsSelected(){
            return this.$store.getters.getStationsSelected;
        }
    }
}
</script>

<style>
</style>