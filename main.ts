basic.forever(function () {
    basic.pause(500)
    basic.showNumber(1)
    serial.writeNumber(TCS347XX.R())
    serial.writeNumber(TCS347XX.G())
    serial.writeNumber(TCS347XX.B())
    serial.writeNumber(1)
    basic.pause(500)
})
