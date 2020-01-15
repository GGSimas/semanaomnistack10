import Dev from '../models/Dev';
import ParseStringAsArray from '../Utils/ParseStringAsArray';

class SearchController {
    async index(req,res){
        const {latitude, longitude, techs} = req.query;

        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })
        return res.json({ok:true})
    }
}

export default new SearchController();