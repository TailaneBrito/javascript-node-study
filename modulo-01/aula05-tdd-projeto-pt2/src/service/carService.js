const BaseRepository = require ("./../respository/base/baseRepository")

class CarService{
    constructor({cars}){
        this.carRepository = new BaseRepository({file: cars})
    }

    test(id){
        return this.carRepository.find(id)
    }

    getRandomPositionFromArray(list){
        const listLength = list.length 
        return Math.floor(
            Math.random() * (listLength)
        )
    }

    chooseRandomCar(carCategory){
        const randomCardIndex = this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCardIndex]

        return carId
    }

    async getAvailableCar(carCategory){
        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(carId)
        return car
    }
}

module.exports = CarService