import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../apps/simulator/dist/', import.meta.url));
const target = fileURLToPath(new URL('../api/_lab-assets/', import.meta.url));
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });
console.log('Simulator bundled for authenticated server delivery.');
