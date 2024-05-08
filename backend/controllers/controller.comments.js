import fs from "fs"
import path from "path"


async function fileRead(filePath) {
    filePath = path.join(process.cwd(), "database", filePath)
    try {
        return await fs.readFileSync(filePath, "utf8")
    } catch (err) {
        return null
    }
}

async function fileWrite(filePath, data) {
    filePath = path.join(process.cwd(), "database", filePath)
    try {
        fs.writeFileSync(filePath, data)
        return true
    } catch (err) {
        return err
    }
}



export const addComment = async (req, res) => {
    let blogs = await fileRead("blogs.json")
    let users = await fileRead("users.json")
    if (blogs && users)
        try {
            if (req.body[0].blog_id && req.body[0].username && req.body[0].comments) {
                blogs = JSON.parse(blogs)
                let ifBlogExist = false
                for (const blog in blogs)
                    if (blogs[blog].id == req.body[0].blog_id)
                        ifBlogExist = blog

                users = JSON.parse(users)
                let ifUserExist = false
                for (const user in users)
                    if (users[user].username == req.body[0].username)
                        ifUserExist = users[user].id

                if (ifBlogExist && ifUserExist) {
                    blogs[ifBlogExist].comments.push({ user_id: ifUserExist, comments: req.body[0].comments })
                    blogs = JSON.stringify(blogs)
                    await fileWrite("blogs.json", blogs)
                    res.send("SUCCESS comment added")
                }
                else
                    res.status(400).send("User doesn't exists or blog not found.")
            }
        } catch (err) {
            res.status(400).send("Please provide 'blog_id', 'username', 'comments'")
        }
    else
        res.send("Couldn't read data properly.")
}


export const getComment = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        let users = await fileRead("users.json")
        blogs = JSON.parse(blogs)
        users = JSON.parse(users)
        try {
            if(req.body[0].username && req.body[0].blog_id){
                let temp = 0
                let usrId = 0
                let result = []
                let check = false
                for (const blog in blogs)
                    if(blogs[blog].id == req.body[0].blog_id)
                        temp = blogs[blog]

                for (const user in users) 
                    if(users[user].username==req.body[0].username)
                        usrId = users[user].id
                
                for (const usr in temp.comments) {
                    if(temp.comments[usr].user_id == usrId){
                        result.push(temp.comments[usr])
                        check = true
                    }
                }
                if(check)
                    res.send(JSON.stringify(result))
                else
                    res.send("Nothing found")
            }
        } catch (err) {
            res.send("Please provide 'blog_id', 'username'")
        }
    } catch (err) {
        res.send("Couldn't read data from databasefile")
    }
}