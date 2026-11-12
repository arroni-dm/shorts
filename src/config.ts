export interface SceneConfig {
  id: string;
  startFrame: number;
  durationInFrames: number;
  captionText: string;
}

export const VIDEO_CONFIG = {
  fps: 30,
  durationInFrames: 600,
  width: 1920,
  height: 1080,
  scenes: [
    {
      id: "hook",
      startFrame: 0,
      durationInFrames: 90,
      captionText: "প্রতি মাসে AI ভয়েসের খরচ?",
    },
    {
      id: "reveal",
      startFrame: 90,
      durationInFrames: 90,
      captionText: "ফ্রি। ওপেন-সোর্স। নিজের ডিভাইসে।",
    },
    {
      id: "features",
      startFrame: 180,
      durationInFrames: 180,
      captionText: "ভয়েস ক্লোন, ভিডিও ডাবিং, অডিওবুক",
    },
    {
      id: "localFree",
      startFrame: 360,
      durationInFrames: 120,
      captionText: "GPU ছাড়াও চলে, ডেটা শতভাগ সুরক্ষিত",
    },
    {
      id: "cta",
      startFrame: 480,
      durationInFrames: 120,
      captionText: "সাবস্ক্রিপশনকে বিদায়! GitHub-এ নিন",
    },
  ] as SceneConfig[],
};
