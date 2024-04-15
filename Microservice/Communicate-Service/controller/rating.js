const ProductRating = require('../models/rating');
const axios = require('axios');
const KafkaProducerService  = require('../kafka/KafkaProducerService')


// Controller để thêm đánh giá sản phẩm
exports.addProductRating = async (req, res) => {
    try {
        const { product_id, user_id, rating, comment } = req.body;

        // Kiểm tra xem đánh giá đã tồn tại chưa
        const existingRating = await ProductRating.findOne({ product_id, user_id });
        if (existingRating) {
            return res.status(400).json({ message: 'Đánh giá đã tồn tại' });
        }

        // Tạo một đối tượng mới của đánh giá sản phẩm
        const newRating = new ProductRating({
            product_id,
            user_id,
            rating,
            comment
        });

        // Lưu đánh giá vào cơ sở dữ liệu
        await newRating.save();

        let dataupdate = product_id +  "-" + rating;

        const producerService = new KafkaProducerService();
                producerService.connectProducer()
                .then(() => {
                    // Gửi message tới topic 'payment-topic'
                    const topic = 'rating_add_topic';
                    const message = 'Hello Kafka!';
                    producerService.sendMessage(topic, dataupdate);
                })
                .catch(error => {
                    console.error('Error connecting to Kafka:', error);
                });

        res.status(201).json({ message: 'Đánh giá đã được thêm thành công' });
    } catch (error) {
        console.error('Lỗi khi thêm đánh giá sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm đánh giá sản phẩm' });
    }
};

// Controller để xóa đánh giá sản phẩm
exports.deleteProductRating = async (req, res) => {
    try {
        const { product_id, user_id } = req.params;

        // Tìm và xóa đánh giá dựa trên product_id và user_id
        await ProductRating.findOneAndDelete({ product_id, user_id });

        let dataupdate = product_id +  "-" + 2;

        const producerService = new KafkaProducerService();
                producerService.connectProducer()
                .then(() => {
                    // Gửi message tới topic 'payment-topic'
                    const topic = 'rating_sub_topic';
                    producerService.sendMessage(topic, dataupdate);
                })
                .catch(error => {
                    console.error('Error connecting to Kafka:', error);
                });

        res.status(200).json({ message: 'Đánh giá đã được xóa thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa đánh giá sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đánh giá sản phẩm' });
    }
};  

// Hàm để lấy thông tin người dùng từ API với token
async function getUser(userId, token) {
    try {
        // Gọi API để lấy thông tin người dùng với token được truyền vào
        const response = await axios.get(`http://localhost:8222/api/v1/users/get-id?iduser=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Truyền token vào tiêu đề Authorization
            }
        });
        return response.data; // Trả về dữ liệu của người dùng
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        throw error; // Ném lại lỗi để xử lý ở phía gọi hàm
    }
}

// Hàm để lấy danh sách đánh giá bằng product_id và token được trích xuất từ header
exports.getListRatingByProductId = async (req, res) => {
    try {
        // Trích xuất token từ header của request
        const token = req.headers.authorization.split(' ')[1];

        // Lấy product_id từ query params
        const product_id = req.query.product_id;

        // Kiểm tra xem product_id có tồn tại hay không
        if (!product_id) {
            return res.status(400).json({ message: 'Vui lòng cung cấp product_id' });
        }

        // Sử dụng phương thức find của model ProductRating để tìm các đánh giá có product_id nhất định
        const ratings = await ProductRating.find({ product_id });

        // Gọi API để lấy thông tin người dùng cho từng đánh giá
        const promises = ratings.map(rating => getUser(rating.user_id, token));

        // Đợi tất cả các yêu cầu hoàn thành bằng cách sử dụng axios.all
        const users = await axios.all(promises);

        // Kết hợp thông tin người dùng với mỗi đánh giá
        const ratingWithUser = ratings.map((rating, index) => ({
            ...rating.toObject(),
            user: users[index]
        }));

        res.status(200).json(ratingWithUser);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đánh giá theo product_id:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách đánh giá' });
    }
}