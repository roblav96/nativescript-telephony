# NativeScript-Telephony
This is a Nativescript plugin to get data from the SIM card like the carrier name, mcc, mnc and country code and other system dependent additional info.

## Contributors
**Peter Bakondy** for his work on
[cordova-plugin-sim](https://github.com/pbakondy/cordova-plugin-sim).
Basically this is his plugin. I followed his source code as a guide.

## Supported Platforms
- Android
- iOS

## Installation
```bash
tns plugin add nativescript-telephony
```

## Usage
### Typescript
```javascript
import {Telephony} from 'nativescript-telephony';

Telephony().then(function(resolved) {
	console.log('resolved >', resolved)
	console.dir(resolved);
}).catch(function(error) {
	console.error('error >', error)
	console.dir(error);
})
```
### ES6 Promises
If you are unfamiliar with Promises, read up on these:

- [We Have A Problem With Promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
- [Promises in Typescript](https://basarat.gitbooks.io/typescript/content/docs/promise.html)

## iOS Quirks
### Promise.Resolves
```
{
  "carrierName": String,
  "countryCode": String,
  "mcc": String,
  "mnc": String,
  "allowsVOIP": Boolean,
}
```
Sadly there's nothing more we can get here.
### Promise.Rejects
When using an emulator or a sim card does not exist.

## Android Quirks
All permission dialogues are built into the `Telephony` function.
### Promise.Resolves
##### When Permission is `DENIED` to `READ_PHONE_STATE`
```
{
	"countryCode": String,
	"simOperator": String,
	"carrierName": String,
	"callState": Number,
	"dataActivity": Number,
	"networkType": Number,
	"phoneType": Number,
	"simState": Number,
	"isNetworkRoaming": Boolean,
	"mcc": String,
	"mnc": String,
}
```
##### When Permission is `GRANTED` to `READ_PHONE_STATE`
```
{
	// START GRANTED PERMISSIONS
	"phoneNumber": String,
	"deviceId": String,
	"deviceSoftwareVersion": String,
	"simSerialNumber": String,
	"subscriberId": String,
	// END GRANTED PERMISSIONS
	"countryCode": String,
	"simOperator": String,
	"carrierName": String,
	"callState": Number,
	"dataActivity": Number,
	"networkType": Number,
	"phoneType": Number,
	"simState": Number,
	"isNetworkRoaming": Boolean,
	"mcc": String,
	"mnc": String,
}
```
### Promise.Rejects
Never.

## Demo
```bash
npm run setup
# iOS
npm run demo.ios
# Android
npm run demo.android
```

## License
This plugin is licensed under the MITlicense by Rob Laverty

