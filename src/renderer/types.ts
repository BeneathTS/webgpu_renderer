export interface RenderCtx {
    gpuCommandEncoder: GPUCommandEncoder
    gpuDevice: GPUDevice
    canvasCtx: GPUCanvasContext
}

export type Render = (props: RenderCtx) => void 