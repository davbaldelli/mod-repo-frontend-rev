import {trackService} from "@/_services";

const initialState = {tracks: {items: []}, nations: {items: []}, authors: {items: []},}

export const tracks = {
    namespaced: true,
    state: initialState,
    getters: {
        tracks: state => state.tracks.items,
        getTrackByName: state => name => state.tracks.items.find(t => t.Name === name),
        loadingTracks: state => state.tracks.fetching,
        nations: state => state.nations.items,
        loadingNations: state => state.nations.fetching,
        authors: state => state.authors.items,
        loadingAuthors: state => state.authors.fetching,
    },
    actions: {
        async getAllTracks({dispatch, commit}) {
            commit('tracksFetching')

            await trackService.getAll()
                .then(tracks => {
                        commit('tracksFetched', tracks)
                    }
                )
                .catch(error => {
                    commit('tracksFetchError', error)
                    dispatch('alert/error', error, {root: true});
                })
        },
        async getAllNations({dispatch, commit}) {
            commit('nationsFetching')
            await trackService.getTracksNations()
                .then(nations => {
                    commit('nationsFetched', nations)
                })
                .catch(err => {
                    commit('nationsFetchError', err)
                    dispatch('alert/error', err, {root: true})
                })
        },
        async getTracksAuthors({dispatch, commit}) {
            commit('authorsFetching')
            await trackService.getTracksAuthors()
                .then(authors => commit('authorsFetched', authors))
                .catch(err => {
                    commit('authorsFetchError', err)
                    dispatch('alert/error', err, {root: true})
                })
        },
        async addTrack({dispatch, commit}, track) {
            commit('trackPushing')
            await trackService.addTrack(track)
                .then(track => {
                    commit('trackPushed', track)
                    dispatch('alert/success', track, {root: true})
                })
                .catch(err => {
                    commit('trackPushError', err)
                    dispatch('alert/error', err, {root: true})
                })
        }
    },
    mutations: {
        tracksFetching(state) {
            state.tracks = {items: [], fetching: true}
        },
        tracksFetched(state, tracks) {
            state.tracks = {items: tracks}
        },
        tracksFetchError(state, error) {
            state.tracks = {items: [], error}
        },
        nationsFetching(state) {
            state.nations = {items: [], fetching: true}
        },
        nationsFetched(state, nations) {
            state.nations = {items: nations}
        },
        nationsFetchError(state, error) {
            state.nations = {items: [], error}
        },
        authorsFetching(state) {
            state.authors = {items: [], fetching: true}
        },
        authorsFetched(state, authors) {
            state.authors = {items: authors}
        },
        authorsFetchError(state, error) {
            state.authors = {items: [], error}
        },
        trackPushing(state) {
            delete state.tracks.error
            state.tracks.pushing = true
        },
        trackPushed(state, car) {
            delete state.tracks.pushing
            state.tracks.items.push(car)
        },
        trackPushError(state, error) {
            delete state.tracks.pushing
            state.tracks.error = error
        }
    }

}