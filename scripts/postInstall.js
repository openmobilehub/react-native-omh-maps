import { exec } from 'child_process';

function main() {
  exec('lefthook install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Lefthook install error: ${error.message}`);
      return;
    }
  });
}

main();
