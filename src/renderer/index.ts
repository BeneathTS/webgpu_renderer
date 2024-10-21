import trinagleShader from '../shaders/triangle.wgsl'

import type { Render } from "./types"

const AMOUNT_OF_TRIANGLES = 100
const trinaglesData: Array<{ dataBuffer: Float32Array; gpuBuffer: GPUBuffer; bindGroup: GPUBindGroup}> = []

const rand = (min?: number, max?: number): number => {
  if (min === undefined) {
    min = 0;
    max = 1;
  } else if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
};

export const render: Render = function ({
    gpuCommandEncoder,
    gpuDevice,
    canvasCtx
}) {
    const module = gpuDevice.createShaderModule({
        label: "Triangle vertex module",
        code: trinagleShader
    })

    const renderPipeline = gpuDevice.createRenderPipeline({
        label: "triangle render pipline",
        vertex: {
            module,
            entryPoint: 'set_triangle_points',
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

    for(let i = 0; i < AMOUNT_OF_TRIANGLES; ++i) {
            const dataBuffer = new Float32Array(
                4 + // color vars
                2 + // offset vars
                2   // scale vars
            )

        dataBuffer.set(
            [
                rand(), rand(), rand(), 1,
                rand(-0.9, 0.9), rand(-0.9, 0.9),
                0.3, 0.3
            ]
        )

        const gpuBuffer = gpuDevice.createBuffer({
            label: `uniforms for obj: ${i}`,
            size: dataBuffer.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })

        const bindGroup = gpuDevice.createBindGroup({
             label: `bind group for obj: ${i}`,
            layout: renderPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: gpuBuffer
                    }
                }
            ]
        })

        trinaglesData.push({
            dataBuffer,
            gpuBuffer,
            bindGroup
        })
    }

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

    trinaglesData.forEach(({ dataBuffer, gpuBuffer, bindGroup }) => {
          gpuDevice.queue.writeBuffer(gpuBuffer, 0, dataBuffer)
          pass.setBindGroup(0, bindGroup)
          pass.draw(3)
    })

    // pass.setBindGroup(0, bindGroup)
    // pass.draw(3)

    pass.end()

    gpuDevice.queue.submit([gpuCommandEncoder.finish()])
}

