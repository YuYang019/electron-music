import axios from 'axios';

// 最新专辑
export const albumNewest = axios.get('/album/newest');
// 推荐歌单
export const personalized = axios.get('/personalized');
// 推荐新音乐
export const personalizedSong = axios.get('/personalized/newsong');
// 推荐mv
export const personalizedMV = axios.get('/personalized/mv');
