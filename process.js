import { spawn } from 'child_process';

const uint8arrayToString = (data) => String.fromCharCode.apply(null, data);
const compute = async (tankData) => new Promise((resolve, reject) => {
  const pyProg = spawn('python', ['./main.py', JSON.stringify(tankData)]);

  pyProg.stdout.on('data', (data) => {
    resolve(uint8arrayToString(data));
  });

  pyProg.stderr.on('data', (data) => {
    reject(uint8arrayToString(data));
  });
});

export default compute;
