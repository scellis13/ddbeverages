Program: server.js
Created by Sean Ellis

Run Instructions: node server.js
Port Listening: 3000


Limitations:
	- Program is stuck not allowing more than one MySQL Connection whenever a shellscript file runs multiple curl commands.
		Expected Output: Add data for all curl commands
		Actual Output: Registers new user and adds only 1 curl statement of data.
	- Minimal functioning table design. 
		Expected Output: Navigate between UI tables to view different data
		Actual Output: Static Tables that show current data.

URL Working:
	/review
	/datareview
	/active

URL Not Working:
	/map
	/datareview for specific id