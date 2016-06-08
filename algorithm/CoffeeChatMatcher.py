import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials

class Person:
	
	def __init__(self, first, last, email, program, country, industry, undergrad_majors, majors, clubs):
		self.first = first
		self.last = last
		self.email = email
		self.program = program
		self.country = country
		self.industry = industry
		self.undergrad_majors = undergrad_majors #set
		self.majors = majors #set
		self.clubs = clubs #set
	
	def score(self, match):
		# Initialize response object
		response = [0, match.first + " " + match.last, match.email]
		# 5 points for the same program
		if self.program == match.program:
			response[0] += 5
			response.append(match.program)
		# 4 points for a common country other than the US
		if self.country != "United States" and self.country == match.country:
			response[0] += 4
			response.append(match.country)
		# 3 points for a common industry
		if self.industry == match.industry:
			response[0] += 3
			response.append(match.industry)
		# 1 point per each common undergrad major
		common_umajors = self.undergrad_majors.intersection(match.undergrad_majors)
		response[0] += 1 * len(common_umajors)
		response.extend(common_umajors)
		# 2 points per each common Kellogg major/pathway
		common_majors = self.majors.intersection(match.majors)
		response[0] += 2 * len(common_majors)
		response.extend(common_majors)
		# 3 points for each common club interest
		common_clubs = self.clubs.intersection(match.clubs)
		response[0] += 3 * len(common_clubs)
		response.extend(common_clubs)
		# Return response object
		return response

# Load credentials for gspead
scope = ['https://spreadsheets.google.com/feeds']
credentials = ServiceAccountCredentials.from_json_keyfile_name('GSpread Module-e7ff722057e0.json', scope)
gc = gspread.authorize(credentials)

# Open Google spreadsheet
wks = gc.open("Student Contact Form: Kellogg Prospective Student Coffee Chats (Responses)").sheet1

# Initialize lists for current students and prospective students to be matched
students = []
prospectives = []

# Import all rows from the spreadsheet as Person objects and add them to the appropriate list
row_num = 2
while (wks.cell(row_num,1).value):
	vals = wks.row_values(row_num)
	person = Person(vals[1],vals[2],vals[3],vals[4],vals[7],vals[8],set(vals[9].split(',')),set(vals[10].split(',')),set(vals[11].split(',')))
	if vals[5]=='Current Student':
		students.append(person)
	else:
		prospectives.append(person)
	row_num += 1

# Score potential matches for each prospective student
for i in prospectives:
	print 'Best Matches for ' + i.first + ' ' + i.last + ' (' + i.email + '):'
	scores = [i.score(j) for j in students]
	scores.sort(reverse=True)
	for k in range(3):
		print str(k+1) + '. ' + scores[k][1] + ' (' + scores[k][2] + ')'
		print '\tMatch Score: ' + str(scores[k][0])
		reasons = '\tCommon Factors: ' + str(scores[k][3])
		for reason in scores[k][4:]:
			reasons += ', ' + reason
		print reasons