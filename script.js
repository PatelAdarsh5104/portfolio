// Page Data
const pageInfo = {
    name: "Adarsh Patel",
    role: "AI/ML DEVELOPER",
    backgroundInformation: "Innovative software developer with extensive experience in Python, RAG, Langchain, LangGraph, and Spacy, complemented by strong proficiency in deep learning frameworks such as PyTorch. I specialize in creating AI-driven solutions that enhance system accuracy and transform user experiences. My work spans developing and fine-tuning custom NLP models—including BERT for sentiment analysis and category suggestion—and implementing retrieval-augmented generation systems that drive user engagement and operational efficiency.\n\nI have built scalable backend APIs with FastAPI and deployed applications on Azure, leveraging tools like SQL and OpenAI to deliver robust, enterprise-grade solutions. A highlight of my career is designing an AI-powered Math Chat Agent that simplifies advanced mathematical concepts into clear, step-by-step explanations for students and parents.\n\nPassionate about integrating innovative technologies and streamlining data processes, I continuously seek to push the boundaries of AI and machine learning to deliver tangible business value and superior user experiences.",
    profilePic: "images/AdarshImage.jpg",
    location: "India",
    email: "adarshpatel1122001@gmail.com",
    phone: "+91 8866839123"
};

const experiences = [
    {
        company: "GenAI Novuscode Softtech pvt ltd",
        jobTitle: "AI/ML Developer",
        dateStarted: "SEP 2023",
        dateEnded: "PRESENT",
        logo: "images/Novuscodelogo.png",
        points: [
            "Developed robust backend APIs using FastAPI and deployed scalable web applications on Azure",
            "Engineered and fine-tuned custom NLP models using BERT and Hugging Face",
            "Designed and implemented advanced prompt-based AI agents",
            "Leveraged LangGraph to develop multi-agent workflows",
            "Installed and deployed open-source models such as Gemma2 and GPT-Neo-1.3B",
            "Managed a team of 3 on an automation testing project",
            "Developed an AI-powered Math Chat Agent"
        ],
        technologies: ["python", "fastapi", "azure", "langchain", "openai", "pytorch", "llama3", "groq", "langgraph", "spacy", "bert", "huggingface", "rag", "retrieval-augmented-generation"]
    },
    {
        company: "PHPDots Technologies(Tuvoc Technologies)",
        jobTitle: "Backend Developer Internship",
        dateStarted: "FEB 2023",
        dateEnded: "JUN 2023",
        logo: "images/phpdotslogo.webp",
        points: [
            "Developed backend APIs using Python and FastAPI",
            "Designed and optimized database schemas",
            "Implemented user authentication and role-based access control",
            "Gained hands-on experience with asynchronous programming using Redis",
            "Learned Django ORM and database operations",
            "Collaborated with front-end team for seamless integration"
        ],
        technologies: ["python", "fastapi", "redis", "django", "postgresql"]
    }
];

const skills = [
    { title: "Python", icon: "images/python-logo.png" },
    { title: "FastAPI", icon: "images/Fastapi-logo.png" },
    { title: "Django", icon: "images/django-logo.png" },
    { title: "Flask", icon: "images/flask-logo.png" },
    { title: "LLM", icon: "images/LLM-logo.webp" },
    { title: "Huggingface", icon: "images/hf-logo.svg" },
    { title: "NLP", icon: "images/nlp logo.webp" },
    { title: "TensorFlow", icon: "images/TensorFlow_logo.png" },
    { title: "Pytorch", icon: "images/Pytorch_logo.png" },
    { title: "OpenCV", icon: "images/OpenCV_logo.png" },
    { title: "Langchain", icon: "images/langchain-logo.png" },
    { title: "LangGraph", icon: "images/langgraph-logo.png" },
    { title: "Azure", icon: "images/azure-logo.jpg" },
    { title: "AWS", icon: "images/AWS-logo.png" },
    { title: "MySQL", icon: "images/mysql-logo.svg" },
    { title: "Pinecone", icon: "images/pinecone-logo.png" },
    { title: "Chroma DB", icon: "images/chroma-logo.png" },
    { title: "Git", icon: "images/Git-logo.png" },
    { title: "GitHub", icon: "images/github.png" },
    { title: "Streamlit", icon: "images/streamlit-images.png" },

];

