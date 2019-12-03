import util from './util.js'

//获取排名分类
export const getRankCategory = () => {
	return util.get('/ranking/gender')
}

//获取带书籍数量的父分类
export const getCategories = () => {
	return util.get('/cats/lv2/statistics')
}


//获取带子分类的分类
export function  getSubCategory(){
	return util.get('/cats/lv2')
}

//获取分类详情
export function getCategoryInfo(category_type){
	return util.get('/book/by-categories', category_type)
}

//获取排名详情
export function getRank(categoryid){
	return util.get('/ranking/'+categoryid)
}

//获取搜索结果
export const getSearchResult = (word) =>{
	return util.get('/book/fuzzy-search', word)
}

//获取热搜词
export function getSearchHotwords(){
	return util.get('/book/search-hotwords')
}

//获取作者名下的书籍
export function getAuthorBook(author){
	return util.get('/author-books', author)
}

//获取书籍相关推荐
export function  getRecommend(id){
	return util.get(`/book/${id}/recommend`)
}

//获取书籍详情
export function getBookInfo(id){
	return util.get('/book/'+id)
}

//获取书籍源
export function getBookSources(bookid){
	return util.get('/atoc', bookid)
}

//获取书籍章节
export function  getChapter(id){
	return util.get(`/atoc/${id}?view=chapters`)
}

//获取章节详细内容
export const getBookChapter = (link) => {
	return util.get('/content/chapter/'+link)
}