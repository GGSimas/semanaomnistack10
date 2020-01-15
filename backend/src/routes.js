import { Router } from 'express';
import DevController from './controllers/DevController';
import SearchController from './controllers/SearchController';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({Hello: "GAbriel"})
});


routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

routes.get
export default routes;