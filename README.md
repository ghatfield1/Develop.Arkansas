# Develop Arkansas — Phase 1 Prototype

This folder contains a deployable first version of Develop Arkansas.

## What works now

- Interactive Arkansas map
- Four clickable demonstration parcels
- Address, parcel ID, owner, city, and county search
- Property detail panel
- Demonstration development-readiness score
- Layer toggles
- Local browser saving
- Responsive desktop and mobile layout

## What is intentionally not included yet

- Real assessor parcel data
- Real zoning and future-land-use data
- Official FEMA floodplain data
- Utility capacity data
- Accounts or cloud database
- AI-generated legal or development conclusions

Those require separate data sourcing, licensing review, cleaning, database storage, and update procedures. The interface should be tested before that work begins.

## Open it on your computer

### Simplest method

Double-click `index.html`.

Some browser security settings may restrict web map resources when opened as a local file. If the map does not appear, use the local server method below.

### Recommended local server

1. Install Python if it is not already installed.
2. Open Command Prompt in this folder.
3. Run:

```bash
python -m http.server 8000
```

4. Open:

```text
http://localhost:8000
```

## Put it in your GitHub repository

Repository:

```text
https://github.com/ghatfield1/Develop.Arkansas
```

### Browser method

1. Download and unzip this package.
2. Open the GitHub repository.
3. Click `Add file`.
4. Click `Upload files`.
5. Drag `index.html`, `styles.css`, `app.js`, and `README.md` into GitHub.
6. Enter the commit message `Build Phase 1 Develop Arkansas prototype`.
7. Click `Commit changes`.

Do not upload the outer ZIP file as the website. Upload the four files inside it.

## Publish with GitHub Pages

1. Open the repository on GitHub.
2. Click `Settings`.
3. In the left menu, click `Pages`.
4. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
5. Select branch `main`.
6. Select folder `/ (root)`.
7. Click `Save`.
8. Wait for the deployment status to complete.
9. GitHub should publish the project at:

```text
https://ghatfield1.github.io/Develop.Arkansas/
```

## Recommended next development step

Connect one real pilot geography rather than all of Arkansas.

Best first pilot:

- Pulaski County parcel boundaries
- Little Rock zoning
- Little Rock future land use
- FEMA flood hazard layer
- City limits
- Publicly available assessor links

Do not start with statewide utility capacity. That data is fragmented, sensitive in some cases, and difficult to normalize.

## File structure

```text
index.html    Page structure
styles.css   Design and responsive layout
app.js       Map, sample data, search, and interactions
README.md    Setup and deployment instructions
```

## Data disclaimer

All property records and analytical results in this prototype are fictional demonstration data. They must not be used for development, legal, title, surveying, appraisal, lending, engineering, environmental, or investment decisions.
