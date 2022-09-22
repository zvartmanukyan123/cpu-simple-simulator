const e = require("express");


function isRegisterExist(regName, silent = false) {
    if (!FakeCPU.registerNames.includes(regName)) {
        if (silent) {
            return false;
        }
        throw `${regName} does not exists`;
    }
    return true;
}

class FakeCPU {
    static singleArgumentCommands = ['jmp', 'jl', 'jle', 'jg', 'jge', 'print'];
    static doubleArgumentCommands = ['mov', 'add', 'sub', 'div', 'mul', 'and', 'or', 'xor', 'cmp'];
    static flowChangingCommands = ['jmp', 'jl', 'jle', 'jg', 'jge'];
    static commands = this.singleArgumentCommands.concat(this.doubleArgumentCommands);
    static registerNames = ['reg1', 'reg2', 'reg3', 'reg4', 'reg5']
    constructor() {
        this.registers = Object.fromEntries(FakeCPU.registerNames.map((i) => { return [i, 0] }));
        this.flag = 0;
    }

    isValueValid(value) {
        if (typeof (value) !== 'number') {
            throw `${regName} is not value type`;
        }
    }

    getArgValue(arg) {
        if (isRegisterExist(arg, silent = true)) {
            return this.registers[arg];
        }
        this.isValueValid(arg);
        return arg;
    }

    mov(regName, value) {
        this.registers[regName] = this.getArgValue(value);
    }

    add(arg1, arg2) {
        this.registers[arg1] += this.getArgValue(arg2);
    }

    sub(arg1, arg2) {
        this.registers[arg1] -= this.getArgValue(arg2);
    }

    mul(arg1, arg2) {
        this.registers[arg1] *= this.getArgValue(arg2);
    }

    div(arg1, arg2) {
        this.registers[arg1] /= this.getArgValue(arg2);
    }

    and(arg1, arg2) {

        this.registers[arg1] &= this.getArgValue(arg2);
    }


    or(arg1, arg2) {
        this.registers[arg1] |= this.getArgValue(arg2);
    }

    xor(arg1, arg2) {
        this.registers[arg1] ^= this.getArgValue(arg2);
    }

    cmp(arg1, arg2) {
        if (arg1 > arg2) {
            this.flag = 1;
        } else if (arg1 < arg2) {
            this.flag = -1;
        } else {
            this.flag = 0;
        }
    }

    jmp(arg) {
        return true;
    };

    jl(arg) {
        if (this.flag === -1) {
            return true;
        }
        return false;
    }

    jle(arg) {
        if (this.flag !== 1) {
            return true;
        }
        return false;
    }

    jg(arg) {
        if (this.flag === 1) {
            return true;
        }
        return false;
    }

    jge(arg) {
        if (this.flag !== -1) {
            return true;
        }
        return false;
    }

    print(arg) {
        console.log(this.getArgValue(arg));
    }
}

exports.FakeCPU = FakeCPU;
exports.isRegisterExist = isRegisterExist;