# Forking this repository

**These instructions and the setup script are written for the respository 'tylergrinn/tygr-logo' and won't work for any forked repositories.**

In other words, don't _fork a fork_ of this repository and expect the setup script or deployment to work.

1. `bash setup.sh`

2. `npm i`

3. `npm start`

4. Navigate to [localhost:8080/demo](http://localhost:8080/demo)

# Deployment

## Travis CI

After you first push, you can add environment variables to your travis repository settings:

![[Travis settings](https://travis-ci.com/)](travis-settings.png 'Travis settings')

### NPM_TOKEN

This is for publishing automatically on npm. If you want to skip this step, remove the first item in the deploy array in the `.travis.yml` file.

Otherwise, update the `email` key in the `.travis.yml` file and create an [npm 'Automation' access token](https://www.npmjs.com/settings/~/tokens). Store the result securely and copy it to a new NPM_TOKEN environment variable.

The first time you publish must be done locally:

```
npm publish
```

Now, for every tag on the `main` git branch, travis will automatically deploy to npm. Each tag requires the `"version"` field in the `package.json` file to be unique. I recommend keeping the tag and version in sync and using [semver](https://semver.org/) conventions.

### GITHUB_TOKEN

This will allow the demo to be published on github pages. If you want to skip this step, remove the second item in the deploy array in the `.travis.yml` file.

Otherwise, generate a [github token](https://github.com/settings/tokens) and add it as a new GITHUB_TOKEN environment variable. You may restrict this variable to only the main branch.

Now, each push to the main branch will deploy the demo website to github pages.
