export const initGpuDevice = async function (canvasNode) {
    const canvasCtx = canvasNode.getContext('webgpu')

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