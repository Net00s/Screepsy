var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES)

        var spawn = Game.spawns["Spawn1"]
        let targets = [spawn, ...creep.room.find(FIND_MY_STRUCTURES,
                        {filter: s =>
                            s.structureType === STRUCTURE_EXTENSION &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        })] // make a giant list of the spawn + all extensions that aren't full
        

        let target = creep.name.split("_")[1] % targets.length // chosen one at random based on ID

        //

        if(creep.store.getUsedCapacity() == 0){
            if(creep.harvest(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
        else{
            if(creep.transfer(spawn) == ERR_NOT_IN_RANGE){
                creep.moveTo(spawn)
            }
        }
    }  
}
module.exports = roleUpgrader;