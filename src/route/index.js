// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
class User {
  static #list = []

  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}
// ================================================================

router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body
  const user = new User(email, login, password)
  User.add(user)
  console.log(User.getList())

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач створений',
  })
})

// ================================================================

// ================================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query
  console.log(typeof id)

  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач видалений',
  })
})

// ================================================================

router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  let result = false
  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'Емайл пошта оновлена'
      : 'Сталася помилка',
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  console.log(Product.getList())

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Товар створений',

    // ↑↑ сюди вводимо JSON дані
  })
})
// ================================================================
class Product {
  static #list = []

  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = new Date().getTime()
  }

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static update = (
    product,
    { name, price, description },
  ) => {
    product.name = name
    product.price = price
    product.description = description
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      return this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  const list = Product.getList()
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',

    data: {
      list,
      isEmpty: list.length === 0,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
  const { id } = req.query

  console.log(typeof id)

  const product = Product.getById(Number(id))
  console.log(product)

  if (product) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-edit', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-edit',
    info: 'Товар відредагований',

    // ↑↑ сюди вводимо JSON дані
  })
})
// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-edit', function (req, res) {
  const { name, price, description, id } = req.body

  const product = Product.getById(Number(id))
  Product.update(product, { name, price, description })
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Успішне виконання',

    // ↑↑ сюди вводимо JSON дані
  })
})
// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-delete', function (req, res) {
  const { id } = req.query

  const product = Product.deleteById(Number(id))

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Товар видалений',

    // ↑↑ сюди вводимо JSON дані
  })
})
// ================================================================
// ================================================================

class Purchase {
  static #list = []

  static #count = 0
  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Purchase.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }

  static add = (...data) => {
    const newPurchase = new Purchase(...data)

    this.#list.push(newPurchase)
  }

  static getList = () => {
    return this.#list
  }
  static getById = (id) => {
    return this.#list.find((purchase) => purchase.id === id)
  }
  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (purchase) => purchase.id !== id,
    )

    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )
    return shuffledList.slice(0, 3)
  }
}
Purchase.add(
  '/https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  10,
)
Purchase.add(
  '/https://picsum.photos/200/300',
  `Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel`,
  `Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux`,
  [{ id: 2, text: 'Топ продажів' }],
  17000,
  10,
)
Purchase.add(
  '/https://picsum.photos/200/300',
  `Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119)`,
  `Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС`,
  [{ id: 2, text: 'Готовий до відправки' }],
  113109,
  10,
)

Prodact.add(`Футбольний м'яч`[{ id: 14587 }], 1260.75, 12.6)
Prodact.add(
  `Смартфон Xiaomi Redmi Note 10`[{ id: 14602 }],
  5599.0,
  55.99,
)
Prodact.add(
  `Телевізор Samsung 55" 4K Ultra HD`[{ id: 14619 }],
  22999.0,
  229.99,
)
Prodact.add(
  `Акустична система JBL Charge 4`[{ id: 14624 }],
  4999.0,
  49.99,
)
Prodact.add(
  `Фотокамера Canon EOS M50`[{ id: 14631 }],
  24750.0,
  247.5,
)
class Price {
  static DELEVERY_PRICE = 150
}

class Prodact {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1
  static #count = 0
  static #list = []

  static #bonusAccount = new Map()
  static getBonusBalance = (email) => {
    return Prodact.#bonusAccount.get(email) || 0
  }
  static calcBonusAmount = (value) => {
    return value * Prodact.#BONUS_FACTOR
  }
  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price)
    const currentBalanse = Prodact.getBonusBalance(email)
    const updateBalanse = currentBalanse + amount - bonusUse
  }

  constructor(data, purchase) {
    this.id = ++Prodact.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null
    this.bonus = data.bonus || 0

    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.purchasePrice = data.purchasePrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.purchase = purchase
  }
  static add = (...arg) => {
    const newProdact = new Prodact(...arg)

    this.#list.push(newProdact)
    return newProdact
  }
  static getList = () => {
    return Prodact.#list
      .reserve()
      .map(({ id, purchase, price, bonus }) => {
        id, purchase, price, bonus
      })
  }
  static getById = (id) => {
    return Prodact.#list.find((item) => item.id === id)
  }
  static updateById = (id, data) => {
    const prodact = Prodact.getById(id)

    if (prodact) {
      if (data.firstname) prodact.firstname = data.firstname
      if (data.lastname) prodact.lastname = data.lastname
      if (data.phone) prodact.phone = data.phone
      if (data.email) prodact.email = data.email

      return true
    } else {
      return false
    }
  }
}

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }

  static getbyName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALE25', 0.75)

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-index', function (req, res) {
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Purchase.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Purchase.getRandomList(id),
      purchase: Purchase.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount < 1) {
    return res.render('purchase-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  const purchase = Purchase.getById(id)
  if (purchase.amount < 1) {
    return res.render('purchase-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: 'Помилка',
        info: 'Такої кількості товару нема в наявності',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  console.log(purchase, amount)

  const purchasePrice = purchase.price * amount
  const totalPrice = purchasePrice + Price.DELEVERY_PRICE
  const bonus = Prodact.calcBonusAmount(totalPrice)
  // router.get Створює нам один ентпоїнт

  res.render('purchase-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-create',

    data: {
      id: purchase.id,
      cart: [
        {
          text: `${purchase.title} (${amount} шт)`,
          price: purchasePrice,
        },
        {
          text: `Доставка`,
          price: Price.DELEVERY_PRICE,
        },
      ],
      totalPrice,
      purchasePrice,
      deliveryPrice: Price.DELEVERY_PRICE,
      amount,
      bonus,
    },
  })
  // ↑↑ сюди вводимо JSON дані

  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Purchase.getRandomList(id),
      purchase: Purchase.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-alert', function (req, res) {
  res.render('purchase-alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-alert',

    data: {
      message: `Операція успішна`,
      info: `Товар створений`,
      link: `/test-path`,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-submit', function (req, res) {
  console.log(req.body)
  const id = Number(req.query.id)

  let {
    totalPrice,
    purchasePrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,

    promocode,
  } = req.body

  const purchase = Purchase.getById(id)

  if (!purchase) {
    return res.render('purchase-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: `Помилка`,
        info: `Товар не знайдено`,
        link: `/purchase-list`,
      },
    })
  }

  if (purchase.amount < amount) {
    return res.render('purchase-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: `Помилка`,
        info: `Товару нема в потрібній кількості`,
        link: `/purchase-list`,
      },
    })
  }

  totalPrice = Number(totalPrice)
  purchasePrice = Number(purchasePrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)

  if (
    isNaN(totalPrice) ||
    isNaN(purchasePrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount)
  ) {
    return res.render('purchase-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: `Помилка`,
        info: `Некоректні дані`,
        link: `/purchase-list`,
      },
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('purchase-alert', {
      //вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: `Заповніть обовязкові поля`,
        info: `Некоректні дані`,
        link: `/purchase-list`,
      },
    })
  }

  if (promocode) {
    promocode = Promocode.getbyName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }
  const prodact = Prodact.add(
    {
      totalPrice,
      purchasePrice,
      deliveryPrice,
      amount,

      firstname,
      lastname,
      email,
      phone,

      promocode,
    },
    purchase,
  )
  console.log(prodact) * //
    res.render('purchase-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-alert',

      data: {
        message: `Успішно`,
        info: `Замовлення створено`,
        link: `/purchase-list`,
      },
    })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-list', function (req, res) {
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-list',

    data: {
      list: Prodact.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===============================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-info', function (req, res) {
  res.render('purchase-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-info',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===============================================================

// Підключаємо роутер до бек-енду
module.exports = router
