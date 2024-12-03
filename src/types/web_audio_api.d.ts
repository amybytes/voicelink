declare class AudioWorkletProcessor {
  _buffer: Float32Array[];
  readonly port: MessagePort;

  constructor();

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean;
}

declare function registerProcessor(
  name: string,
  processorCtor: typeof AudioWorkletProcessor,
): void;
