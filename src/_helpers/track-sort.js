import moment from "moment-timezone/moment-timezone-utils";

export const trackSort = {
    sortBySubmission,
    sortByYear,
    sortByName
}

function sortBySubmission() {
    return (a, b) => {
        let timeA = moment(a.createdAt)
        let timeB = moment(b.createdAt)
        return timeA.isBefore(timeB) ? 1 : -1
    }
}

function sortByName(desc) {
    return (a, b) => XOR(desc, a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1
}

function sortByYear(desc) {
    return (a, b) => XOR(desc, b.year < a.year) ? 1 : -1
}

function XOR(a, b) {
    return (a || b) && !(a && b);
}