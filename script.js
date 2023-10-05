// products
let Products = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    discountPercentage: 17.91,
    rating: 4.3,
    stock: 123,
    brand: "OPPO",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    discountPercentage: 10.58,
    rating: 4.09,
    stock: 32,
    brand: "Huawei",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },
];
// users
let UsersIntinal = [
  { id: 1, email: "admin@admin.com", password: "admin@123" },
  { id: 2, email: "siva@gmail.com", password: "siva" },
  { id: 3, email: "honeysiva@gmail.com", password: "siva@2000" },
];
// load the pages
window.addEventListener("load", () => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(UsersIntinal));
  }
  // loading the products and Users
  if (!localStorage.getItem("product")) {
    localStorage.setItem("product", JSON.stringify(Products));
  }
  if (location.pathname === "/admin/admin.html") {
    loadAdminHomePage();
  }
  if (location.pathname === "/index.html") {
    loadHomePage();
  }
  if (location.pathname === "/admin/add_product.html") {
    let parameterurl = window.location.search;
    let urlparams = new URLSearchParams(parameterurl);
    let productid = urlparams.get("id");
    if (productid) {
      const products = JSON.parse(localStorage.getItem("product"));
      const product = products.find(
        (product) => product.id === parseInt(productid)
      );
      pushproduct(product);
    }
  }
  if (location.pathname === "/pages/cart.html") {
    loadCartProduct();
  }

  if (location.pathname === "/pages/order.html") {
    loadOrderPage();
  }
  if (location.pathname === "/admin/orders.html") {
    loadAdminOrder();
  }
});
// random id
const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};
const getRandomId = (type = "user") => {
  let num = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = getRandomNumber();
    const checkingId = num.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};
