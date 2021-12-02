import {logsService} from "@/_services";

const initialState = {
    carLogs : {items : []},
    trackLogs: {items : []},
}

export const logs = {
    namespaced: true,
    state : initialState,
    getters:{
        carLogs : state => state.carLogs.items,
        trackLogs : state => state.trackLogs.items
    },
    actions :{
        getCarLogs({commit}) {
            commit('carLogsFetching')
            /*
            logsService.getCarLogs().then(logs => {
                commit('carLogsFetched', logs)
            }).catch(err => {
                commit('carLogsFetchingError', err)
                dispatch('alert/error', err, {root: true});
            })*/
            const logs = logsService.getCarLogs()
            commit('carLogsFetched', logs)
        },
        getTrackLogs({commit}) {
            commit('trackLogsFetching')
            /*
            logsService.getTrackLogs().then(logs => {
                commit('trackLogsFetched', logs)
            }).catch(err => {
                commit('trackLogsFetchingError', err)
                dispatch('alert/error', err, {root: true});
            })
             */
            const logs = logsService.getTrackLogs()
            commit('trackLogsFetched', logs)
        }
    },
    mutations : {
        carLogsFetching(state) {
            state.carLogs = {items: [], fetching: true}
        },
        carLogsFetched(state, logs) {
            state.carLogs = {items: logs}
        },
        carLogsFetchingError(state, error) {
            state.carLogs = {items: [], error}
        },
        trackLogsFetching(state) {
            state.trackLogs = {items: [], fetching: true}
        },
        trackLogsFetched(state, logs) {
            state.trackLogs = {items: logs}
        },
        trackLogsFetchingError(state, error) {
            state.trackLogs = {items: [], error}
        },

    }
}