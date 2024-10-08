import { initGpuDevice } from '../gpu/init.js'

const window = document.getElementById('output-canvas')

if (!navigator.gpu) {
    throw new Error('WebGPU unsupported from this browser')
}

await initGpuDevice()
