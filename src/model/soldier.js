var NoWeapon = require('./no-weapon');
var NoArmor = require('./no-armor');
var Player = require('./player');

function Soldier(name, hp, ap, weapon, armor) {

    Player.call(this, name, hp, ap);
    this.weapon = weapon ? weapon : new NoWeapon();
    this.armor = armor ? armor : new NoArmor();
}

Soldier.prototype = Object.create(Player.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.getAP = function() {
  return this.ap + this.weapon.ap;
};

Soldier.prototype.origin_damage = function(ap) {
    return ap - this.armor.dp;
};

Soldier.prototype.attack_string = function(player, attack_result) {
    return this.role() + this.name + this.weapon.weapon_string() + '攻击了' +
           player.name + '，' + player.name + '受到了' +
           attack_result.damage + '点伤害，' + player.name + '剩余生命：' + player.hp;
};

Soldier.prototype.role = function(ap) {
    return '士兵';
};

module.exports = Soldier;