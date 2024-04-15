const express = require('express');
const router = express.Router();
const productRatingController = require('../controller/rating');

// Route để thêm đánh giá sản phẩm
router.post('/product-rating/add', productRatingController.addProductRating);
router.get('/product-rating/get', productRatingController.getListRatingByProductId);

// Route để xóa đánh giá sản phẩm
router.delete('/product-rating/:product_id/:user_id/delete', productRatingController.deleteProductRating);

module.exports = router;
