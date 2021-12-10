const tokenGenerator = require('../services/token-generator');
const { Admin } = require('../models');
const config = require('../config');
const { compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');

class AdminController {
    async create(req, res) {
        try {
          req.body.password =  await bcrypt.hash(req.body.password, config.app.password_salt);
          const result = await Admin.create(req.body);
          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }
    

      async login(user, req, res) {

        try {
            console.log("sini kah")
            let token = tokenGenerator(user.dataValues.id, config.jwt.secretKey, config.jwt.expiresIn);
            let userata = await Admin.findByPk(user.dataValues.id)
            let role = "kasir"
            if(userata.username.toLowerCase().includes("admin"))
            {
              role = "admin"
            }

            console.log(token)
            if (user == null)
                throw new Error("Failed Data Credential")
            let result = {
                status: "success",
                message: "Success Login",
                token,
            }
            res.status(200).json(result)
        } catch (e) {
            let result = {
                status: "failed",
                message: e.message
            }
            res.status(422).json(result);
        }

    }


      async getAll(req, res) {
        try {
          const result = await Admin.findAll();
          
          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
            erross: error
          });
        }
      }
    
      async getById(req, res) {
        try {
          const result = await Admin.findAll({ where: { id: req.params.id } });
          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }
    
      async update(req, res) {
        try {
          await Admin.update(req.body, { where: { id: req.params.id } });
          const result = await Admin.findOne({ where: { id: req.params.id } });
          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }
    
      async delete(req, res) {
        try {
          await Admin.destroy({ where: { id: req.params.id } });
          res.status(200).json({
            status: 'Success',
            message: 'Admin deleted',
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }
    }
    
    module.exports = new AdminController();