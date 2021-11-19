import moment from "moment-timezone/moment-timezone-utils";

export const carSort = {
    sortByDate,
    sortByName,
    sortByYear
}

function sortByDate(){
    return (a,b) => {
        let timeA = moment(a.UpdatedAt)
        let timeB = moment(b.UpdatedAt)
        return timeA.isBefore(timeB) ? 1 : -1
    }
}

function sortByName(){
    return (a,b) => `${a.Brand.Name}${a.ModelName}`.toLowerCase() > `${b.Brand.Name}${b.ModelName}`.toLowerCase() ? 1 : -1
}

function sortByYear(){
    return (a, b) =>  b.Year - a.Year
}

