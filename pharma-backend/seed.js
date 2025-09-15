const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection string
const mongoURI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURI);

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Đã kết nối với MongoDB');

    const db = client.db("medicineShop");
    
    // Clear existing collections
    await db.collection("users").deleteMany({});
    await db.collection("medicines").deleteMany({});
    await db.collection("categories").deleteMany({});
    await db.collection("health-blogs").deleteMany({});
    await db.collection("companies").deleteMany({});
    await db.collection("orders").deleteMany({});
    await db.collection("advertise-requests").deleteMany({});

    console.log('Collections cleared');

    // Seed categories
    const categories = [
      {
        name: "Thuốc giảm đau",
        slug: "thuoc-giam-dau",
        description: "Các loại thuốc giảm đau, hạ sốt",
        image: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        medicineCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Thuốc kháng sinh",
        slug: "thuoc-khang-sinh",
        description: "Các loại thuốc kháng sinh điều trị nhiễm trùng",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
        medicineCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Vitamin và khoáng chất",
        slug: "vitamin-va-khoang-chat",
        description: "Các loại vitamin và khoáng chất bổ sung",
        image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
        medicineCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Thuốc cảm lạnh và cúm",
        slug: "thuoc-cam-lanh-va-cum",
        description: "Các loại thuốc điều trị triệu chứng cảm lạnh và cúm",
        image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
        medicineCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Thuốc tiêu hóa",
        slug: "thuoc-tieu-hoa",
        description: "Các loại thuốc điều trị bệnh đường tiêu hóa",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
        medicineCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const categoriesResult = await db.collection("categories").insertMany(categories);
    console.log(`${categoriesResult.insertedCount} categories inserted`);

    // Get category IDs for reference
    const categoryMap = {};
    const insertedCategories = await db.collection("categories").find({}).toArray();
    insertedCategories.forEach(category => {
      categoryMap[category.slug] = category._id;
    });

    // Seed companies
    const companies = [
      {
        name: "Dược Hậu Giang (DHG)",
        country: "Việt Nam",
        foundedYear: 1974,
        logo: "https://www.dhgpharma.com.vn/images/logo.png",
        website: "https://www.dhgpharma.com.vn",
        description: "Công ty dược phẩm hàng đầu Việt Nam",
        createdAt: new Date().toISOString()
      },
      {
        name: "Traphaco",
        country: "Việt Nam",
        foundedYear: 1972,
        logo: "https://www.traphaco.com.vn/upload/images/logo-traphaco.png",
        website: "https://www.traphaco.com.vn",
        description: "Doanh nghiệp dược phẩm lớn tại Việt Nam",
        createdAt: new Date().toISOString()
      },
      {
        name: "Pymepharco",
        logo: "https://i.ibb.co/Jt5zNWQ/healthplus.png",
        description: "Innovative health solutions",
        createdAt: new Date().toISOString()
      }
    ];

    const companiesResult = await db.collection("companies").insertMany(companies);
    console.log(`${companiesResult.insertedCount} companies inserted`);

    // Get company IDs for reference
    const companyMap = {};
    const insertedCompanies = await db.collection("companies").find({}).toArray();
    insertedCompanies.forEach(company => {
      companyMap[company.name] = company._id;
    });

    // Seed medicines
    const medicines = [
      {
        name: "Paracetamol 500mg",
        genericName: "Paracetamol",
        categoryId: categoryMap["thuoc-giam-dau"],
        categoryName: "Thuốc giảm đau",
        companyId: companyMap["Dược Hậu Giang (DHG)"],
        companyName: "Dược Hậu Giang (DHG)",
        description: "Thuốc giảm đau, hạ sốt thông dụng",
        pricePerUnit: 15000,
        discount: 0,
        discountPrice: 15000,
        stockQuantity: 100,
        inStock: true,
        unit: "Hộp 10 vỉ x 10 viên",
        dosageForm: "Viên nén",
        strength: "500mg",
        imageUrls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"],
        indication: "Điều trị các chứng đau nhẹ đến vừa và hạ sốt",
        sideEffects: "Buồn nôn, nôn, đau bụng, dị ứng da",
        contraindications: "Mẫn cảm với paracetamol, bệnh gan nặng",
        reviews: 0,
        rating: 0,
        createAt: new Date().toISOString(),
        sellerEmail: "seller@medicare.vn"
      },
      {
        name: "Amoxicillin 500mg",
        genericName: "Amoxicillin",
        categoryId: categoryMap["thuoc-khang-sinh"],
        categoryName: "Thuốc kháng sinh",
        companyId: companyMap["Traphaco"],
        companyName: "Traphaco",
        description: "Kháng sinh nhóm beta-lactam điều trị nhiễm khuẩn",
        pricePerUnit: 35000,
        discount: 5,
        discountPrice: 33250,
        stockQuantity: 50,
        inStock: true,
        unit: "Hộp 10 vỉ x 10 viên",
        dosageForm: "Viên nang",
        strength: "500mg",
        imageUrls: ["https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"],
        indication: "Điều trị các bệnh nhiễm khuẩn đường hô hấp, tiêu hóa, tiết niệu",
        sideEffects: "Tiêu chảy, buồn nôn, phát ban da",
        contraindications: "Mẫn cảm với kháng sinh nhóm beta-lactam",
        reviews: 0,
        rating: 0,
        createAt: new Date().toISOString(),
        sellerEmail: "seller@medicare.vn"
      },
      {
        name: "Vitamin C 1000mg",
        genericName: "Acid Ascorbic",
        categoryId: categoryMap["vitamin-thuc-pham-chuc-nang"],
        categoryName: "Vitamin & Thực phẩm chức năng",
        companyId: companyMap["Pymepharco"],
        companyName: "Pymepharco",
        description: "Bổ sung vitamin C tăng cường sức đề kháng",
        pricePerUnit: 45000,
        discount: 10,
        discountPrice: 40500,
        stockQuantity: 200,
        inStock: true,
        unit: "Hộp 10 vỉ x 10 viên",
        dosageForm: "Viên sủi",
        strength: "1000mg",
        imageUrls: ["https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"],
        indication: "Bổ sung vitamin C, tăng cường sức đề kháng, phòng cảm cúm",
        sideEffects: "Buồn nôn, đau bụng khi dùng liều cao",
        contraindications: "Sỏi thận, bệnh thận",
        reviews: 0,
        rating: 0,
        createAt: new Date().toISOString(),
        sellerEmail: "seller@medicare.vn"
      },
      {
        name: "Panadol Extra",
        genericName: "Paracetamol + Caffeine",
        categoryId: categoryMap["thuoc-ho-cam-cum"],
        categoryName: "Thuốc ho, cảm, cúm",
        companyId: companyMap["Dược Hậu Giang (DHG)"],
        companyName: "Dược Hậu Giang (DHG)",
        description: "Thuốc giảm đau, hạ sốt, giảm triệu chứng cảm cúm",
        pricePerUnit: 25000,
        discount: 0,
        discountPrice: 25000,
        stockQuantity: 75,
        inStock: true,
        unit: "Hộp 10 vỉ x 10 viên",
        dosageForm: "Viên nén bao phim",
        strength: "500mg paracetamol + 65mg caffeine",
        imageUrls: ["https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"],
        indication: "Điều trị các cơn đau từ nhẹ đến vừa như đau đầu, đau nửa đầu, đau răng, đau bụng kinh, đau nhức do cảm cúm",
        sideEffects: "Buồn nôn, khó ngủ, tim đập nhanh",
        contraindications: "Mẫn cảm với paracetamol hoặc caffeine, bệnh gan nặng",
        reviews: 0,
        rating: 0,
        createAt: new Date().toISOString(),
        sellerEmail: "seller@medicare.vn"
      },
      {
        name: "Berberin",
        genericName: "Berberin HCl",
        categoryId: categoryMap["thuoc-tieu-hoa"],
        categoryName: "Thuốc tiêu hóa",
        companyId: companyMap["Pymepharco"],
        companyName: "Pymepharco",
        description: "Thuốc điều trị rối loạn tiêu hóa, tiêu chảy",
        pricePerUnit: 28000,
        discount: 5,
        discountPrice: 26600,
        stockQuantity: 60,
        inStock: true,
        unit: "Hộp 5 vỉ x 10 viên",
        dosageForm: "Viên nén bao phim",
        strength: "100mg",
        imageUrls: ["https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"],
        indication: "Điều trị tiêu chảy cấp không rõ nguyên nhân, tiêu chảy do nhiễm khuẩn, rối loạn tiêu hóa",
        sideEffects: "Buồn nôn, táo bón, đau bụng",
        contraindications: "Mẫn cảm với berberin, phụ nữ có thai và cho con bú",
        reviews: 0,
        rating: 0,
        createAt: new Date().toISOString(),
        sellerEmail: "seller@medicare.vn"
      }
    ];

    const medicinesResult = await db.collection("medicines").insertMany(medicines);
    console.log(`${medicinesResult.insertedCount} medicines inserted`);

    // Update category medicine counts
    for (const category of insertedCategories) {
      const count = await db.collection("medicines").countDocuments({ categoryId: category._id });
      await db.collection("categories").updateOne(
        { _id: category._id },
        { $set: { medicineCount: count } }
      );
    }

    // Seed users
    const users = [
      {
        name: "Nguyễn Quản Trị",
        email: "admin@medicare.vn",
        photoURL: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "admin",
        password: "admin123", // Mật khẩu đơn giản cho mục đích test
        phone: "0901234567",
        address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
        createAt: new Date().toISOString()
      },
      {
        name: "Trần Bán Hàng",
        email: "seller@medicare.vn",
        photoURL: "https://randomuser.me/api/portraits/women/2.jpg",
        role: "seller",
        password: "seller123", // Mật khẩu đơn giản cho mục đích test
        phone: "0912345678",
        address: "456 Lê Lợi, Quận 1, TP.HCM",
        createAt: new Date().toISOString()
      },
      {
        name: "Lê Khách Hàng",
        email: "customer@gmail.com",
        photoURL: "https://randomuser.me/api/portraits/women/3.jpg",
        role: "customer",
        password: "customer123", // Mật khẩu đơn giản cho mục đích test
        phone: "0923456789",
        address: "789 Điện Biên Phủ, Quận 3, TP.HCM",
        createAt: new Date().toISOString()
      }
    ];

    const usersResult = await db.collection("users").insertMany(users);
    console.log(`${usersResult.insertedCount} users inserted`);

    // Seed health blogs
    const healthBlogs = [
      {
        title: "Tầm quan trọng của Vitamin D đối với sức khỏe người Việt",
        content: "Vitamin D đóng vai trò quan trọng trong việc hấp thụ canxi, duy trì xương chắc khỏe và tăng cường hệ miễn dịch. Tại Việt Nam, mặc dù có nhiều nắng nhưng nhiều người vẫn thiếu vitamin D do lối sống hiện đại, ít tiếp xúc với ánh nắng mặt trời. Bài viết này sẽ giới thiệu các nguồn vitamin D phổ biến và cách bổ sung hiệu quả cho người Việt Nam.",
        author: "TS.BS Nguyễn Văn An",
        authorEmail: "admin@medicare.vn",
        imageUrl: "https://images.unsplash.com/photo-1616671276441-2f2c2b9b4b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
        tags: ["vitamin d", "sức khỏe", "dinh dưỡng", "người việt"],
        createdAt: new Date().toISOString()
      },
      {
        title: "Phòng ngừa và điều trị cảm cúm mùa mưa tại Việt Nam",
        content: "Mùa mưa tại Việt Nam thường kéo dài từ tháng 5 đến tháng 10, đây cũng là thời điểm bệnh cảm cúm bùng phát. Bài viết này chia sẻ các biện pháp phòng ngừa hiệu quả và cách điều trị cảm cúm phù hợp với điều kiện khí hậu nhiệt đới gió mùa của Việt Nam, giúp bạn và gia đình luôn khỏe mạnh trong mùa mưa.",
        author: "PGS.TS Trần Thị Bình",
        authorEmail: "admin@medicare.vn",
        imageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
        tags: ["cảm cúm", "mùa mưa", "sức khỏe", "việt nam"],
        createdAt: new Date().toISOString()
      }
    ];

    const healthBlogsResult = await db.collection("health-blogs").insertMany(healthBlogs);
    console.log(`${healthBlogsResult.insertedCount} health blogs inserted`);

    // Seed orders
    const orders = [
      {
        customerInfo: {
          name: "Lê Khách Hàng",
          email: "customer@gmail.com",
          phone: "0923456789",
          address: "789 Điện Biên Phủ, Quận 3, TP.HCM"
        },
        items: [
          {
            medicineId: (await db.collection("medicines").findOne({ name: "Paracetamol 500mg" }))._id,
            name: "Paracetamol 500mg",
            quantity: 2,
            pricePerUnit: 15000,
            totalPrice: 30000
          },
          {
            medicineId: (await db.collection("medicines").findOne({ name: "Vitamin C 1000mg" }))._id,
            name: "Vitamin C 1000mg",
            quantity: 1,
            pricePerUnit: 45000,
            totalPrice: 45000
          }
        ],
        totalAmount: 75000,
        status: "delivered",
        paymentStatus: "paid",
        paymentMethod: "momo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        customerInfo: {
          name: "Lê Khách Hàng",
          email: "customer@gmail.com",
          phone: "0923456789",
          address: "789 Điện Biên Phủ, Quận 3, TP.HCM"
        },
        items: [
          {
            medicineId: (await db.collection("medicines").findOne({ name: "Panadol Extra" }))._id,
            name: "Panadol Extra",
            quantity: 1,
            pricePerUnit: 25000,
            totalPrice: 25000
          }
        ],
        totalAmount: 25000,
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "zalopay",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const ordersResult = await db.collection("orders").insertMany(orders);
    console.log(`${ordersResult.insertedCount} orders inserted`);

    // Seed advertise requests
    const advertiseRequests = [
      {
        medicineId: (await db.collection("medicines").findOne({ name: "Vitamin C 1000mg" }))._id,
        medicineName: "Vitamin C 1000mg",
        sellerEmail: "seller@medicare.vn",
        requestDate: new Date().toISOString(),
        status: "approved",
        duration: 30, // days
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        medicineId: (await db.collection("medicines").findOne({ name: "Paracetamol 500mg" }))._id,
        medicineName: "Paracetamol 500mg",
        sellerEmail: "seller@medicare.vn",
        requestDate: new Date().toISOString(),
        status: "pending",
        duration: 15, // days
        startDate: null,
        endDate: null
      }
    ];

    const advertiseRequestsResult = await db.collection("advertise-requests").insertMany(advertiseRequests);
    console.log(`${advertiseRequestsResult.insertedCount} advertise requests inserted`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedDatabase();