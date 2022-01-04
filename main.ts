serial.redirect(
SerialPin.P12,
SerialPin.P13,
BaudRate.BaudRate115200
)
basic.forever(function () {
    TCS347XX.RGB()
})
