const planetModel = require('./planets.mongo');


async function getAllPlanets  () {
    return  await planetModel.find({},'-__v')

}
module.exports = {
    getAllPlanets,
};