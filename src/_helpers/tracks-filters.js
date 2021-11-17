export const tracksFilters = {
    filterByTag,
    filterByLayoutCategory,
    filterByNation,
    filterByName
}

function filterByNation(nation) {
    return tracks => {
        let fTracks = []
        tracks.forEach(track => {
            if (track.Nation.Name === nation) {
                fTracks.push(track)
            }
        })
        return fTracks
    }
}

function filterByLayoutCategory(category) {
    return tracks => {
        let fTracks = []
        tracks.forEach(track => {
            if (track.Layouts) {
                if (track.Layouts.some(e => e.Category === category)) {
                    fTracks.push(track)
                }
            }

        })
        return fTracks
    }
}

function filterByTag(tag) {
    return tracks => {
        let fTracks = []
        tracks.forEach(track => {
            if (track.Tags) {
                if (track.Tags.some(e => e === tag)) {
                    fTracks.push(track)
                }
            }

        })
        return fTracks
    }
}

function filterByName(name) {
    return tracks => {
        let fTracks = []
        tracks.forEach(track => {
            if (track.Name.toLowerCase().includes(name.toLowerCase())) {
                fTracks.push(track)
            }
        })
        return fTracks
    }
}