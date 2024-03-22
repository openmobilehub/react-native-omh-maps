import { spawn, type SpawnOptionsWithoutStdio } from 'child_process';

export async function spawnWrapper(
  command: string,
  args?: readonly string[] | undefined,
  options?: SpawnOptionsWithoutStdio | undefined
) {
  let child = spawn(command, args, options);
  let stdout = '';
  let stderr = '';

  child.stdout?.setEncoding('utf8');
  child.stdout?.on('data', data => {
    stdout += data;
  });

  child.stderr?.setEncoding('utf8');
  child.stderr?.on('data', data => {
    stderr += data;
  });

  await new Promise<void>((resolve, reject) => {
    child.on('close', code => {
      if (code !== 0) {
        console.log(stdout);
        console.log(stderr);
        reject([code, stdout, stderr]);
      } else {
        resolve();
      }
    });
  });
}
