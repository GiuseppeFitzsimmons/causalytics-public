<template>
  <v-app>
    <v-main>
      <div class="text-center">
    <v-dialog
      :value="error"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Error
        </v-card-title>

        <v-card-text>
          An error occured when retrieving your data.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            v-on:click="resetError"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      <GraphComponent ref="GraphComponentRef" />
      <span style='display:none'>
      {{ cpc }} {{error}}
      </span>
    </v-main>
    <v-btn elevation="2" v-on:click="loadFacebookData">Refresh data</v-btn>
  </v-app>
</template>

<script>
import GraphComponent from "./components/GraphComponent";
import store from "./store/store.js";
import * as type from "./store/mutationTypes/types";
import { EventBus } from '@/event-bus';

export default {
  name: "App",
  components: {
    GraphComponent,
  },
  methods: {
    loadFacebookData: function () {
      store.dispatch({
        type: type.loadFacebookData,
      });
    },
    resetError: function () {
      store.dispatch({
        type: type.resetError
      });
    }
  },
  computed: {
    cpc: function () {
      console.log("app setter is called, state:", store.state);
      EventBus.$emit('REFRESH', {cpc: store.state.cpc, labels: store.state.labels});
      return store.state.cpc;
    },
    error: function () {
      console.log('ERROR LOG', store.state.error);
      return store.state.error;
    }
  },
  data () {
    console.log('data state', store.state);
      return {
        dialog: false,
        dataError: store.state.error
      };
    },
    updated(){
      console.log('updated state', store.state);
  },
};
</script>
