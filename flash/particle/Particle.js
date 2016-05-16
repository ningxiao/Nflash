/**
 * 粒子类
 * User: ningxiao
 * Date: 14-2-14
 * Time: 下午2:38
 */
flash.utils.provide("flash.Particle");
flash.Particle = function(position, velocity, life, color, size) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = flash.Vector2.zero;
    this.age = 0;
    this.life = life;
    this.color = color;
    this.size = size;
};
