"use strict";
module.exports = (channels, blockSize, sampleRate, callback) => {
  let currentTime = Date.now() * 0.001;
  let currentSample = 0;
  const loop = () => {
    if (currentTime < (Date.now() * 0.001) + 0.1) {
      const output = new Float32Array(channels * blockSize);
      callback(output, currentTime, currentSample);
      currentTime += blockSize / sampleRate;
      currentSample += blockSize;
      currentSample = currentSample % sampleRate;
      const buffer = Buffer.from(output.buffer);
      // Buffer.from がエラーになる場合は new Buffer(output.buffer) とする
      // 書き込みバッファがいっぱいになったら 'drain' (書き込み再開可能) まで待機
      if (!process.stdout.write(buffer)) {
        return process.stdout.once("drain", loop);
      }
    }
    setImmediate(loop);
  };
  setImmediate(loop);
};
