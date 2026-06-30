var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES)
        var spawn = Game.spawns["Spawn1"]
        let targetBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
        let target = sources[creep.name.split("_")[1] % sources.length]

        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.building = false;
        }

        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }
        
        if (creep.memory.building == true){
            if (creep.build(targetBuild) == ERR_NOT_IN_RANGE){
                creep.moveTo(targetBuild)
            }
        }
        else if (creep.memory.building == false){
            if (creep.harvest(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
    }
}

module.exports = roleBuilder;