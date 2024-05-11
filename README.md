# Git Setup
Super quick intro to all the git commands you'll need: https://rogerdudler.github.io/git-guide/

open up your cmd, then find the file path for wherever you want to have the local copy for the project and cd to it
example: 
```bash
cd C:\Users\tvage\Desktop\Projects
```
Then, run the following:
```bash
git remote add origin https://github.com/TVageesan/bojio.git
git pull origin master
```
You should have all the files downloaded to that folder alr. 
Then make whatever changes you want to make, then do:
```bash
git add .
git commit -m "Describe what you did"
git push origin 
```
# Running the app
Once you have the files on your local folder, navigate into the BoJio directory (from earlier example, C:\Users\tvage\Desktop\Projects\BoJio)
Then run (on command prompt, not powershell) :
```bash
npm install
npm i -g @quasar/cli
quasar run dev
```
Then go onto the browser address [localhost:9000](http://localhost:9000/#/) and it should be there

# Documentation
[Quasar](https://quasar.dev/)
[Vue](https://vuejs.org/)
[Calendar Plugin](https://antoniandre.github.io/vue-cal/)
