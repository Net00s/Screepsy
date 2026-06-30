var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('Builder')
var spawn = Game.spawns["Spawn1"]

module.exports.loop = function () {

var harvesters = Object.keys(Game.creeps).filter(name => name.includes("Harvester"))
var upgraders = Object.keys(Game.creeps).filter(name => name.includes("Upgrader"))
var builders = Object.keys(Game.creeps).filter(name => name.includes("Builder"))


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.name.includes("Harvester")) {
            roleHarvester.run(creep);
        }
        if(creep.name.includes("Upgrader")) {
            roleUpgrader.run(creep);
        }
        if(creep.name.includes("Builder")) {
            roleBuilder.run(creep);
        }
    }

    //when multible spawnCreep functions are run in the same tick, the last one is used. Harvesters have higher priority than upgraders

    if(spawn.room.energyAvailable == spawn.room.energyCapacityAvailable){
        createCreep([WORK, CARRY, CARRY, MOVE, MOVE], `SUPERHarvester_${harvesters.length + 666}`)
    }

    if(builders.length < 2){
        createCreep([WORK, CARRY, MOVE], `Builder_${builders.length}`)
    }

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