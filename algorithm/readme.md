Coffee Chat Matcher
===================
Matches every prospective student with a current student. It currently pulls from the first sheet of the ​"Student Contact Form: Kellogg Prospective Student Coffee Chats (Responses)" workbook. 

Setup:
-----------
```
$ pip install --upgrade oauth2client
$ pip install --upgrade PyOpenSSL
$ pip install --upgrade gspread

```

Use:
-----------
```
$ python CoffeeChatMatcher.py 

```

Sample:
-----------
```
$ python CoffeeChatMatcher.py
Best Matches for Francois Manil (francois.manil@gmail.com):
1. Hyewon Kwak (hyewon.kwak07@gmail.com)
	Match Score: 19
	Common Factors: 2 Year MBA,  Social Impact,  Net Impact,  Energy Club,  Emerging Markets Club,  Social Venture Hub
2. Emily Benigno (ebenigno2016@kellogg.northwestern.edu)
	Match Score: 10
	Common Factors: 2 Year MBA, Energy,  Marketing
3. Grace Mandler (Gmandler2017@kellogg.northwestern.edu)
	Match Score: 9
	Common Factors: 2 Year MBA, Entrepreneurship and Innovation,  Marketing

```
