import {orderHandler} from "../pages/hello-command/command-provider"
import {RemoteController,Light,RedLight, LightOnOffCommands, RedLightIntensityCommands} from "../patterns/command/command-light"

const remoteController = new RemoteController();
const light = new Light();
const redLight = new RedLight();
const lightOnOffCommands = new LightOnOffCommands(light);
const redlightOnOffCommands = new LightOnOffCommands(redLight);
const redlightIntensityCommands = new RedLightIntensityCommands(redLight);

describe("Light Command Pattern", () => {
    test("Light on",()=>{
        let expectation = remoteController.executeCommand(lightOnOffCommands)
        let reality = "on";
        expect(expectation).toEqual(reality)
    });
    test("Light off",()=>{
        let expectation = remoteController.undoCommand(lightOnOffCommands)
        let reality = "off";
        expect(expectation).toEqual(reality)

    });

    test("Light on",()=>{
        let expectation = remoteController.executeCommand(redlightOnOffCommands);
        let reality = "off";
        expect(expectation).toEqual(reality);
    });
    test("Light off",()=>{
        let expectation = remoteController.undoCommand(redlightOnOffCommands);
        let reality = "off";
        expect(expectation).toEqual(reality);
    });
    test("Light  intensity increase",()=>{
        let expectation = remoteController.executeCommand(redlightIntensityCommands);
        let reality = "red1";
        expect(expectation).toEqual(reality);
    });
    test("Light  intensity decrease",()=>{
        let expectation = remoteController.undoCommand(redlightIntensityCommands);
        let reality = "red0";
        expect(expectation).toEqual(reality);
    });

    test("Light unchanged in intensity increase",()=>{ 
        let etc = orderHandler("on");  
        let expectation = orderHandler("increase");
        let reality = "on";
        expect(expectation).toEqual(reality);
    });
    test("Light  unchanged in intensity decrease",()=>{
        let etc = orderHandler("on");  
        let expectation = orderHandler("decrease");
        let reality = "on";
        expect(expectation).toEqual(reality);
    });
    test("Red light on",()=>{
        let etc = orderHandler("on");
        let expectation = orderHandler("red");
        let reality = "red0";
        expect(expectation).toEqual(reality);
    });

    test("Red light intensity increase",()=>{
        let nothing = orderHandler("off");
        let nothing0 = orderHandler("on");
        let nothing1 = orderHandler("red");
        let expectation = orderHandler("increase");
        let reality = "red1";
        expect(expectation).toEqual(reality);
    });

    test("Red light intensity increase",()=>{
        let nothing = orderHandler("off");
        let nothing0 = orderHandler("on");
        let nothing1 = orderHandler("red");
        let nothing2 = orderHandler("increase");
        let expectation = orderHandler("decrease");
        let reality = "red0";
        expect(expectation).toEqual(reality);
    });
});