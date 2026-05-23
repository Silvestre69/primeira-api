import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

//requisição
//resposta
app.get('/usuarios', async (req, res) =>{
    const users = await prisma.user.findMany()

    res.status(200).json(users)

})

app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: parseInt(req.body.age) 
            }
        })
        res.status(201).json(user)
    } catch (error) {
        // Isso vai printar o erro real no terminal do seu VS Code (Back-end)
        console.error("Erro detalhado do Prisma:", error)
        res.status(400).json({ error: "Não foi possível criar o usuário no banco." })
    }
})

app.put('/usuarios/:id', async (req,res) => {
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json(user)

})

app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id,  
        },
    })
    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.listen(3000)
