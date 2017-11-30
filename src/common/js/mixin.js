import {mapGetters, mapMutations, mapActions} from 'vuex'
import {shuffle} from 'common/js/util'
import {playMode} from 'common/js/config'

export const playlistMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	mounted() {
		this.handlePlaylist(this.playlist)
	},
	activated() {
		this.handlePlaylist(this.playlist)
	},
	watch: {
		playlist (newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		handlePlaylist () {
			throw new Error('component must implement handlePlayList method')
		}
	}
}

export const playerMixin = {
	computed: {
		iconMode() {
			return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
			'sequenceList',
			'playlist',
			'currentSong',
			'mode',
			'favoriteList',
			'favoriteList'
		])
	},
	methods: {
		changeMode() {
				const mode = (this.mode + 1) % 3
				this.setPlayMode(mode)
				let list = null
				if (mode === playMode.random) {
					list = shuffle(this.sequenceList)
				} else {
					list = this.sequenceList
				}
				this.resetCurrentIndex(list)
				this.setPlaylist(list)
			},
		resetCurrentIndex(list) {
				let index = list.findIndex((item) => {
					return item.id === this.currentSong.id
				})
				this.setCurrentIndex(index)
			},
		toggleFavorite(currentSong) {
			if (this.isFavorite(currentSong)) {
				this.deleteFavoriteList(currentSong)
			} else {
				this.saveFavoriteList(currentSong)
			}
		},
		getFavoriteIcon(currentSong) {
				if (this.isFavorite(currentSong)) {
					return 'icon-favorite'
				} else {
					return 'icon-not-favorite'
				}
		},
		isFavorite(song) {
			const index = this.favoriteList.findIndex((item) => {
				return song.id === item.id
			})
			return index > -1
		},
		...mapActions([
			'saveFavoriteList',
			'saveFavoriteList',
			'deleteFavoriteList'
		]),
		...mapMutations({
			setFullScreen: 'SET_FULL_SCREEN',
			setPlaying: 'SET_PLAYING_STATE',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayMode: 'SET_PLAY_MODE',
			setPlaylist: 'SET_PLAYLIST'
		})
}
}

export const searchMixin = {
	data() {
			return {
				query: '',
				refreshDelay: 120
			}
		},
	computed: {
		...mapGetters(['searchHistory'])
	},
	methods: {
			blurInput() {
				this.$refs.searchBox.blur()
			},
			saveSearch() {
				this.saveSearchHistory(this.query)
			},
			onOueryChange(query) {
				this.query = query
			},
			addQuery(query) {
				this.$refs.searchBox.setQuery(query)
			},
			...mapActions([
				'saveSearchHistory',
				'deleteSearchHistory'
			])
	}
}
