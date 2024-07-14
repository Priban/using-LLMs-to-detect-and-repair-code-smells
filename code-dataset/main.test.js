const fs = require('fs');
const path = require('path');

// All subdirectory names in code_smells
const codeSmells = fs.readdirSync('./code_smells').filter(file => fs.statSync(path.join('./code_smells', file)).isDirectory());

console.log('Running tests for code smells:', codeSmells);

const getCodeSmellDir = (codeSmell) => path.join(__dirname, 'code_smells', codeSmell);

const runTestsForCodeSmell = (codeSmell) => {
  try {
    const files = fs.readdirSync(getCodeSmellDir(codeSmell));

    files.forEach(file => {
      if (file.endsWith('.tests.js')) {
        const testsPath = path.join(getCodeSmellDir(codeSmell), file);
        const runDescribe = require(testsPath);
        const sampleNumber = file.split('.')[0];

        runTestsForCodeSmellSample(codeSmell, runDescribe, sampleNumber);
      }
    });
  } catch (e) {
    console.error(e);
    console.error(`No tests run for ${codeSmell}`);

    // If there are no tests for the code smell, run a dummy test
    describe(codeSmell, () => {
      test('should run tests for code smell', () => {
        expect(false).toBe(true);
      });
    });
  }
}

const runTestsForCodeSmellSample = (codeSmell, runDescribe, sampleNumber) => {
  // try {
  //   const { API: originalAPIClass } = require(path.join(getCodeSmellDir(codeSmell), sampleNumber));
  //   runTestsForAPIClass(originalAPIClass, runDescribe, `${codeSmell}-${sampleNumber}-original`);
  // } catch (e) {
  //   console.error(`No tests run for ${codeSmell}-${sampleNumber}-original`);
  // }

  // return

  try {
    // If the refactored directory does not exist, skip running tests for refactored code
    if (!fs.existsSync(path.join(getCodeSmellDir(codeSmell), '/refactored'))) {
      return;
    }

    const files = fs.readdirSync(path.join(getCodeSmellDir(codeSmell), '/refactored'));

    files.forEach(file => {
      if (file.endsWith('.js') && file.startsWith(sampleNumber)) {
        const refactoredAPIPath = path.join(getCodeSmellDir(codeSmell), 'refactored', file);
        const { API: refactoredAPIClass } = require(refactoredAPIPath);
        const refactoredSampleNumber = file.split('.')[0].split('_')[1];
        const sampleDescription = `${codeSmell}-${sampleNumber}-${refactoredSampleNumber}`;

        runTestsForAPIClass(refactoredAPIClass, runDescribe, sampleDescription);
      }
    });

  } catch (e) {
    console.error(`No tests run for ${codeSmell}-${sampleNumber}`);
    console.error(e);
  }
}

const runTestsForAPIClass = (APIClass, runDescribe, description) => {
  runDescribe(APIClass, description);
}

codeSmells.forEach(runTestsForCodeSmell);