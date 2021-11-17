import {authorService} from "@/_services"

const initialState = {
    authors: {items:[]}
}

export const authors = {
    namespaced : true,
    state : initialState,
    getters : {
        authors : state => state.authors.items,
        loadingAuthors : state => state.authors.fetching
    },
    actions :{
        async getAll({dispatch, commit}) {
            commit('authorsFetching')
            await authorService.getAll()
                .then(authors => commit('authorsFetched', authors))
                .catch(err => {
                    commit('authorsFetchError', err)
                    dispatch('alert/error', err, {root: true})
                })
        }
    },
    mutations :{
        authorsFetching(state) {
            state.authors = {items: [], fetching: true}
        },
        authorsFetched(state, authors) {
            state.authors = {items: authors}
        },
        authorsFetchError(state, error) {
            state.authors = {items: [], error}
        },
    }
}