<template>
  <v-app>
    <v-main>
      <div id="container-app">
        <Drawer/>
        <Dashboard/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from './views/Dashboard';
import Drawer from './components/Drawer';

export default {
  name: 'App',

  components: {
    Dashboard,
    Drawer
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
