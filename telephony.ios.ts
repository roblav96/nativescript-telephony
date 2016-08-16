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
declare let CTTelephonyNetworkInfo: any



export function Telephony(): Promise<any> {

	let netinfo = new CTTelephonyNetworkInfo()
	let carrier = netinfo.subscriberCellularProvider

	if (carrier) {
		return Promise.resolve({
			allowsVOIP: carrier.allowsVOIP,
			carrierName: carrier.carrierName || "",
			countryCode: carrier.isoCountryCode || "",
			mcc: carrier.mobileCountryCode || "",
			mnc: carrier.mobileNetworkCode || "",
		})
	} else {
		return Promise.reject(new Error('Null carrier information!'))
	}

}

