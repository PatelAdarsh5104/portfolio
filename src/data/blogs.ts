export interface Blog {
  slug: string
  title: string
  summary: string
  category: string
  date: string
  readTime: string
  content: string
}

export const blogs: Blog[] = [
  {
    slug: 'rag',
    title: 'Retrieval-Augmented Generation (RAG) Explained',
    summary:
      'A deep dive into how RAG works, why it outperforms pure LLMs for knowledge-intensive tasks, and how to build one from scratch.',
    category: 'RAG',
    date: 'Apr 2024',
    readTime: '8 min read',
    content: `
      <p>Retrieval-Augmented Generation (RAG) is a technique that combines the generative power of LLMs with the precision of external data retrieval.</p>
      <h2>Why RAG?</h2>
      <p>LLMs are limited by their training data cut-off dates and can sometimes hallucinate. RAG solves this by fetching relevant documents from a database before generating a response, ensuring the model has access to the most up-to-date and specific information.</p>
      <h2>How it works</h2>
      <p>1. <strong>Retrieve</strong>: Search a vector database for relevant content based on the user query.<br/>
      2. <strong>Augment</strong>: Combine the retrieved content with the original query.<br/>
      3. <strong>Generate</strong>: Feed the augmented prompt to the LLM to get a grounded answer.</p>
    `,
  },
  {
    slug: 'llm',
    title: 'Understanding Large Language Models (LLMs)',
    summary:
      'Breaking down transformers, attention mechanisms, and the training process behind LLMs — explained for engineers who want to understand the internals.',
    category: 'LLM',
    date: 'Apr 2024',
    readTime: '10 min read',
    content: `
      <p>Large Language Models (LLMs) have revolutionized the field of Artificial Intelligence. These models, like GPT-4, Llama 3, and Claude, are trained on massive datasets to understand and generate human-like text.</p>
      <h2>How do they work?</h2>
      <p>LLMs are based on the Transformer architecture, using self-attention mechanisms to weigh the importance of each word in a sequence relative to every other word. This allows the model to capture long-range dependencies in text.</p>
      <h2>Training</h2>
      <p>LLMs are pre-trained on massive text corpora using next-token prediction, then fine-tuned using RLHF (Reinforcement Learning from Human Feedback) to align with human preferences.</p>
    `,
  },
  {
    slug: 'finetuning',
    title: 'Mastering Model Fine-Tuning',
    summary:
      'When to fine-tune vs. prompt engineer, how to prepare datasets, and lessons learned from fine-tuning models on AWS SageMaker for production use.',
    category: 'FINE-TUNING',
    date: 'Apr 2024',
    readTime: '12 min read',
    content: `
      <p>Fine-tuning is the process of taking a pre-trained model and training it further on a smaller, specific dataset to adapt it for a particular task.</p>
      <h2>When to Fine-Tune?</h2>
      <p>Fine-tune when: you need consistent output format, the task is domain-specific, you have sufficient labeled data, and prompt engineering alone is insufficient.</p>
      <h2>The Process</h2>
      <p>1. Prepare a high-quality dataset of input-output pairs.<br/>
      2. Choose a base model appropriate for your task.<br/>
      3. Configure training hyperparameters (learning rate, epochs, batch size).<br/>
      4. Monitor training loss and validation metrics.<br/>
      5. Evaluate on held-out test set before deploying.</p>
    `,
  },
  {
    slug: 'kv-cache',
    title: 'KV Cache in LLMs — What it is and Why it Matters',
    summary:
      'How KV caching works under the hood and how to cut inference latency by 60–70% without sacrificing quality.',
    category: 'PERFORMANCE',
    date: 'Apr 2024',
    readTime: '7 min read',
    content: `
      <h2>What is KV Cache & Why do we need it?</h2>
      <p>LLMs generate text one token at a time. For every new token, the model looks back at all previous tokens using the attention mechanism.</p>
      <p>Without optimization, the model recomputes attention for the entire history again and again, even though the past context never changes.</p>
      <p><strong>KV Cache</strong> stores the "Keys" and "Values" of past tokens so the model doesn't recompute them. In short: <em>"Don't redo work you've already done."</em></p>
      <h2>How does KV Cache help?</h2>
      <p>Because past tokens are cached, inference becomes significantly faster and cheaper — especially for long contexts. This is why enabling KV cache can reduce latency by 60–70% in production systems.</p>
    `,
  },
  {
    slug: 'latency',
    title: 'Improving AI Application Latency',
    summary:
      'A practical breakdown of where latency hides in STT→LLM→TTS pipelines and how to profile, parallelize, and optimize for real-time AI.',
    category: 'SYSTEMS',
    date: 'Apr 2024',
    readTime: '6 min read',
    content: `
      <p>In AI applications, latency (the time it takes to get a response) is critical for user experience. High latency leads to users abandoning the application.</p>
      <h2>Bottlenecks</h2>
      <p>Latency bottlenecks can occur at the network layer, during data retrieval (RAG), or during model inference.</p>
      <h2>Key Optimizations</h2>
      <p>1. <strong>Streaming:</strong> Stream tokens as they are generated rather than waiting for the full response.<br/>
      2. <strong>Parallelization:</strong> Run independent steps concurrently (e.g., TTS synthesis while LLM generates next chunk).<br/>
      3. <strong>Caching:</strong> Cache embeddings, KV states, and frequent query results.<br/>
      4. <strong>Model selection:</strong> Use smaller, faster models where full capability isn't required.</p>
    `,
  },
  {
    slug: 'postgresql-locking',
    title: 'Mastering Row-Level Locking in PostgreSQL',
    summary:
      'Row-level locks, deadlock detection, and designing schemas that avoid contention in high-concurrency AI applications.',
    category: 'DATABASE',
    date: 'Apr 2024',
    readTime: '9 min read',
    content: `
      <p>Row-level locking prevents multiple transactions from modifying the same data simultaneously — crucial in concurrent systems where multiple processes need shared resources.</p>
      <h2>What is Row-Level Locking?</h2>
      <p>It allows multiple workers to process jobs concurrently, with each handling one job at a time. This scales systems effectively when running multiple workers to handle large workloads.</p>
      <h2>How it Works in PostgreSQL</h2>
      <p>PostgreSQL provides <code>FOR UPDATE</code> and <code>SKIP LOCKED</code>:</p>
      <ul>
        <li><strong>FOR UPDATE:</strong> Locks rows, preventing modifications until the transaction completes.</li>
        <li><strong>SKIP LOCKED:</strong> Skips locked rows, enabling workers to pick available tasks without waiting.</li>
      </ul>
      <h2>Practical Pattern</h2>
      <p><code>SELECT * FROM jobs WHERE status = 'pending' ORDER BY created_at LIMIT 1 FOR UPDATE SKIP LOCKED</code></p>
      <p>This query lets multiple workers claim jobs simultaneously without blocking each other.</p>
    `,
  },
]
