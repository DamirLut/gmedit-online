///@ts-nocheck

import fs from './fsWrapper.js';
/**
 *
 * @returns {Object}
 */
export default function readJson(path) {
  const data = fs().readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(data);
}
