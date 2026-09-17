# Contributing

Thank you for contributing to SCS Project Showcase.

Beginners are welcome. You do not need to understand the entire project before making a contribution. Choose a small issue, ask questions when needed, and focus only on the part you are working on.

## Set Up the Project

Clone the repository using HTTPS:

```bash
git clone https://github.com/scs-concordia-org/techhour.git
cd techhour
```

Or use SSH if you have configured it:

```bash
git clone git@github.com:scs-concordia-org/techhour.git
cd techhour
```

Install the dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

Open http://localhost:3000.

## How to Contribute

### 1. Choose an Issue

Open the repository’s **Issues** tab and choose an available issue.

Comment on the issue to let others know you want to work on it. An organizer can then assign it to you.

Do not start an issue already assigned to someone else unless you plan to work together.

### 2. Create a Branch

Update your local `main` branch:

```bash
git switch main
git pull --ff-only origin main
```

Create a branch for your issue:

```bash
git switch -c feature/project-card
```

Use a short, descriptive name:

```text
feature/project-card
feature/project-form
fix/mobile-layout
docs/update-readme
chore/add-ci
```

### 3. Make Your Changes

Keep your work focused on the issue you selected.

It is okay to ask for help if:

* You do not understand part of the code
* You are unsure which file to change
* The issue requirements are unclear
* You encounter a Git problem
* Your code does not work yet

If you are working with a partner, agree on how you will divide the work before editing the same files.

### 4. Test Your Changes

Before submitting your work, run:

```bash
npm run lint
npm run build
```

If you changed the interface, also run:

```bash
npm run dev
```

Open the relevant page and confirm that it looks and behaves correctly.

### 5. Commit and Push

Check which files changed:

```bash
git status
```

Stage your files:

```bash
git add <files-you-changed>
```

Commit them with a clear message:

```bash
git commit -m "Add folder-style project card"
```

Push your branch:

```bash
git push -u origin feature/project-card
```

### 6. Open a Pull Request

On GitHub, open a pull request from your branch into `main`.

Include:

* A short explanation of what you changed
* How you tested it
* Screenshots if you changed the interface
* The related issue number

To automatically close the issue after merging, include:

```text
Closes #<issue-number>
```

An organizer or contributor will review the pull request. You may be asked to make changes before it is merged. This is a normal part of collaborative development.

## Important Rules

* Do not push directly to `main`.
* Work on one issue per branch.
* Do not commit passwords, API keys, `.env` files, or other secrets.
* Avoid changing unrelated files.
* Ask before making major architectural changes.
* Run lint and build before opening a pull request.
* Be respectful and patient with other contributors.

## Using AI Tools

AI coding tools are allowed.

If you use one:

* Read the repository’s AI instruction files.
* Review and understand the generated code.
* Test the result yourself.
* Do not share secrets or private information.
* Remove unnecessary generated code.

You remain responsible for the code you submit.

## Need Help?

Ask during TechHour or in the relevant SCS communication channel.

Getting stuck is expected. Ask questions before spending too long struggling alone.
