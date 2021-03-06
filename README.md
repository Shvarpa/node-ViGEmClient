# node-ViGEmClient
Native Node.js bindings for the ViGEm virtual gamepad driver.

Current SDK version: [commit 4657364](https://github.com/ViGEm/ViGEmClient/commit/465736429b8fe2b9d236b01ef0404f9bceb31106) (a few commits after v1.16.107)

# Installation

    npm install vigemclient

Since ViGEmBus only works on Windows, this module can also only be installed on Windows.
If you have problems building the native code parts, try installing the Windows Build Tools by running

```bash
npm install -g windows-build-tools
```

# Usage

A minimal example of a feeder application looks like this:

```javascript
const ViGEmClient = require('vigemclient');

let client = new ViGEmClient();

client.connect(); // establish connection to the ViGEmBus driver

let controller = client.createX360Controller();

controller.connect(); // plug in the virtual controller

// change some axes and buttons
controller.axis.LX.setValue(0.5); // move left stick 50% to the left
controller.axis.LY.setValue(-0.5); // move left stick 50% down
controller.axis.LT.setValue(1); // press in left trigger all the way

controller.button.Y.setValue(true); // press Y button
controller.dpad.setValue([1,-1]); // [x, y] => put dpad right and bottom. x: [1, right], [0, center], [-1, left]; y: [1, top], [0, center], [-1, bottom];
```

More examples can be found in the _examples/_ directory.

# Methods

## ViGEmClient

**constructor**()

**connect**()  
Connect to the ViGEmBus driver. Returns `null` on success and an `Error` if there was an error.

**createX360Controller**()  
Create a new `X360Controller` instance, with this client as its parent.
Can only be called after a connection to the driver has been established.

**createDS4Controller**()  
Create a new `DS4Controller` instance, with this client as its parent.
Can only be called after a connection to the driver has been established.

## ViGEmTarget

Both `X360Controller` and `DS4Controller` inherit from this class, but you can not instantiate it yourself.
Most of the methods and properties are the same for both controller types and where they aren't, the differences will be made clear.

_get_ **vendorID**   
Get the vendor ID of the device. Can only be accessed after `connect()` has been called.

_get_ **productID**  
Get the product ID of the device. Can only be accessed after `connect()` has been called.

_get_ **index**  
Get the internal index of the device. Can only be accessed after `connect()` has been called.

_get_ **type**  
Get a string describing the type of the device. Either "Xbox360Wired", "XboxOneWired" or "DualShock4Wired". Can only be accessed after `connect()` has been called.

_get_ **button**  
Get an object containing all the buttons of the controller.
This property differs between the controller types.

`X360Controller` has the following buttons:
- `START`
- `BACK`
- `LEFT_THUMB`
- `RIGHT_THUMB`
- `LEFT_SHOULDER`
- `RIGHT_SHOULDER`
- `GUIDE`
- `A`
- `B`
- `X`
- `Y`

`DS4Controller` has the following buttons:
- `THUMB_RIGHT`
- `THUMB_LEFT`
- `OPTIONS`
- `SHARE`
- `TRIGGER_RIGHT`
- `TRIGGER_LEFT`
- `SHOULDER_RIGHT`
- `SHOULDER_LEFT`
- `TRIANGLE`
- `CIRCLE`
- `CROSS`
- `SQUARE`
- `SPECIAL_PS`
- `SPECIAL_TOUCHPAD`

All of these buttons are instances of `InputButton` (documented below).

_get_ **axis**  
Get an object containing all the axes of the controller.
This property is the same for both controller types.

- `LX` - Left Analog Horizontal,     `values` : [-1 , 1]
- `LY` - Left Analog Vertical,       `values` : [-1 , 1]
- `RX` - Right Analog Horizontal,    `values` : [-1 , 1]
- `RY` - Right Analog Vertical,      `values` : [-1 , 1]
- `LT` - Left Trigger,               `values` : [0 , 1]
- `RT` - Right Trigger,              `values` : [0 , 1]

All of these buttons are instances of `InputAxis` (documented below).

_get_ **dpad** | **DPAD**  
get an object referencing a controller's dpad,
is instance of `InputDpad` (documented below).

_get_ **userIndex** (`X360Controller` only)  
Get the user index of the virtual Xbox controller.
This values corresponds to the player number displayed on the LEDs.

**connect**(`opts = {}`)  
Connect the controller to the driver.
This is equivalent of plugging the controller into a USB port.
The `opts` parameter is an object with the following optional properties:

- `vendorID`: Specify a custom device vendor ID.
- `productID`: Specify a custom device product ID.

Returns `null` on success and an `Error` on error.

**disconnect**()  
Disconnect the controller from the driver.
This is equivalent of unplugging the controller.
Returns `null` on success and an `Error` on error.

**update**()  
Submit updated button and axis values to the driver.

## InputButton

This class represents a single button on a controller.
You can not instantiate this class directly, instead you get objects of this class from the `.button` property from a `ViGEmTarget` instance.

_get_ **name**  
Get the internal name of this button.

_get_ **value**  
Get the currently set value of this button.

**setValue**(value)  
Set the value of the button (either `true` or `false`).

## InputAxis

This class represents a single axis on a controller.
You can not instantiate this class directly, instead you get objects of this class from the `.axis` property from a `ViGEmTarget` instance.

_get_ **name**  
Get the internal name of this axis.

_get_ **value**  
Get the currently set value of the axis.

_get_ **minValue**
Get the lowest value this axis can be set to.
Lower values will be clamped to this value.

_get_ **maxValue**  
Get the highest value this axis can be set to.
Higher values will be clamped to this value.

**setValue**(value)  
Set the value of this axis (between `minValue` and `maxValue`).
The POV switch is also represented as an axis and it also takes continuous values, but since POV switches are digital, the values are cut-off at 0.5, so `>`0.5 means pressed and `<=` 0.5 means not pressed.

## InputDpad
This class represents a controller's dpad.
You can not instantiate this class directly, instead you get objects of this class from the `.dpad` or `.DPAD` property from a `ViGEmTarget` instance.

_get_ **value**  
Get the currently set value of the dpad as a 4 bit number, where each bit represend if a direction is pressed.  
the **order** of the bits is `[right,left,down,up]`

- for example:  
if the value is `0b 0110`, it means `left` and `down` are pressed, so the direction of the dpad is south-west

**setValue**(value)  
set the value of dpad as either a tuple of 2 numbers [x, y], each between -1 and 1, representing directionality of the dpad.
- __x__: -1=`left`, 0=`center`, 1=`right`
- __y__: -1=`bottom`, 0=`center`, 1=`top`

or as a 4 bit number as describe in **value**

# Events

Both `X360Controller` and `DS4Controller` register a "notification callback" with the bus driver, which is called every time a controller is supposed to vibrate or if the LEDs on the controller change.
For the sake of convenience, the data contained in the notification is split up and emitted as regular node events.

Event "**notification**"  
Emitted by: `X360Controller`, `DS4Controller`  
Emitted every time the notification callback is called.
The emmitted values are objects of the form `{ LargeMotor, SmallMotor, LedNumber }` for `X360Controller` and `{ LargeMotor, SmallMotor, LightbarColor: { Red, Green, Blue } }` for `DS4Controller`.
