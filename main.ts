serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
serial.writeNumber(TCS347XX.GetDevID())
basic.forever(function () {
    serial.writeNumber(TCS347XX.R())
    serial.writeNumber(TCS347XX.G())
    serial.writeNumber(TCS347XX.B())
    serial.writeNumber(TCS347XX.C())
    serial.writeLine("---------")
    basic.pause(1000)
})
