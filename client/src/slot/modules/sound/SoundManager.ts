import {List} from "../utils/dataStructures/List";
import {Sound} from "./Sound";

export class SoundManager {

    private sounds: List<Sound> = new List<Sound>();

    constructor() {

        //TODO: integration
        /*
        createjs.Sound.alternateExtensions = ["mp3"];
        this.dispatcher.addListener(DOMEventType.VISIBILITY_CHANGED, hidden => this.setSoundsMuted(hidden));
        this.dispatcher.addListener(SoundManagerEvent.MUTE, isMuted => this.setSoundsMuted(isMuted));
        */
    }

    public setSound(soundId: string, sound: Sound): void {
        this.sounds[soundId] = sound;
        // this.dispatcher.dispatch(SoundManagerEvent.SOUND_LOADED, soundId); // integration

        // this.setLoadingStatusCheck(id);//  TODO:integration
    }

    public getSound(soundId: string): Sound {
        return this.sounds[soundId];
    }

    //TODO: will be removed
    //  TODO:integration
    public getSoundConstantById(soundId: string): string {
        console.warn('Warning: "getSoundConstantById" is redundant and deprecated!');

        return soundId;
    }

    public isSoundAvailable(soundId: string): boolean {
        const sound: Sound = this.getSound(soundId);
        return sound && sound.loaded; //loaded check is redundant
    }

    public isSoundPlaying(soundId: string): boolean {
        let result: boolean = false;
        if (this.isSoundAvailable(soundId)) {
            result = this.getSound(soundId).isPlaying();
        }

        return result;
    }

    //waitForLoadAndPlay - if you need to wait for the sound to be loaded and then play
    public playSound(soundId: string, loop: number = 0, waitForLoadAndPlay: boolean = false, useNativeLoop: boolean = false): void {
        const sound = this.getSound(soundId);

        if (sound) {
            if (sound.loaded) {
                sound.play(loop);
            } else {
                console.log(`This sound is not loaded yet: ${soundId}`);
            }
        } else {
            console.log(`There is no such sound registered. constantId: ${soundId}`);
        }
    }

    //numLoops == 0 - infinitive loop
   /* public playSoundInstance(soundId: string, numLoops: number = 1, onCompleted: () => void = null): SoundInstance {
        const sound = this.getSound(soundId);

        if (sound) {
            if (sound.loaded) {
                return sound.playInstance(numLoops, onCompleted);
            } else {
                console.log(`This sound is not loaded yet: ${sound.id}`);
            }
        } else {
            console.log(`There is no such sound registered. constantId: ${soundId}`);
        }
        return null;
    }*/

    public stopSound(soundId: string): void {
        const sound = this.getSound(soundId);

        if (sound) {
            sound.stop();
        } else {
            console.log(`There is no such sound registered. constantId: ${soundId}`);
        }
    }

    public setSoundsVolume(volume: number) {
        Howler.volume(volume);
    }

    public setSoundsMuted(isMuted:boolean){
        Howler.mute(isMuted);
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
         createjs.Sound.volume = createjs.Sound.volume;
         if (this.soundLoadCallbacks[soundId]) {
             this.soundLoadCallbacks[soundId].call(this);
             this.soundLoadCallbacks[soundId] = null;
         }
     }*/
}
