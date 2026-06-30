var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES)
        var RoomController = creep.room.controller

        let target = sources[creep.name.split("_")[1] % sources.length]

        if(creep.store.getFreeCapacity() > 0){
            if(creep.harvest(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
        else{
            if(creep.upgradeController(RoomController) == ERR_NOT_IN_RANGE){
                creep.moveTo(RoomController)
            }
        }
    }
}

module.exports = roleUpgrader;