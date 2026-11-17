import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sampleSolarDay, advanceSolarTime } from '../src/lib/solar.mjs';
test('one minute wraps continuously, including after multiple visits', () => {
  for (const seconds of [0, 2, 10, 22, 42, 52, 59]) {
    assert.deepEqual(sampleSolarDay(seconds), sampleSolarDay(seconds + 60));
  }
  const before = sampleSolarDay(59.999), after = sampleSolarDay(0);
  before.sky.forEach((v, i) => assert.ok(Math.abs(v - after.sky[i]) < .01));
  for (let second = 55; second < 109; second++) {
    assert.ok(sampleSolarDay(second + 1).x > sampleSolarDay(second).x);
  }
  assert.equal(sampleSolarDay(54.9).sunVisibility, 0);
  assert.equal(sampleSolarDay(55).sunVisibility, 0);
  assert.ok(sampleSolarDay(54.9).x > 100 && sampleSolarDay(55).x < 0);
});
test('night is brief and daylight occupies most of the cycle', () => {
  const counts = { Dawn: 0, Daylight: 0, Dusk: 0, Night: 0 };
  for (let i = 0; i < 60; i++) counts[sampleSolarDay(i).phase]++;
  assert.equal(counts.Night, 6);
  assert.ok(counts.Daylight > 30);
});
test('hidden tabs never advance the active-viewing clock', () => {
  assert.equal(advanceSolarTime(91, 600, false), 91);
  assert.equal(advanceSolarTime(91, 2, true), 93);
  assert.equal(advanceSolarTime(91, -2, true), 91);
});
test('all phase boundaries interpolate without jumps or invalid light', () => {
  for (const at of [6.4, 22, 42, 49, 52, 55, 60]) {
    const a = sampleSolarDay(at - .001), b = sampleSolarDay(at);
    for (const field of ['sky', 'sun', 'horizon']) a[field].forEach((v, i) => assert.ok(Math.abs(v - b[field][i]) < .02));
    assert.ok(b.light >= .3 && b.light <= 2.3);
  }
});
