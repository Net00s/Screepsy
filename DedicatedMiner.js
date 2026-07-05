var roleDedicatedMiner = {

   /**  @param {Creep} creep **/
   run: function(creep) {

    let targetmine = creep.room.find(FIND_SOURCES)
    let target = targetmine[creep.name.split("_")[1] % targetmine.length]

    if (creep.harvest(target) == ERR_NOT_IN_RANGE){
        creep.moveTo(target)
       }
   }
}
module.exports = roleDedicatedMiner;