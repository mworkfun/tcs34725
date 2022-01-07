basic.showNumber(TCS347XX.INIT())
basic.forever(function () {
    basic.pause(500)
    basic.showNumber(TCS347XX.R())
    serial.writeNumber(TCS347XX.R())
    basic.pause(500)
})
