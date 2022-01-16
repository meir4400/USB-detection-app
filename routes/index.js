"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = __importDefault(require("express"));
const usb_1 = require("usb");
var router = express_1.default.Router();
router.get('/', (req, res) => {
    fetchResponse(res);
});
exports.indexRouter = router;
/*====================================================================================
//this function creates and returns array of DeviceDetails object
this array contains all connected devices with needed datails
====================================================================================*/
async function fetchResponse(res) {
    var devices = usb_1.usb.getDeviceList();
    //define array for response
    var devicesToResponse = [];
    //insert only needed information to response array
    for (let index = 0; index < devices.length; index++) {
        var temp = {};
        temp.vendorID = devices[index].deviceDescriptor.idVendor;
        temp.productID = devices[index].deviceDescriptor.idProduct;
        //descriptorType == 1 means it is device. else, it is hub (not sure if correct)
        devices[index].deviceDescriptor.bDescriptorType == 1 ? temp.type = "device" : temp.type = "hub";
        //set string descriptor in async/awayt
        temp.stringDescriptor = "no data"; //default, for meantime
        try {
            await devices[index].getStringDescriptor(index, (error, value) => {
                if (error == undefined) {
                    value != undefined ? temp.stringDescriptor = value : temp.stringDescriptor = "no data";
                }
                else {
                    temp.stringDescriptor = "no data (locked usb)";
                }
            });
        }
        catch (error) {
            temp.stringDescriptor = "no data";
        }
        devicesToResponse.push(temp);
    }
    res.render('index.ejs', { number: devicesToResponse.length, devices: devicesToResponse });
}
