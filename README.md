This node console application was developed by Rendell Banzon for the Runbeck Code Exercise. It simply takes a file, parses the lines based on parameters provided by the user, and creates separate files for records that met the format requirement and records that did not.

The application asks the user 3 questions (as well as validates their input) to gather parameters:
1. Where is the file located?
2. Is the file format CSV (comma-separated values) or TSV (tab-separated values)?
3. How many fields should each record contain?

The application then produces up to two output files. One file contains the records (if any) with the correct number of fields. The second contains the records (if any) with the incorrect number of fields. Neither file contains the header row and if there are no records for a given output file, it is not created. These files can be found in the "output" directory.

To run, simply run `npm install` and then `npm start`.
