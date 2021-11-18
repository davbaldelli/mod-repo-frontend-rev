import moment from "moment-timezone/moment-timezone-utils";

export const carSort = {
    sortByDate,
    sortByName
}

function sortByDate(cars){
    cars.sort((a,b) => {
        let timeA = moment(a.UpdatedAt)
        let timeB = moment(b.UpdatedAt)
        return timeA.isBefore(timeB)
    })
}

function sortByName(cars){
    cars.sort((a,b) => `${a.Brand.Name}${a.ModelName}` > `${b.Brand.Name}${b.ModelName}`)
}

