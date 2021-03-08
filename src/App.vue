<template>
  <v-app>
    <v-main>
      <div id="container-app">
        <FormFilter style="width: 20%;" v-if="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm' "/>
        <Dashboard/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from './views/Dashboard';
import FormFilter from './components/FormFilter';

export default {
  name: 'App',

  components: {
    Dashboard,
    FormFilter
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  #container-app{
    display: flex;
  }
</style>
