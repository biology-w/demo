import request from 'axios';

import URLS from './Urls'
const getPokemon = {
    withAbility: (path) => {
      const arr = path.split('/')

			const url = arr[1] ? arr[1] : 'defaultUrl'
        return request.get(`${URLS[url] ? URLS[url] : URLS['defaultUrl']}`)
    }
}

export default getPokemon;
