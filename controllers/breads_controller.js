const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js'); // Assuming Bread model is imported
const Baker = require('../models/baker.js'); // Assuming Baker model is imported

// NEW
breads.get('/new', (req, res, next) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            });
        })
        .catch(next); // Error handling middleware
});

// INDEX
breads.get('/', (req, res, next) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            });
        })
        .catch(next); // Error handling middleware
});

// SHOW
breads.get('/:id', (req, res, next) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
            if (!foundBread) {
                const error = new Error('Bread not found');
                error.status = 404;
                throw error;
            }
            const bakedBy = foundBread.getBakedBy(); // Assuming this method is defined in the Bread model
            console.log(bakedBy);
            res.render('show', {
                bread: foundBread
            });
        })
        .catch(next); // Error handling middleware
});

// CREATE
breads.post('/', (req, res, next) => {
    if (!req.body.image) {
        req.body.image = undefined;
    }
    req.body.hasGluten = req.body.hasGluten === 'on'; // Simplified conditional assignment
    Bread.create(req.body)
        .then(() => {
            res.redirect('/breads');
        })
        .catch(next); // Error handling middleware
});

// UPDATE
breads.put('/:id', (req, res, next) => {
    req.body.hasGluten = req.body.hasGluten === 'on';
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBread => {
            if (!updatedBread) {
                const error = new Error('Bread not found');
                error.status = 404;
                throw error;
            }
            console.log(updatedBread);
            res.redirect(`/breads/${req.params.id}`);
        })
        .catch(next); // Error handling middleware
});

// EDIT
breads.get('/:id/edit', (req, res, next) => {
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.id)
                .then(foundBread => {
                    if (!foundBread) {
                        const error = new Error('Bread not found');
                        error.status = 404;
                        throw error;
                    }
                    res.render('edit', {
                        bread: foundBread,
                        bakers: foundBakers
                    });
                });
        })
        .catch(next); // Error handling middleware
});

// DELETE
breads.delete('/:id', (req, res, next) => {
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            if (!deletedBread) {
                const error = new Error('Bread not found');
                error.status = 404;
                throw error;
            }
            res.status(303).redirect('/breads');
        })
        .catch(next); // Error handling middleware
});

module.exports = breads;



  
