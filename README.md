# Adarsh Patel - Personal Portfolio

A modern, responsive, and theme-aware personal portfolio website built with HTML, CSS, and Vanilla JavaScript.

## 🚀 Features

- **Dark/Light Mode**: Persistent theme toggle using CSS variables and `localStorage`.
- **Dynamic Content**: Most sections (Experience, Skills, Projects) are populated dynamically via JavaScript.
- **Multi-page Blog**: Dedicated blog section with individual post pages.
- **Project Showcases**: Individual detail pages for each project.
- **Smooth Navigation**: One-page scrolling for core sections and multi-page routing for blogs and projects.

---

## 🛠️ How to Add Content

Most of the website's content is managed in `script.js`.

### 1. Adding a New Experience
1. Open `script.js`.
2. Locate the `experiences` array.
3. Add a new object at the top of the array:
   ```javascript
   {
       company: "Company Name",
       jobTitle: "Your Role",
       dateStarted: "START DATE",
       dateEnded: "PRESENT / END DATE",
       logo: "images/your-logo.png",
       points: [
           "Accomplishment 1",
           "Accomplishment 2"
       ],
       technologies: ["Tech 1", "Tech 2"]
   }
   ```

### 2. Adding a New Skill
1. Add your skill icon image to the `images/` folder.
2. Open `script.js` and locate the `skills` array.
3. Add a new object:
   ```javascript
   { title: "Skill Name", icon: "images/skill-icon.png" }
   ```

### 3. Adding a New Project
Adding a project requires two steps: updating the data and creating a detail page.

**Step A: Update Data**
1. Open `script.js` and locate the `projects` array.
2. Add a new project object:
   ```javascript
   {
       id: "unique-project-id",
       title: "Project Title",
       images: ["images/project-thumbnail.png"],
       summary: "Short summary for the home page.",
       detail_description: "Detailed description for the project page.",
       technologies: ["Unique Tech 1", "Unique Tech 2"],
       link: "https://hosted-app-link.com",
       github: "https://github.com/yourlink"
   }
   ```

**Step B: Create Detail Page**
1. Navigate to the `projects/` folder.
2. Create a new file named `unique-project-id.html` (matching the `id` you set in Step A).
3. Copy the content from an existing project page (e.g., `spam-detection.html`) and update the Heading, Image, and Description.

### 4. Adding a New Blog Post
1. Navigate to the `blogs/` folder.
2. Create a new HTML file (e.g., `my-new-post.html`).
3. Copy the template from an existing blog (e.g., `llm.html`) and update the content.
4. Open `blog.html` and add a new entry in the `<main>` section:
   ```html
   <a href="blogs/my-new-post.html" class="blog-card">
       <div class="blog-date">Month Day, Year</div>
       <h2 class="blog-title">Your Blog Title</h2>
       <p class="blog-excerpt">Short teaser text about the blog.</p>
   </a>
   ```

---

## 🎨 Customization

### Theme Colors
Colors are managed via CSS variables in `styles.css`. Look for the `:root` and `body.dark-mode` sections to adjust colors across the entire site.

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333;
    --accent-color: #79a8a9; /* Main highlight color */
}
```

### Profile Image Focus
If the round profile image cuts off the top of your head, adjust the `object-position` in `styles.css` under the `.profile-pic` class:
```css
.profile-pic {
    object-position: center 10%; /* Adjust percentage to shift focus */
}
```
