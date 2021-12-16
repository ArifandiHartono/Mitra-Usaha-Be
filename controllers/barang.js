const tokenGenerator = require('../services/token-generator');
const { barang, kategori } = require('../models');
const config = require('../config');
const { compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');
const {Op} = require("sequelize");

class barangController {
    async create(req, res) {
        try {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            req.body.is_delete = false
          const result = await barang.create(req.body);
          if(req.file != null || req.file != undefined)
          {
            req.body.foto = req.file.filename
          }
          
          result.kode = mm + dd + yyyy + result.id;
          result.save()
          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          console.log(error)
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }
    

      async getAll(req, res) {
        try {
          const result = await barang.findAll({where:{is_delete : false}, raw:true});
          for(let barangdata of result)
          {
            let kategoridata = await kategori.findByPk(barangdata.id_kategori)
            barangdata.kategori = kategoridata.name
          }

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

      async getAllStock(req, res) {
        try {
          const result = await barang.findAll({where:{is_delete : false}
            ,raw:true
        });
        for(let data of result)
        {
            data.selisih = data.stock - data.minimal_stok
        }  
        result.sort((a, b) => parseFloat(b.selisih) - parseFloat(a.selisih));
        
        for(let barangdata of result)
          {
            let kategoridata = await kategori.findByPk(barangdata.id_kategori)
            barangdata.kategori = kategoridata.name
          }

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



      async getByKategori(req, res) {
        try {
          const result = await barang.findAll({where:{is_delete : false, id_kategori:
            {
              [Op.in]: req.body.id_kategori
            }
            }, raw:true});
          for(let barangdata of result)
          {
            let kategoridata = await kategori.findByPk(barangdata.id_kategori)
            barangdata.kategori = kategoridata.name
          }


          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          console.log(error)
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
            erross: error
          });
        }
      }
    

      async getByKategoriSingle(req, res) {
        try {
          const result = await barang.findAll({where:{is_delete : false, id_kategori:req.params.id_kategori}, raw:true});
          for(let barangdata of result)
          {
            let kategoridata = await kategori.findByPk(barangdata.id_kategori)
            barangdata.kategori = kategoridata.name
          }


          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          console.log(error)
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
            erross: error
          });
        }
      }
    




      async getByKode(req, res) {
        
        try {
          console.log("sini ye")
          const result = await barang.findOne({ where: { id: req.params.kode , is_delete:false } });
            let kategoridata = await kategori.findByPk(result.id_kategori)
            result.kategori = kategoridata.name
          

          res.status(200).json({
            status: 'Success getting barang',
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
          const result = await barang.findOne({ where: { id: req.params.id } });
          result.is_delete = true;
          result.save()
          req.body.kode = result.kode
          const updated = await barang.create(req.body);
          res.status(200).json({
            status: 'Success',
            data: updated,
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }
    

      async updateStock(req, res) {
        try {
          const result = await barang.findByPk(req.params.id);
          result.stok = result.stok + req.body.stok
          console.log(result.stock)
          result.save()
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
          await barang.update({is_delete: true},{ where: { id: req.params.id } });
          res.status(200).json({
            status: 'Success',
            message: 'barang deleted',
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
          });
        }
      }

      async search(req, res) {
        try {
          let result = []
          if(req.params.id.length > 0 && req.params.id !=null)
          {
          result = await barang.findAll({ where :{[Op.or]: 
            [
              { kode : 
                {
                 [Op.substring]: req.params.id
                }
              },
              { nama : 
                {
                 [Op.substring]: req.params.id
                }
              }
            ]
            ,
            is_delete:false
          }
        ,raw:true});
        }else
        {
          result = await barang.findAll({ where :{
            is_delete:false
          }
        ,raw:true});
        }

        for(let databarang of result)
        {
          
          let kategoridata = await kategori.findByPk(databarang.id_kategori)
          databarang.kategori = kategoridata.name
            
        }


          res.status(200).json({
            status: 'Success',
            data: result,
          });
        } catch (error) {
          console.log(error)
          res.status(500).json({
            status: 'Error',
            message: 'Request failed',
            erross: error
          });
        }
      }


      async getAllKategori(req, res) {
        try {
          const result = await kategori.findAll({raw:true});
          
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




    }
    
    module.exports = new barangController();