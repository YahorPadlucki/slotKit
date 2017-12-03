import {List} from "../utils/dataStructures/List";
import {Sound} from "./Sound";

export class SoundManager {

    private sounds: List<Sound> = new List<Sound>();

    constructor() {

        //TODO: for leave integration
        /*
        createjs.Sound.alternateExtensions = ["mp3"];
        this.dispatcher.addListener(DOMEventType.VISIBILITY_CHANGED, hidden => createjs.Sound.muted = hidden);
        this.dispatcher.addListener(SoundManagerEvent.MUTE, isMute => createjs.Sound.muted = isMute);
        */
    }

    public setSound(id: string, sound: Sound): void {
        this.sounds[id] = sound;
        this.setLoadingStatusCheck(id);//  TODO:integration
    }

    public getSound(constantId: string): Sound {
        return this.sounds[constantId];
    }

    public isSoundAvailable(constantId: string): boolean {
        const sound: Sound = this.getSound(constantId);
        return sound && sound.loaded;
    }

    public isSoundPlaying(constantId: string): boolean {
        let result: boolean = false;
        if (this.isSoundAvailable(constantId)) {
            result = this.getSound(constantId).isPlaying();
        }

        return result;
    }

    //waitForLoadAndPlay - if you need to wait for the sound to be loaded and then play
    public playSound(constantId: string, loop: number = 0, waitForLoadAndPlay: boolean = false, useNativeLoop: boolean = false): void {
        const sound = this.getSound(constantId);

        if (sound) {
            if (sound.loaded) {
                sound.play(loop, useNativeLoop);
            } else {
                console.log(`This sound is not loaded yet: ${sound.id}`);

                if (waitForLoadAndPlay) {
                    this.soundLoadCallbacks[sound.id] = () => sound.play(loop, useNativeLoop);
                }
            }
        } else {
            console.log(`There is no such sound registered. constantId: ${constantId}`);
        }
    }

    //numLoops == 0 - infinitive loop
    public playSoundInstance(constantId: string, numLoops: number = 1, onCompleted: () => void = null): SoundInstance {
        const sound = this.getSound(constantId);

        if (sound) {
            if (sound.loaded) {
                return sound.playInstance(numLoops, onCompleted);
            } else {
                console.log(`This sound is not loaded yet: ${sound.id}`);
            }
        } else {
            console.log(`There is no such sound registered. constantId: ${constantId}`);
        }
        return null;
    }

    public stopSound(constantId: string): void {
        const sound = this.getSound(constantId);

        if (sound) {
            sound.stop();
        } else {
            console.log(`There is no such sound registered. constantId: ${constantId}`);
        }
    }

    public setSoundsVolume(volume: number) {
        createjs.Sound.volume = volume;
    }

    setSoundVolume(soundId: string, volume: number): void {
        const sound = this.getSound(soundId);
        if (sound) {
            sound.volume = volume;
        }
    }

    public muteSound(soundId: string) {
        const sound = this.getSound(soundId);

        if (sound) {
            sound.mute();
        }
    }

    public unMuteSound(soundId: string) {
        const sound = this.getSound(soundId);

        if (sound) {
            sound.unMute();
        }
    }

   /* public setLoadingStatusCheck(soundId: string): void {
        this.sounds[soundId].loaded = true;
        this.dispatcher.dispatch(SoundManagerEvent.SOUND_LOADED, soundId);
        createjs.Sound.volume = createjs.Sound.volume; //TODO: workaround SWW-6
        if (this.soundLoadCallbacks[soundId]) {
            this.soundLoadCallbacks[soundId].call(this);
            this.soundLoadCallbacks[soundId] = null;
        }
    }*/
}
