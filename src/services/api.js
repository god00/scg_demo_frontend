import Request from './request';
const request = new Request()
const cachingApiLocal = localStorage.getItem('cachingApi');
const cachingApi = cachingApiLocal ? JSON.parse(cachingApiLocal) : {
    search: {},
    restaurants: {}
};

class Api {
    searchList(list) {
        return new Promise((resolve, reject) => {
            const listStr = JSON.stringify(list);
            if (cachingApi.search[listStr] != null) {
                resolve(cachingApi.search[listStr]);
            }
            else {
                request.post('/api/search', { list })
                    .then(res => {
                        cachingApi.search[listStr] = res;
                        localStorage.setItem('cachingApi', JSON.stringify(cachingApi));
                        resolve(res)
                    })
                    .catch(err => { reject(err) })
            }
        })

    }

    findNearByRestaurants(keyword) {
        keyword = keyword.toLowerCase();
        return new Promise((resolve, reject) => {
            if (cachingApi.restaurants[keyword] != null) {
                resolve(cachingApi.restaurants[keyword]);
            }
            else {
                request.get(`/api/restaurants?nearby=${keyword}`)
                    .then(res => {
                        if (res.status === 'OK') {
                            cachingApi.restaurants[keyword] = res;
                            localStorage.setItem('cachingApi', JSON.stringify(cachingApi));
                        }
                        resolve(res)
                    })
                    .catch(err => { reject(err) })
            }
        })
    }
}

export default new Api();