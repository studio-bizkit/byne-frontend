declare module "mux-embed" {
  interface MuxMonitorOptions {
    debug?: boolean;
    hlsjs?: any;
    Hls?: any;
    data?: {
      env_key?: string;
      player_name?: string;
      player_init_time?: number;
      video_title?: string;
      [key: string]: any;
    };
  }

  interface MuxUtils {
    now(): number;
  }

  export function monitor(
    selector: string | HTMLVideoElement,
    options: MuxMonitorOptions
  ): void;

  export function updateData(data: Record<string, any>): void;

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
