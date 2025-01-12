const vet = require("../models/Vet")
const appointment = require("../models/Appointment")
const e = require("express");

const vetController = {
    getAllVets: async (req, res) => {
        const vets = await vet.getVets();
        if (!vets) {
          return res.status(404).json({message:"No vets found"});
        }
       return res.status(200).json(vets);
    },

    getVetAppointments: async (req, res) => {
        const {id} = req.params;
        const appointments = await  appointment.getAppointmentByVetId(id);
        if (appointments) {
           return  res.status(200).json(appointments);
        }
       return  res.status(400).json({message:"No appointments found"});
    },

    updateApp: async (req, res) => {
        const { id, status } = req.params;
        const updatedApp = appointment.updateAppointmentStatusById(id, status);
        if (updatedApp){
            if (status === "scheduled"){
                return  res.status(200).json({message : " updated status to scheduled"});
            } else if (status === "rejected"){
              return res.status(200).json({message : " updated status to rejected"});
            }
        }
        res.status(200).json({message : `Updated app successfully.`});
    },

    changeDateApp: async (req, res) => {
        const { id, newDate } = req.params;
        console.log(id, newDate)
        const changedDateApp = appointment.changeDate(id, newDate);
        if (changedDateApp){
           return  res.status(200).json({message : " changed date app successfully"});
        }
        return res.status(400).json({message : `Changed date app unsuccessfully.`});
    },

    getArticlesByVetId: async (req, res) => {
        const { id } = req.params;
        console.log(id)

        if (vet.getVetInfo(id).length <= 0){
            return res.status(404).json({message : `Vet with given id doesn't exist`});
        }

        const articles = await vet.getVetArticles(id);
        console.log(articles)
        if (articles.length > 0){
            return res.status(200).json(articles);
        } else {
            return res.status(404).json({message: 'No articles found.'});
        }
    },

    changeArticle: async (req, res) => {
        const { id } = req.params;
        const {title, content} = req.body;
        console.log(id, title, content)

        const changedArt = await vet.changeArticle(id, title, content);
        console.log(changedArt);
        if (changedArt){
            return res.status(200).json({message : `Article has been changed successfully.`});
        }
        return res.status(400).json({message : `Article hasn't been changed successfully.`});
    },

    addArticle: async (req, res) => {
        const { title, content, authorId, date } = req.body;
        // console.log(date, title, content, authorId);
        const addedArticle = await vet.addArticle(authorId,title, content,date);
        // console.log(addedArticle);
        if (addedArticle){
            return res.status(201).json({message : `Article has been added successfully.`});
        }
        return res.status(400).json({message: "Article hasn't been added successfully"})
    },

    deleteArticle: async (req, res) => {
        const { articleId } = req.params;
        console.log(articleId)
        const deletedArticle = await vet.deleteArticle(articleId);
        if (deletedArticle){
            return res.status(200).json({message: "Article has been deleted"})
        }
        return res.status(400).json({message: "Article hasn't been deleted"})
    },

    updateAppStatus: async (req, res) => {
        const {date} = req.params;
        console.log(date)
        const updatedStatus = await appointment.updateStatus(date);

        if (updatedStatus){
            return res.status(200).json({message : `Updated status successfully.`});
        }
        return res.status(400).json({message: 'Unsuccessful update'})
    }



}
module.exports = vetController;