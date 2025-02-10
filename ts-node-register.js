import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register ts-node for loading TypeScript files
register('ts-node/esm', pathToFileURL('./'));

// Import the server file to run it
import './backend/src/server.ts';
