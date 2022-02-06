import Vue from 'vue';
import Vuex from 'vuex';
const { FB } = require("fb");
Vue.use(Vuex);

const loadFacebookData = async () => {
    FB.options({ version: "v11.0" });
    FB.setAccessToken(process.env.VUE_APP_ACCESS_TOKEN);
    let chartData
    if (process.env.VUE_APP_MODE === 'local') {
        chartData = await new Promise((resolve, reject) => {
            fetch('http://localhost:8081/fb'/*apiCall*/, { method: 'GET' }).then(res => res.json()).then(json => resolve(json)).catch((err) => {
                chartData = { error: err };
                console.log('chartData error', chartData)
                resolve(chartData)
            })
        });
    } else {
        let apiCall = "act_25064918/";
        apiCall += "insights?";
        apiCall += "fields=campaign_id,campaign_name,cpc";
        apiCall += "&level=campaign";
        apiCall += "&time_increment=7";
        apiCall += '&time_range={"since":"2021-01-03","until":"2022-02-01"}';
        //chartData = await FB.api(apiCall, "get")
        try { chartData = await FB.api(apiCall, "get") } catch (err) {
            chartData = { error: err };
            console.log('chartData error', chartData);
            return chartData
        }
    }
    console.log('chartData', chartData);
    console.log(chartData.data);
    return chartData;
};

const store = new Vuex.Store({
    state: {
        count: 0,
        cpc: null,
        labels: null,
        campaigns: null,
        error: false
    },
    mutations: {
        increment(state, payload) {
            return state.count = state.count + payload.amount;
        },
        decrement(state, payload) {
            return state.count = state.count - payload.amount;
        },
        loadFacebookData(state) {
            console.log('loadFacebookData chartData 1', state)
            try {
                loadFacebookData().then((chartData) => {
                    console.log('loadFacebookData chartData 2', chartData)
                    if (chartData.error) {
                        console.log('returning error')
                        return state.error = chartData.error;
                    } else {
                        let _cpc = chartData.data.map((item) => {
                            if (item.cpc) {
                                return item.cpc;
                            } else {
                                return 0;
                            }
                        });
                        let _labels = chartData.data.map((item) => {
                            if (item.date_start && item.date_stop) {
                                return item.date_start + "/" + item.date_stop;
                            } else {
                                return 0;
                            };
                        });
                        let _campaigns = chartData.data.map((item) => {
                            if (item.campaign_id) {
                                return item.campaign_id
                            } else {
                                return 0;
                            }
                        });
                        state.campaigns = [...new Set(_campaigns)];
                        if (_cpc.length > 0 && _labels.length > 0 && _cpc.length === _labels.length) {
                            state.labels = _labels;
                            return state.cpc = _cpc;
                        } else {
                            return state.error = { err: 'no results' }
                        }
                    }
                });
            } catch (err) {
                return state.error = err
            }
        },
        resetError(state) {
            return state.error = false
        }
    },
    actions: {
        increment(context, payload) {
            context.commit('increment', payload)
        },
        decrement(context, payload) {
            context.commit('decrement', payload)
        },
        loadFacebookData(context, payload) {
            context.commit('loadFacebookData', payload)
        },
        resetError(context, payload) {
            context.commit('resetError', payload)
        },
    }
})
export default store;