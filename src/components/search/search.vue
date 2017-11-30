<template>
  <div class="search">  
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onOueryChange"></search-box>
		</div>
		<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
			<Scroll class="shortcut" ref='shortcut' :data="shortcut" :refreshDelay="refreshDelay">
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li @click="addQuery(item.k)" class="item" v-for="item in hotkey">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
					<div class="search-history" v-show="searchHistory.length">
						<h1 class="title">
							<span class="text">搜索历史</span>
							<span class="clear" @click="showConfirm">
								<i class="icon-clear"></i>
							</span>
						</h1>
						<SearchList @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></SearchList>
					</div>
				</div>
			</Scroll>
			</div>
		<div class="search-result" v-show="query" ref="searchResult">
			<suggest @select="saveSearch" @listSroll="blurInput" ref="suggest" :query="query"></suggest>
		</div>
		<Confirm @confirm="clearSearchHistory"  ref="confirm" text="确定要清空本宝宝吗？" confirmBtnText="清空"></Confirm>
		<router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
	import SearchBox from 'base/search-box/search-box'
	import {getHotkey} from 'api/search'
	import {ERR_OK} from 'api/config'
	import Suggest from 'components/suggest/suggest'
	import {mapActions} from 'vuex'
	import SearchList from 'base/search-list/search-list'
	import Confirm from 'base/confirm/confirm'
	import Scroll from 'base/scroll/scroll'
	import {playlistMixin, searchMixin} from 'common/js/mixin'
	
	export default {
		mixins: [playlistMixin, searchMixin],
		created() {
			this._getHotkey()
		},
		data() {
			return {
				hotkey: [],
				refreshDelay: 200
			}
		},
		computed: {
			shortcut() {
				return this.hotkey.concat(this.searchHistory)
			}
		},
		methods: {
			handlePlaylist(playlist) {
			const bottom = playlist.length > 0 ? '60px' : ''
			this.$refs.shortcutWrapper.style.bottom = bottom
			this.$refs.shortcut.refresh()
			this.$refs.searchResult.style.bottom = bottom
			this.$refs.suggest.refresh()
		},
			_getHotkey() {
				getHotkey().then((res) => {
					if (res.code === ERR_OK) {
						this.hotkey = res.data.hotkey.slice(0, 10)
					}
				})
			},
			showConfirm() {
				this.$refs.confirm.show()
			},
			...mapActions([
				'clearSearchHistory'
			])
		},
		watch: {
			query(newQuery) {
				if (!newQuery) {
					setTimeout(() => {
						this.$refs.shortcut.refresh()
					}, 20)
				}
			}
		},
		components: {
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>