class MyArray {
  constructor() {
    this.length = 0;
  }

  push(...elems) {
    // добавить элементы в конец массива
    for (let i = 0; i < elems.length; i++) {
      this[this.length++] = elems[i];
    }
    //  возвращает новую длину массива
    return this.length;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }

    const deletedValue = this[this.length - 1];
    delete this[--this.length];
    return deletedValue;
  }
  
  extractOrPush(newArray, item) {

    // проверить, является ли элемент экземпляром MyArray или  массивом
    if (MyArray.isMyArray(item) || Array.isArray(item)) {
        // если да, то рекурсивно распаковываем вложенный объект или массив
        for (let i = 0; i < item.length; i++) {
            this.extractOrPush(newArray, item[i]);
        }
    } else {
    // если нет то просто его ложим
        newArray.push(item);
    }
      
    return newArray;
  }
  concat(...items) {
    // создать новый массив
    const newArray = new MyArray();
    // заполнить новый массив элементами из старого
    for (let i = 0; i < this.length; i++) {
      // newArray[newArray.length++] = this[i];
      newArray.push(this[i]);
    }
    // положить все аргументы которые нам дали
    for (let i = 0; i < items.length; i++) {
        this.extractOrPush(newArray, items[i]);
    }
    // вернуть новый массив
    return newArray;
  }

  [Symbol.iterator]() {
    const context = this; // конкрентный массив
    let i = 0; // текущий индекс

    return {
      next() {
        return {
          done: i >= context.length, // проверка закончили мі обход или нет
          value: context[i++], // текущее значение
        };
      },
    };
  }

  static isMyArray(obj) {
    return obj instanceof MyArray;
  }
}

const myArr = new MyArray();
myArr.push(10, 20, 30);
const myArr1 = new MyArray();
myArr1.push(10000, 20000, [1, 2, [3, 4, 5]]);
const myArr2 = myArr.concat(null, 40, 50, 60, myArr1).concat(6, [7, 8, [9, 10, 11]]);

//const myArr2 = myArr.concat(6, [7, 8, [9, 10, 11]]);

//const arr = [1, 2];
//const arr2 = arr.concat(50, 60, true, ['test', undefined, null]);
//arr.unshift(10);

// for (const item of myArr) {
//   console.log('myArr');
//   console.log(item);
//   console.log('myArr');
// }