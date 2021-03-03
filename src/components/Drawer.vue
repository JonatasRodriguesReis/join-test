<template>
  <div id="drawer-container">
    <v-navigation-drawer permanent>
     <v-list-item>
        <v-list-item-content>
           <v-img width="180" src="https://jointecnologia.com.br/wp-content/themes/theme-bones-master/library/images/logo-blue.png"></v-img>
        </v-list-item-content>
    </v-list-item>

    <v-container>
        <v-form
            ref="form"
            lazy-validation
        >
            <v-select
                v-model="selectedTypes"
                :items="typesStation"
                item-text="name"
                return-object
                label="Tipo de estação"
                multiple
                chips
                clearable
            >

                <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 2">
                        <span>{{ item.name }}</span>
                    </v-chip>
                    <span
                        v-if="index === 2"
                        class="grey--text caption"
                    >
                        (+{{ selectedTypes.length - 2 }} tipos)
                    </span>
                </template>
                
                <template v-slot:prepend-item>
                    <v-list-item
                        ripple
                        @click="toggleTypes"
                    >
                    <v-list-item-action>
                        <v-icon :color="selectedTypes.length > 0 ? 'indigo darken-4' : ''">
                        {{ iconTypes }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                        Selecione todos
                        </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                </template>
            </v-select>

            <v-select
                v-model="selectedStations"
                :items="stations"
                label="Estação"
                item-text="name"
                return-object
                multiple
                chips
                clearable
            >

                <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 3">
                        <span>{{ item.name }}</span>
                    </v-chip>
                    <span
                        v-if="index === 3"
                        class="grey--text caption"
                    >
                        (+{{ selectedStations.length - 3 }} estações)
                    </span>
                </template>
                
                <template v-slot:prepend-item>
                    <v-list-item
                        ripple
                        @click="toggleStations"
                    >
                    <v-list-item-action>
                        <v-icon :color="selectedTypes.length > 0 ? 'indigo darken-4' : ''">
                        {{ iconStations }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                        Selecione todos
                        </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                </template>
            </v-select>

            <v-row>
                <v-btn
                    color="primary"
                    class="ma-6"
                    rounded
                    style="text-transform:none"
                >
                    Consultar
                </v-btn>
            </v-row>
        </v-form>
    </v-container>

     <!--  <v-list-item>
        <v-list-item-content>
           <v-list-item-title text>Join 2021</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data: () => ({
        selectedTypes: [],
        selectedStations: [],
    }),

    created(){
        this.$store.dispatch('loadTypesStation');
        this.$store.dispatch('loadStations');
    },

    watch:{
        selectedTypes(){
            this.selectedStations = [];
        }
    },

    computed: {
      allTypesSelected () {
        return this.selectedTypes.length === this.typesStation.length
      },
      
      someTypesSelected () {
        return this.selectedTypes.length > 0 && !this.allTypesSelected
      },

      allStationsSelected () {
        return this.selectedStations.length === this.stations.length
      },
      
      someStationsSelected () {
        return this.selectedStations.length > 0 && !this.allStationsSelected
      },

      iconTypes () {
        if (this.allTypesSelected) return 'mdi-close-box'
        if (this.someTypesSelected) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },

      iconStations () {
        if (this.allStationsSelected) return 'mdi-close-box'
        if (this.someStationsSelected) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },

      typesStation(){
          return this.$store.getters.getTypesStation;
      },

      stations(){
          return this.$store.getters.getStations.filter((station)=> this.selectedTypes.find((type) => type.id === station.station_type_id));
      }
    },

    methods: {
      toggleTypes () {
        this.$nextTick(() => {
          if (this.allTypesSelected) {
            this.selectedTypes = []
          } else {
            this.selectedTypes = this.typesStation.slice()
          }
        })
      },

      toggleStations () {
        this.$nextTick(() => {
          if (this.allStationsSelected) {
            this.selectedStations = []
          } else {
            this.selectedStations = this.stations.slice()
          }
        })
      },
    },
  }
</script>

<style scoped>
    
    #drawer-container{
        width: 15%;
    }

    #drawer-container div{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
</style>