// 在此处添加您的代码
/* file name： DevConfigh.ts */
namespace DevConfigh{
    export interface DevConfigh {
        //初始化
        configinit():void;

        dev_set_I2CAddress(i2cADD:number):void;
        dev_I2C_WriteByte(add:number,data:number):void;
        dev_I2C_WriteWord(add:number,data:number):void;
        dev_I2C_ReadByte(add:number):number;
        dev_I2C_ReadWord(add:number):number;
    }
    
}
