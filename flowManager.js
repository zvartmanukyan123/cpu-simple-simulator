const { stateMachine } = require('./stateMachine');
const { FakeCPU } = require("./fakeCpu");

const flowManager = (codeFrames, labels) => {
  const fakeCpu = new FakeCPU();

  for (let i = 0; i < codeFrames.length; i++) {
    console.log(fakeCpu.registers, fakeCpu.flag);
    if (codeFrames[i][0][0].toUpperCase() === codeFrames[i][0][0]) {
      continue;
    }
    if (!FakeCPU.flowChangingCommands.includes(codeFrames[i][0])) {
      stateMachine(fakeCpu, codeFrames[i][0], codeFrames[i][1]);
      continue;
    }
    let isFlowChanged = stateMachine(fakeCpu, codeFrames[i][0], codeFrames[i][1]);
    if (isFlowChanged) {
      i = labels[codeFrames[i][1][0]];
    }
  }
}

exports.flowManager = flowManager;