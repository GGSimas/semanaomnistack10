const socketio = require("socket.io");
const parseStringAsArray = require("./Utils/ParseStringAsArray");
const calculateDistance = require("./Utils/calculateDistance");

const connections = [];
let io;
exports.setWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
  });

  server.io = connections;
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connections.coordinates) < 10 &&
      connection.techs.some(item => techs.include(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
