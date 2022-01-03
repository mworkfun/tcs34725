/* 
    TCS34725 Color Sensor Driver 
*/
/* file name： TCS347XX.ts */
/// <reference path = "DevConfigh.ts" /> 


//% Color = "#AA278D" weight = 100
namespace TCS347XX {
    //% block
    export function R(): number {
        return rgb.R
    }
    //% block
    export function G(): number {
        return rgb.G
    }
    //% block
    export function B(): number {
        return rgb.B
    }
    /*  */
    //% block
    export function RGB(): number {
        return 0
    }
    /* 
        初始化传感器
     */
    function configinit() {
        basic.pause(4)
    }
}