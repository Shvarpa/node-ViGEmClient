// const { ViGEmClient } = require("../lib/index");
import { ViGEmClient } from "../src/index";
import { isDS4Dpad } from "../src/ts/Utils";

let client = new ViGEmClient();

if (!client.connect()) {
	let controller = client.createDS4Controller();

	controller.on("notification", (data) => {
		console.log("notification", data);
	});

	let err = controller.connect();

	if (err) {
		console.log(err.message);
		process.exit(1);
	}

	console.log("Vendor ID:", controller.vendorID);
	console.log("Product ID:", controller.productID);
	console.log("Index:", controller.index);
	console.log("Type:", controller.type);

	let t = 0;

	let buttons = Object.keys(controller.button).filter((x) => !isDS4Dpad(x));
	let btn = 0;

	setInterval(() => {
		controller.axis.LX.setValue(Math.sin(t));
		controller.axis.LY.setValue(Math.cos(t));

		controller.axis.RX.setValue(-Math.sin(t));
		controller.axis.RY.setValue(Math.cos(t));

		controller.DPAD.setValue([Math.sin(t), Math.cos(t)]);
		controller.button[buttons[btn]].setValue(!controller.button[buttons[btn]].value); // invert button value

		controller.update(); // update manually for better performance

		t += 0.1;
		btn = (btn + 1) % buttons.length;
	}, 100);
}
