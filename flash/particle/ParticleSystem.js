/**
 * 粒子控制系统
 * 将所有粒子效果统一规划交由系统管控
 * User: ningxiao
 * Date: 14-2-16
 * Time: 上午10:33
 */
flash.utils.provide("flash.ParticleSystem");
flash.ParticleSystem = function () {
    var self = this, particles = new Array();
    this.gravity = new flash.Vector2(0, 100);
    this.effectors = new Array();
    this.emit = function (particle) {
        particles.push(particle);
    }
    this.simulate = function (dt) {
        aging(dt);
        applyGravity();
        applyEffectors();
        kinematics(dt);
    }
    this.render = function(drawfun) {
        for (var i in particles) {
            drawfun(particles[i]);
        }
    }
    this.close = function(){

    }
    function kill(index) {
        var l = particles.length;
        if (l > 1){
            particles[index] = particles[l - 1];
            particles.pop();
        }
    }

    function aging(dt) {
        var i = 0, p;
        for (i = 0;i < particles.length; i++) {
            p = particles[i];
            p.age += dt;
            if (p.age >= p.life) {
                kill(i);
            }
            else {
                i++;
            }
        }
    }

    function applyGravity() {
        for (var i in particles){
            particles[i].acceleration = self.gravity;
        }
    }

    function applyEffectors() {
        for (var j in self.effectors) {
            var apply = self.effectors[j].apply;
            for (var i in particles) {
                apply(particles[i]);
            }
        }
    }

    function kinematics(dt) {
        var i,p;
        for (i in particles) {
            p = particles[i];
            p.position = p.position.add(p.velocity.multiply(dt));
            p.velocity = p.velocity.add(p.acceleration.multiply(dt));
        }
    }
}