// login section
const Signinfunction = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");
  if (emailRef.value.length === 0) {
    errorRef.innerText = "Email is empty";
    return;
  }
  if (!validateEmail(emailRef.value)) {
    errorRef.innerText = "Invalid email";
    return;
  }
  if (passwordRef.value.length === 0) {
    errorRef.innerText = "password is empty";
    return;
  }
  if (passwordRef.value.length < 3) {
    errorRef.innerText = "Invalid password";
    return;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUser = user.find(
    (user) =>
      user.email === emailRef.value && user.password === passwordRef.value
  );
  if (!loggedInUser) {
    errorRef.innerText = "Invalid user";
  } else {
    sessionStorage.setItem("userId", loggedInUser.id);
    if (emailRef.value === "admin@admin.com")
      location.replace("/admin/admin.html");
    else location.replace("/index.html");
  }
};
// email checking
const validateEmail = (email) => {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
//signup section
const Signupfunction = () => {
  const emailRef = document.getElementById("regemail");
  const nameRef = document.getElementById("regname");
  const passwordRef = document.getElementById("regpassword");
  const confirmPasswordRef = document.getElementById("regconfrimpassword");
  const errorRef = document.getElementById("error");
  if (emailRef.value.length === 0) {
    errorRef.innerText = "Email is empty";
    return;
  }
  if (!validateEmail(emailRef.value)) {
    errorRef.innerText = "Invalid email";
    return;
  }
  if (passwordRef.value.length === 0) {
    errorRef.innerText = "password is empty";
    return;
  }
  if (passwordRef.value.length < 3) {
    errorRef.innerText = "Invalid password";
    return;
  }
  let user = JSON.parse(localStorage.getItem("user"));
  user.push({
    id: getRandomId(),
    email: emailRef.value,
    password: passwordRef.value,
  });
  localStorage.setItem("user", JSON.stringify(user));
  location.href = "/pages/login.html";
};
//signout section
const SignOutfunction = () => {
  location.replace("/pages/login.html");
};
// loading Products in admin page
const loadAdminHomePage = () => {
  const productsRef = document.getElementById("tablebody");
  let products = JSON.parse(localStorage.getItem("product"));

  let body = "";
  for (let product of products) {
    body += `<tr> <td><img src="${
      product.thumbnail
    }"alt="" style = height:50px; /></td>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 29)}</td>
    <td>${product.price}</td>
    <td>
      <button class="btn-outline-dark rounded"onClick="editProductfunction(${
        product.id
      })">edit</button>
      <button class="btn-outline-danger rounded" onClick="deleteProductfunction(${
        product.id
      })">delete</button>
    </td><tr>`;
  }
  productsRef.innerHTML = body;
};
// delete product - admin page
const deleteProductfunction = (id) => {
  const products = JSON.parse(localStorage.getItem("product"));
  const filterTheProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("product", JSON.stringify(filterTheProducts));
  loadAdminHomePage();
};
// loading products in home page
const loadHomePage = () => {
  const productsRef = document.getElementById("Productbody");
  const products = JSON.parse(localStorage.getItem("product"));
  let productbody = "";
  for (let product of products) {
    productbody += ` <div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-success" onClick="addToCartfunction(${product.id})">Add to Cart</button>
    </div>
  </div>`;
  }
  productsRef.innerHTML = productbody;
};

// Add products
const Addproduct = () => {
  const nameRef = document.getElementById("name");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("desc");
  const imageRef = document.getElementById("image");
  let products = JSON.parse(localStorage.getItem("product"));
  console.log("hi");
  products.push({
    id: getRandomId(),
    title: nameRef.value,
    description: descriptionRef.value,
    price: priceRef.value,
    thumbnail: imageRef.value,
  });
  localStorage.setItem("product", JSON.stringify(products));
  location.href = "/admin/admin.html";
};
// edit the product

const editProductfunction = (id) => {
  location.href = `/admin/add_product.html?id=${id}`;
};
//push product
const pushproduct = (product) => {
  const nameRef = document.getElementById("name");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("desc");
  const imageRef = document.getElementById("image");
  const idRef = document.getElementById("id");
  const titleRef = document.getElementById("title");
  const btnRef = document.getElementById("btn");

  idRef.value = product.id;
  nameRef.value = product.title;
  priceRef.value = product.price;
  descriptionRef.value = product.description;
  imageRef.value = product.thumbnail;
  titleRef.innerText = "Edit Product";
  btnRef.innerText = "Update Product";
};

// Add to cart
const addToCartfunction = (id) => {
  let Addtocart = JSON.parse(localStorage.getItem("product"));
  const products = Addtocart.find((product) => product.id === parseInt(id));
  if (!sessionStorage.getItem("userId")) {
    location.replace("/pages/login.html");
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    // console.log(cart.length);
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((product) => {
        if (
          product.id === parseInt(id) &&
          product.userId === parseInt(userId)
        ) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...products });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// loading cart
const loadCartProduct = () => {
  const cartTableRef = document.getElementById("tablebody1");
  const totalRef = document.getElementById("total");
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const usercart = cart.filter((c) => c.userId === userId);
      let body = "";
      let total = 0;
      for (let cartItem of usercart) {
        total = total + parseInt(cartItem.price) * parseInt(cartItem.count);
        body += `<tr>
            <td>${cartItem.title}</td>
            <td>${cartItem.count}</td>
            <td>${cartItem.price}</td>
            <td>₹ ${cartItem.price * cartItem.count}</td>
          </tr>`;
      }
      cartTableRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/pages/login.html";
    }
  }
};
// checkout process
const checkOutFunction = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const Currentuser = cart.filter((c) => c.userId === userId);
      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        userId: userId,
        status: "Pending",
        products: Currentuser,
      });
      const othersCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(othersCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      // updateCartCount();
      location.href = "/index.html";
    } else {
      Location.href = "/index.html";
    }
  } else {
    Location.href = "/pages/login.html";
  }
};
// load the user orders
const loadOrderPage = () => {
  const tableRef = document.getElementById("tablebody2");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);
      body = "";
      let total = 0;
      let product = "";
      for (let order of userOrder) {
        for (let prod of order.products) {
          total = total + parseInt(prod.count) * parseInt(prod.price);
          product += `<p>${prod.count} - ${prod.title}</p>`;
        }
        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        body += `<tr>
            <td>${order.userId}</td>
            <td>${product}</td>
            <td>${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      tableRef.innerHTML = body;
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/pages/login.html";
  }
};
// admin order load
const loadAdminOrder = () => {
  const tableRef = document.getElementById("tablebody3");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      body = "";

      for (let order of orders) {
        let total = 0;
        let product = "";
        for (let prod of order.products) {
          total = total + parseInt(prod.count) * parseInt(prod.price);
          product += `<p>${prod.count} * ${prod.title}</p>`;
        }
        const users = JSON.parse(localStorage.getItem("user"));
        const orderedUser = users.find(
          (user) => user.id === parseInt(order.userId)
        );

        body += `<tr>
          <td>${order.userId}</td>
          <td>${orderedUser.email}</td> 
            <td>${product}</td>
            <td>₹${total}</td>
            <td>
              <select id="status${order.userId}">
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>`;
      }

      tableRef.innerHTML = body;
      for (let order of orders) {
        for (let prod of order.products) {
          const statusRef = document.getElementById(`status${order.userId}`);
          statusRef.value = order.status;
          statusRef.addEventListener("change", () => {
            const lastUpdatedOrders = JSON.parse(
              localStorage.getItem("orders")
            );
            const updatedOrders = lastUpdatedOrders.map((o) => {
              if (o.userId === order.userId) {
                return { ...o, status: statusRef.value };
              } else return o;
            });
            localStorage.setItem("orders", JSON.stringify(updatedOrders));
          });
        }
      }
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/pages/login.html";
  }
};
