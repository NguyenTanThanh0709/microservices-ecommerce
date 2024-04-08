
export const orderContant = {
  delivery: {
    fast: 'FAST',
    gojek: 'GO_JEK'
  },
  payment: {
    later_money: 'Thanh toán tiền mặt khi nhận hàng',
    paypal: 'Thanh toán bằng paypal'
  }
}

export interface BrandData {
  name: string;
  slug: string;
  urlBrand: string;
}

export interface OrderRequest{
  phoneNumber: string;
  address: string;
  statusDelivery: string;
  statusOrder: string;
  productIdsQuantitys: { [productId: string]: number };
  productIdsPrices: { [productId: string]: number };
  productIdsNotes: { [productId: string]: string };
}

export interface PromotionReponse {
  id: number;
  discountCode: {
      id: number;
      name: string;
      description: string;
      code: string;
      isActive: boolean;
      startDate: string;
      endDate: string;
      discountValue: number;
      idUser: number;
  };
  idProduct: number;
}

export interface Product {
  name: string;
  shortDescription: string;
  description: string;
  idBrand: number;
  category: string;
  price: number;
  stockQuantity: number;
  productSize: {
    size: string;
    quantity: number;
  }[];
  phoneOwner: number;
  isPublished: boolean;
  isFeatured: boolean;
  sold: number;
  view: number;
  cannangdonggoi: number;
  thetich_dai: number;
  thetich_rong: number;
  thetich_cao: number;
  video: File | null;
  imgs: File[] | null;
  urlVideo: string;
  imgsurl : String[];
  colors : String;
}

export interface thongtinvanchuyen {
  cannangdonggoi:number,
  thetich_dai:number,
  thetich_rong:number,
  thetich_cao:number,

}
export interface BrandReponse {
  id: number;
  name: string;
  slug: string;
  urlBrand: string;
}
export interface ThongtinCoBan_ {
  name: string;
  shortDescription: string;
  category: string;
  images: File[] ; // List of image files
  videourl: File | null; // Video file or null
}

export interface thongtinbanhang {
  price: number;
  stockQuantity: number;
  productSize: ProductSize[];
  colors: String;
}

export interface ProductSize {
  size: string;
  quantity: number;
}

export interface ThongtinChiTiet_ {
  description: string;
  idBrand: number;
}

// Định nghĩa kiểu cho các category và subcategory
interface Category {
  [key: string]: string[];
}

interface Categories {
  [key: string]: Category;
}

