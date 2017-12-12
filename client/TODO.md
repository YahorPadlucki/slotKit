
- loading assets
    + loading sound
    + finalize loader
    + sound loader integrations
    - assets json

- gulp task to copy data into dist

- sounds Interface
    + prepare Sound for integration
    + same file multiple ids (for integration/game)
    + check pause/resume with loop
    - prepare SoundInstance for integration
    - wait load and play (register sounds before they are loaded) ? // seems not used

- integration status (howler)
 - sound extension checking
 - playSoundInstance for slotBuilder support - needs to be done
 - setLoadingStatusCheck deleted - no need to set loaded, callBacks doesn't work
 - sound loaded check deleted - cause it is registered only if loaded

- issue with stopping reels
- emulation to json
- width,height number to some config, reels, rows, spin speed - also to config
- spaceBar control
- loosing focus, return

+ emulate several spins;
+ skipping winning animations
+ showing rewards
    + lines on init
    + lines reward
    + symbols toggle animations
    + symbol on several lines
    + symbols animation over callback
+ remove blink listener in symbols
+ listeners remove issue
+ reels with different symbols
+ update reelModel when slot model updated
+ reelS  controller - reelS view (reelsContainer)
+ init server emulation with reels and lines
+ apply init stop positions
+ set final tape position (on simulated server response) - check and refactor
+ reverse tape display (from left to right)
+ manual immediately stop
+ spin button disable state (when spinning without response
+ global slot model - to check current state (idle, spin, stop) (inject)
+ change slot state (TODOS)
+ inject slot model
+ data transfer/injection/organisation
+ server simulation
+ fast spin/stop clicking
+ spinButton two states (Spin/Stop) - case when reels start stopping automatically
+ manual, auto stop (one by one)
+ improve scene ( bottom panel layout, mask, reels back)
+ smooth stop with ease


