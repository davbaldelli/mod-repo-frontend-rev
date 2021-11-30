import moment from "moment-timezone/moment-timezone-utils";

export const carsFilters = {
    filterByName,
    filterByNation,
    filterByCategory,
    filterByBrand,
    lastUpdated,
    lastAdded,
    filterByAuthor,
    filterByBrands
}

function lastUpdated(n) {
    return cars => {
        cars.sort((a, b) => {
            let timeA = moment(a.updatedAt)
            let timeB = moment(b.updatedAt)
            return timeA.isBefore(timeB)
        })
        return cars.slice(0, n)
    }
}

function lastAdded(n) {
    return cars => {
        cars.sort((a, b) => {
            let timeA = moment(a.createdAt)
            let timeB = moment(b.createdAt)
            return timeA.isBefore(timeB)
        })
        return cars.slice(0, n)
    }
}

function filterByAuthor(author) {
    return cars => cars.filter(car => car.author.name === author)
}

function filterByNation(nation) {
    return cars => cars.filter(car => car.brand.nation.name === nation)
}

function filterByBrand(brand) {
    return cars => cars.filter(car => car.brand.name === brand)
}

function filterByBrands(brands) {
    return cars => cars.filter(car => brands.includes(car.brand.name))
}

function filterByCategory(category) {
    return cars => cars.filter(car => car.categories && car.categories.some(e => e.name === category))
}

function filterByName(name) {
    return cars => cars.filter(car => `${car.brand.name} ${car.modelName}`.toLowerCase().includes(name.toLowerCase()))
}


