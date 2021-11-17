import moment from "moment-timezone/moment-timezone-utils";

export const carsFilters = {
    filterByName,
    filterByNation,
    filterByCategory,
    filterByBrand,
    lastUpdated,
    lastAdded,
    filterByAuthor,
}

function lastUpdated(n){
    return cars => {
        console.log(cars)
        cars.sort((a, b) => {
            let timeA = moment(a.UpdatedAt)
            let timeB = moment(b.UpdatedAt)
            return timeA.isBefore(timeB)
        })
        return cars.slice(0, n)
    }
}

function lastAdded(n){
    return cars => {
        cars.sort((a, b) => {
            let timeA = moment(a.CreatedAt)
            let timeB = moment(b.CreatedAt)
            return timeA.isBefore(timeB)
        })
        return cars.slice(0, n)
    }
}

function filterByAuthor(author) {
    return cars => cars.filter(car => car.Author.Name === author)
}

function filterByNation(nation) {
    return cars => cars.filter(car => car.Brand.Nation.Name === nation)
}

function filterByBrand(brand) {
    return cars => cars.filter(car => car.Brand.Name === brand)
}

function filterByCategory(category) {
    return cars => cars.filter(car => car.Categories && car.Categories.some(e => e.Name === category))
}

function filterByName(name) {
    return cars => cars.filter(car => `${car.Brand.Name} ${car.ModelName}`.toLowerCase().includes(name.toLowerCase()))
}


