const { FakeCPU } = require('./fakeCpu');
const { isRegisterExist } = require('./fakeCpu');

const parser = (code) => {
    const sourceCodeLines = code.split('\n');
    const codeFrames = [];
    const labels = {};

    for (let i = 0; i < sourceCodeLines.length; i++) {
        const codeLine = sourceCodeLines[i].trim().replace(', ', ',');
        if (codeLine.length === 0) {
            continue;
        }
        let operation = codeLine.split(' ');
        if (operation[0][0].toUpperCase() === operation[0][0]) {
            if (operation.length !== 1) {
                throw `${i}: Labels mut not have operands!`;
            }
            codeFrames.push([operation[0]]);
            labels[operation[0].replace(':', '')] = codeFrames.length - 1;
            continue;
        }

        if (!FakeCPU.commands.includes(operation[0])) {
            throw `${i}: Command is not valid!`;
        }
        if (operation.length <= 1) {
            throw `${i}: Command is not valid!`;
        }
        const args = operation[1].split(',');
        if (FakeCPU.doubleArgumentCommands.includes(operation[0])) {
            if (args.length !== 2) {
                throw `${i}: Not correct amount of arguments`
            }
            if (operation[0] !== 'cmp') {
                isRegisterExist(args[0]);
            }
            else {
                if (!isRegisterExist(args[0], silent = true)) {
                    args[0] = Number(args[0]);
                    if (isNaN(args[0])) {
                        throw `${i}: ${operation[0]} first argument must be register or valid number`;
                    }
                }
            }

            if (!isRegisterExist(args[1], silent = true)) {
                args[1] = Number(args[1]);
                if (isNaN(args[1])) {
                    throw `${i}: ${operation[0]} second argument must be register or valid number`;
                }
            }
        }
        else {
            if (args.length !== 1) {
                throw `${i}: Not correct amount of arguments`
            }
        }
        codeFrames.push([operation[0], args]);
    }
    return [codeFrames, labels];
}

exports.parser = parser; 