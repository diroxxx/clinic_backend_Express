const vet = require("../models/Vet")
const appointment = require("../models/Appointment")
const e = require("express");

const vetController = {
    getAllVets: async (req, res) => {
        const vets = await vet.getVets();
        // console.log(vets)
        res.status(200).json(vets);
    },

    getVetAppointments: async (req, res) => {
        const {id} = req.params;
        const appointments = await  appointment.getAppointmentByVetId(id);
        res.status(200).json(appointments);

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
        return res.status(200).json({message : `Changed date app unsuccessfully.`});
    },

    getArticlesByVetId: async (req, res) => {
        const { id } = req.params;
        console.log(id)

        if (vet.getVetInfo(id).length <= 0){
            return res.status(200).json({message : `Vet with given id doesn't exist`});
        }

        const articles = await vet.getVetArticles(id);
        console.log(articles)
        if (articles.length > 0){
            return res.status(200).json(articles);
        } else {
            return res.status(404).json({message: 'No articles found.'});
        }
    }

}
module.exports = vetController;