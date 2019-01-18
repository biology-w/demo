import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';

import routes from './routes';
import renderFullPage from './renderFullPage';
import getPokemon from '../services/getPokemon';
import App from '../components/App';

export default function router(req, res) {

    // const match = routes.reduce((acc, route) => matchPath(req.url, {path: route, exact: true}) || acc, null)
    const match = routes.includes(req.url)
    if(!match) {
        res.status(404).send('page not found');
        return;
    }

    return getPokemon.withAbility(req.url).then(resp => {
        const dataSource = resp.data.data
        const context = {}
        const html = renderToString(
            <StaticRouter context={context} location={req.url}>
                <App dataSource={dataSource} />
            </StaticRouter>
        )
        res.status(200).send(renderFullPage(html, dataSource));
    }).catch(err => res.status(404).send(`${err}: not find the telepathic`))
}
