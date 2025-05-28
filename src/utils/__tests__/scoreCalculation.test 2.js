const assert = require('assert');
const { calculateAssessmentResults } = require('../scoreCalculation.js');

const answers = [
  { questionId: 1, pillar: 'Data Spine Health', value: 3 },
  { questionId: 2, pillar: 'Data Spine Health', value: 4 },
  { questionId: 6, pillar: 'Funnel Intelligence & Attribution', value: 2 },
];

const result = calculateAssessmentResults(answers);

assert.strictEqual(result.totalScore, 9);
assert.strictEqual(result.maxPossibleScore, 12);
assert.strictEqual(result.percentage, 75);
assert.strictEqual(result.readinessLevel, 'AI Ready');

console.log('scoreCalculation tests passed'); 