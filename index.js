const fs = require('fs');
const readLine = require('readline');
const prompt = require('prompt-sync')();

function parseFile(filePath, delimeter, fields) {
  // Create variables to store our outputs, as well as a flag to check for the header row.
  outputCorrect = '';
  outputIncorrect = '';
  headerRow = true;

  // Open our file and error if it's not found.
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', function(err) {
      console.log('File not found. Please check your file path.');
  });

  const rl = readLine.createInterface({
      input: fileStream,
      output: null
  });

  rl.on('line', function(line) {
      // Skip the header row. Split by delimeter, then check if the number of elements in the array match the number of fields we're looking for. If so, we'll add it to our correct output and if not, we'll add it to our incorrect output.
      if(headerRow) headerRow = false;
      else {
          if(line.split(delimeter).length == fields) outputCorrect += line + '\n';
          else outputIncorrect += line + '\n';
      };
  });

  rl.on('close', () => {
      // We're going to use the current epoch time as our ID for these files.
      now = Date.now();
      filesGenerated = false;

      console.log('Results for ' + now + '. (Files can be found in "output" directory.)');
      if(outputCorrect) fs.writeFile('output/' + now + '_correct', outputCorrect, function(err) {
          if(err) return console.log(err);
          console.log('Generated file for correct output.');
      });
      else console.log('No file generated for correct output.');

      if(outputIncorrect) fs.writeFile('output/' + now + '_incorrect', outputIncorrect, function(err) {
          if(err) return console.log(err);
          console.log('Generated file for incorrect output.');
      });
      else console.log('No file generated for incorrect output.');
  });
};

// For all three of our prompts, we're going to loop them until the responses pass validation.
filePath = '';
delimeter = '';
fields = '';

while(filePath == '') filePath = prompt('Where is the file located? ');
if(filePath.indexOf('/') == -1) filePath = 'input/' + filePath; // If the user provides a string with /, then we'll assume they're giving an exact file path and use it. Otherwise, we'll assume that the file they're looking for is in the 'input' folder.

while(delimeter == '') {
    formatPrompt = prompt('Is the file format CSV (comma-separated values) or TSV (tab-separated values)? ');
    formatPrompt = formatPrompt.toLowerCase();

    // We'll use a switch to validate their input and update the delimeter if their input is correct.
    switch(formatPrompt) {
        case 'csv':
            delimeter = ',';
            break;
        case 'tsv':
            delimeter = '\t';
            break;
        default:
            console.log('Please enter either CSV or TSV.');
    };
};

while(fields == '') {
    fieldsPrompt = prompt('How many fields should each record contain? ');

    // We'll validate that they're entering a number.
    if(!isNaN(fieldsPrompt)) fields = fieldsPrompt;
    else console.log('Please provide a number.');
}

parseFile(filePath, delimeter, fields);
