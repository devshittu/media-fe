// audioService.ts
export class AudioService {
  private audio: HTMLAudioElement;

  constructor(src: string) {
    this.audio = new Audio(src);
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  // Add more controls as needed (e.g., seek, volume control)
}
