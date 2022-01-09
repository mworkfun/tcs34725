/* 
    TCS34725 Color Sensor Driver 
    file name： TCS347XX.ts 
*/


//% Color = "#AA278D" weight = 100
namespace TCS347XX {
    //定义方法数据
    enum DevConfig {
        IIC_Addr = 0x29,//地址

        /* Register */
        TCS34725_CMD_BIT = 0x80,//进制转换
        TCS34725_CMD_Read_Word = 0x20,
        TCS34725_CMD_Clear_INT = 0x66,

        TCS34725_ENABLE = 0x00,//寄存器启用
        TCS34725_ENABLE_AIEN = 0x10,//中断启用
        TCS34725_ENABLE_WEN = 0x08,//等待计时器启用，写入1为启用，0为禁用
        TCS34725_ENABLE_AEN = 0x02,//RGBC启用，写入1为启用，0为禁用
        TCS34725_ENABLE_PON = 0x01,//开机！，写入1为启用，0为禁用

        TCS34725_ATIME = 0x01,//定时寄存器

        TCS34725_WTIEM = 0x03,//等待时间寄存器
        TCS34725_WTIEM_2_4MS = 0xFF,//等待2.4ms=0.029S
        TCS34725_WTIEM_204MS = 0xAB,//等待204ms=2.45S
        TCS34725_WTIEM_614MS = 0x00,//等待614ms=7.4S

        TCS34725_AITL = 0x04,//通道下限中断阈值
        TCS34725_AILTH = 0x05,
        TCS34725_AIHTL = 0x06,//通道上限中断阈值
        TCS34725_AIHTH = 0x07,

        TCS34725_PPERS = 0x0C,//对中断的基本过滤机制，
        TCS34725_PPERS_AlLL = 0x00,//每个RGBC周期都会产生中断
        TCS34725_PPERS_CYCLE_1 = 0x01,//清除1通道超出阈值范围
        TCS34725_PPERS_CYCLE_2 = 0x02,//清除2通道超出阈值范围
        TCS34725_PPERS_CYCLE_3 = 0x03,//清除3通道超出阈值范围
        TCS34725_PPERS_CYCLE_4 = 0x04,//清除4通道超出阈值范围
        TCS34725_PPERS_CYCLE_5 = 0x05,//清除5通道超出阈值范围
        TCS34725_PPERS_CYCLE_10 = 0x06,//清除10通道超出阈值范围
        TCS34725_PPERS_CYCLE_20 = 0x07,//清除20通道超出阈值范围
        TCS34725_PPERS_CYCLE_25 = 0x08,//清除25通道超出阈值范围
        TCS34725_PPERS_CYCLE_30 = 0x09,//清除30通道超出阈值范围
        TCS34725_PPERS_CYCLE_35 = 0x0A,//清除35通道超出阈值范围
        TCS34725_PPERS_CYCLE_40 = 0x0B,//清除10通道超出阈值范围
        TCS34725_PPERS_CYCLE_45 = 0x0C,//清除45通道超出阈值范围
        TCS34725_PPERS_CYCLE_50 = 0x0D,//清除50通道超出阈值范围
        TCS34725_PPERS_CYCLE_55 = 0x0E,//清除55通道超出阈值范围
        TCS34725_PPERS_CYCLE_60 = 0x0F,//清除60通道超出阈值范围

        TCS34725_CONFIG_REGS = 0x0D,//配置寄存器
        TCS34725_CONFIG_REGS_WLONG = 0x02,//等待12倍寄存器设定的等待周期

        TCS34725_CONTROL_REGS = 0x0F,//控制寄存器

        TCS34725_ID = 0x12,//设备ID：0x44 = TCS34721/TCS34725; 0x4D = TCS34723/TCS34727

        TCS34725_STATUS = 0x13,//查询寄存器状态，只读
        TCS34725_STATUS_AINT = 0x10,//RGBC无色通道中断查询
        TCS34725_STATUS_AVALID = 0x01,//RGBC通道已完成一个周期

