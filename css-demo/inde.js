class People {
    name: string = ''
    age: number = ''
    des: string = ''
    constructor(name: string, name: number, des: string) {
        this.name = name
        this.age = age
        this.des = des
    }
}

async function peopleFactory(description: any) {
    const name = await getComputedStyle('someUrl')
    const age = await getAge('someUlr?='name)
    const des = handleDes(description)
    return new People(name, age, des)
}

// ----------

interface RunOptions {
    program: String;
    commandLine: string[]|string|(()=> stirng)
}

interface NameList {
    [index: number]: string
}

interface NameList {
    [index: string]: string
}

-------------

enum Color { Red, Green, Blue }
let c: Color = Color.Green // 1
// or
enum Color { Red = 1, Green, Blue = 4 }
let c: Color = Color.Green // 2

let colorName: string = Color[2]
let colorName: string = Color[Color.Green]