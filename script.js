// Page Data
const pageInfo = {
    name: "Adarsh Patel",
    role: "AI SOFTWARE ENGINEER",
    backgroundInformation: "Innovative software developer with extensive experience in Python, RAG, Langchain, LangGraph, and Spacy, complemented by strong proficiency in deep learning frameworks such as PyTorch. I specialize in creating AI-driven solutions that enhance system accuracy and transform user experiences. My work spans developing and fine-tuning custom NLP models—including BERT for sentiment analysis and category suggestion—and implementing retrieval-augmented generation systems that drive user engagement and operational efficiency.\n\nI have built scalable backend APIs with FastAPI and deployed applications on Azure, leveraging tools like SQL and OpenAI to deliver robust, enterprise-grade solutions. A highlight of my career is designing an AI-powered Math Chat Agent that simplifies advanced mathematical concepts into clear, step-by-step explanations for students and parents.\n\nPassionate about integrating innovative technologies and streamlining data processes, I continuously seek to push the boundaries of AI and machine learning to deliver tangible business value and superior user experiences.",
    profilePic: "images/Adarsh_new_image.jpg",
    heroPic: "images/AdarshImage.jpg",
    location: "India",
    email: "adarshpatel1122001@gmail.com",
    phone: "+91 8866839123"
};

