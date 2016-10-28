## Angular 2 (TypeScript + Pug + SCSS) Skeleton

### Usage
```bash
$ git clone git@github.com:CastawayLabs/ng2-skel project-name
$ cd project-name
# don't forget to edit package.json to update metadata

$ npm install

# some npm scripts
$ npm run make           # runs webpack and compiles project to dist
$ npm run make:prod      # same, but production version
$ npm run watch          # runs webpack in watch mode
$ npm run clean          # cleans up npm logs and dist/ dir
$ npm run clean.repo     # full clean-up, including nuking node_modules
$ npm run lint           # lints all JS and TS code in project
```

### Notes
- **IMPORTANT:** The build-system makes liberal use of some of the fairly
  recently implemented ES6 features, so Node.js versions lesser than v6 will
  probably fail to run it. For best results, use the latest (not LTS) version
  of Node.js.
- Use Bootstrap 4 which is still in alpha. Bootstrap 3 is stable and can be
  chosen in package.json (not tested).
- **Gulp is no more.** Build system uses Webpack only. That makes adding
  livereload support unnecessarily complex. Use some sort of static file server
  ([Caddy](https://caddyserver.com/) is a good candidate) to serve from dist/
  in develpment.
- Build-system does not support testing (yet).

### To do
- ~~Update README.md~~
- Integrate E2E-testing into the setup
