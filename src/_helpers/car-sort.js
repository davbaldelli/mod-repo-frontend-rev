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

function sortByName(desc){
    return (a,b) => XOR(desc, `${a.Brand.Name}${a.ModelName}${a.Year}`.toLowerCase() < `${b.Brand.Name}${b.ModelName}${b.Year}`.toLowerCase()) ? 1 : -1
}

function sortByYear(desc){
    return (a, b) =>  XOR(desc,b.Year < a.Year) ? 1 : -1
}

function XOR(a,b){
    return ( a || b ) && !( a && b );
}
