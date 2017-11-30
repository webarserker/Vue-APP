import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
	singer: {},
	playing: false, // 播放状态
	fullScreen: false,
	playlist: [], // 当前数据，包括顺序数据和随机数据
	sequenceList: [], // 原始数据
	mode: playMode.sequence, // 数据状态，包括 顺序 单曲 随机
	currentIndex: -1, // 歌曲播放下标
	disc: {},
	topList: {},
	searchHistory: loadSearch(), // 历史数据读取
	playHistory: loadPlay(), // 播放历史
	favoriteList: loadFavorite()
}

export default state