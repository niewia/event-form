import axios from 'axios';

const rsourcesService = {

    getTitles() {
        return axios.get('http://www.mocky.io/v2/5bcdd8732f00007300c855da').then(result => result.data)
    },

    getCoordinators() {
        return axios.get('http://www.mocky.io/v2/5bcdd7992f00006300c855d5').then(result => {
            const me = [];
            const others = [];
            result.data.forEach(user => {
                if (user.id == 3) {
                    me.push(user);
                } else {
                    others.push(user);
                }
            })
            return [{
                name: 'Me',
                items: me
            }, {
                name: 'Others',
                items: others
            }];
        })
    },

    getCategories() {
        return axios.get('http://www.mocky.io/v2/5bcdd3942f00002c00c855ba').then(result => result.data)
    }

}

export default rsourcesService;