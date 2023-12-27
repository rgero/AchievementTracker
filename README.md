# The Personal Achievement Tracker
---
An app that acts like my Note in iCloud that tracks my personal achievements (such as paying off my student loans, reading 45 books, participating in GameJams, etc).

### What is the data needed for an entry?
- The date of the accomplishment
- Title of the Accomplishment
- Description of the Accomplishment (optional)
- Weight (optional) - Think that paying off the student loans are a larger accomplishment than going for a run or washing dishes.

### Should this data be stored externally?
I think so. This way if the device is destroyed you don't lose your achievements. Also it would allow multiple devices to sign in and see the list. This means that I would need a database/API (again I can use Supabase)

### Technologies?
React Native
Supabase

### What is the minimum functionality needed for an initial release
- CRUD operations for account
- CRUD operations for achievements
- A way to view the list of achievements
- A way to export achievements to JSON

### Things to pay attention to
- MOBILE - Right now I am intending on writing this in React/Vite with the intention of making a React-Native version down the road when I review React Native. However, for the time that exists between this project and the react native one, I should make sure that the project works well enough on mobile.