var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var spawn = Game.spawns["Spawn1"]

module.exports.loop = function () {

var harvesters = Object.keys(Game.creeps).filter(name => name.includes("Harvester"))
var upgraders = Object.keys(Game.creeps).filter(name => name.includes("Upgrader"))



    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.name.includes("Harvester")) {
            roleHarvester.run(creep);
        }
        if(creep.name.includes("Upgrader")) {
            roleUpgrader.run(creep);
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