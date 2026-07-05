var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('Builder')

var spawn = Game.spawns["Spawn1"]
var bodyParts = [WORK, CARRY, MOVE] 

var itteration = Object.keys(Game.creeps)
let SpawnFlag = true

module.exports.loop = function () {

var harvesters = Object.keys(Game.creeps).filter(name => name.includes("Harvester"))
var upgraders = Object.keys(Game.creeps).filter(name => name.includes("Upgrader"))
var builders = Object.keys(Game.creeps).filter(name => name.includes("Builder"))

var speedyHarvesters = Object.keys(Game.creeps).filter(name => name.includes("speedyHarvester"))



    if (spawn.room.find(FIND_MY_STRUCTURES,
                        {filter: s =>
                            s.structureType === STRUCTURE_EXTENSION
                        }).length > (bodyParts.length - 3)*2){
            if(bodyParts[bodyParts.length-1] == WORK){
                bodyParts.push(MOVE)
            }
            else if (bodyParts[bodyParts.length-1] == CARRY){
                bodyParts.push(WORK)
            }
            else{
                bodyParts.push(CARRY)
            }
        } // update bodyparts list based on number of extensions !!!!!!!!


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



    if (spawn.spawning != null && SpawnFlag)
        {
            itteration += 1
            SpawnFlag = false
        }
    if (spawn.spawning == null && !SpawnFlag) 
        {
            SpawnFlag = true
        }

    if(builders.length < 4){
        createCreep(bodyParts, `Builder_${itteration}`)
    }

    if(upgraders.length < 3){
        createCreep(bodyParts, `Upgrader_${itteration}`)
    }

    if(harvesters.length < 5){
        createCreep(bodyParts, `Harvester_${itteration}`)
    }

    if(speedyHarvesters.length < 1){
        createCreep([WORK, CARRY, MOVE, MOVE], `speedyHarvester_${itteration}`)
    }


    
}

function createCreep(parts, name){
    return spawn.spawnCreep(parts, name, {energyStructures: [...spawn.room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType === STRUCTURE_EXTENSION}), spawn]})
}