import axios from 'axios';

// banners
export const getBanners = () => axios.get('/banner?type=0').then(res => res.data);
// 独家放送
export const privateContent = () => axios.get('/personalized/privatecontent').then(res => res.data);
// 最新专辑
export const albumNewest = () => axios.get('/album/newest').then(res => res.data);
// 推荐歌单
export const personalized = () => axios.get('/personalized').then(res => res.data);
// 推荐新音乐
export const personalizedSong = () => axios.get('/personalized/newsong').then(res => res.data);
// 推荐mv
export const personalizedMV = () => axios.get('/personalized/mv').then(res => res.data);
// 歌单列表
export const getPlayList = (params) => axios.get('/playlist/detail', { params }).then(res => res.data);
// 检查可用
export const checkMusic = (params) => axios.get('/check/music', { params }).then(res => res.data);
// songurl
export const getMusicUrl = (params) => axios.get('/song/url', { params }).then(res => res.data);