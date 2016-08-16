// 

/**
 *
 * 
  .oooooo.   ooooooooo.   oooooooooooo oooooooooo.   ooooo ooooooooooooo  .oooooo..o 
 d8P'  `Y8b  `888   `Y88. `888'     `8 `888'   `Y8b  `888' 8'   888   `8 d8P'    `Y8 
888           888   .d88'  888          888      888  888       888      Y88bo.      
888           888ooo88P'   888oooo8     888      888  888       888       `"Y8888o.  
888           888`88b.     888    "     888      888  888       888           `"Y88b 
`88b    ooo   888  `88b.   888       o  888     d88'  888       888      oo     .d8P 
 `Y8bood8P'  o888o  o888o o888ooooood8 o888bood8P'   o888o     o888o     8""88888P'  
 *
 *
 * http://www.network-science.de/ascii/
 * roman font
 *
 */

/**
	Nathanael Anderson
	- https://github.com/NathanaelA/nativescript-permissions
**/

/**
	Peter Bakondy
	- https://github.com/pbakondy/cordova-plugin-sim
**/

import * as application from 'application'
declare let android: any



function hasPermission(): boolean {
	// if (android.os.Build.VERSION.SDK_INT < 23) {
	// 	return true
	// }

	if (!android.support || !android.support.v4 || !android.support.v4.content || !android.support.v4.content.ContextCompat || !android.support.v4.content.ContextCompat.checkSelfPermission) {
		return true
	}

	// Interesting, this actually works on API less than 23 and will return false if the manifest permission was forgotten
	let doesHavePermission: boolean = (
		android.content.pm.PackageManager.PERMISSION_GRANTED
		==
		android.support.v4.content.ContextCompat.checkSelfPermission(application.android.foregroundActivity, android.Manifest.permission.READ_PHONE_STATE)
	)

	return doesHavePermission
}

export function Telephony(): Promise<any> {
	return new Promise(function(resolve, reject) {

		if (hasPermission()) {
			resolve(true)
		} else {

			let reqid: number = Math.floor(Math.random() * 999)

			function onPermissionsEvent(args) {

				if (args.requestCode == reqid && args.permissions[0] == android.Manifest.permission.READ_PHONE_STATE) {

					// removeEventListener to reduce memory usage since it doesnt need to listen anymore
					application.android.removeEventListener(application.AndroidApplication.activityRequestPermissionsEvent, onPermissionsEvent)

					if (args.grantResults[0] == android.content.pm.PackageManager.PERMISSION_GRANTED) {
						resolve(true)
					} else {
						resolve(false)
						// reject(new Error("Permission DENIED for android.permission.READ_PHONE_STATE"))
					}
				}

			}

			application.android.addEventListener(application.AndroidApplication.activityRequestPermissionsEvent, onPermissionsEvent)
			android.support.v4.app.ActivityCompat.requestPermissions(application.android.foregroundActivity, [android.Manifest.permission.READ_PHONE_STATE], reqid)

		}

	}).then(function(hasPermissions) {

		let manager = application.android.context.getSystemService(android.content.Context.TELEPHONY_SERVICE)
		let results: any = {
			countryCode: manager.getSimCountryIso() || "",
			simOperator: manager.getSimOperator() || "",
			carrierName: manager.getSimOperatorName() || "",
			callState: manager.getCallState() || "",
			dataActivity: manager.getDataActivity() || "",
			networkType: manager.getNetworkType() || "",
			phoneType: manager.getPhoneType() || "",
			simState: manager.getSimState() || "",
			isNetworkRoaming: manager.isNetworkRoaming() || "",
			mcc: "",
			mnc: "",
		}

		if (results.simOperator.length >= 3) {
			results.mcc = results.simOperator.substring(0, 3)
			results.mnc = results.simOperator.substring(3)
		}

		if (hasPermissions) {
			results.phoneNumber = manager.getLine1Number() || ""
			results.deviceId = manager.getDeviceId() || ""
			results.deviceSoftwareVersion = manager.getDeviceSoftwareVersion() || ""
			results.simSerialNumber = manager.getSimSerialNumber() || ""
			results.subscriberId = manager.getSubscriberId() || ""
		}

		return Promise.resolve(results)
	})

}

