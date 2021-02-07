import DownloadUrl from "../downloadUrl";
import { getPlatform, OS } from "../platform";
import { makeBasename, makePlatformPart } from "./utils";
import { Version } from "./version";

export class SnapshotDownloadUrl implements DownloadUrl {
  constructor(private readonly version: string) {}

  getUrl(): string {
    const platform = getPlatform();
    return `https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/${makePlatformPart(
      platform
    )}%2F${this.version}%2F${makeBasename(platform)}?alt=media`;
  }
}

export class LatestDownloadUrl implements DownloadUrl {
  getUrl(): string {
    const platform = getPlatform();
    return `https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/${makePlatformPart(
      platform
    )}%2FLAST_CHANGE?alt=media`;
  }
}

export class ChannelDownloadUrl implements DownloadUrl {
  constructor(private readonly version: string) {}

  getUrl(): string {
    const platform = getPlatform();
    switch (platform.os) {
      case OS.DARWIN:
        return "";
      case OS.LINUX:
        switch (this.version) {
          case Version.STABLE:
            return "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb";
          case Version.BETA:
            return "https://dl.google.com/linux/direct/google-chrome-beta_current_amd64.deb";
          case Version.DEV:
            return "https://dl.google.com/linux/direct/google-chrome-unstable_current_amd64.deb";
        }
        break;
      case OS.WINDOWS:
        return "";
    }
    return "";
  }
}
