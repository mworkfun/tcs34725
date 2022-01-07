basic.showNumber(TCS347XX.INIT())
basic.forever(function () {
    basic.pause(500)
    basic.showNumber(TCS347XX.R())
    basic.showNumber(TCS347XX.G())
    basic.showNumber(TCS347XX.B())
    basic.pause(500)
})
