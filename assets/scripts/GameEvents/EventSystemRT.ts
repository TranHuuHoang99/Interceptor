interface IUnregisterCallback {
    event_name:string,
    ID: number;
}

interface IRegisterFunction {
    [order:number]: Function;
}

interface IRegisterEvent {
    [event:string]: IRegisterFunction;
}

interface ITransmitor {
    transmit(event: string, ...args: any[]): void;
    register(event:string, callback: Function): IUnregisterCallback;

    /**
     * 
     * @param register to determine event and id inside it
     * only delete one single callback
     */
    unregister(register: IUnregisterCallback): void;

    /**
     * 
     * @param event to determine event
     * delete all callback
     */
    dismiss_event(event: string): void;
}


export default class EventSystemRT implements ITransmitor{
    private static _inst: EventSystemRT = undefined;
    private eventsRegister: IRegisterEvent = {};

    public static inst(): EventSystemRT {
        if(this._inst === undefined) {
            this._inst = new EventSystemRT;
        }

        return this._inst;
    }

    transmit(event: string, ...args: any[]): void {
        if(this.eventsRegister[event] === undefined) {
            console.error(`could not transmit data to event: ${event}`);
            return;
        }
    
        Object.keys(this.eventsRegister[event]).forEach((value, index:number) => {
            if(this.eventsRegister[event][index] === undefined) {
                if(this.eventsRegister[event][index+1] !== undefined) {
                    index += 1;
                } else {
                    return;
                }
            }
            this.eventsRegister[event][index](...args);
        })
    }

    register(event: string, callback: Function): IUnregisterCallback {
        let nextID: number = 0;
        if(!this.eventsRegister[event]) {
            this.eventsRegister[event] = {};
        } else {
            nextID = Object.keys(this.eventsRegister[event]).length;
        }

        this.eventsRegister[event][nextID] = callback;

        return {
            event_name:event,
            ID: nextID,
        }
    }

    unregister(register: IUnregisterCallback): void {
        if(!this.eventsRegister[register.event_name]) {
            console.warn(`No event register callback to delete !!!`);
            return;
        }

        delete this.eventsRegister[register.event_name][register.ID];
        return;
    }

    dismiss_event(event: string): void {
        if(!this.eventsRegister[event]) {
            console.warn(`No event register to delete !!!`);
            return;
        }

        delete this.eventsRegister[event];
        return;
    }
}