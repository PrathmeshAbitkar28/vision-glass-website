# Firestore Database Structure
**Project:** Vision Glass Creation  
**Database:** Cloud Firestore (Default)

---

## Collections Overview

```
(default)
├── gallery/
├── inquiries/
├── metadata/
│   ├── about
│   ├── contact
│   └── home
└── services/
```

---

## 1. `gallery` — Collection

Each document is a gallery image item.

| Field      | Type   | Example                                      |
|------------|--------|----------------------------------------------|
| `id`       | string | Auto-generated doc ID                        |
| `title`    | string | `"Glass Facade"`                             |
| `category` | string | `"Commercial"` / `"Residential"` / `"Industrial"` / `"Interior"` |
| `image`    | string | `"https://images.unsplash.com/..."`          |

**Used in:** `Gallery.tsx`

---

## 2. `inquiries` — Collection

Each document is a contact form submission.

| Field       | Type   | Example                        |
|-------------|--------|--------------------------------|
| `name`      | string | `"John Doe"`                   |
| `phone`     | string | `"+91 99999 99999"`            |
| `email`     | string | `"john@example.com"`           |
| `service`   | string | `"Glass Partitions"`           |
| `message`   | string | `"Need office cabin work..."`  |
| `createdAt` | string | `"2024-01-01T00:00:00.000Z"`   |

**Used in:** `Contact.tsx` (write only — form submissions)

---

## 3. `metadata` — Collection

Contains site-wide configuration documents.

---

### 3a. `metadata/about` — Document

| Field              | Type            | Example                                      |
|--------------------|-----------------|----------------------------------------------|
| `introTitle`       | string          | `"Vision Glass Creation"`                    |
| `introText1`       | string          | `"Vision Glass Creation is Pune's trusted…"` |
| `introText2`       | string          | `"Our commitment to quality…"`               |
| `leaderName`       | string          | `"Pratap Bhagwanrao Kathare"`                |
| `yearsExperience`  | string          | `"15+"`                                      |
| `projectCount`     | string          | `"500+ Projects"`                            |
| `directLiaison`    | string          | `"Direct Liaison"`                           |
| `whyChoose`        | array of maps   | See below ↓                                  |
| `clientTabs`       | array of maps   | See below ↓                                  |
| `workWith`         | array of maps   | See below ↓                                  |
| `industries`       | array of maps   | See below ↓                                  |

#### `whyChoose[]`
```
{ title: "One-Stop Solution", desc: "Complete window and glass work under one roof." }
{ title: "Quality Workmanship", desc: "Professional finishing on every project." }
{ title: "Trusted by Leaders", desc: "Architects, hospitals, schools rely on us." }
{ title: "End-to-End Service", desc: "From consultation to final installation." }
```

#### `clientTabs[]`
```
{ label: "Architects",         clients: ["Arct Uday Kulkarni", "Arct Ashish Shinde", ...] }
{ label: "Interior Designers", clients: ["Rahul Chordiya", "Kashmira Madam", ...] }
{ label: "Builders",           clients: ["Garve Developers", "VT Adaskar"] }
{ label: "Hospitals",          clients: ["Icon Hospital", "Sparsh Hospital", ...] }
{ label: "Schools",            clients: ["Cambridge International School", ...] }
{ label: "Industrial",         clients: ["SGS Chakan Mumbai", "Bajaj Auto", ...] }
```

#### `workWith[]`
```
{ title: "Architects" }
{ title: "Interior Decorators" }
{ title: "Carpenters" }
{ title: "HR & Purchase Depts." }
{ title: "Builders & Developers" }
```

#### `industries[]`
```
{ title: "Architects" }
{ title: "Facility Management" }
{ title: "MEP Contractors" }
{ title: "Industrial Decorators" }
{ title: "Real Estate Developers" }
{ title: "HR & Purchase Dept." }
```

**Used in:** `About.tsx`

---

### 3b. `metadata/contact` — Document

| Field          | Type   | Example                                              |
|----------------|--------|------------------------------------------------------|
| `phone`        | string | `"+91 99219 17083"`                                  |
| `officePhone`  | string | `"+91 78409 17083"`                                  |
| `email`        | string | `"visionglasscreation1@gmail.com"`                   |
| `address`      | string | `"Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044"` |
| `mapEmbedUrl`  | string | `"https://www.google.com/maps/embed?pb=…"`           |
| `socials`      | map    | See below ↓                                          |

