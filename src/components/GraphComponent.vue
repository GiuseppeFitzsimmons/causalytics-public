<script>
import store from '../store/store';
//import * as type from '../store/mutationTypes/types';
require("dotenv").config();
import { Bar } from "vue-chartjs";
import { EventBus } from '@/event-bus';

export default {
  extends: Bar,
  
  mounted() {
    EventBus.GraphyThing = this
    EventBus.$on('REFRESH', function(payload){
      console.log('EventBus.$on REFRESH', payload);
      EventBus.GraphyThing.renderChart({
        labels: payload.labels,
        datasets: [
          {
            label: "Cost per Click",
            backgroundColor: "#f87979",
            data: payload.cpc,
          },
        ],
      },
      {
          responsive: true,
          maintainAspectRatio: false
        });
    })
  },
  updated(){
    console.log('updated')
    //this.refreshChart();
  },
  
  computed: {
    cpc: () => {
      console.log("graphcomponent setter is called");
      return store.state.cpc;
    },/*
    labels: function(state){
      if (state.labels){
        return state.labels
      } else {
        return null
      }
    },
    campaigns: function(state){
      if (state.campaigns){
        return state.campaigns
      } else {
        return null
      }
    },*/
  },
  methods: {
    /*
    refreshChart: function () {
      console.log("refreshChart called");
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: "Cost per Click",
            backgroundColor: "#f87979",
            data: this.cpc,
          },
        ],
      });
    },
  },
    increment(){
      store.dispatch({
        type:type.Increment,
        amount:20
      })
      */
    }
};
</script>
