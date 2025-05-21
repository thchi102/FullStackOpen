const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        return favorite.likes > blog.likes ? favorite : blog
    }
    
    return blogs.length === 0 ? null :blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    const counts = lodash.countBy(blogs, 'author')
    let max = 0
    let author = ''
    for(const [key, value] of Object.entries(counts)) {
        if(value > max) {
            max = value
            author = key
        }
    }

    return lodash.isEmpty(counts) ? null : 
    {
        author: author,
        blogs: max
    }
}

const mostLikes = (blogs) => {
    const mostLiked = lodash.groupBy(blogs, 'author')
    let max = 0
    let author = ''
    for(const [key, value] of Object.entries(mostLiked)) {
        const totalLikes = lodash.sumBy(value, 'likes')
        if(totalLikes > max) {
            max = totalLikes
            author = key
        }
    }

    return lodash.isEmpty(mostLiked) ? null : {
        author: author,
        likes: max
    }
}


  
module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}