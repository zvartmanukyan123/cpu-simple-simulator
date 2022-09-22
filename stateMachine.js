const stateMachine = (fakeCpu, commandName, args) => {
    let currentCommandIndex = 0;
    switch (commandName) {
        case 'mov':
            return fakeCpu.mov(...args);
        case 'add':
            return fakeCpu.add(...args);
        case 'sub':
            return fakeCpu.sub(...args);
        case 'mul':
            return fakeCpu.mul(...args);
        case 'div':
            return fakeCpu.div(...args);
        case 'and':
            return fakeCpu.and(...args);
        case 'or':
            return fakeCpu.or(...args);
        case 'xor':
            return fakeCpu.xor(...args);
        case 'cmp':
            return fakeCpu.cmp(...args);
        case 'jmp':
            return fakeCpu.jmp(...args);
        case 'jl':
            return fakeCpu.jl(...args);
        case 'jle':
            return fakeCpu.jle(...args);
        case 'jg':
            return fakeCpu.jg(...args);
        case 'jge':
            return fakeCpu.jge(...args);
        case 'print':
            return fakeCpu.print(...args);
    }
}

exports.stateMachine = stateMachine;