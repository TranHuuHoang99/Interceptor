import { PREFAB_TYPE } from "../GameEvents/GameEvents";
import { GameParam } from "../GameManager/GameParam";
import GameResource from "../GameManager/GameResource";
import BomGfx from "./BomGfx";


export default class AircraftGfx {
    // container of aircraft
    private _aircraftSpawner: cc.Node = undefined;

    //aircraft array
    private _aircraft: cc.Node[] = [];

    //container of aircraft spawner
    private _baseSpawner: cc.Node = undefined

    constructor(_baseSpawner: cc.Node) {
        this._baseSpawner = _baseSpawner;
        this._execute_initialization();
    }

    private _init_aircraft_spawner(): Promise<cc.Node> {
        return new Promise<cc.Node>((resolve, reject) => {
            this._aircraftSpawner = cc.instantiate(GameResource.prefabs.get(PREFAB_TYPE.AIRCRAFT_SPAWNER));
            this._aircraftSpawner.x = cc.view.getFrameSize().width;
            this._aircraftSpawner.y = cc.view.getFrameSize().height * 0.95;
            this._baseSpawner.addChild(this._aircraftSpawner);
            resolve(this._aircraftSpawner);
        });
    }

    private _init_aircraft(aircraft: cc.Node, posX: number): Promise<cc.Node> {
        return new Promise<cc.Node>((resolve, reject) => {
            setTimeout(() => {
                aircraft = cc.instantiate(GameResource.prefabs.get(PREFAB_TYPE.AIRCRAFT));
                this._aircraftSpawner.addChild(aircraft);
                this._aircraft_movement(aircraft, posX);
                new BomGfx(aircraft);
                resolve(aircraft);
            }, GameParam.aircraft_init_timing);
        });
    }

    private async _execute_initialization() {
        await this._init_aircraft_spawner();
        for(let i = 0; i < GameParam.numb_air_craft; i++) {
            await this._init_aircraft(this._aircraft[i], cc.view.getFrameSize().width * 0.3 * (i+1) + i*cc.view.getFrameSize().width*0.15);
        }
    }

    private _aircraft_movement(aircraft: cc.Node, posX: number) {
        let aircraftTransition = cc.tween;
        aircraftTransition(aircraft)
        .to(1, {x: -cc.view.getFrameSize().width + posX})
        .start();
    }
}