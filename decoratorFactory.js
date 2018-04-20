function factoryOfDec(params, fn, override) {
    return function (target, key, descriptor) {
        if (typeof target !== 'function') {
            throw new Error('please decorate correct origin')
            return null;
        }
        let method;
        //修饰类
        if (!key && !descriptor) {
            method = target.prototype;
            target.prototype[override]
            return target;
        }
        //修饰内部方法
        method = descriptor.value;
        descriptor.value = (...args) => {
            const ret = method.apply(target, fn(args));
            return ret;
        }
        return descriptor;
    }
}