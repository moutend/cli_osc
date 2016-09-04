"use strict";
const audioloop = require("./audioloop");
// channels, blockSize, sampleRate, callback
audioloop(1, 128, 44100, (output, playbackTime) => {
  // ここで信号処理をする
  for (let i = 0; i < output.length; i++) {
    output[i] = Math.random() * Math.sin(playbackTime * 0.250);
  }
});
