/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

"use strict";

defineParticle(({DomParticle}) => {

  let template = `
<span>{{mode}}</span> @ <span>{{position}}</span>
<button on-click="_play">Play</button>
<button on-click="_pause">Pause</button><br>
<button on-click="_downVolume">--</button>
<button on-click="_muteVolume">mute</button>
<button on-click="_upVolume">++</button>
  `.trim();

  let Play = 'play';
  let Pause = 'pause';
  
  return class Compose extends DomParticle {
    get template() {
      return template;
    }
    _getInitialState() {
      return {mode: Pause, position: 0, ts: Date.now(), volume: 20};
    }
    async setViews(views) {
      super.setViews(views);
      // Read out the most recent video playback information and
      // otherwise set it.
      if (views.controls) {
        if (views.controls.length) {
          this._state = views.controls[views.controls.length - 1];
        } else {
          this.setVideoPlayback();
        }
      }
    }
    _setVideoPlayback() {
      const VideoPlayback = this._views.get('controls').entityClass;
      this._views.get('controls').store(new VideoPlayback(this._state));
      console.log(this._state);
    }
    _updateState(mode) {
      if (this._state.mode == mode)
        return;
      let newTs = Date.now();
      if (mode == Pause) {
        // Compute the new position. Mode used to be play.
        console.assert(this._state.mode == Play);
        this._state.position += (newTs - this._state.ts);
      }
      this._state.mode = mode;
      this._state.ts = newTs;
    }
    _play(e, state) {
      this._updateState(Play)
      this._setVideoPlayback();
    }
    _pause(e, state) {
      this._updateState(Pause);
      this._setVideoPlayback();
    }
    _downVolume(e, state) {
      this._state.volume = Math.max(0, this._state.volume - 10);
      this._setVideoPlayback();
    }
    _upVolume(e, state) {
      this._state.volume = Math.min(100, this._state.volume + 10);      
      this._setVideoPlayback();
    }
    _muteVolume(e, state) {
      this._state.volume = 0;
      this._setVideoPlayback();
    }
    _render(props, state) {
      return state;
    }
  };
});