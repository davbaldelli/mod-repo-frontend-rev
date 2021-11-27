import moment from "moment-timezone/moment-timezone-utils";

export const trackSort = {
    sortBySubmission,
    sortByYear,
    sortByName
}

function sortBySubmission() {
    return (a, b) => {
        let timeA = moment(a.CreatedAt)
        let timeB = moment(b.CreatedAt)
        return timeA.isBefore(timeB) ? 1 : -1
    }
}

function sortByName(desc) {
    return (a, b) => XOR(desc, a.Name.toLowerCase() < b.Name.toLowerCase()) ? 1 : -1
}

function sortByYear(desc) {
    return (a, b) => XOR(desc, b.Year < a.Year) ? 1 : -1
}

function XOR(a, b) {
    return (a || b) && !(a && b);
}