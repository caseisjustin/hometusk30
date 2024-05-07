import fs from "fs"
import path from "path"


async function fileRead(filePath){
    filePath = path.join(process.cwd(), "database", filePath)
    try{
        return await fs.readFileSync(filePath, "utf8")
    }catch(err){
        return null
    }
}

function fileWrite(filePath, data){
    filePath = path.join(process.cwd(), "database", filePath)
    try{
        fs.writeFileSync(filePath, data)
        return true
    }catch(err){
        return false
    }
    
}

export const createBlog = async (req, res) => {
    let blogs = await fileRead("blogs.json")
    if(!blogs)
        res.status(200).send("ok")
    else{
        blogs = await JSON.parse(blogs)
        blogs.push({id: blogs[blogs.length - 1].id + 1, ...req.body})
        blogs = fileWrite("blogs.json", JSON.stringify(blogs))
        if(!blogs)
            res.send("Couldn't write data to file")
        else
            res.status(201).send("Registered successfuly")
    }
}

export const getBlog = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        blogs = await JSON.parse(blogs)
        blogs.forEach(blog => {
        res.send(`id: ${blog.id}\ntitle: ${blog.title}\nslug: ${blog.slug},\ncontent: ${blog.content},\ntags: ${blog.tags},\ncomments: ${blog.comments}\n\n`)
            
        });
    } catch (err) {
        res.send("An error occured")
    }
}

export const updateBlog = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        blogs = await JSON.parse(blogs)
        const {id, title, slug, content, tags, comments} = req.body
        let checker = false
        if (req.body.id) {
            for (const i in blogs) {
                if (blogs[i].id == req.body.id) {
                    checker = true
                    blogs[i].title = title || blogs[i].title
                    blogs[i].slug = slug || blogs[i].slug
                    blogs[i].content = content || blogs[i].content
                    blogs[i].tags = tags || blogs[i].tags
                    blogs[i].comments = comments || blogs[i].comments
                }
            }
        }
        blogs = JSON.stringify(blogs)
        if (checker) {
            let ch = await fileWrite("blogs.json", blogs)
            if (!ch) 
                res.send("Error writing blog")
            else
                res.send("UPDATED")
        } else
            res.status(400).send("No such blogs")
    } catch (err) {
        res.send("An error occured")
    }
}

export const deleteBlog = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        blogs = await JSON.parse(blogs)
        const { id } = req.body
        let checker = false
        if (id) {
            for (const i in blogs) {
                if (blogs[i].id == id) {
                    checker = true
                    blogs.splice(i, 1)
                }
            }
        }
        else if (id) {
            for (const i in blogs) {
                if (blogs[i].id == id) {
                    checker = true
                    blogs.splice(i, 1)
                }
            }
        }
        if (checker) {
            blogs = JSON.stringify(blogs)
            let ch = await fileWrite("blogs.json", blogs)
            if (!ch) {
                res.send("Error writing blogData")
            }
            else
                res.send("DELETED")
        } else
            res.status(400).send("No such blogs")

    }
    catch (err) {
        res.send("Unexpected error occured")
    }
}