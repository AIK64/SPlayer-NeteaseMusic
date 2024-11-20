import { songLevelData } from "@/utils/meta";
import request from "@/utils/request";

// 获取歌曲详情
export const songDetail = (ids: number | number[]) => {
  return request({
    url: "/song/detail",
    method: "post",
    params: { timestamp: Date.now() },
    data: { ids: Array.isArray(ids) ? ids.join(",") : ids.toString() },
  });
};

/**
 * 歌曲音质详情
 * @param id 歌曲 id
 */
export const songQuality = (id: number) => {
  return request({
    url: "/song/music/detail",
    params: { id },
  });
};

// 获取歌曲 URL
export const songUrl = (
  id: number,
  level:
    | "standard"
    | "higher"
    | "exhigh"
    | "lossless"
    | "hires"
    | "jyeffect"
    | "sky"
    | "jymaster" = "exhigh",
) => {
  return request({
    url: "/song/url/v1",
    params: {
      id,
      level,
      timestamp: Date.now(),
    },
  });
};


/**
 * 修改的新的获取歌曲url方法
 */
export const songUrlv1 = async (
  id: number,
  level:
    | "standard"
    | "higher"
    | "exhigh"
    | "lossless"
    | "hires"
    | "jyeffect"
    | "sky"
    | "jymaster" = "exhigh"
): Promise<any> => {
  const apiUrl = "https://csm.sayqz.com/api/"; // 替换为具体的 API URL
  const params = new URLSearchParams({
    id: id.toString(),                 
    level,
    timestamp: Date.now().toString(),
    type:"apiSongUrlV1",       
    cookie:"MUSIC_U%3D000D1692850B65E904802BEA05FF815B73983E43BCC0E1BF11FBED88DD9C96A1055281E57FCADA53D08424E0A6DB33CF3E59EE7A908CE8251CEE98AB8561C09DD08D9C0AA8457E9B77F595DCFCB78C1E12117A45B72107944343517802E1AB972C5BEABD3FB0FDE4EEFDE11510F029F20A0BA94CAB0BE4B48A075C8116BA78BF9F8964EF29F6002DDBF7D731088DBDC8B25392547B1B45F5495A7E69ECD990FEADB1F2ACD6FDC762AFBB66355949BBC234FABB5ADCCB5C76869152F5DEC34D4819FC4A08E42DADED71A4B83D77685281E1403146FFDAE0556A302E12CE04FB711431D4CE0BDE62AD6385DE68FE938D0EB490D946001E69A36C57494754FED2DD27F07ECEDEC52C2E55F35E30B814BACD27E35F99D29BF987C629E393FCFC86DE1804DD7AA576ED59A350912E04DEBB38E9%3B",
    
  });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching song URL:", error);
    throw error;
  }
};


// 获取解锁歌曲 URL
export const unlockSongUrl = (id: number, keyword: string, server: "netease" | "kuwo") => {
  const params = server === "netease" ? { id } : { keyword };
  return request({
    baseURL: "/api/unblock",
    url: `/${server}`,
    params,
  });
};

// 获取歌曲歌词
export const songLyric = (id: number) => {
  return request({
    url: "/lyric/new",
    params: {
      id,
    },
  });
};

/**
 * 获取歌曲下载链接
 * @param id 音乐 id
 * @param level 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, `dolby` => `杜比全景声`, jymaster => 超清母带
 * @returns
 */
export const songDownloadUrl = (id: number, level: keyof typeof songLevelData = "h") => {
  // 获取对应音质
  const levelName = songLevelData[level].level;
  return request({
    url: "/song/download/url/v1",
    params: { id, level: levelName, timestamp: Date.now() },
  });
};

// 喜欢歌曲
export const likeSong = (id: number, like: boolean = true) => {
  return request({
    url: "/like",
    params: { id, like, timestamp: Date.now() },
  });
};

/**
 * 本地歌曲文件匹配
 * @param {string} title - 文件的标题信息，是文件属性里的标题属性，并非文件名
 * @param {string} album - 文件的专辑信息
 * @param {string} artist - 文件的艺术家信息
 * @param {number} duration - 文件的时长，单位为秒
 * @param {string} md5 - 文件的 md5
 */

export const matchSong = (
  title: string,
  artist: string,
  album: string,
  duration: number,
  md5: string,
) => {
  return request({
    url: "/search/match",
    params: { title, artist, album, duration, md5 },
  });
};

/**
 * 歌曲动态封面
 * @param {number} id - 歌曲 id
 */

export const songDynamicCover = (id: number) => {
  return request({
    url: "/song/dynamic/cover",
    params: { id },
  });
};
