declare module "mux-embed" {
  interface MuxMonitorOptions {
    debug?: boolean;
    hlsjs?: unknown;
    Hls?: unknown;
    data?: {
      env_key?: string;
      player_name?: string;
      player_init_time?: number;
      video_title?: string;
      [key: string]: string | number | boolean | null | undefined;
    };
  }

  interface MuxUtils {
    now(): number;
  }

  export function monitor(
    selector: string | HTMLVideoElement,
    options: MuxMonitorOptions
  ): void;

  export function updateData(data: Record<string, string | number | boolean | null | undefined>): void;

  export function addHLSJS(
    selector: string | HTMLVideoElement,
    options: MuxMonitorOptions
  ): void;

  export const utils: MuxUtils;

  const mux: {
    monitor: typeof monitor;
    updateData: typeof updateData;
    addHLSJS: typeof addHLSJS;
    utils: MuxUtils;
  };

  export default mux;
}
