export interface ICommand{
    execute():string;
    undo():string;
}

export class Light{

    state:string = "off";

    public on():string{
        this.state="on";
        return this.state;
    }

    public off():string{
        this.state="off";
        return this.state;
    }

    public getState():string{
        return this.state;
    }
}

export class RedLight extends Light{
    value:number = 0;

     public on():string{
        this.state = "red0"
        return this.state;
    }

    public increaseIntensity():string{
        if(this.value<3){
            this.value += 1;
            this.state = "red"+this.value.toString();
            return this.state;
        } else{
            return this.state;
        }
    }

    public decreaseIntensity():string{
        if(this.value>0){
            this.value -= 1;
            this.state = "red"+this.value.toString();
            return this.state;
        } else{
            return this.state;
        }
    }
}

export class LightOnOffCommands implements ICommand{
    light: Light;
    constructor(light:Light){
        this.light = light;
    }

    execute():string{
        return this.light.on();
    }

    undo():string{
        return this.light.off();
    }
}

export class RedLightIntensityCommands implements ICommand{
    redLight: RedLight;

    constructor(redLight: RedLight){
        this.redLight = redLight;
    }

    execute():string{
        return this.redLight.increaseIntensity();
    }

    undo():string{
        return this.redLight.decreaseIntensity();
    }
}

export class RemoteController{

    executeCommand(command: ICommand):string{
        return command.execute();
    }

    undoCommand(command: ICommand):string{
        return command.undo();
    }

}