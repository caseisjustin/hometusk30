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


export const getUserProfile = async (req, res) => {
    try {
        let userProf = await fileRead("users.json")
        userProf = await JSON.parse(userProf)
        const { email, username } = req.body
        let check = true
        if (username) {
            userProf.forEach(user => {
                if (user.username == username) {
                    check = false
                    res.send(`username: ${user.username}\nfullname: ${user.fullname},\nage: ${user.age},\nemail: ${user.email},\ngender: ${user.gender}`)
                }
            });
        }
        else if (email) {
            userProf.forEach(user => {
                if (user.email == email) {
                    check = false
                    res.send(`username: ${user.username}\nfullname: ${user.fullname},\nage: ${user.age},\nemail: ${user.email},\ngender: ${user.gender}`)
                }
            });
        }
        if (check) {
            res.send("No such user")
        }
    } catch (err) {
        res.send("An error occured")
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        let users = await fileRead("users.json")
        users = await JSON.parse(users)
        const { email, username, fullname, age, gender } = req.body
        let checker = false
        if (email) {
            for (const i in users) {
                if (users[i].email == email) {
                    checker = true
                    users[i].email = email || users[i].email
                    users[i].username = username || users[i].username
                    users[i].fullname = fullname || users[i].fullname
                    users[i].age = age || users[i].age
                    users[i].gender = gender || users[i].gender
                }
            }
        }
        else if (username) {
            for (const i in users) {
                if (users[i].username == username) {
                    checker = true
                    users[i].email = email || users[i].email
                    users[i].username = username || users[i].username
                    users[i].fullname = fullname || users[i].fullname
                    users[i].age = age || users[i].age
                    users[i].gender = gender || users[i].gender
                }
            }
        }
        users = JSON.stringify(users)
        if (checker) {
            let ch = await fileWrite("users.json", users)
            if (!ch) {
                res.send("Error writing dataprofile")
            }
            else
                res.send("Updated")
        } else
            res.status(400).send("No such user")
    } catch (err) {
        res.send("An error occured")
    }
}

export const deleteUserProfile = async (req, res) => {
    try {
        let users = await fileRead("users.json")
        users = await JSON.parse(users)
        const { email, username } = req.body
        let checker = false
        if (email) {
            for (const i in users) {
                if (users[i].email == email) {
                    checker = true
                    users.splice(i, 1)
                }
            }
        }
        else if (username) {
            for (const i in users) {
                if (users[i].username == username) {
                    checker = true
                    users.splice(i, 1)
                }
            }
        }
        if (checker) {
            users = JSON.stringify(users)
            let ch = await fileWrite("users.json", users)
            if (!ch) {
                res.send("Error writing dataprofile")
            }
            else
                res.send("DELETED")
        } else
            res.status(400).send("No such user")

    }
    catch (err) {
        res.send("Unexpected error occured")
    }
}