const dummy = (blogs) => {
    if(blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(element => {
        total += element.likes
    });
    return total
}

const favoriteBlogs = (blogs) => {
    let bestBlog
    bestBlog = blogs[0]
    for(i=1; i<blogs.length-1; i++) {
        if(bestBlog.likes < blogs[i].likes) {
            bestBlog = blogs[i]
        }
    }
    const returnBlog = {
        title: bestBlog.title,
        author: bestBlog.author,
        likes: bestBlog.likes
    }
    return returnBlog
}

const mostBlogs = (blogs) => {
    let blogsAmount = 1
    let mostBlogs = blogs[0].author
    let authors = [{0: mostBlogs}]
    for(i=1; i<blogs.length-1; i++) {
        if(blogs[i-1].author !== blogs[i].author) {
            authors.push({i: blogs[i].author})
        } else {
            mostBlogs = blogs[i].author
            blogsAmount++
        }
    }

    const returnAuthor = {
        author: mostBlogs,
        blogs: blogsAmount
    }

    return returnAuthor
}

const mostLikes = (blogs) => {
    let likes = 0
    let author = ''
    let authors = []
    blogs.foreach(element => {
        authors.push({'author': element.author, 'likes': element.likes})
    })
    
}

module.exports = {
    dummy, totalLikes, favoriteBlogs, mostBlogs, mostLikes
}