
import express from 'express';
import { usb } from 'usb';
import { DeviceDetails } from '../util/Device';

var router = express.Router();

router.get('/', (req, res) => {

    fetchResponse(res);
});

export const indexRouter = router;

/*====================================================================================
//this function creates and returns array of DeviceDetails object
this array contains all connected devices with needed datails
====================================================================================*/
async function fetchResponse(res: any) {

    var devices = usb.getDeviceList();

    //define array for response
    var devicesToResponse: DeviceDetails[] = [];

    //insert only needed information to response array
    for (let index = 0; index < devices.length; index++) {

        var temp: DeviceDetails = <DeviceDetails>{};

        temp.vendorID = devices[index].deviceDescriptor.idVendor;
        temp.productID = devices[index].deviceDescriptor.idProduct;

        //descriptorType == 1 means it is device. else, it is hub (not sure if correct)
        devices[index].deviceDescriptor.bDescriptorType == 1 ? temp.type = "device" : temp.type = "hub";

        //set string descriptor in async/awayt
        temp.stringDescriptor = "no data";//default, for meantime

        try {
            await devices[index].getStringDescriptor(index, (error, value)=>{

                if (error == undefined) {
                    value != undefined ? temp.stringDescriptor = value : temp.stringDescriptor = "no data";
                }
                else{
                    temp.stringDescriptor = "no data (locked usb)";
                }
            });
        } catch (error) {
            temp.stringDescriptor = "no data";
        }

        devicesToResponse.push(temp);
    }

    res.render('index.ejs', { number: devicesToResponse.length, devices: devicesToResponse });
}
