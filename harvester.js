var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES)

        var spawn = Game.spawns["Spawn1"]
        let transferTargets = [spawn, ...creep.room.find(FIND_MY_STRUCTURES,
                        {filter: s =>
                            s.structureType === STRUCTURE_EXTENSION &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        })] // make a giant list of the spawn + all extensions that aren't full (fucckk)
        

        let transferTarget = transferTargets[creep.name.split("_")[1] % transferTargets.length] // chosen one at random based on ID
        let target = sources[creep.name.split("_")[1] % sources.length]

        //

        if(creep.store.getFreeCapacity() > 0){
            if(creep.harvest(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
        else{
            if(creep.transfer(transferTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(transferTarget)
            }
        }
    }  
}
module.exports = roleHarvester;