        TCS34725_CDATAL = 0x14,//白色通道数据
        TCS34725_CDATAH = 0x15,//
        TCS34725_RDATAL = 0x16,//红色通道数据
        TCS34725_RDATAH = 0x17,//
        TCS34725_GDATAL = 0x18,//绿色通道数据
        TCS34725_GDATAH = 0x19,//
        TCS34725_BDATAL = 0x1A,//蓝色通道数据
        TCS34725_BDATAH = 0x1B//
    }
    //全局变量 集成时间、增益
    let integtime: number, gain: number
    /*
    RGBC 定时寄存器以 2.4 毫秒为增量
    控制 RGBC 透明和 IR 通道 ADC 的内部集成时间
    最大 RGBC 计数 = （ 256 − atime ） × 1024 、最大值为 65535  
    */
    enum TCS34725_INTEGTIME {
        TCS34725_INTEGTIME_2_4ms = 0xFF,//循环1次 2.4ms 最大计数1024
        TCS34725_INTEGTIME_24ms = 0xF6,//循环10次 24ms 最大计数10240
        TCS34725_INTEGTIME_50ms = 0xEB,//循环50次
        TCS34725_INTEGTIME_101ms = 0xD5,//循环42次 101ms 最大计数43008
        TCS34725_INTEGTIME_154ms = 0xC0,//循环64次 154ms 最大计数65535
        TCS34725_INTEGTIME_614ms = 0x00,//循环256次 614ms 最大计数65535
    }
    /* 
    控制寄存器为模拟块提供 8 位杂项控制
    这些位通常控制增益设置和二极管选择等功能。
    RGBC增益控制
     */
    enum TCS34725_GAIN {
        TCS34725_GAIN_1x = 0x00,//无增益
        TCS34725_GAIN_4x = 0x01,//4倍增益
        TCS34725_GAIN_16x = 0x02,//16倍增益
        TCS34725_GAIN_60x = 0x03//60倍增益
    }
    interface RGB {
        R: number;
        G: number;
        B: number;
        C: number;
    }
    let tcsRGB : RGB ={
        R: 0,
        G: 0,
        B: 0,
        C: 0
    }
    //% block
    export function B(): number {
        TCS34725_GET_RGBC()
        TCS34725_GET_RGB888()
        return tcsRGB.B
    }
    //% block
    export function G(): number {
        TCS34725_GET_RGBC()
        TCS34725_GET_RGB888()
        return tcsRGB.G
    }
    //% block
    export function R(): number {
        TCS34725_GET_RGBC()
        TCS34725_GET_RGB888()
        return tcsRGB.R
    }
    //% block
    export function INIT(): number {
        if (TCS347XXinit() == 0) {
            return 0
        }
        return 1
    }
    //% block
    export function Interrupt(): number {
        TCS34725_GetLux_Interrupt()
        return 1
    }
    /* 
        初始化传感器和i2c 
        返回1为初始化成功，0为失败
     */
    export function TCS347XXinit(): number {
        let getDevID = TCS34725_ReadByte(DevConfig.TCS34725_ID)
        //获取到8进制数据，0x44 = 68,0x4d = 77
        if (getDevID != 68 && getDevID != 77) {
            return 0
        }
        //1.设置集成时间
        TCS34725_Set_Integration_Time(TCS34725_INTEGTIME.TCS34725_INTEGTIME_154ms)
        //2.设置增益
        TCS34725_Set_GAIN(TCS34725_GAIN.TCS34725_GAIN_60x)
        //3.设置上下限中断阈值
        TCS34725_Set_Integration_Threshold(0xff00, 0x00ff)
        //4.设置中断过滤
        TCS34725_Set_Integration_PPERS(DevConfig.TCS34725_PPERS_CYCLE_2)
        //5.启用寄存器
        TCS34725_Set_Enable()
        //6.启用中断
        TCS34725_Set_Integration_Enable();
        return 1
    }
    //获取RGBC的值
    export function TCS34725_GET_RGBC(): void {
        tcsRGB.R = TCS34725_ReadWord(DevConfig.TCS34725_RDATAL | DevConfig.TCS34725_CMD_Read_Word)
        tcsRGB.G = TCS34725_ReadWord(DevConfig.TCS34725_GDATAL | DevConfig.TCS34725_CMD_Read_Word)
        tcsRGB.B = TCS34725_ReadWord(DevConfig.TCS34725_BDATAL | DevConfig.TCS34725_CMD_Read_Word)
        tcsRGB.C = TCS34725_ReadWord(DevConfig.TCS34725_CDATAL | DevConfig.TCS34725_CMD_Read_Word)

        switch (integtime) {
            case TCS34725_INTEGTIME.TCS34725_INTEGTIME_2_4ms:
                basic.pause(3)
            case TCS34725_INTEGTIME.TCS34725_INTEGTIME_24ms:
                basic.pause(24)
            case TCS34725_INTEGTIME.TCS34725_INTEGTIME_50ms:
                basic.pause(50)
            case TCS34725_INTEGTIME.TCS34725_INTEGTIME_101ms:
                basic.pause(101)
            case TCS34725_INTEGTIME.TCS34725_INTEGTIME_154ms:
                basic.pause(154)
            case TCS34725_INTEGTIME.TCS34725_INTEGTIME_614ms:
                basic.pause(700)
        }
    }
    //转换RGB888格式
    export function TCS34725_GET_RGB888(): void {
        //获取RGBC的值
        TCS34725_GET_RGBC()

        let i = 1;

        if (tcsRGB.R >= tcsRGB.G && tcsRGB.R >= tcsRGB.B)
            i = tcsRGB.R / 255 + 1
        else if (tcsRGB.G >= tcsRGB.R && tcsRGB.G >= tcsRGB.B)
            i = tcsRGB.G / 255 + 1
        else if (tcsRGB.B >= tcsRGB.G && tcsRGB.B >= tcsRGB.R)
            i = tcsRGB.B / 255 + 1

        if (i != 0) {
            tcsRGB.R = (tcsRGB.R) / i
            tcsRGB.G = (tcsRGB.G) / i
            tcsRGB.B = (tcsRGB.B) / i
        }
        if (tcsRGB.R > 30)
            tcsRGB.R = tcsRGB.R - 30
        if (tcsRGB.G > 30)
            tcsRGB.G = tcsRGB.G - 30
        if (tcsRGB.B > 30)
            tcsRGB.B = tcsRGB.B - 30
        tcsRGB.R = tcsRGB.R * 255 / 255
        tcsRGB.G = tcsRGB.G * 255 / 255
        tcsRGB.B = tcsRGB.B * 255 / 255

        if (tcsRGB.R > 255)
            tcsRGB.R = 255
        if (tcsRGB.G > 255)
            tcsRGB.G = 255
        if (tcsRGB.B > 255)
            tcsRGB.B = 255
    }
    //清除rgbc值
    export function TCS34725_GetLux_Interrupt(){
        TCS34725_Set_Integration_Threshold(0xff00, 0x00ff)
        //if (1)
        TCS34725_WriteByte(DevConfig.TCS34725_CMD_Clear_INT,0x00)
        TCS34725_Set_Integration_PPERS(DevConfig.TCS34725_PPERS_CYCLE_2)
    }
    //启用寄存器
    export function TCS34725_Set_Enable(): void {
        TCS34725_WriteByte(DevConfig.TCS34725_ENABLE, DevConfig.TCS34725_ENABLE_PON)
        basic.pause(3);
        let data = DevConfig.TCS34725_ENABLE_PON | DevConfig.TCS34725_ENABLE_AEN
        TCS34725_WriteByte(DevConfig.TCS34725_ENABLE, data)
    }
    //启用中断
    export function TCS34725_Set_Integration_Enable(): void {
        let data = 0
        //启用时先读寄存器
        data = TCS34725_ReadByte(DevConfig.TCS34725_ENABLE)
        TCS34725_WriteByte(DevConfig.TCS34725_ENABLE, data | DevConfig.TCS34725_ENABLE_AIEN);
    }
    //设置集成时间
    export function TCS34725_Set_Integration_Time(data: number): void {
        TCS34725_WriteByte(DevConfig.TCS34725_ATIME, data)
        integtime = data
    }
    //设置增益
    export function TCS34725_Set_GAIN(data: number): void {
        TCS34725_WriteByte(DevConfig.TCS34725_CONTROL_REGS, data)
        gain = data
    }
    //设置上下限中断阈值
    export function TCS34725_Set_Integration_Threshold(data_h: number, data_l: number): void {
        TCS34725_WriteByte(DevConfig.TCS34725_AITL, data_l & 0xff)
        TCS34725_WriteByte(DevConfig.TCS34725_AILTH, data_l >> 8)
        TCS34725_WriteByte(DevConfig.TCS34725_AIHTL, data_h & 0xff)
        TCS34725_WriteByte(DevConfig.TCS34725_AIHTH, data_h >> 8)
    }
    //设置中断过滤
    export function TCS34725_Set_Integration_PPERS(data: number): void {
        if (data < 0x10)
            TCS34725_WriteByte(DevConfig.TCS34725_PPERS, data)
        else
            TCS34725_WriteByte(DevConfig.TCS34725_PPERS, DevConfig.TCS34725_PPERS_CYCLE_60)
    }
    /* 
        读写地址/数据
     */
    //读取字节
    export function TCS34725_ReadByte(data: number): number {
        data = data | DevConfig.TCS34725_CMD_BIT
        pins.i2cWriteNumber(DevConfig.IIC_Addr, data, 1)
        basic.pause(1)
        return pins.i2cReadNumber(DevConfig.IIC_Addr, 1)
    }
    //读多字节
    export function TCS34725_ReadWord(data: number): number {
        let t: number, x: number
        data = data | DevConfig.TCS34725_CMD_BIT
        pins.i2cWriteNumber(DevConfig.IIC_Addr, data, 1)
        t = pins.i2cReadNumber(DevConfig.IIC_Addr, 2)
        x = pins.i2cReadNumber(DevConfig.IIC_Addr, 2)
        x <<= 8
        x |= t
        return x
    }
    //写字节
    export function TCS34725_WriteByte(data: number, data_: number): void {
        data = data | DevConfig.TCS34725_CMD_BIT
        pins.i2cWriteNumber(DevConfig.IIC_Addr, data, 1)
        data_ = data_ & 0xFF
        pins.i2cWriteNumber(DevConfig.IIC_Addr, data_, 1)
    }
    //写多字节
    export function TCS34725_WriteWord(data: number): void {
        data = data | DevConfig.TCS34725_CMD_BIT
        pins.i2cWriteNumber(DevConfig.IIC_Addr, data, 1)
    }
}