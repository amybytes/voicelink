class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buffer = [];
    this.port.onmessage = (e) => {
      if (e.data === "start") {
        this._buffer = [];
      }
      else if (e.data === "stop") {
        this.port.postMessage(this._buffer);
        this._buffer = [];
      }
    }
  }

  process(inputs, outputs, params) {
    const input = inputs[0];
    if (input && input[0]) {
      this._buffer.push(new Float32Array(input[0]));
    }
    return true;
  }
}

registerProcessor("AudioProcessor", AudioProcessor);
