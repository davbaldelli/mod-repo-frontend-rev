export const tracksFilters = {
    filterByTag,
    filterByLayoutCategory,
    filterByNation,
    filterByName
}

function filterByNation(nation) {
    return tracks => tracks.filter(track => track.Nation.Name === nation)
}

function filterByLayoutCategory(category) {
    return tracks => tracks.filter(track => track.Layouts.some(e => e.Category === category))
}

function filterByTag(tag) {
    return tracks => tracks.filter(track => track.Tags.some(e => e === tag))
}

function filterByName(name) {
    return tracks => tracks.filter(track =>track.Name.toLowerCase().includes(name.toLowerCase()))
}    return tracks => {
        let fTracks = []
        tracks.forEach(track => {
            if (track.Name.toLowerCase().includes(name.toLowerCase())) {
                fTracks.push(track)
            }
        })
        return fTracks
    }