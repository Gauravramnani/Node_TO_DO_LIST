import { Task } from "../models/task.js"

export const newTask = async (req, res) => {

    const { title, description } = req.body

    const task = await Task.create({
        title,
        description,
        user: req.user
    })

    res.status(201).json({
        success: true,
        message: "tast register successfully"
    })

}

export const getMyTask = async (req, res) => {


    const userId = req.user._id

    const tasks = await Task.findOne({user: userId})


    res.status(200).json({
        success : true,
        tasks
    })

}

export const updateTask = async(req,res,next) => {


    const {id} = req.params;

    const task = await Task.findById(id);


    if(!task){
        return next(new Error("Invalid"))
    }



    task.isCompleted = !task.isCompleted;

    await task.save()

    res.json({
        success : true,
        message : "task updated"

    })

}

export const deleteTask = async(req,res,next) => {

    const {id} = req.params;

    const task = await Task.findById(id)

    if(!task){
        return next(new Error("Task not Found"));
    }


    await task.deleteOne()
    
    res.json({
        success : true,
        message : "task deleted"     
    })
}