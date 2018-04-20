var _dec, _dec2, _class, _desc, _value, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

require('babel-register')({
    plugins: ['transform-decorators-legacy']
});

/**
 * @params: father class 
 * @params: method in target class
 * @params: target 
 * 
*/
function decorateDef(flag) {
    return function (target, key, descriptor) {
        const method = descriptor.value;
        let moreDef = 100;
        let ret;
        //可看作重写init
        descriptor.value = (...args) => {
            args[0] += moreDef;
            ret = method.apply(target, args);
            return ret;
        };
        return descriptor;
    };
}

function decorateAtk(target, key, descriptor) {
    const method = descriptor.value;
    let moreAtk = 10;
    let ret;
    //可看作重写init
    descriptor.value = (...args) => {
        args[1] += moreAtk;
        ret = method.apply(target, args);
        return ret;
    };
    return descriptor;
}

function addFly(canFly) {
    return function (target) {
        target.canFly = canFly;
        let extra = canFly ? '(技能加成：飞行能力)' : '';
        let method = target.prototype.toString;
        target.prototype.toString = (...args) => {
            return method.apply(target.prototype, args) + extra;
        };
        return target;
    };
}

let Man = (_dec = addFly(true), _dec2 = decorateDef(true), _dec(_class = (_class2 = class Man {
    constructor(def = 2, atk = 3, hp = 3) {
        this.init(def, atk, hp);
    }
    //@ 声明一个无需执行的装饰器  @会帮你执行    装饰在方法上 target指的是当前类的proptotype  装饰在class上target指的是类本身⭐️⭐️⭐️

    init(def, atk, hp) {
        this.def = def;
        this.atk = atk;
        this.hp = hp;
    }

    test() {
        console.log('i am test');
    }
    toString() {
        return `防御力: ${this.def} 攻击力:${this.atk} 血量:${this.hp}`;
    }
}, (_applyDecoratedDescriptor(_class2.prototype, 'test', [_dec2, decorateAtk], Object.getOwnPropertyDescriptor(_class2.prototype, 'test'), _class2.prototype)), _class2)) || _class);


const tony = new Man();
console.log(tony.toString());

