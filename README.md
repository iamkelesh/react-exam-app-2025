This is React web app.

The main idea behind it, is to simulate forum-like app( Reedit and similar websites are being used for inspiration). 
Used additional libraries are: react-router-dom, tailwindcss and firebase. Other dev dependencies that are used can be found in the package.json file.

App has few main routes. Main page that show a getting started text, and the latest 5 posts created by users. Registerer and login pagis. Page for creating posts, for viewing all posts (with function for filtering by categories). Each post can be viewed in details page, with ability to edit, delete, like and save the post, and add comment. There is auth guards for for most of the routes, and error handling is being implemented for every component. 

If you want to run the app, you will need to do this:
1. Run: "npm install" in the main folder to install needed dependencies
2. Run: "npm run dev" to start the app locally at http://localhost:5173/

The app is also deployed in Netlify, but the url is currently disabled until needed updates are made.

pls dont hack :)
