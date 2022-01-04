/* 
    TCS34725 Color Sensor Driver 
    file name： TCS347XX.ts 
*/


//% Color = "#AA278D" weight = 100
namespace TCS347XX {
    //定义方法数据
    class DevConfig {
        IIC_Addr:                   0x29;//地址
        
        /* Register */
        TCS34725_CMD_BIT:           0x80;//进制转换：16转8
        
        TCS34725_ENABLE:            0x00;//寄存器启用
        TCS34725_ENABLE_AIEN:       0x10;//中断启用
        TCS34725_ENABLE_WEN:        0x08;//等待计时器启用，写入1为启用，0为禁用
        TCS34725_ENABLE_AEN:        0x02;//RGBC启用，写入1为启用，0为禁用
        TCS34725_ENABLE_PON:        0x01;//开机！，写入1为启用，0为禁用

        TCS34725_ATIME:             0x01;//定时寄存器

        TCS34725_WTIEM:             0x03;//等待时间寄存器
        TCS34725_WTIEM_2_4MS:       0xFF;//等待2.4ms=0.029S
        TCS34725_WTIEM_204MS:       0xAB;//等待204ms=2.45S
        TCS34725_WTIEM_614MS:       0x00;//等待614ms=7.4S

        TCS34725_AITL:              0x04;//清除通道下限中断阈值
        TCS34725_AILTH:             0x05;
        TCS34725_AIHTL:             0x06;//清除通道上限中断阈值
        TCS34725_AIHTH:             0x07;

        TCS34725_PPERS:             0x0C;//对中断的基本过滤机制，
        TCS34725_PPERS_AlLL:        0x00;//每个RGBC周期都会产生中断
        TCS34725_PPERS_CYCLE_1:     0x01;//清除1通道超出阈值范围
        TCS34725_PPERS_CYCLE_2:     0x02;//清除2通道超出阈值范围
        TCS34725_PPERS_CYCLE_3:     0x03;//清除3通道超出阈值范围
        TCS34725_PPERS_CYCLE_4:     0x04;//清除4通道超出阈值范围
        TCS34725_PPERS_CYCLE_5:     0x05;//清除5通道超出阈值范围
        TCS34725_PPERS_CYCLE_10:    0x06;//清除10通道超出阈值范围
        TCS34725_PPERS_CYCLE_20:    0x07;//清除20通道超出阈值范围
        TCS34725_PPERS_CYCLE_25:    0x08;//清除25通道超出阈值范围
        TCS34725_PPERS_CYCLE_30:    0x09;//清除30通道超出阈值范围
        TCS34725_PPERS_CYCLE_35:    0x0A;//清除35通道超出阈值范围
        TCS34725_PPERS_CYCLE_40:    0x0B;//清除10通道超出阈值范围
        TCS34725_PPERS_CYCLE_45:    0x0C;//清除45通道超出阈值范围
        TCS34725_PPERS_CYCLE_50:    0x0D;//清除50通道超出阈值范围
        TCS34725_PPERS_CYCLE_55:    0x0E;//清除55通道超出阈值范围
        TCS34725_PPERS_CYCLE_60:    0x0F;//清除60通道超出阈值范围

        TCS34725_CONFIG_REGS:       0x0D;//配置寄存器
        TCS34725_CONFIG_REGS_WLONG: 0x02;//等待12倍寄存器设定的等待周期

        TCS34725_CONTROL_REGS:      0x0F;//控制寄存器

        TCS34725_ID:                0x12;//设备ID：0x44 = TCS34721/TCS34725; 0x4D = TCS34723/TCS34727

        TCS34725_STATUS:            0x13;//查询寄存器状态，只读
        TCS34725_STATUS_AINT:       0x10;//RGBC无色通道中断查询
        TCS34725_STATUS_AVALID:     0x01;//RGBC通道已完成一个周期
        
        TCS34725_CDATAL:            0x14;//白色通道数据
        TCS34725_CDATAH:            0x15;//
        TCS34725_RDATA:             0x16;//红色通道数据
        TCS34725_RDATAH:            0x17;//
        TCS34725_GDATA:             0x18;//绿色通道数据
        TCS34725_GDATAH:            0x19;//
        TCS34725_BDATA:             0x1A;//蓝色通道数据
        TCS34725_BDATAH:            0x1B//
    }
    let dev = new DevConfig();
    /*
    RGBC 定时寄存器以 2.4 毫秒为增量
    控制 RGBC 透明和 IR 通道 ADC 的内部集成时间
    最大 RGBC 计数 = （ 256 − atime ） × 1024 、最大值为 65535  
    */
    enum TCS34725_INTEGTIME{
        TCS34725_INTEGTIME_2_4ms    = 0xFF,//循环1次 2.4ms 最大计数1024
        TCS34725_INTEGTIME_24ms     = 0xF6,//循环10次 24ms 最大计数10240
        TCS34725_INTEGTIME_101ms    = 0xD5,//循环42次 101ms 最大计数43008
        TCS34725_INTEGTIME_154ms    = 0xC0,//循环64次 154ms 最大计数65535
        TCS34725_INTEGTIME_614ms    = 0x00,//循环256次 614ms 最大计数65535
    }
    /* 
    控制寄存器为模拟块提供 8 位杂项控制
    这些位通常控制增益设置和二极管选择等功能。
    RGBC增益控制
     */
    enum TCS34725_GAIN{
        TCS34725_GAIN_1x            = 0x00,//无增益
        TCS34725_GAIN_4x            = 0x01,//4倍增益
        TCS34725_GAIN_16x           = 0x02,//16倍增益
        TCS34725_GAIN_60x           = 0x03//60倍增益
    }
    interface RGB{
        R : number;
        G : number;
        B : number;
        C : number;
        rgb:()=>string
    }
    
    let tcsRGB:RGB ={
        R : 0,
        G : 0,
        B : 0,
        C : 0,
        rgb:():string =>{return "R:"}
    }
    //% block
    export function R(): number {
        return tcsRGB.R
    }
    //% block
    export function G(): number {
        return tcsRGB.G
    }
    //% block
    export function B(): number {
        return tcsRGB.B
    }
    /*  */
    //% block
    export function RGB(): number {
        return 0
    }
    /* 
        初始化传感器和i2c
     */
    export function TCS347XXinit() {
        
        

    }
    //写操作
    export function i2cWriteNumber(add:number){
        pins.i2cWriteNumber(dev.IIC_Addr, add, NumberFormat.Int8LE)
    }
    //读操作
    export function i2cReadNumber(add: number) {
        pins.i2cReadNumber(dev.IIC_Addr, NumberFormat.Int8LE)
    }
}