import { Ad, Discount, User } from ".."

class FindStores {
    static one(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 1
        })
    }
    static two(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 2
        })
    }
    static three(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 3
        })
    }
    static four(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 4
        })
    }
    static five(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 5
        })
    }
    static six(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 6
        })
    }
    static seven(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 7
        })
    }
    static eight(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 8
        })
    }
    static nine(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 9
        })
    }
    static ten(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 10
        })
    }
    static eleven(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 11
        })
    }
    static twelve(stores) {
        return stores.filter((store) => {
            return store.status.subscription === 12
        })
    }
    static endingTime(data) {
        return data.map(async (data) => {
            const id = data._id;
            let currentTime = new Date().getTime();
            let time = new Date(data.ending_date).getTime();
            if (currentTime >= time) {
                await User.updateMany({
                    $pull: {
                        promos: data.promocode
                    }
                });
                await Discount.deleteOne({ _id: id });
            }
        })
    }

    static deleteAd(data) {
        return data.map(async (data) => {
            const id = data._id;
            let currentTime = new Date().getTime();
            let time = data.duration;
            if (currentTime >= time) {
                await Ad.deleteOne({ _id: id });
            }
        })
    }
}

export default FindStores;