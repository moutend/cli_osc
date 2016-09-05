"use strict";
const audioloop = require("./audioloop");
// channels, blockSize, sampleRate, callback
audioloop(1, 128, 44100, (output, playbackTime, playbackSample) => {
  for (let i = 0; i < output.length; i++) {
    let phase = 880 * 2 * Math.PI * ((i + playbackSample) / 44100);
    output[i] = Math.sin(phase);
    // Math.random() * Math.sin(playbackTime * 0.250);
  }
});
