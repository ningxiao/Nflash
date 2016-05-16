/**
 * Created with JetBrains WebStorm.
 * User: ningxiao
 * Date: 13-8-17
 * Time: 下午12:27
 * To change this template use File | Settings | File Templates.
 */
flash.utils.provide("CarEvent");
CarEvent = function () {
    flash.events.Event.apply(this, arguments);
}
flash.utils.inherits(CarEvent, flash.events.Event);
CarEvent.START = "start";