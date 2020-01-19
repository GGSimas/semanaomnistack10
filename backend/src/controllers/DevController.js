const Dev = require("../models/Dev");
const axios = require("axios");
const ParseStringAsArray = require("../Utils/ParseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

class DevController {
  async index(req, res) {
    const dev = await Dev.find();

    return res.json(dev);
  }
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = ParseStringAsArray(techs);

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "newDev", dev);
    }

    return res.json(dev);
  }
}

module.exports = new DevController();
