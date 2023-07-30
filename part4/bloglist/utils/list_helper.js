const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (posts) => {
    likesArr = posts.map(post => post.likes)
    return posts.length === 0
    ? 0
    : likesArr.reduce((a, b) => a + b)
}

const favouriteBlog = (posts) => {
    sortedLikesArr = posts.map(post => post.likes).sort((a, b) => b - a)
    favouritePost = posts.find(post => post.likes === sortedLikesArr[0])
    return posts.length === 0
    ? 0
    : {
        "title": `${favouritePost.title}`,
        "author": `${favouritePost.author}`,
        "likes": favouritePost.likes
    }
}

const mostBlogs = (posts) => {
    authorArr = posts.map(post => post.author)
    uniqueAuthorArr = lodash.uniq(authorArr)
    authorAndNum = uniqueAuthorArr.map(author => {
        // filter based on matches, counting the number of matches
        matchNum = posts.filter(post => post.author === author).length
        return {
            "author": author,
            "blogs": matchNum
        }
    })
    sortedAuthorNum = authorAndNum.map(person => person.blogs).sort((a, b) => b - a)
    mostBlogsAuthor = authorAndNum.find(person => person.blogs === sortedAuthorNum[0])
    return posts.length === 0
    ? 0
    : mostBlogsAuthor
}

const mostLikes = (posts) => {
    authorArr = posts.map(post => post.author)
    uniqueAuthorArr = lodash.uniq(authorArr)
    authorAndLikes = uniqueAuthorArr.map(author => {
        authorBlogs = posts.filter(post => post.author === author)
        authorLikes = authorBlogs.map(authorBlog => authorBlog.likes)
        totalAuthorLikes = authorLikes.reduce((a, b) => a + b)
        return {
            "author": author,
            "likes": totalAuthorLikes
        }
    })
    sortedAuthorLikes = authorAndLikes.map(person => person.likes).sort((a, b) => b - a)
    mostLikesAuthor = authorAndLikes.find(person => person.likes === sortedAuthorLikes[0])
    return posts.length === 0
    ? 0
    : mostLikesAuthor
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }