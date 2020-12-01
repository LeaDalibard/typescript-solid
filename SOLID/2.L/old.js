"use strict";
//This is called a Union, the discountType can only contain the following 2 values:
var VARIABLE = "variable";
var FIXED = "fixed";
var NO_DISCOUNT = "none";
var VariableDiscount = /** @class */ (function () {
    function VariableDiscount(value) {
        if (value === void 0) { value = 0; }
        this._type = VARIABLE;
        this._value = value;
        if (value <= 0) {
            throw new Error('You cannot create a ' + this._type + ' discount with a negative value');
        }
    }
    VariableDiscount.prototype.apply = function (price) {
        return (price - (price * this._value / 100));
    };
    VariableDiscount.prototype.showCalculation = function (price) {
        return price + " € -  " + this._value + "%";
    };
    return VariableDiscount;
}());
var FixedDiscount = /** @class */ (function () {
    function FixedDiscount(value) {
        if (value === void 0) { value = 0; }
        this._type = FIXED;
        this._value = value;
        if (value <= 0) {
            throw new Error('You cannot create a ' + this._type + ' discount with a negative value');
        }
    }
    FixedDiscount.prototype.apply = function (price) {
        return Math.max(0, price - this._value);
    };
    FixedDiscount.prototype.showCalculation = function (price) {
        return price + "€ -  " + this._value + "€ (min 0 €)";
    };
    return FixedDiscount;
}());
var NoDiscount = /** @class */ (function () {
    function NoDiscount() {
        this._type = NO_DISCOUNT;
        this._value = 0;
    }
    NoDiscount.prototype.apply = function (price) {
        return price;
    };
    NoDiscount.prototype.showCalculation = function (price) {
        return "No discount";
    };
    return NoDiscount;
}());
var Product = /** @class */ (function () {
    function Product(name, price, discount) {
        this._name = name;
        this._price = price;
        this._discount = discount;
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "discount", {
        get: function () {
            return this._discount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "originalPrice", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
    //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
    Product.prototype.calculatePrice = function () {
        return this._discount.apply(this._price);
    };
    Product.prototype.showCalculation = function () {
        return this._discount.showCalculation(this._price);
    };
    return Product;
}());
var shoppingBasket = /** @class */ (function () {
    function shoppingBasket() {
        //this array only accepts Product objects, nothing else
        this._products = [];
    }
    Object.defineProperty(shoppingBasket.prototype, "products", {
        get: function () {
            return this._products;
        },
        enumerable: false,
        configurable: true
    });
    shoppingBasket.prototype.addProduct = function (product) {
        this._products.push(product);
    };
    return shoppingBasket;
}());
var cart = new shoppingBasket();
cart.addProduct(new Product('Chair', 25, new FixedDiscount(10)));
//cart.addProduct(new Product('Chair', 25, new Discount("fixed", -10)));
cart.addProduct(new Product('Table', 50, new VariableDiscount(25)));
//cart.addProduct(new Product('Table', 50, new Discount("variable", 25)));
cart.addProduct(new Product('Bed', 100, new NoDiscount));
var tableElement = document.querySelector('#cart tbody');
cart.products.forEach(function (product) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerText = product.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.originalPrice.toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.calculatePrice().toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.showCalculation();
    tr.appendChild(td);
    tableElement.appendChild(tr);
});
/* class Discount {
    private _type: discountType;
    private _value: number;

    constructor(type: discountType, value: number = 0) {
        this._type = type;
        this._value = value;

        if (this._type != 'none' && value <= 0) {
            throw new Error('You cannot create a ' + this._type + ' discount with a negative value');
        }
    }

    apply(price: number): number {
        //@todo: instead of using magic values as string in this, it would be a lot better to change them into constant. This would protect us from misspellings. Can you improve this?
        if (this._type === "none") {
            return price;
        } else if (this._type === "variable") {
            return (price - (price * this._value / 100));
        } else if (this._type === "fixed") {
            return Math.max(0, price - this._value);
        } else {
            throw new Error('Invalid type of discount');
        }
    }

    showCalculation(price: number): string {
        if (this._type === "none") {
            return "No discount";
        } else if (this._type === "variable") {
            return price + " € -  " + this._value + "%";
        } else if (this._type === "fixed") {
            return price + "€ -  " + this._value + "€ (min 0 €)";
        } else {
            throw new Error('Invalid type of discount');
        }
    }
}*/ 