#### `socials` (nested map)
```
{
  whatsapp: "919921917083",    // number only, no + or spaces
  instagram: "@vision_glass"   // with or without @
}
```

**Used in:** `Contact.tsx`, `Footer.tsx`, `FloatingButtons.tsx`

---

### 3c. `metadata/home` — Document

| Field                | Type          | Example                                         |
|----------------------|---------------|-------------------------------------------------|
| `heroTitle1`         | string        | `"Expert in Window"`                            |
| `heroTitle2`         | string        | `"& Glass Solutions"`                           |
| `heroSubtitle`       | string        | `"Premium glass partitions, facades…"`          |
| `heroImage`          | string        | `"https://images.unsplash.com/…"`               |
| `heroImages`         | array[string] | `["https://…", "https://…"]`                    |
| `pageHeroImages`     | array[string] | `["https://…", "https://…"]`                    |
| `servicesTitle`      | string        | `"Our Services"`                                |
| `servicesSubtitle`   | string        | `"End-to-end glass solutions…"`                 |
| `services`           | array of maps | See below ↓                                     |
| `trustTitle`         | string        | `"Trusted by Industry Leaders"`                 |
| `trustSubtitle`      | string        | `"From architects to industrialists…"`          |
| `trustedBy`          | array of maps | See below ↓                                     |
| `uspTitle`           | string        | `"Complete glass solutions under one roof…"`    |
| `uspSubtitle`        | string        | `"Professional finishing on every project."`    |
| `uspBackgroundImage` | string        | `"https://images.unsplash.com/…"`               |
| `uspPoints`          | array[string] | `["One-stop glass solution provider", …]`       |
| `referTitle`         | string        | `"Know Someone Who Needs Us?"`                  |
| `referSubtitle`      | string        | `"Help them connect with the right solution."`  |
| `referCards`         | array of maps | See below ↓                                     |
| `enquiryCTATitle`    | string        | `"Need a Custom Engineered Solution?"`          |
| `enquiryCTASubtitle` | string        | `"Bespoke glass architectures…"`                |
| `enquiryCTAItems`    | array[string] | `["ISO Standards", "Quality Work", …]`          |

#### `services[]`
```
{
  title: "Glass Partitions",
  desc:  "Frameless and framed partition walls…",
  image: "https://images.unsplash.com/…",
  icon:  "PanelTop"   // matches lucide-react icon name
}
```
> Valid icon values: `PanelTop` `Frame` `Building2` `Layers` `Lamp` `Paintbrush` `Shield`

#### `trustedBy[]`
```
{
  label: "Architects",
  desc:  "Leading firms across Pune",
  image: "https://images.unsplash.com/…"
}
```

#### `referCards[]`
```
{
  icon:     "PanelTop",
  question: "Looking for office cabin or glass partition work?",
  sub:      "We design and install custom office partitions across Pune."
}
```

**Used in:** `Index.tsx`, `PageHero.tsx`, `Hero.tsx`

---

## 4. `services` — Collection

Each document is a service offered by the company.

| Field      | Type          | Example                                      |
|------------|---------------|----------------------------------------------|
| `id`       | string        | Auto-generated doc ID                        |
| `title`    | string        | `"Glass Partitions"`                         |
| `subtitle` | string        | `"Office & Commercial"`                      |
| `desc`     | string        | `"Full and partial glass partition walls…"`  |
| `image`    | string        | `"https://images.unsplash.com/…"`            |
| `tags`     | array[string] | `["Frameless", "Framed", "Office Cabins"]`   |

**Used in:** `Services.tsx`

---

## Query Key Reference (React Query)

| Query Key              | Fetches                    | Used In                                    |
|------------------------|----------------------------|--------------------------------------------|
| `"home-metadata"`      | `metadata/home`            | `Index.tsx`                                |
| `"page-hero-images"`   | `metadata/home`            | `PageHero.tsx`                             |
| `"about-metadata"`     | `metadata/about`           | `About.tsx`                                |
| `"contact-metadata"`   | `metadata/contact`         | `Contact.tsx`, `Footer.tsx`, `FloatingButtons.tsx` |
| `"services-list"`      | `services` collection      | `Services.tsx`                             |
| `"gallery-items"`      | `gallery` collection       | `Gallery.tsx`                              |

> **Note:** Components sharing the same query key (e.g. `"contact-metadata"`) hit  
> Firestore only once — subsequent reads come from React Query's in-memory cache.