const projects = [
    {
        title: "SMS & EMAIL Spam Detection",
        images: ["images/Email_spam_project.png"],
        summary: "Developed a Spam SMS Classifier using machine learning techniques. The project utilizes the SMS Spam Collection Dataset from Kaggle and implements comprehensive data preprocessing, feature engineering, and model selection. Achieved 97% accuracy using Naive Bayes algorithm. Deployed as a web application using FastAPI and Streamlit.",
        technologies: ["Python", "ML", "Naive Bayes Algorithm", "FastAPI", "EDA"],
        link: "https://mlprojectdemo.streamlit.app/"
    },
    {
        title: "Resume and Job Description Matching",
        images: ["images/resume_match_project.png"],
        summary: "Created an AI-powered resume analyzer using Groq LLM (Llama 3-8B-8192) that matches resumes with job descriptions. Features include accurate match analysis, ATS optimization suggestions, and session management. Built with Streamlit frontend and Python backend.",
        technologies: ["Python", "GENAI", "FastAPI", "Atreamlit", "LLM", "Feature Extraction"],
        link: "https://resumematchfinder.streamlit.app/"    
    },
    {
        title: "BotAI",
        images: ["images/botai_project.png"],
        summary: "The BOTAI project allows users to create custom bots, each with unique categories, features, and tools. Each bot has its own separate chat history, ensuring distinct interactions. Users can personalize and manage multiple bots, making the platform versatile for various purposes and enhancing the bot-creation experience.",
        technologies: ["Python", "GENAI", "Fastapi", "Backend","SQL"],
        link: "https://botai-krfx.onrender.com/"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupHeroSection();
    setupAboutSection();
    setupExperienceSection();
    setupSkillsSection();
    setupProjectsSection();
    setupContactSection();
    setupCircles();
});

// Setup Hero Section
function setupHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.innerHTML = `
        <img src="${pageInfo.profilePic}" alt="${pageInfo.name}" class="profile-pic">
        <h1 class="hero-title">I'm ${pageInfo.name}</h1>
        <h2 class="section-title">${pageInfo.role}</h2>
    `;
}
// Setup About Section
function setupAboutSection() {
    const aboutContent = document.querySelector('.about-content');
    aboutContent.innerHTML = `
        <h2 class="section-title">A B O U T</h2>
        <div class="about-grid">
        <img src="${pageInfo.profilePic}" alt="${pageInfo.name}" class="about-image">
        <div class="about-text">
            <p>${pageInfo.backgroundInformation}</p>
            </div>
        </div>
    `;
}

// Setup Experience Section
function setupExperienceSection() {
    const experienceContent = document.querySelector('.experience-content');
    const experienceHTML = experiences.map(exp => `
            <div class="experience-item">
                <img src="${exp.logo}" alt="${exp.company}" class="company-logo">
                <h3>${exp.jobTitle}</h3>
                <h4 class="company-name">${exp.company}</h4>
                <p class="date">${exp.dateStarted} - ${exp.dateEnded}</p>
                <ul>
                    ${exp.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
                <div class="tech-stack">
                    ${exp.technologies.map(tech => `
                    <span>${tech}</span>
                    `).join('')}
                </div>
            </div>
    `).join('');
    
    // Wrap content in content-wrapper for animation
    experienceContent.innerHTML = `<div class="content-wrapper">${experienceHTML + experienceHTML}</div>`;
}

// Setup Skills Section
function setupSkillsSection() {
    const skillsContent = document.querySelector('.skills-content');
    skillsContent.innerHTML = `
        <div class="skills-grid">
            ${skills.map(skill => `
                <div class="skill-item">
                    <img src="${skill.icon}" alt="${skill.title}">
                    <span class="skill-name">${skill.title}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Setup Projects Section
function setupProjectsSection() {
    const projectsContent = document.querySelector('.projects-content');
    const projectsHTML = projects.map(project => `
        <a 
            class="project-item ${project.link ? 'has-link' : ''}" 
            ${project.link ? `href="${project.link}" target="_blank"` : ''}
        >
                <div class="project-images">
                    ${project.images.map(img => `
                        <img src="${img}" alt="${project.title}" class="project-image">
                    `).join('')}
                </div>
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `
                    <h3>${tech}</h3>
                    `).join('')}
                </div>
        </a>
    `).join('');
    
    // Wrap content in content-wrapper for animation
    projectsContent.innerHTML = `<div class="content-wrapper">${projectsHTML + projectsHTML}</div>`;
}

// Setup Contact Section
function setupContactSection() {
    document.getElementById('phone').textContent = pageInfo.phone;
    document.getElementById('email').textContent = pageInfo.email;
    document.getElementById('location').textContent = pageInfo.location;

    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', handleFormSubmit);
}

// Setup circular background
function setupCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.style.left = '50%';
        circle.style.top = '50%';
        circle.style.transform = 'translate(-50%, -50%)';
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});