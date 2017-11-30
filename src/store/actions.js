import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export const selectPlay = function ({commit, state}, {list, index}) {
	commit(types.SET_SEQUENGE_LIST, list)
	if (state.mode === playMode.random) {
		let randomList = shuffle(list)
		commit(types.SET_PLAYLIST, randomList)
		index = findIndex(randomList, list[index])
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit}, {list}) {
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENGE_LIST, list)
	let randomlist = shuffle(list)
	commit(types.SET_PLAYLIST, randomlist)
	commit(types.SET_CURRENT_INDEX, 0)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({commit, state}, song) {
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	// 记录当前歌曲
	let curentSong = playlist[currentIndex]
	// 查找当前列表中是否有待插入歌曲并返回其索引
	let fpIndex = findIndex(playlist, song)
	// 因为插入歌曲索引需要+1
	currentIndex++
	// 插入这首歌曲到当前索引位置
	playlist.splice(currentIndex, 0, song)
	console.log(1111)
	// 如果已经包含了这首歌，就删掉
	if (fpIndex > -1) {
	// 如果当前插入的序号大于列表中的序号
	if (currentIndex > fpIndex) {
		playlist.splice(fpIndex, 1)
		currentIndex--
	} else {
		playlist.splice(fpIndex + 1, 1)
	}
}
	console.log(1111)
	let currentSIndex = findIndex(sequenceList, curentSong) + 1
	let fsIndex = findIndex(sequenceList, song)
	sequenceList.splice(currentSIndex, 0, song)
	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
			// 这里用不到，不需要减减currentIndex--
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}
	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENGE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
	commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function({commit, state}, song) {
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	let pIndex = findIndex(playlist, song)
	playlist.splice(pIndex, 1)
	let sIndex = findIndex(sequenceList, song)
	console.log(sequenceList)
	sequenceList.splice(sIndex, 1)
	if (currentIndex > pIndex || currentIndex === playlist.length) {
		currentIndex--
	}
	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENGE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	if (!playlist.length) {
		commit(types.SET_PLAYING_STATE, false)
	} else {
		commit(types.SET_PLAYING_STATE, true)
	}
}

export const deleteSongList = function({commit}, song) {
	commit(types.SET_PLAYLIST, [])
	commit(types.SET_SEQUENGE_LIST, [])
	commit(types.SET_CURRENT_INDEX, -1)
	commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({commit}, song) {
	commit(types.SET_PALY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}