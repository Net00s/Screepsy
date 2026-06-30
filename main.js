var roleHarvester = require('harvester');
var roleBuilder = require('builder');

module.exports.loop = function () {

var harvesters = Object.keys(Game.creeps).filter(name => name.includes("Harvester"))
var upgraders = Object.keys(Game.creeps).filter(name => name.includes("Upgrader"))

var spawn = Game.spawns["Spawn1"]

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.name.contains("harvester")) {
            roleHarvester.run(creep);
        }
        if(creep.name.contains("Upgrader")) {
            roleBuilder.run(creep);
        }
    }

    //when multible spawnCreep functions are run in the same tick, the last one is used. Harvesters have higher priority than upgraders
    if(upgraders.length < 1){
        createCreep([WORK, CARRY, MOVE], `Upgrader_${upgraders.length}`)
    }

    if(harvesters.length < 4){
        createCreep([WORK, CARRY, MOVE], `Harvester_${harvesters.length}`)
    }

}

function createCreep(parts, name){
    return spawn.spawnCreep(parts, name, {energyStructures: [...spawn.room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType === STRUCTURE_EXTENSION}), spawn]})
}