const router = require('express').Router()

const Person = require('../modules/Person')
//create
router.post('/',async (req,res)=>{
    const {name,salary,approved} = req.body
    if(!name){
        res.status(422).json({error:'o nome é obrigatório!'})
        return
    }
    const person = {
        name,
        salary,
        approved
    }
    //create 
    try{
        await Person.create(person)

        res.status(201).json({message:"pessoa inserida com sucesso!"})
    }catch(error){
        res.status(500).json({error:error})
    }
})
//read 


//resgata todos
router.get('/',async (req,res)=>{
    try{
        const people = await Person.find()

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error:error})
    }
})
//resgata um
router.get('/:id', async(req,res)=>{
    //extrair dado 
    const id = req.params.id;

    try{
    
        const person = await Person.findOne({_id:id});
        if(!person){
            res.status(422).json({message:"o usuário não foi encontrado!"});
            return
        }
        res.status(200).json(person);
    }catch(error){
        res.status(500).json({error:error})
    }
})


//update - atualização de dados(put, patch)


router.patch('/:id', async(req,res)=>{

    const id = req.params.id;
    const {name,salary,approved} = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatePerson = await Person.updateOne({_id:id},person)


        if(updatePerson.matchedCount===0){
            res.status(422).json({message:"o usuário não foi encontrado!"});
            return
        }

        res.status(200).json(person)


    }catch(error){
        res.status(500).json({error:error})
    }


})

//delete
router.delete('/:id', async(req, res)=>{
    const id = req.params.id;

    const person = await Person.findOne({_id:id})

    if(!person){
        res.status(422).json({message:"O usuário não foi encontrado!"})
        return 
    }

try{

    await Person.deleteOne({_id:id});
    res.status(200).json({message:"usuário removido!"})

}catch(error){
    res.status(500).json({error:error})
}

})


module.exports = router