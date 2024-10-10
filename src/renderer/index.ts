import trinagleVertexShader from '../shaders/triangle.wgsl'

import type { Render } from "./types"

export const render: Render = function ({
    gpuCommandEncoder,
    gpuDevice,
    canvasCtx
}) {
    const vertices = new Float32Array([
        0.0, 0.5,
        -0.7, -0.7,
        0.7, -0.7
    ])

    const vertexCoordsBuffer = gpuDevice.createBuffer({
        label: 'triangle coords',
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    })

    const vertexBufferLayout: GPUVertexBufferLayout = {
        arrayStride: 8,
        attributes: [
            {
                format: "float32x2",
                offset: 0,
                shaderLocation: 0
            }
        ]
    }

    gpuDevice.queue.writeBuffer(vertexCoordsBuffer, 0, vertices)

    const module = gpuDevice.createShaderModule({
        label: "Triangle shader module",
        code: trinagleVertexShader
    })

    const renderPipeline = gpuDevice.createRenderPipeline({
        label: "triangle render pipline",
        vertex: {
            module,
            entryPoint: 'set_triangle_points',
            buffers: [vertexBufferLayout]
        },
        fragment: {
            module,
            entryPoint: 'set_triangle_color',
            targets: [
                {
                    format: navigator.gpu.getPreferredCanvasFormat()
                }
            ]
        },
        layout: 'auto'
    })

    const pass = gpuCommandEncoder.beginRenderPass({
        colorAttachments: [
            {
                view: canvasCtx.getCurrentTexture().createView(),
                loadOp: 'clear',
                storeOp: 'store'
            }
        ]
    })

    pass.setPipeline(renderPipeline)
    pass.setVertexBuffer(0, vertexCoordsBuffer)
    pass.draw(vertices.length / 2)

    pass.end()

    gpuDevice.queue.submit([gpuCommandEncoder.finish()])
}