// Các hằng số categories
export const categories: Categories = {
    "Thời Trang Nữ": {
      "Áo": ["Áo hai dây và ba lỗ", "Áo ống", "Áo thun", "Áo sơ mi", "Áo polo", "Áo liền thân", "Khác"],
      "Quần": ["Quần đùi", "Quần jeans"],
      "Váy": ["Đầm", "Váy cưới", "Đồ liền thân"],
      "Áo khoác": ["Áo len", "Hoodie và Áo nỉ", "Bộ"],
      "Đồ lót": ["Đồ ngủ", "Đồ Bầu", "Đồ truyền thống", "Đồ hóa trang", "Khác"],
      "Vải": ["Vớ/ Tất"]
    },
    "Thời Trang Nam": {
      "Áo": ["Áo hai dây và ba lỗ", "Áo ống", "Áo thun", "Áo sơ mi", "Áo polo", "Áo liền thân", "Khác"],
      "Quần": ["Quần đùi", "Quần jeans", "Quần jogger", "Quần túi hộp"],
      "Com lê": ["Bộ Com lê", "Áo Khoác & Blazer", "Quần âu", "Áo vest & Gi lê"],
      "Áo khoác": ["Áo len", "Hoodie và Áo nỉ", "Bộ"],
      "Đồ lót": ["Đồ ngủ", "Áo lót","Quần lót", "Đồ truyền thống", "Đồ hóa trang", "Khác"],
      "Vải": ["Vớ/ Tất"]
    },

    "Giày Dép Nam": {
      "Bốt": ["Bốt da", "Bốt lưới", "Bốt lông thú", "Bốt công nghệ"],
      "Giày thể thao/ Sneakers": ["Giày chạy bộ", "Sneakers casual", "Sneakers hiphop", "Sneakers chạy"],
      "Giày sục": ["Giày sandal", "Giày dép bãi biển", "Giày dép phong cách"],
      "Giày tây lười": ["Giày tây da", "Giày tây lười màu sắc", "Giày tây lười da bò", "Giày tây lười mềm mại"],
      "Giày Oxfords & Giày buộc dây": ["Giày Oxfords da", "Giày Oxfords lưới", "Giày buộc dây da", "Giày buộc dây lụa"],
      "Xăng-đan & Dép": ["Xăng-đan thể thao", "Xăng-đan da", "Dép lê", "Dép bốt"],
      "Phụ kiện giày dép": ["Dây giày", "Khoá dây giày", "Chân váy giày", "Dung dịch làm sạch giày"],
      "Khác": ["Giày leo núi", "Giày trượt tuyết", "Giày bảo hộ lao động", "Giày tăng chiều cao"]
    }
    ,"Giày Dép Nữ": {
      "Bốt": ["Bốt da", "Bốt lửng", "Bốt cổ cao", "Bốt mũi nhọn"],
      "Giày thể thao/ sneaker": ["Giày chạy bộ", "Sneaker casual", "Sneaker hiphop", "Sneaker dạo phố"],
      "Giày đế bằng": ["Ballerina", "Giày oxford", "Giày loafer", "Giày Mary Jane"],
      "Giày cao gót": ["Giày stiletto", "Giày đế vuông", "Giày đế bệt", "Giày cổ điển"],
      "Giày đế xuồng": ["Giày mọi", "Giày boat", "Giày mules", "Giày slingback"],
      "Xăng-đan và dép": ["Xăng-đan thể thao", "Dép xỏ ngón", "Dép quai hậu", "Dép bít mũi"],
      "Phụ kiện & chăm sóc giày": ["Dây giày", "Khoá giày", "Sản phẩm chăm sóc giày", "Hộp đựng giày"],
      "Khác": ["Giày búp bê", "Giày cắt out", "Giày cổ điển", "Giày platform"]
    }

    ,"Đồng Hồ": {
      "Đồng hồ nữ": ["Đồng hồ dây da nữ", "Đồng hồ kim loại nữ", "Đồng hồ đeo tay nữ", "Đồng hồ thể thao nữ"],
      "Đồng hồ nam": ["Đồng hồ cơ nam", "Đồng hồ điện tử nam", "Đồng hồ đeo tay nam", "Đồng hồ thông minh nam"],
      "Bộ đồng hồ & Đồng hồ cặp": ["Bộ đồng hồ nam nữ", "Đồng hồ cặp đôi", "Đồng hồ cặp thể thao", "Đồng hồ cặp dây da"],
      "Phụ kiện đồng hồ": ["Dây đeo đồng hồ", "Hộp đựng đồng hồ", "Khoá đồng hồ", "Dây đồng hồ thể thao"],
      "Khác": ["Đồng hồ đo áp suất", "Đồng hồ đo nhịp tim", "Đồng hồ báo thức", "Đồng hồ đo nước"]
    }

    ,
    "Thực Phẩm và Đồ Uống": {
      "Đồ chế biến sẵn": ["Mì gói", "Mì xào", "Gia vị chế biến", "Thực phẩm đóng hộp"],
      "Đồ ăn vặt": ["Snack bột", "Kẹo", "Bánh quy", "Hạt rang"],
      "Nhu yếu phẩm": ["Muối", "Đường", "Dầu ăn", "Bột mỳ"],
      "Nguyên liệu nấu ăn": ["Rau củ", "Thịt", "Hải sản", "Gia vị tươi"],
      "Đồ làm bánh": ["Bột làm bánh", "Nước cốt dừa", "Kem tươi", "Chocolat"],
      "Ngũ cốc & mứt": ["Ngũ cốc ngũ cốc", "Mứt trái cây", "Mật ong", "Đậu phộng"],
      "Đồ uống": ["Nước ngọt", "Trà", "Cà phê", "Sữa đặc"],
      "Sữa - trứng": ["Sữa bò", "Sữa hạt", "Trứng gà", "Kem"],
      "Thực phẩm tươi sống & đông lạnh": ["Rau sạch", "Thịt tươi", "Hải sản tươi", "Thực phẩm đóng túi"],
      "Các loại bánh": ["Bánh mì", "Bánh ngọt", "Bánh ngọt", "Bánh mỳ"],
      "Đồ uống có cồn": ["Rượu vang", "Bia", "Rượu mạnh", "Cocktail"],
      "Bộ quà tặng": ["Hộp quà tặng", "Giỏ quà tặng", "Bộ combo", "Bộ quà tặng cao cấp"]
    },
      "Điện Thoại & Phụ Kiện": {
    "Thẻ sim": ["Sim điện thoại", "Sim dữ liệu", "Sim du lịch", "Sim trả trước"],
    "Máy tính bảng": ["iPad", "Samsung Galaxy Tab", "Microsoft Surface", "Lenovo Tab"],
    "Điện thoại": ["iPhone", "Samsung Galaxy", "Xiaomi", "Oppo", "Huawei", "Google Pixel"],
    "Thiết bị đeo thông minh": ["Smartwatch", "Fitbit", "Apple Watch", "Garmin"],
    "Phụ kiện": ["Ốp lưng điện thoại", "Cáp sạc", "Tai nghe Bluetooth", "Gậy tự sướng"],
    "Bộ đàm": ["Bộ đàm cầm tay", "Bộ đàm ô tô", "Bộ đàm di động", "Bộ đàm công nghiệp"],
    "Khác": ["Pin dự phòng", "Cốc sạc không dây", "Đèn selfie", "Gương hậu ô tô"]
  },
 
  }


  export interface updateuser {
    phoneNumber?: string;
    address: string;
  }

  export interface DiscountCode {
    id: number;
    name: string;
    description: string;
    code: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    discountValue: number;
    idUser: number;
    discountApps: DiscountApp[];
}

