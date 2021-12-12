const tokenGenerator = require('../services/token-generator');
const { transaksi , item_transaksi , barang , kategori } = require('../models');
const config = require('../config');
const { compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');
const { Op } =  require('sequelize')

class transaksiController {
    async create(req, res) {
        try {
          var today = new Date();
          req.body.tanggal = today
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          const result = await transaksi.create(req.body);
          result.invoice ="INV" + mm + dd + yyyy + result.id;
          result.save()

          let data = req.body.item;

          for(let items of data)
          {
            let barangdata = await barang.findOne({where:{kode : items.kode, is_delete : false}})
            let kategoridata = await kategori.findByPk(barangdata.id_kategori)
            items.nama = barangdata.nama
            items.kategori = kategoridata.name 
            items.id_barang = barangdata.id;
            items.id_transaksi = result.id;
            await item_transaksi.create(items)
          }
          res.status(200).json({
            status: 'Success',
            transaksi: result,
            item: data
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
          var start = new Date(req.params.tanggal);
          start.setUTCHours(0,0,0,0);

          var end = new Date(req.params.tanggal);
          end.setUTCHours(23,59,59,999);
          const result = await transaksi.findAll({where:{
            tanggal:{
              [Op.lte]: end,
              [Op.gte]: start
          }            
          }});
          
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

      async getAllHistoristock(req, res) {
        try {
          var start = new Date(req.params.tanggal);
          start.setUTCHours(0,0,0,0);

          var end = new Date(req.params.tanggal);
          end.setUTCHours(23,59,59,999);
            const result = await transaksi.findAll({where:{
              tanggal:{
                [Op.lte]: end,
                [Op.gte]: start
            }            
          }
          ,
          attributes: ['id']
        });
        let idarray = []
        for(let iddata of result)
        {
          idarray.push(iddata.id)
        }

        console.log(idarray)

        let itemtoday = await item_transaksi.findAll({where: 
        {
          id_transaksi: idarray
        }
        ,group: ['id_barang']
        ,raw:true
      })
        for(let databarang of itemtoday)
        {
          let barangdata = await barang.findByPk(databarang.id_barang)
          for(var k in barangdata.dataValues) databarang[k]=barangdata[k];
          let itemtocount = await item_transaksi.findAll({where: 
            {
              id_transaksi: result
              ,id_barang:barangdata
            }
            ,raw:true
          })  
          let jumlah = 0 
          let totalharga = 0
          for(let datahitung of itemtocount)
          {
            jumlah = jumlah + datahitung.jumlah
            totalharga = totalharga + datahitung.totalharga
          }
          databarang.jumlah = jumlah
          databarang.total_harga = totalharga
          let kategoridata = await kategori.findByPk(databarang.id_kategori)
          barangdata.kategori = kategoridata.name
          

        }

          res.status(200).json({
            status: 'Success',
            data: itemtoday,
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



      async getPendapatan(req, res) {
        try {
          var start = new Date(req.params.tanggal);
          start.setUTCHours(0,0,0,0);

          var end = new Date(req.params.tanggal);
          end.setUTCHours(23,59,59,999);
          const result = await transaksi.findAll({where:{
            tanggal:{
              [Op.lte]: end,
              [Op.gte]: start
          }            
          }
          ,
        });
        let totalpendapatan = 0
        for(let data of result){
          totalpendapatan = totalpendapatan + data.total
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
      

      async getById(req, res) {
        try {
          const result = await transaksi.findOne({ where :{ id : req.params.id}
        });

        let itemtoday = await item_transaksi.findAll({where: 
          {
            id_transaksi: result.id
          }
          ,raw:true
        })

        for(let databarang of itemtoday)
        {
          let barangdata = await barang.findByPk(databarang.id_barang)
          for(var k in barangdata.dataValues) databarang[k]=barangdata[k];

          let kategoridata = await kategori.findByPk(barangdata.id_kategori)
          databarang.kategori = kategoridata.name

            
        }


          res.status(200).json({
            status: 'Success',
            data: result,
            item: itemtoday
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

    }
    
    module.exports = new transaksiController();