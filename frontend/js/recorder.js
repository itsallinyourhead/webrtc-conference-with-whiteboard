class RecorderWorkletProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        automationRate: 'a-rate',
        defaultValue: 0,
        name: 'isPausing',
      }, {
        automationRate: 'a-rate',
        defaultValue: 1,
        name: 'isRecording',
      }, {
        automationRate: 'k-rate',
        defaultValue: 48000,
        name: 'recordedSampleRate',
      },
    ];
  }
  constructor() {
    super();
    this._bufferSize = 72000;
    this._buffer = new Float32Array(this._bufferSize);
    this._bytesWritten = this._counter = this._length = this._sum = 0;
    this._lastPauseState = this._stopRequested = false 
    this._lastRecordingState = true;
  }
  _downSample(buffer, fromSampleRate, toSampleRate) {
    const sampleRateRatio = fromSampleRate / toSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);
    let offsetBuffer = 0;
    let offsetResult = 0;
    while (offsetResult < newLength) {
      let accum = 0;
      let count = 0;
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; ++i) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = count > 0 ? accum / count : 0;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }
  _flush(recordedSampleRate) {
    if (!this._bytesWritten) {
      return;
    }
    let buffer = this._bytesWritten < this._bufferSize ? this._buffer.slice(0, this._bytesWritten) : this._buffer;
    recordedSampleRate > 16000 && (buffer = this._downSample(buffer, recordedSampleRate, 16000));
    const int16Buffer = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; ++i) {
      const s = buffer[i];
      int16Buffer[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    this.port.postMessage({
      audioBuffer: int16Buffer,
      eventType: 'data',
    }, [int16Buffer.buffer]);
    this._bytesWritten = 0;
  }
  process(inputs, outputs, parameters) {
    const inputChannel = inputs[0]?.[0];
    if (!inputChannel) {
      return true;
    }
    const isPausingValues = parameters.isPausing;
    const isRecordingValues = parameters.isRecording;
    const pauseChanged = isPausingValues.length === 1;
    const recordChanged = isRecordingValues.length === 1;
    const recordedSampleRate = parameters.recordedSampleRate[0];
    const currentPause = isPausingValues[0] > 0;
    if (currentPause !== this._lastPauseState) {
      this.port.postMessage({
        eventType: currentPause ? 'paused' : 'resumed',
      });
      this._lastPauseState = currentPause;
    }
    let currentRecording = this._lastRecordingState;
    if (recordChanged) {
      currentRecording = isRecordingValues[0] > 0;
      if (!currentRecording && this._lastRecordingState) {
        this._stopRequested = true;
        this._flush(recordedSampleRate);
        this.port.postMessage({
          eventType: 'stop',
        });
      }
      this._lastRecordingState = currentRecording;
    }
    if (!recordChanged && this._lastRecordingState) {
      currentRecording = isRecordingValues[0] > 0;
      if (!currentRecording) {
        this._stopRequested = true;
        this._flush(recordedSampleRate);
        this.port.postMessage({
          eventType: 'stop',
        });
        this._lastRecordingState = false;
      }
    }
    if (!this._stopRequested) {
      let shouldComputeVolume = false;
      for (let i = 0; i < inputChannel.length; ++i) {
        const shouldRecord = recordChanged ? isRecordingValues[0] : isRecordingValues[i];
        const isPaused = pauseChanged ? isPausingValues[0] : isPausingValues[i];
        if (shouldRecord && !isPaused) {
          shouldComputeVolume = true;
          this._bytesWritten >= this._bufferSize && this._flush(recordedSampleRate);
          this._buffer[this._bytesWritten++] = inputChannel[i];
        }
      }
      // Volume metering
      if (shouldComputeVolume) {
        let sum = 0;
        for (let i = 0; i < inputChannel.length; ++i) {
          const sample = inputChannel[i];
          sum += sample * sample;
        }
        this._length += inputChannel.length;
        this._sum += sum;
        if (!(++this._counter % 25) && this._length) {
          this.port.postMessage({
            eventType: 'volume',
            volume: 10 * Math.log10(this._sum / this._length),
          });
          this._counter = this._length = this._sum = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor('recorder-worklet', RecorderWorkletProcessor);