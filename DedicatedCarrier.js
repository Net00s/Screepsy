var roleDedicatedCarrier = {
    /**  @param {Creep} creep **/
   run: function(creep)
   {
        var Items = creep.room.find(FIND_DROPPED_RESOURCES)
        var sortedList = Items.sort((a, b) => b.amount - a.amount)
        let transferTargets = [spawn, ...creep.room.find(FIND_MY_STRUCTURES,
                        {filter: s =>
                            s.structureType === STRUCTURE_EXTENSION &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        })]
        let target = sortedList[0]
        let transferTarget = transferTargets[creep.name.split("_")[1] % transferTargets.length]
        
        if(creep.store.getFreeCapacity() > 0){
            if(creep.pickup(target) == ERR_NOT_IN_RANGE){
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