import{
    Light,
    RedLight,
    LightOnOffCommands,
    RedLightIntensityCommands,
    RemoteController
}  from "../../patterns/command/command-light";


let isRed:boolean = false;
const remoteController = new RemoteController();
let redLight: RedLight = new RedLight();
let light:Light = new Light();

export function orderHandler(input:string):string{    
    let button:string = "";

    if(input == "red"){
        if(light.getState() == "on"){
            isRed = true;
            button = remoteController.executeCommand(new LightOnOffCommands(redLight));
        }else if(isRed == true){
            button = redLight.getState();
        }else{
            button = "off";
        }
    }else if(input == "on"){
        light = new Light();
        button =  isRed? redLight.getState(): remoteController.executeCommand(new LightOnOffCommands(light));
    } else if(input == "off"){
        button = isRed? remoteController.undoCommand(new LightOnOffCommands(redLight)) : remoteController.undoCommand(new LightOnOffCommands(light));
        isRed = false;
    } else if(input == "increase"){
        button = isRed? remoteController.executeCommand(new RedLightIntensityCommands(redLight)): light.getState();
    } else if(input == "decrease"){
        button = isRed? remoteController.undoCommand(new RedLightIntensityCommands(redLight)) : light.getState();
    } 
    return button;
}