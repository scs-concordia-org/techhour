# SCS Project Showcase

SCS Project Showcase is a community platform where Concordia students can share their projects, discover what other students are building, and find potential collaborators.

The platform combines elements of Devpost-style project showcases with Reddit-style discovery and interaction. It is also a semester-long TechHour project designed to give contributors experience working in a shared codebase using Git, GitHub issues, branches, pull requests, reviews, and collaborative development.

## Project Status

This project is in its initial development phase. The repository currently contains the Next.js foundation, while most of the features described below are planned and have not yet been implemented.

## Purpose

Many interesting student projects are difficult to discover once a class, hackathon, or semester ends. This platform aims to give those projects a lasting place where students can:

* Showcase completed or ongoing work
* Discover projects across different fields
* Find collaborators
* Learn from other students
* Receive feedback
* Build a public project profile

The development process is equally important. As the project grows, contributors will gain experience understanding an existing codebase, coordinating work, resolving conflicts, reviewing code, and extending a shared application.

## Core Experience

Visitors who are not signed in will be able to:

* Browse public projects
* Search and filter projects
* View project details
* View public student profiles
* Open approved external project links

Verified Concordia users will additionally be able to:

* Create and edit a student profile
* Submit and manage projects
* Indicate that they are looking for collaborators
* Provide optional contact methods
* Eventually comment on and react to projects
* Report inappropriate content

## Planned MVP

The initial version of the platform will focus on the following features.

### Project Discovery

* Public project browsing
* Folder-inspired project cards
* Project detail pages
* Search by title, description, category, or technology
* Filtering by category, status, difficulty, and collaboration availability
* Ongoing and completed project statuses
* Responsive desktop and mobile layouts
* Dark and light themes

### Project Submissions

A project submission may contain:

* Title
* Short and full descriptions
* Cover image or screenshot
* Creator and collaborators
* Project category
* Technology tags
* Ongoing or completed status
* Repository, demonstration, video, or documentation links
* Collaboration availability
* Difficulty level when seeking collaborators
* Description of the help or skills needed

### Categories and Tags

Broad project categories will be curated to prevent duplicates and inconsistent naming. Examples include:

* Web Development
* Mobile Development
* Game Development
* Machine Learning
* Data Science
* Cybersecurity
* Hardware
* Art and Design
* Business
* Research

Projects may also include more specific technology tags such as React, Next.js, Python, PostgreSQL, PyTorch, or Unity.

### Collaboration

When a project owner selects **Looking for collaborators**, they must provide:

* A difficulty level
* A short explanation of the help or skills needed
* At least one communication method

Possible communication methods include:

* Concordia email
* Discord
* LinkedIn
* Instagram
* Another approved contact link

Contact information will always be opt-in. The verified authentication email will not automatically be displayed publicly. Projects submitted only for showcasing may keep all contact details private.

The intended default is for collaboration contact information to be visible only to verified Concordia users.

### Authentication

The planned MVP will use passwordless Concordia email authentication:

1. The user enters an eligible Concordia email address.
2. The application sends a one-time verification code.
3. The user enters the code.
4. The application creates a secure session.
   a secure session.
5. The user remains signed in until the session expires or they log out.

The exact eligible Concordia email domains and authentication library still need to be confirmed.

Official Concordia or Microsoft single sign-on may be investigated as a future alternative if university authorization is available.

### Student Profiles

Public profiles may contain:

* Display name
* Unique username
* Profile picture
* Biography
* Program or department
* Graduation year
* Skills and interests
* GitHub, LinkedIn, and portfolio links
* Submitted projects
* Project collaborations

Authentication email addresses will remain private unless users explicitly provide them as a contact method.

## Visual Direction

Projects will appear as cards inspired by retro computer folders. Each folder card may contain:

* A project screenshot
* Project title
* Short description
* Creator information
* Status
* Difficulty
* Category and technology tags
* Collaboration availability