const experiences = [
    {
        company: "Armakuni PVT",
        jobTitle: "AI Software Engineer",
        dateStarted: "MAY 2025",
        dateEnded: "PRESENT",
        logo: "images/Armakuni_logo.avif",
        points: [
            "Improved cooking time prediction accuracy by 19% through a custom algorithm",
            "Built an automated pipeline for recipe generation, video production, and editing using Luma AI and Veo, reducing manual effort by 40%",
            "Implemented event-driven workflows with AWS EventBridge and Lambda to auto-generate highlight clips and enable one-click social sharing, cutting manual work by 60%",
            "Fine-tuned and deployed LLMs on AWS SageMaker, increasing accuracy from 54% to 86% with optimized inference at scale",
            "Developed an LLM-powered SQL recommendation agent with re-ranking, improving candidate matching relevance",
            "Architected a scalable multi-agent system with a custom orchestration layer (Claude Agent SDK, Amazon Neptune, OpenSearch), boosting tool-calling accuracy by 44%"
        ],
        technologies: ["AWS", "SageMaker", "Lambda", "EventBridge", "LLM", "Fine-tuning", "Claude SDK", "OpenSearch", "Amazon Neptune", "SQL", "Multi-agent systems", "Luma AI", "Veo"]
    },
    {
        company: "GenAI Novuscode Softtech pvt ltd",
        jobTitle: "AI/ML Developer",
        dateStarted: "SEP 2023",
        dateEnded: "MAY 2025",
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
    { title: "Git", icon: "images/Git-Logo.png" },
    { title: "GitHub", icon: "images/github.png" },
    { title: "Streamlit", icon: "images/streamlit-images.png" },

];

const projects = [
    {
        id: "voice-assistant",
        title: "Voice AI Assistant",
        images: ["images/voice_assistant.jpg"],
        summary: "Developed a real-time Voice AI Agent with a streaming STT-LLM-TTS pipeline and 70% latency reduction. Features Gmail MCP integration for agentic voice-controlled email management.",
        detail_description: "<ul><li><strong>Streaming Pipeline Architecture:</strong> Engineered a low-latency, full-duplex voice interaction system utilizing a synchronized STT → LLM → TTS pipeline over WebSockets, integrating Groq Whisper for sub-second transcription and ElevenLabs for neural speech synthesis.</li><li><strong>Latency Optimization:</strong> Achieved a ~70% reduction in Time-to-First-Byte (TTFB) for audio responses (reducing delay from 10s to ~2s) by implementing chunked stream parallelization and batching LLM token streams for concurrent TTS synthesis.</li><li><strong>Agentic MCP Integration:</strong> Pioneered the use of the Model Context Protocol (MCP) to expose a Gmail Server to the LLM, enabling autonomous agentic operations such as voice-driven inbox summarization, semantic email search, and automated drafting.</li><li><strong>Advanced Frontend Orchestration:</strong> Developed a robust React + TypeScript client featuring a custom FIFO sequential audio queue and Web Audio API integration to handle non-blocking, real-time playback of fragmented MP3 chunks.</li><li><strong>Scalable Backend Design:</strong> Built a high-concurrency FastAPI backend incorporating LangChain for stateful session management, conversational memory persistence, and an event-driven JSON protocol for real-time monitoring.</li></ul>",
        technologies: ["Groq Whisper", "LLaMA 3.1", "ElevenLabs", "MCP (Model Context Protocol)", "Web Audio API", "WebSockets", "React", "TypeScript", "LangChain"],
        link: "",
        github: "https://github.com/PatelAdarsh5104/voiceagent"
    },
    {
        id: "spam-detection",
        title: "SMS & EMAIL Spam Detection",
        images: ["images/Email_spam_project.png"],
        summary: "Developed a Spam SMS Classifier using machine learning techniques. Achieved 97% accuracy using Naive Bayes algorithm. Deployed as a web application using FastAPI and Streamlit.",
        detail_description: "This project involves building a robust SMS and Email Spam Detection system. It utilizes the SMS Spam Collection Dataset from Kaggle. The pipeline includes comprehensive data preprocessing (tokenization, stopword removal, stemming), feature engineering using TF-IDF vectorization, and model selection. After evaluating several algorithms, Multinomial Naive Bayes was chosen for its high accuracy of 97% and precision. The final model is deployed as an interactive web application using FastAPI for the backend and Streamlit for the frontend.",
        technologies: ["Python", "ML", "Naive Bayes Algorithm", "FastAPI", "EDA"],
        link: "https://mlprojectdemo.streamlit.app/",
        github: "https://github.com/PatelAdarsh5104/SMS-Spam-Classifier"
    },
    {
        id: "resume-matching",
        title: "Resume and Job Description Matching",
        images: ["images/resume_match_project.png"],
        summary: "Created an AI-powered resume analyzer using Groq LLM (Llama 3) that matches resumes with job descriptions. Features include ATS optimization suggestions.",
        detail_description: "An advanced AI-powered recruitment tool that bridges the gap between candidates and job descriptions. Leveraging the Groq Llama 3-8B model, the system analyzes resumes against specific job requirements. Key features include semantic similarity matching, ATS (Applicant Tracking System) score calculation, keyword gap analysis, and personalized suggestions for resume optimization. The application is built with a Streamlit interface for seamless document upload and real-time analysis.",
        technologies: ["Python", "GENAI", "FastAPI", "Streamlit", "LLM", "Feature Extraction"],
        link: "https://resumematchfinder.streamlit.app/",
        github: "https://github.com/PatelAdarsh5104/Resume-Analyzer"
    },
    {
        id: "botai",
        title: "BotAI",
        images: ["images/botai_project.png"],
        summary: "A versatile platform for creating custom AI bots with unique categories, features, and tools. Each bot maintains its own chat history.",
        detail_description: "BotAI is a sophisticated multi-agent platform that allows users to create, personalize, and manage their own AI bots. Each bot can be assigned specific categories (e.g., Coding Assistant, Creative Writer) and equipped with specialized tools. The architecture supports isolated chat histories for each bot, enabling distinct and context-aware interactions. Built with a FastAPI backend and a robust SQL database for session and bot management, it offers a scalable solution for diverse AI needs.",
        technologies: ["Python", "GENAI", "Fastapi", "Backend", "SQL"],
        link: "https://botai-krfx.onrender.com/",
        github: "https://github.com/PatelAdarsh5104/BotAI"
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
    setupThemeToggle();
});

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (isDark) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Setup Hero Section
function setupHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    heroContent.innerHTML = `
        <img src="${pageInfo.heroPic}" alt="${pageInfo.name}" class="profile-pic">
        <h1 class="hero-title">I'm ${pageInfo.name}</h1>
        <h2 class="section-title">${pageInfo.role}</h2>
    `;
}
// Setup About Section
function setupAboutSection() {
    const aboutContent = document.querySelector('.about-content');
    if (!aboutContent) return;
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
    if (!experienceContent) return;
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
    if (!skillsContent) return;
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
    if (!projectsContent) return;
    const projectsHTML = projects.map(project => `
        <a 
            class="project-item" 
            href="projects/${project.id}.html"
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
    const phoneEl = document.getElementById('phone');
    if (phoneEl) phoneEl.textContent = pageInfo.phone;
    
    const emailEl = document.getElementById('email');
    if (emailEl) emailEl.textContent = pageInfo.email;
    
    const locationEl = document.getElementById('location');
    if (locationEl) locationEl.textContent = pageInfo.location;

    const form = document.querySelector('.contact-form');
    if (form) form.addEventListener('submit', handleFormSubmit);
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