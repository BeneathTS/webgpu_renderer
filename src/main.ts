import { initGpuDevice } from './gpu/init'
import { render } from './renderer'

async function main (): Promise<void> {
    if (!navigator.gpu) {
        throw new Error('WebGPU unsupported from this browser')
    }
    const canvasNode = <HTMLCanvasElement> document.getElementById('output-canvas')

    const renderCtx = await initGpuDevice(canvasNode)

    if (!renderCtx) {
        return 
    }

    render(renderCtx)
}

main()
