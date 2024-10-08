export const initGpuDevice = async function () {
    const gpuAdapter = await navigator.gpu.requestAdapter()

    if (!gpuAdapter) {
        throw new Error('Any GPU devices are unavailable ;C')
    }

    console.log(gpuAdapter.info)
}