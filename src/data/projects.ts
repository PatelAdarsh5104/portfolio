export interface Project {
  id: string
  title: string
  image: string
  summary: string
  detailDescription: string
  technologies: string[]
  link: string
  github: string
}

export const projects: Project[] = [
  {
    id: 'voice-assistant',
    title: 'Voice AI Assistant',
    image: '/images/voice_assistant.jpg',
    summary:
      'Real-time Voice AI Agent with a streaming STT-LLM-TTS pipeline achieving 70% latency reduction. Features Gmail MCP integration for agentic voice-controlled email management.',
    detailDescription: `<ul>
      <li><strong>Streaming Pipeline Architecture:</strong> Engineered a low-latency, full-duplex voice interaction system utilizing a synchronized STT → LLM → TTS pipeline over WebSockets, integrating Groq Whisper for sub-second transcription and ElevenLabs for neural speech synthesis.</li>
      <li><strong>Latency Optimization:</strong> Achieved a ~70% reduction in Time-to-First-Byte (TTFB) for audio responses by implementing chunked stream parallelization and batching LLM token streams for concurrent TTS synthesis.</li>
      <li><strong>Agentic MCP Integration:</strong> Pioneered the use of the Model Context Protocol (MCP) to expose a Gmail Server to the LLM, enabling autonomous agentic operations such as voice-driven inbox summarization, semantic email search, and automated drafting.</li>
      <li><strong>Advanced Frontend Orchestration:</strong> Developed a robust React + TypeScript client featuring a custom FIFO sequential audio queue and Web Audio API integration to handle non-blocking, real-time playback of fragmented MP3 chunks.</li>
      <li><strong>Scalable Backend Design:</strong> Built a high-concurrency FastAPI backend incorporating LangChain for stateful session management, conversational memory persistence, and an event-driven JSON protocol for real-time monitoring.</li>
    </ul>`,
    technologies: ['Groq Whisper', 'LLaMA 3.1', 'ElevenLabs', 'MCP', 'WebSockets', 'React', 'TypeScript', 'LangChain', 'FastAPI'],
    link: '',
    github: 'https://github.com/PatelAdarsh5104/voiceagent',
  },
  {
    id: 'spam-detection',
    title: 'SMS & Email Spam Detection',
    image: '/images/Email_spam_project.png',
    summary:
      'Spam SMS Classifier using machine learning techniques. Achieved 97% accuracy with Naive Bayes algorithm. Deployed as a web application using FastAPI and Streamlit.',
    detailDescription: `<p>This project involves building a robust SMS and Email Spam Detection system using the SMS Spam Collection Dataset from Kaggle. The pipeline includes comprehensive data preprocessing (tokenization, stopword removal, stemming), feature engineering using TF-IDF vectorization, and model selection.</p>
    <p>After evaluating several algorithms, Multinomial Naive Bayes was chosen for its high accuracy of 97% and precision. The final model is deployed as an interactive web application using FastAPI for the backend and Streamlit for the frontend.</p>`,
    technologies: ['Python', 'ML', 'Naive Bayes', 'FastAPI', 'Streamlit', 'TF-IDF'],
    link: 'https://mlprojectdemo.streamlit.app/',
    github: 'https://github.com/PatelAdarsh5104/SMS-Spam-Classifier',
  },
  {
    id: 'resume-matching',
    title: 'Resume & Job Description Matching',
    image: '/images/resume_match_project.png',
    summary:
      'AI-powered resume analyzer using Groq LLM (Llama 3) that matches resumes with job descriptions. Features ATS optimization suggestions and keyword gap analysis.',
    detailDescription: `<p>An advanced AI-powered recruitment tool that bridges the gap between candidates and job descriptions. Leveraging the Groq Llama 3-8B model, the system analyzes resumes against specific job requirements.</p>
    <p>Key features include semantic similarity matching, ATS (Applicant Tracking System) score calculation, keyword gap analysis, and personalized suggestions for resume optimization. The application is built with a Streamlit interface for seamless document upload and real-time analysis.</p>`,
    technologies: ['Python', 'GenAI', 'FastAPI', 'Streamlit', 'LLM', 'Groq', 'Llama 3'],
    link: 'https://resumematchfinder.streamlit.app/',
    github: 'https://github.com/PatelAdarsh5104/Resume-Analyzer',
  },
  {
    id: 'botai',
    title: 'BotAI',
    image: '/images/botai_project.png',
    summary:
      'Versatile platform for creating custom AI bots with unique categories, features, and tools. Each bot maintains its own chat history for context-aware interactions.',
    detailDescription: `<p>BotAI is a sophisticated multi-agent platform that allows users to create, personalize, and manage their own AI bots. Each bot can be assigned specific categories (e.g., Coding Assistant, Creative Writer) and equipped with specialized tools.</p>
    <p>The architecture supports isolated chat histories for each bot, enabling distinct and context-aware interactions. Built with a FastAPI backend and a robust SQL database for session and bot management, it offers a scalable solution for diverse AI needs.</p>`,
    technologies: ['Python', 'GenAI', 'FastAPI', 'SQL', 'LangChain'],
    link: 'https://botai-krfx.onrender.com/',
    github: 'https://github.com/PatelAdarsh5104/BotAI',
  },
]
