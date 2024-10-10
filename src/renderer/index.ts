import type { Render } from "./types"

export const render: Render = function ({
    gpuCommandEncoder,
    gpuDevice,
    canvasCtx
}) {
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

    gpuDevice.queue.submit([gpuCommandEncoder.finish()])
}