interface DiscountApp {
    id: number;
    idProduct: number;
}



  // Các hằng số categories
// export const categories: Categories = {
//   "Thời Trang Nữ": {
//     "Áo": ["Áo hai dây và ba lỗ", "Áo ống", "Áo thun", "Áo sơ mi", "Áo polo", "Áo liền thân", "Khác"],
//     "Quần": ["Quần đùi", "Quần jeans"],
//     "Váy": ["Đầm", "Váy cưới", "Đồ liền thân"],
//     "Áo khoác": ["Áo len", "Hoodie và Áo nỉ", "Bộ"],
//     "Đồ lót": ["Đồ ngủ", "Đồ Bầu", "Đồ truyền thống", "Đồ hóa trang", "Khác"],
//     "Vải": ["Vớ/ Tất"]
//   },
//   "Thời Trang Nam": {
//     "Áo": ["Áo hai dây và ba lỗ", "Áo ống", "Áo thun", "Áo sơ mi", "Áo polo", "Áo liền thân", "Khác"],
//     "Quần": ["Quần đùi", "Quần jeans", "Quần jogger", "Quần túi hộp"],
//     "Com lê": ["Bộ Com lê", "Áo Khoác & Blazer", "Quần âu", "Áo vest & Gi lê"],
//     "Áo khoác": ["Áo len", "Hoodie và Áo nỉ", "Bộ"],
//     "Đồ lót": ["Đồ ngủ", "Áo lót","Quần lót", "Đồ truyền thống", "Đồ hóa trang", "Khác"],
//     "Vải": ["Vớ/ Tất"]
//   },
//   "Sắc Đẹp": {
//     "Chăm sóc tay, chân & móng": ["Dưỡng tay", "Dưỡng chân", "Dưỡng móng", "Sơn móng"],
//     "Chăm sóc tóc": ["Dầu gội", "Dầu xả", "Kem ủ", "Tinh dầu"],
//     "Chăm sóc nam giới": ["Kem cạo râu", "Nước hoa nam", "Dầu gội nam", "Gel tạo kiểu"],
//     "Nước hoa": ["Nước hoa nam", "Nước hoa nữ", "Nước hoa unisex"],
//     "Trang điểm": ["Phấn mắt", "Son môi", "Kem nền", "Mascara"],
//     "Dụng cụ làm đẹp": ["Bàn chải trang điểm", "Cọ trang điểm", "Kem cạo râu", "Kéo mày"],
//     "Chăm sóc da mặt": ["Kem dưỡng da", "Mặt nạ", "Sữa rửa mặt", "Tẩy trang"],
//     "Bộ sản phẩm làm đẹp": ["Bộ làm đẹp nữ", "Bộ làm đẹp nam", "Bộ làm đẹp unisex"],
//     "Khác": ["Kem chống nắng", "Tẩy da chết", "Mặt nạ ngủ"],
//     "Tắm & chăm sóc cơ thể": ["Sữa tắm", "Dầu gội dưỡng thể", "Kem dưỡng thể", "Muối tắm"]
//   },
//   "Sức Khỏe": {
//     "Thực phẩm chức năng": ["Vitamin", "Dinh dưỡng bổ sung", "Thảo dược"],
//     "Khác": ["Bổ sung khoáng chất", "Dinh dưỡng cho trẻ em", "Dinh dưỡng cho người già"],
//     "Vật tư y tế": ["Băng dính y tế", "Găng tay y tế", "Mặt nạ y tế", "Dụng cụ y tế"],
//     "Chăm sóc cá nhân": ["Dầu gội", "Sữa tắm", "Kem dưỡng da", "Kem chống nắng"],
//     "Hỗ trợ tình dục": ["Bao cao su", "Thuốc kéo dài quan hệ", "Thực phẩm hỗ trợ sinh lý"]
//   },
//   "Phụ Kiện Thời Trang": {
//     "Nhẫn": ["Nhẫn vàng", "Nhẫn bạc", "Nhẫn kim cương", "Nhẫn đá quý"],
//     "Bông tai": ["Bông tai vàng", "Bông tai bạc", "Bông tai ngọc trai", "Bông tai đá phong thủy"],
//     "Khăn choàng": ["Khăn lụa", "Khăn len", "Khăn silk"],
//     "Găng tay": ["Găng tay da", "Găng tay len", "Găng tay dù", "Găng tay chống nắng"],
//     "Phụ kiện tóc": ["Cà vạt", "Nơ tóc", "Băng đô"],
//     "Vòng tay & Lắc tay": ["Vòng tay vàng", "Vòng tay bạc", "Vòng tay da", "Lắc tay trang sức"],
//     "Lắc chân": ["Lắc chân vàng", "Lắc chân bạc", "Lắc chân đá quý", "Lắc chân dây"],
//     "Mũ": ["Mũ snapback", "Mũ len", "Mũ lưỡi trai", "Mũ rộng cạnh"],
//     "Dây chuyền": ["Dây chuyền vàng", "Dây chuyền bạc", "Dây chuyền kim loại", "Dây chuyền đá quý"],
//     "Kính mắt": ["Kính mắt mắt mèo", "Kính mắt aviator", "Kính mắt hình chữ nhật", "Kính mắt thể thao"],
//     "Kim loại quý": ["Vàng", "Bạc", "Bạch kim", "Platinum"],
//     "Thắt lưng": ["Thắt lưng da", "Thắt lưng vải", "Thắt lưng lụa", "Thắt lưng kim loại"],
//     "Cà vạt & Nơ cổ": ["Cà vạt nam", "Nơ cổ nữ", "Cà vạt nơ cổ"],
//     "Phụ kiện thêm": ["Bật lửa", "Dây nịt", "Túi xách", "Dây da"]
//   },
//   "Thiết Bị Điện Gia Dụng": {
//     "Máy chiếu & Phụ kiện": ["Máy chiếu", "Bóng đèn máy chiếu", "Màn chiếu"],
//     "Thiết bị điện gia dụng nhỏ": ["Bình đun nước", "Bàn là", "Bình pha cà phê", "Máy sấy tóc"],
//     "Thiết bị điện gia dụng lớn": ["Tủ lạnh", "Máy giặt", "Lò vi sóng", "Máy lọc không khí"],
//     "Tivi & Phụ kiện": ["Tivi", "Remote Tivi", "Bộ giá đỡ Tivi", "Loa Tivi"],
//     "Đồ gia dụng nhà bếp": ["Bếp điện từ", "Lò nướng", "Máy xay sinh tố", "Máy làm kem"],
//     "Mạch điện & Phụ tùng": ["Cáp điện", "Bóng đèn", "Ổ cắm", "Dây điện"],
//     "Pin": ["Pin AAA", "Pin AA", "Pin đồng hồ", "Pin lithium"],
//     "Thiết bị điều khiển từ xa": ["Điều khiển TV", "Điều khiển máy lạnh", "Điều khiển cửa garage", "Điều khiển đèn"],
//     "Khác": ["Máy làm bánh", "Máy hút bụi", "Máy tạo ẩm", "Máy xông hơi"]
//   },
//   "Giày Dép Nam": {
//     "Bốt": ["Bốt da", "Bốt lưới", "Bốt lông thú", "Bốt công nghệ"],
//     "Giày thể thao/ Sneakers": ["Giày chạy bộ", "Sneakers casual", "Sneakers hiphop", "Sneakers chạy"],
//     "Giày sục": ["Giày sandal", "Giày dép bãi biển", "Giày dép phong cách"],
//     "Giày tây lười": ["Giày tây da", "Giày tây lười màu sắc", "Giày tây lười da bò", "Giày tây lười mềm mại"],
//     "Giày Oxfords & Giày buộc dây": ["Giày Oxfords da", "Giày Oxfords lưới", "Giày buộc dây da", "Giày buộc dây lụa"],
//     "Xăng-đan & Dép": ["Xăng-đan thể thao", "Xăng-đan da", "Dép lê", "Dép bốt"],
//     "Phụ kiện giày dép": ["Dây giày", "Khoá dây giày", "Chân váy giày", "Dung dịch làm sạch giày"],
//     "Khác": ["Giày leo núi", "Giày trượt tuyết", "Giày bảo hộ lao động", "Giày tăng chiều cao"]
//   },
//   "Điện Thoại & Phụ Kiện": {
//     "Thẻ sim": ["Sim điện thoại", "Sim dữ liệu", "Sim du lịch", "Sim trả trước"],
//     "Máy tính bảng": ["iPad", "Samsung Galaxy Tab", "Microsoft Surface", "Lenovo Tab"],
//     "Điện thoại": ["iPhone", "Samsung Galaxy", "Xiaomi", "Oppo", "Huawei", "Google Pixel"],
//     "Thiết bị đeo thông minh": ["Smartwatch", "Fitbit", "Apple Watch", "Garmin"],
//     "Phụ kiện": ["Ốp lưng điện thoại", "Cáp sạc", "Tai nghe Bluetooth", "Gậy tự sướng"],
//     "Bộ đàm": ["Bộ đàm cầm tay", "Bộ đàm ô tô", "Bộ đàm di động", "Bộ đàm công nghiệp"],
//     "Khác": ["Pin dự phòng", "Cốc sạc không dây", "Đèn selfie", "Gương hậu ô tô"]
//   },
//   "Du lịch & Hành lý": {
//     "Vali": ["Vali kéo", "Vali cứng", "Vali mềm", "Vali kéo du lịch"],
//     "Túi du lịch": ["Túi xách du lịch", "Túi đeo chéo du lịch", "Túi hành lý", "Túi dã ngoại"],
//     "Phụ kiện du lịch": ["Bao bì hút chân không", "Khóa vali", "Balo du lịch", "Bình nước du lịch"],
//     "Khác": ["Bảo hiểm du lịch", "Dụng cụ cắm trại", "Đồ dùng phòng khách sạn", "Bản đồ và sách hướng dẫn"]
//   },
//   "Túi Ví Nữ": {
//     "Ba lô": ["Ba lô thể thao", "Ba lô du lịch", "Ba lô học đường", "Ba lô laptop"],
//     "Cặp laptop": ["Cặp laptop da", "Cặp laptop vải", "Cặp laptop chống sốc", "Cặp laptop nữ"],
//     "Ví dự tiệc & Ví cầm tay": ["Ví dự tiệc nhỏ gọn", "Ví clutch", "Ví cầm tay da", "Ví cầm tay nhỏ"],
//     "Túi đeo hông & Túi đeo ngực": ["Túi đeo hông da", "Túi đeo hông vải", "Túi đeo ngực chạy bộ", "Túi đeo ngực thể thao"],
//     "Túi tote": ["Túi tote da", "Túi tote vải", "Túi tote đựng laptop", "Túi tote thời trang"],
//     "Túi quai xách": ["Túi xách da", "Túi xách vải", "Túi xách thể thao", "Túi xách công sở"],
//     "Túi đeo chéo & Túi đeo vai": ["Túi đeo chéo da", "Túi đeo chéo vải", "Túi đeo vai thời trang", "Túi đeo vai du lịch"],
//     "Ví": ["Ví da", "Ví nhỏ gọn", "Ví nữ", "Ví tiền mặt"],
//     "Phụ kiện túi": ["Dây đeo túi", "Khoá túi", "Gấp ví", "Hộp đựng ví"],
//     "Khác": ["Túi dây chuyền", "Túi sách", "Túi hóa chất", "Túi lót"]
//   }
// ,"Giày Dép Nữ": {
// "Bốt": ["Bốt da", "Bốt lửng", "Bốt cổ cao", "Bốt mũi nhọn"],
// "Giày thể thao/ sneaker": ["Giày chạy bộ", "Sneaker casual", "Sneaker hiphop", "Sneaker dạo phố"],
// "Giày đế bằng": ["Ballerina", "Giày oxford", "Giày loafer", "Giày Mary Jane"],
// "Giày cao gót": ["Giày stiletto", "Giày đế vuông", "Giày đế bệt", "Giày cổ điển"],
// "Giày đế xuồng": ["Giày mọi", "Giày boat", "Giày mules", "Giày slingback"],
// "Xăng-đan và dép": ["Xăng-đan thể thao", "Dép xỏ ngón", "Dép quai hậu", "Dép bít mũi"],
// "Phụ kiện & chăm sóc giày": ["Dây giày", "Khoá giày", "Sản phẩm chăm sóc giày", "Hộp đựng giày"],
// "Khác": ["Giày búp bê", "Giày cắt out", "Giày cổ điển", "Giày platform"]
// }
// ,"Túi Ví Nam": {
// "Ba lô": ["Ba lô du lịch", "Ba lô thể thao", "Ba lô học đường", "Ba lô laptop"],
// "Cặp laptop": ["Cặp laptop da", "Cặp laptop vải", "Cặp laptop chống sốc", "Cặp laptop dành cho doanh nhân"],
// "Túi tote": ["Túi tote da", "Túi tote vải", "Túi tote thời trang", "Túi tote đi làm"],
// "Cặp xách công sở": ["Cặp xách công sở da", "Cặp xách công sở vải", "Cặp xách công sở thời trang", "Cặp xách công sở laptop"],
// "Ví cầm tay": ["Ví da", "Ví nhỏ gọn", "Ví cầm tay thời trang", "Ví cầm tay da bò"],
// "Túi đeo hông & Túi đeo ngực": ["Túi đeo hông da", "Túi đeo hông vải", "Túi đeo ngực thể thao", "Túi đeo ngực chạy bộ"],
// "Túi đeo chéo": ["Túi đeo chéo da", "Túi đeo chéo vải", "Túi đeo chéo thể thao", "Túi đeo chéo đi làm"],
// "Bóp/ Ví": ["Bóp da", "Bóp nhỏ gọn", "Bóp thẻ", "Bóp cầm tay"],
// "Khác": ["Túi camera", "Túi du lịch", "Túi thể thao", "Túi đựng dụng cụ"]
// }
// ,"Đồng Hồ": {
// "Đồng hồ nữ": ["Đồng hồ dây da nữ", "Đồng hồ kim loại nữ", "Đồng hồ đeo tay nữ", "Đồng hồ thể thao nữ"],
// "Đồng hồ nam": ["Đồng hồ cơ nam", "Đồng hồ điện tử nam", "Đồng hồ đeo tay nam", "Đồng hồ thông minh nam"],
// "Bộ đồng hồ & Đồng hồ cặp": ["Bộ đồng hồ nam nữ", "Đồng hồ cặp đôi", "Đồng hồ cặp thể thao", "Đồng hồ cặp dây da"],
// "Phụ kiện đồng hồ": ["Dây đeo đồng hồ", "Hộp đựng đồng hồ", "Khoá đồng hồ", "Dây đồng hồ thể thao"],
// "Khác": ["Đồng hồ đo áp suất", "Đồng hồ đo nhịp tim", "Đồng hồ báo thức", "Đồng hồ đo nước"]
// }
// ,"Thiết Bị Âm Thanh": {
// "Tai nghe nhét tai & chụp tai": ["Tai nghe nhét tai", "Tai nghe chụp tai", "Tai nghe không dây", "Tai nghe dành cho game thủ"],
// "Máy nghe nhạc": ["Máy nghe nhạc MP3", "Máy nghe nhạc di động", "Máy nghe nhạc Bluetooth", "Máy nghe nhạc đa năng"],
// "Micro thu âm": ["Micro cầm tay", "Micro cài áo", "Micro dành cho ca sĩ", "Micro phòng thu"],
// "Amply và đầu chỉnh âm": ["Amply nghe nhạc", "Đầu phát CD", "Đầu thu âm", "Dàn karaoke"],
// "Dàn âm thanh": ["Dàn âm thanh gia đình", "Dàn âm thanh phòng karaoke", "Dàn âm thanh phòng ngủ", "Dàn âm thanh Bluetooth"],
// "Cáp âm thanh/ video & Đầu chuyển": ["Cáp âm thanh", "Cáp video", "Đầu chuyển âm thanh", "Đầu chuyển video"],
// "Khác": ["Loa Bluetooth", "Phụ kiện âm thanh", "Bộ lọc âm thanh", "Thiết bị ghi âm"]
// }
// ,
// "Thực Phẩm và Đồ Uống": {
// "Đồ chế biến sẵn": ["Mì gói", "Mì xào", "Gia vị chế biến", "Thực phẩm đóng hộp"],
// "Đồ ăn vặt": ["Snack bột", "Kẹo", "Bánh quy", "Hạt rang"],
// "Nhu yếu phẩm": ["Muối", "Đường", "Dầu ăn", "Bột mỳ"],
// "Nguyên liệu nấu ăn": ["Rau củ", "Thịt", "Hải sản", "Gia vị tươi"],
// "Đồ làm bánh": ["Bột làm bánh", "Nước cốt dừa", "Kem tươi", "Chocolat"],
// "Ngũ cốc & mứt": ["Ngũ cốc ngũ cốc", "Mứt trái cây", "Mật ong", "Đậu phộng"],
// "Đồ uống": ["Nước ngọt", "Trà", "Cà phê", "Sữa đặc"],
// "Sữa - trứng": ["Sữa bò", "Sữa hạt", "Trứng gà", "Kem"],
// "Thực phẩm tươi sống & đông lạnh": ["Rau sạch", "Thịt tươi", "Hải sản tươi", "Thực phẩm đóng túi"],
// "Các loại bánh": ["Bánh mì", "Bánh ngọt", "Bánh ngọt", "Bánh mỳ"],
// "Đồ uống có cồn": ["Rượu vang", "Bia", "Rượu mạnh", "Cocktail"],
// "Bộ quà tặng": ["Hộp quà tặng", "Giỏ quà tặng", "Bộ combo", "Bộ quà tặng cao cấp"]
// }
// ,
// "Chăm Sóc Thú Cưng": {
// "Thức ăn cho thú cưng": ["Thức ăn cho chó", "Thức ăn cho mèo", "Thức ăn cho thú cưng khác", "Đồ chơi ăn"],
// "Phụ kiện cho thú cưng": ["Lều cho chó mèo", "Dây dắt", "Nệm ngủ", "Túi vận chuyển"],
// "Vệ sinh cho thú cưng": ["Chất hấp thụ", "Bát ăn nước", "Bát cát", "Tấm lót"],
// "Làm đẹp cho thú cưng": ["Dầu gội", "Xịt chống côn trùng", "Kem dưỡng da", "Bàn chải lông"],
// "Quần áo & phụ kiện": ["Áo cho thú cưng", "Dây đeo", "Mũi giày", "Quần áo chống nắng"],
// "Chăm sóc sức khỏe": ["Thuốc sát trùng", "Vitamin", "Thuốc chống kích ứng", "Dụng cụ cắt móng"],
// "Khác": ["Sách hướng dẫn chăm sóc", "Đồ chơi", "Bộ quà tặng cho thú cưng", "Tượng gỗ thần tài"]
// }
// ,"Mẹ & Bé": {
// "Đồ dùng du lịch cho bé": ["Xe đẩy", "Cũi gấp", "Túi đựng đồ cho bé", "Ghế ô tô"],
// "Đồ dùng ăn dặm cho bé": ["Bát ăn", "Ly hứng", "Thớt cắt thức ăn", "Núm ty ăn"],
// "Phụ kiện cho mẹ": ["Túi xách mẹ", "Bình nước sữa", "Áo choàng sau sinh", "Dây nịt bụng"],
// "Chăm sóc sức khỏe mẹ": ["Thuốc chống đau sau sinh", "Dầu massage", "Kem chống rạn da", "Máy hút sữa"],
// "Đồ dùng phòng tắm & Chăm sóc cơ thể bé": ["Bồn tắm", "Khăn cho bé", "Bộ chải gội", "Dầu tắm"],
// "Đồ dùng phòng ngủ cho bé": ["Giường cũi", "Chăn ga gối", "Đèn ngủ", "Bảng xếp hình"],
// "An toàn cho bé": ["Ghế rung", "Bảo vệ ổ cửa", "Bình nước chống rơi", "Rào cản an toàn"],
// "Sữa công thức & Thực phẩm cho bé": ["Sữa bột", "Thức ăn dặm", "Bình sữa", "Bánh quy cho bé"],
// "Chăm sóc sức khỏe bé": ["Thuốc tiêm phòng", "Dung dịch vệ sinh", "Kem chống hăm", "Dụng cụ đo thân nhiệt"],
// "Tã & bô em bé": ["Tã dán", "Quần tã dán", "Bô em bé", "Kệ treo tã"],
// "Đồ chơi": ["Gấu bông", "Xe đạp", "Bóng chuyền", "Bộ xếp hình"],
// "Bộ & Gói quà tặng": ["Bộ quà tặng mới sinh", "Gói quà tặng mẹ & bé", "Bộ quà tặng sinh nhật", "Bộ quà tặng bé gái"]
// }
// ,"Nhà cửa & Đời sống": {
// "Chất khử mùi, làm thơm nhà": ["Nến thơm", "Tinh dầu", "Xịt phòng", "Hoa hồng nhân tạo"],
// "Đồ dùng phòng tắm": ["Kệ góc", "Khăn tắm", "Thảm phòng tắm", "Kệ đựng đồ tắm"],
// "Chăn ga gối nệm": ["Chăn", "Ga", "Gối", "Nệm"],
// "Trang trí nhà cửa": ["Tranh treo tường", "Đồng hồ treo tường", "Tượng trang trí", "Tranh ghép hình"],
// "Túi làm ấm": ["Túi ấm chân", "Túi ấm tay", "Túi ấm giường", "Túi ấm lưng"],
// "Nội thất": ["Bàn ghế sofa", "Kệ sách", "Tủ quần áo", "Ghế massage"],
// "Làm vườn": ["Cây cảnh", "Hoa lá", "Kệ hoa", "Bình phong cây cảnh"],
// "Dụng cụ & Thiết bị tiện ích": ["Bình nước", "Ổ cắm điện", "Máy lọc không khí", "Đèn pin"],
// "Dụng cụ chăm sóc nhà cửa": ["Bàn chải lau nhà", "Máy hút bụi", "Bình phun thuốc diệt côn trùng", "Găng tay lau"],
// "Dụng cụ nhà bếp": ["Nồi cơm điện", "Bộ dao", "Nồi hấp", "Chảo"],
// "Bộ đồ bàn ăn": ["Bộ đồ ăn gốm sứ", "Bộ đồ ăn nhựa", "Bộ đồ ăn thép không gỉ", "Bộ đồ ăn đồng"],
// "Đèn": ["Đèn trang trí", "Đèn bàn", "Đèn chùm", "Đèn nến"],
// "Bảo hộ gia đình": ["Nón bảo hiểm", "Khẩu trang", "Dây dắt trẻ", "Găng tay cách nhiệt"],
// "Sắp xếp nhà cửa": ["Hộp đựng", "Kệ đựng", "Thùng đựng đồ", "Bảng thông báo"],
// "Trang trí tiệc tùng": ["Bong bóng", "Banner chúc mừng", "Phụ kiện trang trí bàn", "Bức tranh nền tường"],
// "Đồ thờ cúng, đồ phong thủy": ["Bàn thờ gia tiên", "Búa cài đinh", "Bát phong thủy", "Bàn cúng"]
// }
// ,"Cameras & Flycam": {
// "Máy ảnh": ["Máy ảnh DSLR", "Máy ảnh mirrorless", "Máy ảnh chụp hình du lịch", "Máy ảnh chụp ảnh thể thao"],
// "Camera giám sát": ["Camera IP", "Camera analog", "Camera wifi", "Camera PTZ"],
// "Ống kính": ["Ống kính góc rộng", "Ống kính zoom", "Ống kính prime", "Ống kính macro"],
// "Phụ kiện ống kính": ["Bộ lọc ống kính", "Nắp ống kính", "Hộp đựng ống kính", "Lens hood"],
// "Phụ kiện máy ảnh": ["Thẻ nhớ", "Pin máy ảnh", "Balo đựng máy ảnh", "Remote máy ảnh"],
// "Phụ kiện chăm sóc máy ảnh": ["Dung dịch vệ sinh", "Kính lọc", "Dây đeo máy ảnh", "Túi đựng máy ảnh"],
// "Flycam": ["DJI Phantom", "DJI Mavic", "DJI Spark", "Parrot Bebop"],
// "Phụ kiện Flycam": ["Pin Flycam", "Remote Flycam", "Túi đựng Flycam", "Bộ lọc Flycam"],
// "Khác": ["Gimbal", "Gậy tự sướng", "Đèn flash", "Thiết bị livestream"]
// }
// ,"Văn Phòng Phẩm": {
// "Quà Tặng - Giấy Gói": ["Bao thư", "Giấy gói quà", "Hộp quà", "Túi đựng quà"],
// "Bút Các Loại": ["Bút bi", "Bút mực", "Bút bảng trắng", "Bút chì"],
// "Thiết Bị Trường Học": ["Bảng phấn", "Thước kẻ", "Bút chì màu", "Túi đựng bút"],
// "Họa Cụ": ["Màu nước", "Bảng vẽ", "Bút chì màu", "Giấy vẽ"],
// "Sổ & Giấy Các Loại": ["Sổ tay", "Sổ ghi chú", "Giấy in", "Giấy vẽ"],
// "Thư Tín": ["Bìa thư", "Bì thư", "Tem thư", "Phong bì"],
// "Khác": ["Băng dính", "Bình đựng bút", "Kẹp giấy", "Máy tính bỏ túi"]
// }
// ,"Ô tô": {
// "Ô tô": ["Xe hạng nhẹ", "Xe hạng trung", "Xe hạng nặng", "Xe thể thao"],
// "Không hỗ trợ": [],
// "Phụ kiện nội thất ô tô": ["Nệm ghế", "Bọc vô-lăng", "Gối tựa đầu", "Dây đai an toàn"],
// "Phụ kiện ngoại thất ô tô": ["Ốp gương", "Baga mui", "Bảo vệ cửa", "Đèn xe"],
// "Phụ tùng ô tô": ["Lốp xe", "Bình điện", "Filtro gió", "Thắng xe"],
// "Dụng cụ sửa chữa ô tô": ["Búa đập kính", "Bơm lốp", "Đồ nghề sửa chữa", "Dây cẩu xe"],
// "Chăm sóc ô tô": ["Dung dịch làm sạch", "Wax bảo dưỡng", "Dụng cụ lau rửa", "Dầu làm sạch động cơ"],
// "Dầu nhớt và phụ gia ô tô": ["Dầu nhớt động cơ", "Chất làm mát", "Chất tăng số", "Chất làm sạch nhiên liệu"],
// "Móc chìa khóa và Bọc chìa ô tô": ["Móc chìa khóa", "Bọc chìa khóa", "Thẻ thông minh", "Bộ chìa khóa từ"]
// }
// ,"Mô tô, Xe máy": {
// "Mô tô, Xe máy": ["Xe máy côn tay", "Xe máy ga", "Xe mô tô phân khối lớn", "Xe mô tô phân khối nhỏ"],
// "Không hỗ trợ": [],
// "Phụ kiện xe máy": ["Baga", "Yên da", "Gương chiếu hậu", "Bộ túi da xe"],
// "Phụ tùng xe máy": ["Lốp xe máy", "Đèn xe máy", "Bình điện", "Phanh xe máy"],
// "Mũ bảo hiểm & Phụ kiện": ["Mũ bảo hiểm côn", "Mũ bảo hiểm 3/4", "Kính mũ bảo hiểm", "Nón bảo hiểm trẻ em"],
// "Khác": ["Găng tay", "Áo giáp", "Bao tay", "Dây đai cố định"]
// }
// ,"Sách & Tạp Chí": {
// "Tạp Chí & Báo Giấy": ["Tạp chí thời trang", "Tạp chí kinh tế", "Báo chí hàng ngày", "Tạp chí khoa học"],
// "Không hỗ trợ": [],
// "Sách": ["Sách văn học", "Sách kinh doanh", "Sách tự nhiên", "Sách giáo trình"],
// "E-Books": ["Ebook tiểu thuyết", "Ebook hướng dẫn", "Ebook học ngoại ngữ", "Ebook lập trình"],
// "Khác": ["Truyện tranh", "Sách trẻ em", "Sách nấu ăn", "Sách tự truyện"]
// }

  
  
  
  
  
  
  
// }


