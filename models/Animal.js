const db = require('/MyDatabase');
const db = require("express");
const res = require("express/lib/response");
const console = require("node:console");
const res = require("express/lib/response");
const req = require("express/lib/request");
const db = require("express");
const res = require("express/lib/response");
const res = require("express/lib/response");
const console = require("node:console");
const res = require("express/lib/response");


const Animal = {


    getAnimals: async () => {
        const [animals] = await db.query('SELECT * FROM animals');
        return animals;

    },
    getAnimalById: async (id) => {
        const [animal] = await db.query('SELECT * FROM animals WHERE id = ?', [id]);
        return animal;
    }
}