# The Personal Achievement Tracker
---
An app that acts like my Note in iCloud that tracks my personal achievements (such as paying off my student loans, reading 45 books, participating in GameJams, etc).

Currently Deployed to - https://achievements.roymond.net

### What is the data needed for an entry?
- The date of the accomplishment
- Title of the Accomplishment
- Description of the Accomplishment (optional)
- Weight (optional) - Think that paying off the student loans are a larger accomplishment than going for a run or washing dishes.

### Should this data be stored externally?
I think so. This way if the device is destroyed you don't lose your achievements. Also it would allow multiple devices to sign in and see the list. This means that I would need a database/API (again I can use Supabase)