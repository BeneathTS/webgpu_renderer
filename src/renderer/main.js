import { initGpuDevice } from '../gpu/init.js'

if (!navigator.gpu) {
    throw new Error('WebGPU unsupported from this browser')
}

const {
    gpuDevice,
    gpuCommandEncoder,
    canvasCtx
} = await initGpuDevice(document.getElementById('output-canvas'))

const pass = gpuCommandEncoder.beginRenderPass({
    colorAttachments: [
        {
            view: canvasCtx.getCurrentTexture().createView(),
            loadOp: 'clear',
            storeOp: 'store'
        }
    ]
})

pass.end()

gpuDevice.queue.submit([gpuCommandEncoder.finish()]);
