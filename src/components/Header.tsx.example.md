# Header Component with Video Background Support

## Overview
The Header component now supports both image and video backgrounds using Mux HLS.js for adaptive streaming.

## Setup

### 1. Environment Variables
Add your Mux environment key to your `.env.local` file:

```env
NEXT_PUBLIC_MUX_ENV_KEY=your_mux_env_key_here
```

You can get your `ENV_KEY` from the [Mux environments dashboard](https://dashboard.mux.com/environments).

### 2. Usage Example

To add a video background to any page, update the `pageContent` object in the Header component:

```typescript
const pageContent: Record<string, { bgImage?: string; bgVideo?: string; title?: string }> = {
  home: { 
    bgVideo: "https://stream.mux.com/your-video-id.m3u8", // HLS video URL
    title: "Welcome"
  },
  coffee: { 
    bgImage: "/coffee-bg.png", 
    title: "Huro Coffee" 
  },
  // Pages can have either bgImage or bgVideo
  homestay: { 
    bgVideo: "https://stream.mux.com/another-video.m3u8",
    title: "Villa Bynekere" 
  },
};
```

## Features

### Automatic HLS Support
- **Safari**: Uses native HLS support
- **Other browsers**: Uses HLS.js library for cross-browser compatibility
- Automatic error recovery for network and media errors

### Mux Analytics
- Video playback analytics integrated with Mux Data
- Tracks video quality, buffering, and playback metrics
- View analytics in your Mux dashboard

### Responsive Design
- Maintains the same responsive behavior as image backgrounds
- Scales and centers video content appropriately
- Includes mobile optimizations

### Video Attributes
Videos automatically include:
- `playsInline`: Prevents fullscreen on mobile
- `loop`: Continuous playback
- `muted`: Allows autoplay without user interaction
- `autoPlay`: Starts playback automatically

## Video Recommendations

### Format
- **Container**: HLS (M3U8) format
- **Resolution**: Upload at multiple resolutions for adaptive streaming
- **Bitrate**: Provide multiple bitrates for optimal quality

### Mux Video Setup
1. Upload your video to Mux
2. Get the playback ID from Mux dashboard
3. Use the HLS URL format: `https://stream.mux.com/{PLAYBACK_ID}.m3u8`

## Fallback Behavior
- If `bgVideo` is not provided, the component falls back to `bgImage`
- If HLS is not supported in the browser, an error is logged to console
- The component gracefully handles video load errors

## Troubleshooting

### Video not playing
1. Check that your Mux video is published (not in "pending" state)
2. Verify the HLS URL is correct
3. Check browser console for errors
4. Ensure CORS is properly configured in Mux

### Analytics not showing
1. Verify your `NEXT_PUBLIC_MUX_ENV_KEY` is set correctly
2. Check for ad blockers or privacy extensions
3. Wait 1-2 minutes for data to appear in Mux dashboard

### Performance issues
1. Use appropriate video bitrates for your use case
2. Consider preloading videos for critical pages
3. Monitor Mux analytics for quality metrics
