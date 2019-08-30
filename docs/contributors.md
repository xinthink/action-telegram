# Contributors

### Checkin

- Do checkin source (src)
- **Do not** checkin build output (lib) to **master** branch, we'll build it before release
- **Do** checkin build output (lib) to **release** branches
- **Do not** checkin package-lock.json to **master** branch, we'll generate it before release
- **Do not** checkin node_modules to **master** branch
- **Do** checkin runtime node_modules to **release** branches
- Do not checkin devDependency node_modules (husky can help see below)

### devDependencies

In order to handle correctly checking in node_modules without devDependencies, we run [Husky](https://github.com/typicode/husky) before each commit.
This step ensures that formatting and checkin rules are followed and that devDependencies are excluded. To make sure Husky runs correctly, please use the following workflow:

```
npm install                                 # installs all devDependencies including Husky
git add abc.ext                             # Add the files you've changed. This should include files in src, lib, and node_modules (see above)
git commit -m "Informative commit message"  # Commit. This will run Husky
```

During the commit step, Husky will take care of formatting all files with [Prettier](https://github.com/prettier/prettier) as well as pruning out devDependencies using `npm prune --production`.
It will also make sure these changes are appropriately included in your commit (no further work is needed)
