const fs = require('fs');
const path = require('path');


exports.getHomePage = (req, res) => {
    let status = req.query.status || '';
    let search = req.query.search || ''; 
    
  
    let query = "SELECT * FROM products ORDER BY id DESC";
    

    if (search !== '') {
        query = `SELECT * FROM products WHERE name LIKE '%${search}%' ORDER BY id DESC`;
    }

    db.execute(query, (err, result) => {
        if (err) return res.status(500).send(err);
        
        res.render('index.ejs', {
            title: "Supermarket Inventory",
            products: result, 
            status: status   
        });
    });
};


exports.addProductPage = (req, res) => {
    res.render('add-product.ejs', {
        title: 'Supermarket | Add New Product',
        message: ''
    });
};


exports.addProduct = (req, res) => {
    let { name, category, price, stock } = req.body;
    
    if (!req.file) {
        return res.render('add-product.ejs', {
            title: 'Supermarket | Add New Product',
            message: 'Please upload a product image.'
        });
    }

    let imageName = req.file.filename; 

    let query = "INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)";
    db.execute(query, [name, category, price, stock, imageName], (err, result) => {
        if (err) {
            return res.status(500).send("Insert Error: " + err.message);
        }
        res.redirect('/?status=added');
    });
};


exports.editProductPage = (req, res) => {
    let productId = req.params.id;
    let query = "SELECT * FROM products WHERE id = ?";
    
    db.execute(query, [productId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.redirect('/');
        
        res.render('edit-product.ejs', {
            title: 'Supermarket | Edit Product',
            product: result[0],
            message: ''
        });
    });
};


exports.editProduct = (req, res) => {
    let productId = req.params.id;
    let { name, category, price, stock, old_image } = req.body;
    let image = old_image; 

    if (req.file) {
        image = req.file.filename;
      
        if (old_image) {
            let oldImagePath = path.join(__dirname, '../public/uploads/', old_image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); 
            }
        }
    }

    let query = "UPDATE products SET name = ?, category = ?, price = ?, stock = ?, image = ? WHERE id = ?";
    db.execute(query, [name, category, price, stock, image, productId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/?status=updated'); // แก้ไขเสร็จแล้วเด้งไปหน้าแรก
    });
};


exports.deleteProduct = (req, res) => {
    let productId = req.params.id;
    
    
    let getImageQuery = 'SELECT image FROM products WHERE id = ?';
    db.execute(getImageQuery, [productId], (err, result) => {
        if (err) return res.status(500).send(err);
        
        if (result.length > 0) {
            let imageName = result[0].image;
            if (imageName) {
                let imagePath = path.join(__dirname, '../public/uploads/', imageName);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }

        let deleteQuery = 'DELETE FROM products WHERE id = ?';
        db.execute(deleteQuery, [productId], (err, result) => {
            if (err) return res.status(500).send(err);
            res.redirect('/?status=deleted'); 
        });
    });
};