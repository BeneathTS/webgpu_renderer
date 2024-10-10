import type { RenderCtx } from "../renderer/types"

export type InitGpuDevice = (canvasNode?: HTMLCanvasElement) => Promise<RenderCtx | null>