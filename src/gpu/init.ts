import type { InitGpuDevice } from "./types"

export const initGpuDevice: InitGpuDevice = async function (canvasNode) {
    if (!canvasNode) {
        return null
    }
    const canvasCtx = <GPUCanvasContext> canvasNode.getContext('webgpu')

    const gpuAdapter = await navigator.gpu.requestAdapter()

    if (!gpuAdapter) {
        throw new Error('Any GPU devices are unavailable ;C')
    }

    const gpuDevice = await gpuAdapter.requestDevice()

    canvasCtx.configure({
        device: gpuDevice,
        format: navigator.gpu.getPreferredCanvasFormat(),
    });

    const gpuCommandEncoder = gpuDevice.createCommandEncoder()

    return {
        gpuDevice,
        gpuCommandEncoder,
        canvasCtx
    }
}