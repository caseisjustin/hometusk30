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

export const registrUser = async (req, res) => {
    let users = await fileRead("users.json")
    if(!users)
        res.status(200).send("ok")
    else{
        users = await JSON.parse(users)
        const {email} = req.body
        let check = false
        users.forEach(user => {
            if(user.email == email){
                check = true
            }
        });
        if(check)
            res.status(400).send(`this user with email ${email} already exists`)
        else{
            users.push({id: users[users.length - 1].id + 1, ...req.body})
            users = fileWrite("users.json", JSON.stringify(users))
            if(!users)
                res.send("Couldn't write data to file")
            else
                res.status(201).send("Registered successfuly")
        }
    }
}

export const loginUser = async (req, res)=>{
    let users = await fileRead("users.json")
    try{
        const {email, username, password} = req.body
        if(email.length < 3 || username.length < 3){
            res.send("Not enough charachter in username or email need more than 3")
        }
        else
            if(!users)
                res.send("Error reading userdata")
            else{
                users = await JSON.parse(users)
                let check = false
                users.forEach(user => {
                    if((user.email == email || user.username == username) && user.password == password){
                        check = true
                        res.send(`Welcome ${user.username}`)
                    }
                    else if((user.email == email || user.username == username) && user.password != password){
                        check = true
                        res.status(400).send("Incorrect password")
                    }
                });
                if(!check)
                    res.send(`No such user\nPlease register first`)
            }
    }catch(err){
        res.status(400).send("No data provided")
    }
}