The folder appearance should be implemented as a reusable, responsive component rather than as a fixed background image. This will allow the interface to support different screen sizes, themes, animations, and project content.

## Future Ideas

The following features are outside the initial MVP but may be explored later:

* Project comments
* Reactions
* Project reporting
* Moderator roles and dashboard
* Spam protection
* Approved YouTube or media embeds
* AI-assisted first-pass content moderation
* Human review of flagged content
* Similar-project recommendations
* Notifications
* Internal collaboration requests
* Interaction and popularity metrics

### Experimental Project Explorer

An experimental browsing mode may allow users to:

* Move vertically between projects in one category
* Move horizontally between categories or departments
* Zoom out to display more projects
* Zoom in to focus on fewer projects
* Browse projects through a reel-like experience

This would complement, rather than replace, the standard searchable project grid.

## Technology Stack

### Current

* Next.js
* React
* TypeScript
* Tailwind CSS
* ESLint
* npm

### Planned

* PostgreSQL
* Vercel

The following technical decisions have not yet been finalized:

* PostgreSQL hosting provider
* ORM or database library
* Authentication library
* Transactional email provider
* Image-storage provider
* AI moderation provider

These choices should be documented and discussed before being introduced.

## Project Structure

```text
techhour/
├── public/                 Static assets
├── src/
│   └── app/                Next.js routes, layouts, and pages
├── AGENTS.md               Instructions for supported coding agents
├── CLAUDE.md               Claude-specific agent guidance
├── CONTRIBUTING.md         Contribution workflow and standards
├── README.md               Project overview and setup
├── eslint.config.mjs       ESLint configuration
├── next.config.ts          Next.js configuration
├── package.json            Dependencies and scripts
├── postcss.config.mjs      PostCSS configuration
└── tsconfig.json           TypeScript configuration
```

Additional directories such as `components`, `data`, `lib`, and `types` will be added inside `src` as the project grows.

## Getting Started

### Prerequisites

Install:

* Git
* Node.js 20.9 or newer
* npm
* A code editor such as Visual Studio Code

Repository access is required while the project remains private.

### Clone the Repository

```bash
git clone git@github.com:scs-concordia-org/techhour.git
cd techhour
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

Start the local development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start a previously created production build:

```bash
npm run start
```

## Contributing

Contributions should begin with an open GitHub issue.

Before starting:

1. Review the available issues.
2. Comment on the issue you want to work on.
3. Confirm that it is not already assigned.
4. Create a branch from the latest version of `main`.
5. Open a pull request when the work is ready for review.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the complete workflow.

Current issues are available in the repository’s [GitHub Issues](https://github.com/scs-concordia-org/techhour/issues).

## Privacy and Moderation

The platform will contain user-generated content. Development should follow these principles:

* Authentication emails are private by default.
* Contact information requires explicit consent.
* Public input must be validated.
* Secrets must never be committed.
* External links must be validated before display or embedding.
* Reporting and human moderation must remain available even if automated moderation is introduced.
* AI moderation should assist human decisions rather than act as the only authority.

## Roadmap

### Phase 1: Browseable Prototype

* Project models and mock data
* Folder-style project cards
* Navigation
* Explore page
* Search and filter interface
* Project details page
* Submission form interface
* Dark/light theme

### Phase 2: Persistent Application

* PostgreSQL integration
* Project creation and editing
* Image handling
* Database-backed search and filtering

### Phase 3: Identity and Profiles

* Concordia email verification
* Secure sessions
* Student profiles
* Project ownership
* Collaboration contact controls

### Phase 4: Community and Moderation

* Comments
* Reactions
* Reports
* Moderator dashboard
* Spam protection
* AI-assisted moderation

### Phase 5: Advanced Discovery

* Similar-project recommendations
* Experimental two-dimensional navigation
* Reel-style browsing
* Zoomable project views

## License

A license has not yet been selected. The SCS organization should approve a license before the repository is publicly released.
