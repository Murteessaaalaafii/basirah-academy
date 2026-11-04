const fs = require('fs');
const path = require('path');

const beginnerCourses = [
  {
    id: "beg-01",
    slug: "introduction-to-artificial-intelligence",
    title: "Introduction to Artificial Intelligence",
    tagline: "Uncover the principles, evolution, and future horizons of machine intelligence.",
    overview: "Explore how artificial intelligence evolved from symbolic logic to modern statistical neural systems. Learn the essential terminology, paradigm shifts, and how machines perceive and reason.",
    objectives: [
      "Understand the historical evolution from symbolic AI to connectionism",
      "Differentiate between Narrow AI, General AI, and Superintelligence",
      "Analyze real-world AI applications across healthcare, automation, and science",
      "Formulate foundational mental models for machine learning and neural architectures"
    ],
    prerequisites: ["Curiosity about modern technology and basic computer literacy"],
    estimatedHours: 12,
    completionCriteria: "Complete all 4 modules, score >= 80% on Module Quizzes, and submit the AI Paradigm Analysis Project."
  },
  {
    id: "beg-02",
    slug: "ai-literacy-and-responsible-ai",
    title: "AI Literacy and Responsible AI",
    tagline: "Navigate ethics, bias, fairness, transparency, and societal impact.",
    overview: "Develop critical judgment on AI limitations, algorithmic bias, copyright, safety frameworks, and responsible deployment in human communities.",
    objectives: [
      "Identify algorithmic bias and data provenance vulnerabilities",
      "Examine international AI governance frameworks and ethical guidelines",
      "Evaluate societal impacts of automation on employment and education",
      "Implement responsible AI auditing principles on sample decision systems"
    ],
    prerequisites: ["Introduction to Artificial Intelligence or equivalent conceptual familiarity"],
    estimatedHours: 10,
    completionCriteria: "Pass ethics case study quizzes and submit an AI System Ethical Audit Matrix."
  },
  {
    id: "beg-03",
    slug: "prompt-engineering-fundamentals",
    title: "Prompt Engineering Fundamentals",
    tagline: "Master structured prompting, context steerability, and few-shot calibration.",
    overview: "Go beyond simple chat. Learn role prompting, chain-of-thought (CoT), few-shot demonstration formatting, structured output JSON constraints, and defensive prompting against hallucinations.",
    objectives: [
      "Formulate precise zero-shot, few-shot, and role-conditioned prompts",
      "Apply Chain-of-Thought (CoT) and Least-to-Most decomposition techniques",
      "Enforce deterministic JSON and tabular schemas in generative outputs",
      "Mitigate hallucinations through source-grounded prompt constraints"
    ],
    prerequisites: ["Basic understanding of generative text models"],
    estimatedHours: 14,
    completionCriteria: "Construct an end-to-end prompt test suite with verified schema outputs."
  },
  {
    id: "beg-04",
    slug: "ai-tools-for-everyday-productivity",
    title: "AI Tools for Everyday Productivity",
    tagline: "Supercharge your research, writing, coding, and automated workflows.",
    overview: "Learn to systematically integrate modern generative tools, automated summarizers, code copilots, and multi-modal assistants into your daily professional and personal workflow.",
    objectives: [
      "Automate document analysis and complex information synthesis",
      "Utilize coding assistants for accelerated boilerplate generation and bug identification",
      "Design personalized productivity assistants using automated workflows",
      "Evaluate tool performance and accuracy limits"
    ],
    prerequisites: ["None"],
    estimatedHours: 8,
    completionCriteria: "Deploy a personal automated workflow connecting research inputs to synthesized summaries."
  },
  {
    id: "beg-05",
    slug: "python-programming-fundamentals",
    title: "Python Programming Fundamentals",
    tagline: "The language of modern artificial intelligence from zero to fluent.",
    overview: "Master Python syntax, data structures (lists, tuples, dicts, sets), control flow, functional programming, object-oriented principles, and modular code organization required for machine learning.",
    objectives: [
      "Write clean, idiomatic Python code conforming to PEP 8 standards",
      "Implement core data structures, list comprehensions, and generator functions",
      "Design reusable classes, exception handlers, and modular packages",
      "Manipulate file I/O, JSON serialization, and virtual environments"
    ],
    prerequisites: ["Basic computer literacy"],
    estimatedHours: 20,
    completionCriteria: "Build an interactive CLI tool for data parsing and automated statistical calculation."
  },
  {
    id: "beg-06",
    slug: "mathematics-for-ai",
    title: "Mathematics for AI",
    tagline: "Linear algebra, multivariable calculus, and probability intuition.",
    overview: "Build rock-solid intuitive understanding of vectors, matrices, dot products, eigenvalues, partial derivatives, gradient descent, and Bayes' theorem through visual and code implementations.",
    objectives: [
      "Compute vector transformations, matrix multiplications, and projections",
      "Understand partial derivatives and the computational mechanics of backpropagation",
      "Apply probability distributions, expected value, and Bayesian updates",
      "Implement mathematical primitives in pure Python and NumPy"
    ],
    prerequisites: ["High school algebra"],
    estimatedHours: 18,
    completionCriteria: "Code a gradient descent optimization routine from scratch without ML libraries."
  },
  {
    id: "beg-07",
    slug: "introduction-to-data-science",
    title: "Introduction to Data Science",
    tagline: "Data manipulation, exploratory data analysis, and statistical visualization.",
    overview: "Learn to clean, reshape, explore, and visualize complex datasets using NumPy, Pandas, Matplotlib, and Seaborn. Derive actionable insights from raw real-world data.",
    objectives: [
      "Clean missing values, handle outliers, and normalize datasets with Pandas",
      "Perform thorough Exploratory Data Analysis (EDA) on multi-dimensional data",
      "Create informative statistical plots and visual distributions",
      "Formulate and test statistical hypotheses using empirical data"
    ],
    prerequisites: ["Python Programming Fundamentals"],
    estimatedHours: 16,
    completionCriteria: "Deliver a comprehensive EDA notebook dissecting a real-world socioeconomic dataset."
  },
  {
    id: "beg-08",
    slug: "introduction-to-machine-learning",
    title: "Introduction to Machine Learning",
    tagline: "Supervised and unsupervised algorithms: theory, code, and evaluation.",
    overview: "Understand classical machine learning: Linear and Logistic Regression, Decision Trees, Random Forests, Support Vector Machines, K-Means clustering, and cross-validation metrics.",
    objectives: [
      "Distinguish between regression, classification, and clustering problems",
      "Train, tune, and evaluate classical ML models using Scikit-Learn",
      "Prevent overfitting using regularization, train/val/test splits, and K-fold CV",
      "Interpret performance metrics (Precision, Recall, F1, ROC-AUC, RMSE)"
    ],
    prerequisites: ["Python Programming Fundamentals", "Mathematics for AI"],
    estimatedHours: 22,
    completionCriteria: "Train and evaluate an end-to-end predictive model pipeline with hyperparameter tuning."
  },
  {
    id: "beg-09",
    slug: "ai-for-education-and-research",
    title: "AI for Education and Research",
    tagline: "Accelerate scientific discovery, literature synthesis, and peer review analysis.",
    overview: "Leverage AI tools for academic literature searching, citation graph exploration, scientific preprint summarization, pedagogical curriculum design, and rigorous evidence validation.",
    objectives: [
      "Formulate systematic literature discovery queries across research repositories",
      "Synthesize conflicting scholarly perspectives using grounded citation models",
      "Design personalized adaptive curriculum modules for specific domains",
      "Verify research claims against empirical datasets"
    ],
    prerequisites: ["AI Literacy and Responsible AI"],
    estimatedHours: 10,
    completionCriteria: "Produce an annotated research synthesis report on a modern AI topic with verified citations."
  },
  {
    id: "beg-10",
    slug: "ai-for-creativity-and-business",
    title: "AI for Creativity and Business",
    tagline: "Commercial applications, generative media, business analytics, and automation.",
    overview: "Discover how AI transforms business operations, marketing analytics, customer service automation, financial modeling, and creative digital media generation.",
    objectives: [
      "Identify high-ROI AI automation opportunities in modern business processes",
      "Deploy generative workflows for multi-modal marketing and communication assets",
      "Design automated customer query triage and intelligence summarization systems",
      "Construct a business case for AI adoption with risk and cost-benefit analysis"
    ],
    prerequisites: ["Introduction to Artificial Intelligence"],
    estimatedHours: 12,
    completionCriteria: "Submit a complete AI Enterprise Transformation Proposal with ROI projections."
  }
];

const intermediateCourses = [
  {
    id: "int-01",
    slug: "advanced-python-for-ai",
    title: "Advanced Python for AI",
    tagline: "Metaprogramming, concurrency, type safety, and memory-efficient computation.",
    overview: "Elevate your Python engineering. Master asynchronous programming (asyncio), decorators, context managers, Pydantic type validation, multiprocessing, and Cython/C-extension basics for high-throughput AI pipelines.",
    objectives: [
      "Implement asynchronous streaming and batch concurrency with asyncio",
      "Build rigorous data validation schemas using Pydantic V2",
      "Profile memory allocation and execution bottlenecks using cProfile and memory_profiler",
      "Structure enterprise-grade Python packages with typing and unit test suites"
    ],
    prerequisites: ["Python Programming Fundamentals"],
    estimatedHours: 24,
    completionCriteria: "Build an asynchronous high-throughput concurrent batch processor with Pydantic validation."
  },
  {
    id: "int-02",
    slug: "data-science-with-python",
    title: "Data Science with Python",
    tagline: "Advanced feature engineering, time series, and dimensional modeling.",
    overview: "Deep dive into feature encoding, dimensionality reduction (PCA, t-SNE, UMAP), time-series forecasting (ARIMA, Prophet), and production data pipelines with Polars and DuckDB.",
    objectives: [
      "Process multi-gigabyte datasets efficiently using Polars and vectorized transforms",
      "Engineer domain-specific features and perform automated selection",
      "Forecast temporal trends with seasonal decomposition and autoregression",
      "Detect statistical data drift and distribution divergence"
    ],
    prerequisites: ["Introduction to Data Science"],
    estimatedHours: 22,
    completionCriteria: "Complete a real-world multi-dimensional time series forecasting and drift-detection pipeline."
  },
  {
    id: "int-03",
    slug: "machine-learning-engineering",
    title: "Machine Learning Engineering",
    tagline: "From experiment notebooks to scalable, reproducible production pipelines.",
    overview: "Bridge the gap between data science and production engineering. Learn pipeline orchestration, data versioning (DVC), experiment tracking with MLflow, and automated model validation.",
    objectives: [
      "Build modular scikit-learn transformers and pipelines",
      "Track experiments, hyperparameter runs, and model artifacts with MLflow",
      "Version training data and models deterministically with DVC",
      "Package models into containerized REST microservices"
    ],
    prerequisites: ["Introduction to Machine Learning", "Advanced Python for AI"],
    estimatedHours: 26,
    completionCriteria: "Deploy an end-to-end ML pipeline with automated testing and artifact registry."
  },
  {
    id: "int-04",
    slug: "deep-learning-fundamentals",
    title: "Deep Learning Fundamentals",
    tagline: "Perceptrons, backpropagation, computational graphs, and PyTorch essentials.",
    overview: "Understand the mathematical foundations of deep neural networks. Build and train Multi-Layer Perceptrons from tensor math up using PyTorch.",
    objectives: [
      "Derive and implement forward and backward propagation passes manually",
      "Utilize PyTorch tensors, autograd, Dataset, and DataLoader abstractions",
      "Configure loss functions, learning rate schedules, and modern optimizers (AdamW)",
      "Diagnose vanishing and exploding gradients using gradient clipping and normalization"
    ],
    prerequisites: ["Mathematics for AI", "Python Programming Fundamentals"],
    estimatedHours: 28,
    completionCriteria: "Build and train a custom PyTorch deep neural network with custom autograd functions."
  },
  {
    id: "int-05",
    slug: "neural-networks",
    title: "Neural Networks",
    tagline: "Advanced network architectures, regularizers, residual connections, and attention.",
    overview: "Explore deep network architectures: Convolutional Neural Networks (CNNs), Recurrent Neural Networks (LSTMs, GRUs), ResNets, and the foundational Dot-Product Attention mechanism.",
    objectives: [
      "Construct convolutional layers, pooling operations, and residual skip connections",
      "Model sequential dependencies using bidirectional LSTMs and GRUs",
      "Implement multi-head self-attention mechanisms in PyTorch",
      "Apply modern regularization: Dropout, LayerNorm, BatchNorm, and weight decay"
    ],
    prerequisites: ["Deep Learning Fundamentals"],
    estimatedHours: 30,
    completionCriteria: "Implement a functional Mini-Transformer block from scratch in PyTorch."
  },
  {
    id: "int-06",
    slug: "natural-language-processing",
    title: "Natural Language Processing",
    tagline: "Tokenization, embeddings, sequence-to-sequence, and transformer language models.",
    overview: "Master NLP fundamentals: Byte-Pair Encoding (BPE), Word2Vec, GloVe, BERT masking, GPT autoregression, semantic text classification, named entity recognition, and sentiment analysis.",
    objectives: [
      "Train and evaluate custom tokenizers using the HuggingFace Tokenizers library",
      "Fine-tune pre-trained transformer models for classification and sequence labeling",
      "Evaluate language models using Perplexity, BLEU, and ROUGE metrics",
      "Build semantic text embeddings pipelines for downstream tasks"
    ],
    prerequisites: ["Neural Networks"],
    estimatedHours: 28,
    completionCriteria: "Fine-tune a HuggingFace transformer model on a custom multi-class technical corpus."
  },
  {
    id: "int-07",
    slug: "computer-vision",
    title: "Computer Vision",
    tagline: "Image processing, object detection, segmentation, and vision transformers.",
    overview: "From pixels to semantic spatial understanding. Learn OpenCV, transfer learning with ResNet/EfficientNet, YOLO object detection, and Vision Transformers (ViT).",
    objectives: [
      "Execute image augmentation, spatial filtering, and contour analysis with OpenCV",
      "Train transfer learning classifiers with modern vision backbones",
      "Perform bounding-box regression and non-maximum suppression for object detection",
      "Understand Vision Transformer patch projections and attention maps"
    ],
    prerequisites: ["Neural Networks"],
    estimatedHours: 26,
    completionCriteria: "Deploy a real-time object detection and segmentation inference pipeline."
  },
  {
    id: "int-08",
    slug: "ai-application-development",
    title: "AI Application Development",
    tagline: "Building full-stack intelligent web and mobile software.",
    overview: "Learn to build user-facing applications powered by AI models. Implement streaming responses, optimistic UI updates, structured function calling, and asynchronous state synchronization.",
    objectives: [
      "Architect full-stack applications with Next.js frontends and Python AI backends",
      "Implement Server-Sent Events (SSE) and WebSockets for real-time token streaming",
      "Handle generative model latency with optimistic UI and graceful error boundaries",
      "Manage persistent user conversations and session history in secure databases"
    ],
    prerequisites: ["Advanced Python for AI", "Prompt Engineering Fundamentals"],
    estimatedHours: 26,
    completionCriteria: "Build and deploy a full-stack streaming conversational AI application."
  },
  {
    id: "int-09",
    slug: "api-integration",
    title: "API Integration",
    tagline: "REST, GraphQL, gRPC, authentication, and resilient cloud AI clients.",
    overview: "Integrate production AI APIs (Gemini, OpenAI, Anthropic, HuggingFace Inference Endpoints) with exponential backoff, circuit breakers, caching, and rate limit handling.",
    objectives: [
      "Authenticate and call cloud AI APIs using secure key management patterns",
      "Implement resilient HTTP client architecture with retries, jitter, and circuit breakers",
      "Orchestrate multi-step API workflows combining cloud and local endpoints",
      "Benchmark throughput, latency percentiles (p50, p95, p99), and costs"
    ],
    prerequisites: ["Advanced Python for AI"],
    estimatedHours: 18,
    completionCriteria: "Develop a robust, fault-tolerant multi-provider AI client with automated fallback."
  },
  {
    id: "int-10",
    slug: "retrieval-augmented-generation",
    title: "Retrieval-Augmented Generation",
    tagline: "Grounding LLMs with external knowledge, dense retrieval, and reranking.",
    overview: "Master RAG architectures: document ingestion, chunking strategies (fixed, semantic, recursive), dense vector embeddings, hybrid search with BM25, and cross-encoder reranking.",
    objectives: [
      "Design document chunking pipelines that preserve context and metadata",
      "Generate and index high-dimensional embeddings for dense vector retrieval",
      "Implement hybrid retrieval combining lexical BM25 and semantic dense search",
      "Apply cross-encoder reranking to elevate relevance and suppress noise"
    ],
    prerequisites: ["Natural Language Processing", "API Integration"],
    estimatedHours: 28,
    completionCriteria: "Build a production RAG pipeline with hybrid search, reranking, and citation generation."
  },
  {
    id: "int-11",
    slug: "vector-databases",
    title: "Vector Databases",
    tagline: "HNSW, IVF, Pinecone, Chroma, Qdrant, and Milvus at scale.",
    overview: "Understand how vector indexes work under the hood. Study Approximate Nearest Neighbor (ANN) algorithms (HNSW, IVF-PQ), indexing tradeoffs, filtered search, and distributed vector storage.",
    objectives: [
      "Analyze distance metrics: Cosine Similarity, Dot Product, Euclidean Distance",
      "Configure Hierarchical Navigable Small World (HNSW) indexing parameters",
      "Implement metadata filtering and payload constraints in vector queries",
      "Evaluate vector database performance, recall trade-offs, and sharding"
    ],
    prerequisites: ["Mathematics for AI", "Retrieval-Augmented Generation"],
    estimatedHours: 20,
    completionCriteria: "Benchmarking and deploying a high-recall vector search cluster on 100k+ embeddings."
  },
  {
    id: "int-12",
    slug: "ai-agents-and-automation",
    title: "AI Agents and Automation",
    tagline: "Autonomous planning, tool calling, ReAct patterns, and reflection loops.",
    overview: "Build autonomous software agents. Master the ReAct (Reason + Act) loop, tool binding, dynamic planning, memory systems, self-reflection, and error recovery.",
    objectives: [
      "Implement tool-calling and function schema dispatch for generative models",
      "Construct ReAct loop execution engines with deterministic safety limits",
      "Design short-term working memory and long-term episodic memory stores",
      "Implement self-reflection and automatic output correction loops"
    ],
    prerequisites: ["Retrieval-Augmented Generation", "API Integration"],
    estimatedHours: 26,
    completionCriteria: "Build an autonomous code-investigating agent that can execute unit tests and repair bugs."
  },
  {
    id: "int-13",
    slug: "data-engineering-for-ai",
    title: "Data Engineering for AI",
    tagline: "ETL pipelines, feature stores, synthetic data generation, and clean datasets.",
    overview: "Quality data fuels intelligent systems. Learn scalable data cleaning, deduplication, synthetic data curation, token count tracking, and feature storage for AI workloads.",
    objectives: [
      "Build resilient ETL pipelines converting unstructured PDFs and HTML into structured datasets",
      "Implement exact and near-deduplication using MinHash and Locality-Sensitive Hashing",
      "Generate synthetic training and evaluation datasets using LLM instruction tuning",
      "Structure reproducible data lakehouse storage for AI model training"
    ],
    prerequisites: ["Data Science with Python", "Advanced Python for AI"],
    estimatedHours: 22,
    completionCriteria: "Engineer an automated data ingestion and synthetic expansion pipeline for domain fine-tuning."
  }
];

const advancedCourses = [
  {
    id: "adv-01",
    slug: "advanced-machine-learning",
    title: "Advanced Machine Learning",
    tagline: "Ensemble architectures, Bayesian optimization, metric learning, and causal inference.",
    overview: "Push the boundaries of statistical learning. Master gradient boosting algorithms (XGBoost, LightGBM, CatBoost), Bayesian optimization for hyperparameter search, and causal inference methods.",
    objectives: [
      "Architect custom loss functions for gradient boosting trees",
      "Conduct Gaussian Process regression and Bayesian hyperparameter optimization",
      "Implement contrastive metric learning and triplet loss embeddings",
      "Differentiate between correlation and causation using structural causal models"
    ],
    prerequisites: ["Machine Learning Engineering", "Mathematics for AI"],
    estimatedHours: 32,
    completionCriteria: "Build an end-to-end causal inference and metric learning framework on tabular data."
  },
  {
    id: "adv-02",
    slug: "large-language-model-engineering",
    title: "Large Language Model Engineering",
    tagline: "Pre-training mechanics, instruction fine-tuning, LoRA, QLoRA, and alignment.",
    overview: "Explore how state-of-the-art LLMs are built and adapted. Learn parameter-efficient fine-tuning (LoRA, QLoRA), Direct Preference Optimization (DPO), and Reinforcement Learning from Human Feedback (RLHF).",
    objectives: [
      "Quantize models (4-bit, 8-bit, AWQ, GGUF) and calculate memory footprint",
      "Fine-tune open-weights LLMs (Llama 3, Mistral) using LoRA and QLoRA",
      "Implement Direct Preference Optimization (DPO) on pair-wise preference data",
      "Evaluate domain-adapted models using MT-Bench and MMLU benchmarks"
    ],
    prerequisites: ["Natural Language Processing", "Deep Learning Fundamentals"],
    estimatedHours: 36,
    completionCriteria: "Fine-tune a quantized LLM with LoRA on custom domain instructions and evaluate alignment."
  },
  {
    id: "adv-03",
    slug: "advanced-rag-architecture",
    title: "Advanced RAG Architecture",
    tagline: "Agentic RAG, graph-augmented retrieval, semantic routing, and self-correction.",
    overview: "Move beyond naive RAG. Master Query Rewriting, HyDE (Hypothetical Document Embeddings), GraphRAG (Knowledge Graph entity-relation retrieval), and Corrective RAG (CRAG).",
    objectives: [
      "Implement HyDE to bridge vocabulary mismatch between queries and corpus",
      "Construct knowledge graph triplestores for GraphRAG multi-hop reasoning",
      "Build semantic routers to direct queries across specialized vector partitions",
      "Design self-corrective RAG pipelines that evaluate retrieved document quality"
    ],
    prerequisites: ["Retrieval-Augmented Generation", "Vector Databases"],
    estimatedHours: 34,
    completionCriteria: "Deploy an enterprise Graph-Augmented RAG system with automated quality self-verification."
  },
  {
    id: "adv-04",
    slug: "context-engineering",
    title: "Context Engineering",
    tagline: "Long-context window management, needle-in-a-haystack retrieval, and memory compaction.",
    overview: "Engineer the context window. Learn hierarchical summarization, semantic cache compression, lost-in-the-middle positioning mitigation, and million-token retrieval strategies.",
    objectives: [
      "Diagnose context window degradation and 'lost-in-the-middle' attention decay",
      "Implement dynamic context compaction and sliding-window memory hierarchies",
      "Construct semantic prompt caching layers to slash latency and inference costs",
      "Benchmark retrieval fidelity using Needle-in-a-Haystack synthetic testbeds"
    ],
    prerequisites: ["Prompt Engineering Fundamentals", "Retrieval-Augmented Generation"],
    estimatedHours: 26,
    completionCriteria: "Implement an automated context compaction engine with sub-100ms semantic cache lookups."
  },
  {
    id: "adv-05",
    slug: "multi-agent-systems",
    title: "Multi-Agent Systems",
    tagline: "Collaborative agent swarms, consensus protocols, and hierarchical task delegation.",
    overview: "Build teams of specialized AI agents that collaborate, debate, and verify each other. Explore supervisory architectures, graph-based agent topologies, and voting protocols.",
    objectives: [
      "Design hierarchical multi-agent teams with planner, worker, and critic roles",
      "Implement inter-agent communication protocols and structured message passing",
      "Prevent agent infinite loops and deadlocks with state machine boundaries",
      "Benchmark multi-agent debate systems against single-agent baselines"
    ],
    prerequisites: ["AI Agents and Automation"],
    estimatedHours: 32,
    completionCriteria: "Engineer a multi-agent software engineering squad that writes, reviews, and tests code."
  },
  {
    id: "adv-06",
    slug: "ai-infrastructure-engineering",
    title: "AI Infrastructure Engineering",
    tagline: "Kubernetes, Ray clusters, vLLM, TensorRT-LLM, and autoscaling inference.",
    overview: "Deploy high-concurrency AI systems. Master vLLM continuous batching, PagedAttention, TensorRT-LLM kernel compilation, Triton Inference Server, and Kubernetes operator management.",
    objectives: [
      "Configure vLLM for high-throughput serving with continuous batching and PagedAttention",
      "Compile optimized inference engines using TensorRT-LLM and ONNX Runtime",
      "Deploy Ray clusters for distributed data processing and parallel inference",
      "Implement autoscaling Kubernetes deployments based on token backlog metrics"
    ],
    prerequisites: ["AI Application Development", "Advanced Python for AI"],
    estimatedHours: 36,
    completionCriteria: "Deploy a production-ready vLLM inference cluster with horizontal Pod autoscaling."
  },
  {
    id: "adv-07",
    slug: "model-deployment-and-optimization",
    title: "Model Deployment and Optimization",
    tagline: "Pruning, knowledge distillation, quantization (FP8, INT4), and edge runtime deployment.",
    overview: "Shrink models without sacrificing accuracy. Learn structured weight pruning, teacher-student knowledge distillation, speculative decoding, and deployment on mobile edge hardware.",
    objectives: [
      "Compress neural networks using post-training quantization and quantization-aware training",
      "Execute knowledge distillation from large foundation models to compact student models",
      "Implement speculative decoding to accelerate token generation latency by 2x+",
      "Export and benchmark models on mobile runtimes (CoreML, ONNX, TFLite/ExecuTorch)"
    ],
    prerequisites: ["Deep Learning Fundamentals", "Deep Learning Fundamentals"],
    estimatedHours: 28,
    completionCriteria: "Distill and quantize an LLM for real-time mobile on-device inference under 2GB RAM."
  },
  {
    id: "adv-08",
    slug: "mlops-and-llmops",
    title: "MLOps and LLMOps",
    tagline: "Continuous training, drift monitoring, prompt versioning, and CI/CD for AI.",
    overview: "Automate the lifecycle of intelligent systems. Build CI/CD pipelines for models, monitor latency/cost/quality metrics in production, and implement automated rollback triggers.",
    objectives: [
      "Implement automated CI/CD evaluation gates for model and prompt updates",
      "Monitor token drift, toxicity, and semantic quality in live production traffic",
      "Configure shadow deployments, canary releases, and A/B prompt testing",
      "Enforce compliance and data lineage tracking across all artifacts"
    ],
    prerequisites: ["Machine Learning Engineering", "AI Application Development"],
    estimatedHours: 30,
    completionCriteria: "Construct an automated GitHub Actions CI/CD pipeline evaluating model regressions on pull requests."
  },
  {
    id: "adv-09",
    slug: "ai-security-engineering",
    title: "AI Security Engineering",
    tagline: "Prompt injection defense, jailbreak mitigation, data exfiltration, and model red-teaming.",
    overview: "Protect AI systems from adversarial attacks. Study direct and indirect prompt injection, SSRF via tool calls, data poison attacks, model inversion, and defensive sandboxing.",
    objectives: [
      "Execute automated red-teaming tests against LLMs using adversarial attacks",
      "Implement input guardrails and output content filters to thwart jailbreaks",
      "Isolate tool execution environments inside secure gVisor/Wasm sandboxes",
      "Prevent data leakage and privacy inversion from training memory"
    ],
    prerequisites: ["AI Application Development", "AI Agents and Automation"],
    estimatedHours: 28,
    completionCriteria: "Perform a full penetration test on an AI agent and implement defensive guardrail layers."
  },
  {
    id: "adv-10",
    slug: "ai-evaluation-and-observability",
    title: "AI Evaluation and Observability",
    tagline: "Evals design, LLM-as-a-judge, OpenInference, Langfuse, and telemetry traces.",
    overview: "You cannot improve what you cannot measure. Learn to author deterministic evaluation datasets, implement LLM-as-a-Judge with calibration, and trace distributed spans with OpenTelemetry.",
    objectives: [
      "Design gold-standard benchmark datasets for domain-specific evaluation",
      "Calibrate LLM-as-a-Judge evaluators to eliminate position and verbosity bias",
      "Instrument OpenTelemetry spans to capture full request-response execution traces",
      "Track regression metrics across prompt iterations and model updates"
    ],
    prerequisites: ["AI Application Development"],
    estimatedHours: 24,
    completionCriteria: "Deploy an observability dashboard tracking latency, cost, and LLM-as-a-judge accuracy."
  },
  {
    id: "adv-11",
    slug: "distributed-ai-systems",
    title: "Distributed AI Systems",
    tagline: "Data parallelism, tensor parallelism, pipeline parallelism, and DeepSpeed.",
    overview: "Train and run models that exceed single-GPU memory. Master PyTorch FSDP (Fully Sharded Data Parallel), Megatron-LM tensor slicing, pipeline stages, and NCCL communication primitives.",
    objectives: [
      "Analyze memory breakdown (parameters, gradients, optimizer states, activations)",
      "Configure PyTorch Fully Sharded Data Parallel (FSDP) and DeepSpeed ZeRO 1/2/3",
      "Understand all-reduce, all-gather, and reduce-scatter collective communications",
      "Scale training runs across multi-node GPU clusters"
    ],
    prerequisites: ["Deep Learning Fundamentals", "AI Infrastructure Engineering"],
    estimatedHours: 34,
    completionCriteria: "Configure and run a multi-GPU FSDP training benchmark with memory profiling."
  },
  {
    id: "adv-12",
    slug: "gpu-computing-fundamentals",
    title: "GPU Computing Fundamentals",
    tagline: "CUDA architecture, warp divergence, shared memory, and Triton kernels.",
    overview: "Unlock raw hardware throughput. Understand GPU memory hierarchy (HBM, L2, Shared Memory, Registers), thread warps, memory coalescing, and write custom kernels with OpenAI Triton.",
    objectives: [
      "Understand CUDA execution hierarchy (Threads, Blocks, Grids, Streaming Multiprocessors)",
      "Diagnose uncoalesced memory access and warp divergence inefficiencies",
      "Author custom fused activation and normalization kernels in OpenAI Triton",
      "Profile GPU kernel utilization and memory bandwidth using NVIDIA Nsight Compute"
    ],
    prerequisites: ["Mathematics for AI", "Deep Learning Fundamentals"],
    estimatedHours: 32,
    completionCriteria: "Write a fused Softmax or LayerNorm kernel in Triton that outperforms PyTorch eager mode."
  },
  {
    id: "adv-13",
    slug: "production-ai-architecture",
    title: "Production AI Architecture",
    tagline: "Enterprise systems design: reliability, SLA guarantees, data sovereignty, and disaster recovery.",
    overview: "The capstone of AI engineering. Architect enterprise-scale AI platforms handling millions of queries with 99.99% availability, strict security compliance, and cost optimization.",
    objectives: [
      "Synthesize RAG, agents, fine-tuning, and caching into unified enterprise architecture",
      "Design fault-tolerant failovers across multi-region cloud providers",
      "Enforce data sovereignty and regulatory isolation for sensitive workloads",
      "Present technical architecture proposals with rigorous cost and capacity modeling"
    ],
    prerequisites: ["All prior Intermediate and Advanced courses"],
    estimatedHours: 40,
    completionCriteria: "Deliver a complete production AI architecture blueprint and prototype for an enterprise platform."
  }
];

function buildFullCourse(rawCourse, level) {
  const modules = [
    {
      id: `${rawCourse.id}-mod-1`,
      slug: "foundations-and-architecture",
      sequenceOrder: 1,
      title: "Foundations & Architectural Intuition",
      description: `Core theoretical concepts, mental models, and environmental setup for ${rawCourse.title}.`,
      durationMinutes: Math.round((rawCourse.estimatedHours * 60) * 0.25),
      lessons: [
        {
          id: `${rawCourse.id}-les-101`,
          slug: "conceptual-underpinnings",
          sequenceOrder: 1,
          title: `1.1 Core Principles of ${rawCourse.title}`,
          type: "concept",
          durationMinutes: 25,
          contentMarkdown: `# Core Principles: ${rawCourse.title}\n\nWelcome to Basirah Academy's intensive study of **${rawCourse.title}**.\n\n### The Engineering Imperative\nIn this lesson, we break down foundational intuition. Rather than treating systems as black boxes, we dissect the mathematical and computational mechanisms governing them.\n\n> **Core Insight:** In AI engineering, mastery is defined not by how many tools you can invoke, but by how accurately you can diagnose failure modes and reason about computational complexity.\n\n### Key Pillars\n1. **Theoretical Foundations:** Understand the mathematical and physical constraints.\n2. **Architectural Trade-offs:** Every design decision balances latency, memory, accuracy, and operational cost.\n3. **Practical Implementation:** Ground all theory with reproducible code.\n\nReflect on how these principles apply to real-world software architecture.`,
          knowledgeCheck: {
            id: `${rawCourse.id}-chk-1`,
            prompt: `What is the primary philosophy emphasized in Basirah Academy's approach to ${rawCourse.title}?`,
            type: "multiple_choice",
            options: [
              "Superficial usage of high-level chat tools without looking under the hood",
              "Rigorous understanding of foundational mechanics, architecture, and practical engineering trade-offs",
              "Memorizing API parameter names without testing them",
              "Focusing exclusively on competitive coding rankings"
            ],
            correctOptionIndex: 1,
            explanation: "Basirah Academy emphasizes true understanding, practical engineering, and ethical mastery without artificial pressure or superficial tool usage."
          }
        },
        {
          id: `${rawCourse.id}-les-102`,
          slug: "environment-and-tooling",
          sequenceOrder: 2,
          title: `1.2 Environment Setup, Tooling & Benchmarks`,
          type: "code",
          durationMinutes: 35,
          contentMarkdown: `# Setup and Tooling for ${rawCourse.title}\n\nEstablish a reproducible environment with pinned dependencies, logging, and performance telemetry.\n\n\`\`\`python\nimport sys\nimport time\nimport logging\n\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")\nlogger = logging.getLogger("basirah.system")\n\ndef verify_runtime():\n    logger.info("Initializing runtime environment for ${rawCourse.title}...")\n    assert sys.version_info >= (3, 10), "Python 3.10+ required for modern AI engineering"\n    logger.info("Python environment verified: %s", sys.version)\n    return True\n\nif __name__ == "__main__":\n    verify_runtime()\n\`\`\`\n\nExecute this block to ensure proper environment calibration.`,
          codeSnippet: `import sys\n\ndef check_env():\n    print(f"Calibrating runtime for ${rawCourse.title} on Python {sys.version.split()[0]}")\n    return "READY"\n\nprint(check_env())`,
          codeLanguage: "python",
          practicalExercise: {
            id: `${rawCourse.id}-ex-1`,
            title: "Runtime Calibration",
            instruction: "Run the verification script to validate your environment.",
            starterCode: `def verify():\n    # Implement check\n    return "VERIFIED"\n\nprint(verify())`,
            expectedOutput: "VERIFIED",
            hint: "Return the string 'VERIFIED' and print it."
          }
        }
      ],
      quiz: {
        id: `${rawCourse.id}-q1`,
        title: `Module 1 Knowledge Assessment: ${rawCourse.title}`,
        passingScorePercent: 80,
        questions: [
          {
            id: `${rawCourse.id}-q1-1`,
            prompt: `In the context of ${rawCourse.title}, why is architectural trade-off analysis critical?`,
            type: "multiple_choice",
            options: [
              "Because systems never fail once deployed",
              "Every engineering choice inherently balances latency, memory, cost, and fidelity",
              "To make code look more complex than necessary",
              "Trade-off analysis is only necessary for legacy systems"
            ],
            correctOptionIndex: 1,
            explanation: "Engineering is fundamentally about optimizing constrained resources and navigating trade-offs under real-world conditions."
          },
          {
            id: `${rawCourse.id}-q1-2`,
            prompt: "True or False: Basirah Academy encourages public competitive ranking and pressure-based grading.",
            type: "true_false",
            options: ["True", "False"],
            correctOptionIndex: 1,
            explanation: "False. Basirah's educational philosophy rejects unhealthy competition, public ranking, and artificial intimidation in favor of genuine mastery."
          }
        ]
      }
    },
    {
      id: `${rawCourse.id}-mod-2`,
      slug: "deep-dive-and-implementation",
      sequenceOrder: 2,
      title: "Core Mechanics & Laboratory Implementation",
      description: `Hands-on engineering, step-by-step algorithms, and production code patterns for ${rawCourse.title}.`,
      durationMinutes: Math.round((rawCourse.estimatedHours * 60) * 0.4),
      lessons: [
        {
          id: `${rawCourse.id}-les-201`,
          slug: "algorithmic-mechanics",
          sequenceOrder: 1,
          title: `2.1 Algorithmic Deep Dive: ${rawCourse.title}`,
          type: "code",
          durationMinutes: 45,
          contentMarkdown: `# Algorithmic Implementation\n\nHere we step through the core execution loop. Study the data structures and mathematical equations driving this workflow.\n\n### Architectural Flow\n1. Input ingest and tensor mapping\n2. Validation against schema constraints\n3. Algorithmic transformation\n4. Output formatting and telemetry logging`,
          codeSnippet: `# Implementation pattern for ${rawCourse.title}\nclass ${rawCourse.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Engine:\n    def __init__(self, config=None):\n        self.config = config or {}\n        self.initialized = True\n        \n    def process(self, payload: dict) -> dict:\n        if not self.initialized:\n            raise RuntimeError("Engine uninitialized")\n        return {"status": "SUCCESS", "course": "${rawCourse.slug}", "processed": True}\n\nengine = ${rawCourse.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Engine()\nprint(engine.process({"sample": "data"}))`,
          codeLanguage: "python"
        },
        {
          id: `${rawCourse.id}-les-202`,
          slug: "debugging-and-failure-modes",
          sequenceOrder: 2,
          title: `2.2 Diagnosing Failure Modes & Edge Cases`,
          type: "concept",
          durationMinutes: 30,
          contentMarkdown: `# Debugging and Failure Analysis\n\nAI systems fail in subtle, silent ways—not with exceptions, but with degraded outputs, distribution drift, and numerical instability. We study how to catch these before production users do.`
        }
      ],
      assignment: {
        id: `${rawCourse.id}-assign-1`,
        title: `Practical Laboratory: Implement ${rawCourse.title} Engine`,
        descriptionMarkdown: `Develop a tested, modular implementation addressing the core requirements of **${rawCourse.title}**. Write clean code, handle edge cases, and include a test script.`,
        starterCode: `# Starter Code for ${rawCourse.title} Laboratory\ndef run_laboratory():\n    # TODO: Implement core logic\n    pass\n`,
        rubric: [
          { criterion: "Algorithmic Correctness", points: 40, description: "Correct implementation of core equations and data flow." },
          { criterion: "Error Handling & Edge Cases", points: 30, description: "Graceful handling of null, malformed, or boundary inputs." },
          { criterion: "Code Cleanliness & Documentation", points: 30, description: "Type hints, docstrings, and modular design." }
        ],
        maxScore: 100
      }
    },
    {
      id: `${rawCourse.id}-mod-3`,
      slug: "production-engineering-and-project",
      sequenceOrder: 3,
      title: "Real-World Deployment & Capstone Project",
      description: `Packaging, evaluation, latency optimization, and final deliverable for ${rawCourse.title}.`,
      durationMinutes: Math.round((rawCourse.estimatedHours * 60) * 0.35),
      lessons: [
        {
          id: `${rawCourse.id}-les-301`,
          slug: "production-hardening",
          sequenceOrder: 1,
          title: `3.1 Production Hardening & Evaluation Metrics`,
          type: "concept",
          durationMinutes: 30,
          contentMarkdown: `# Production Hardening\n\nTransitioning from experimental prototype to robust software: latency budgets, caching, fallback behaviors, and monitoring.`
        },
        {
          id: `${rawCourse.id}-les-302`,
          slug: "capstone-walkthrough",
          sequenceOrder: 2,
          title: `3.2 Capstone Project Walkthrough & Rubric Review`,
          type: "interactive",
          durationMinutes: 40,
          contentMarkdown: `# Capstone Walkthrough\n\nReview the project specification, submission requirements, and self-evaluation checklist before final submission.`
        }
      ]
    }
  ];

  return {
    ...rawCourse,
    level,
    modulesCount: modules.length,
    lessonsCount: modules.reduce((acc, m) => acc + m.lessons.length, 0),
    rating: 4.95,
    published: true,
    realWorldProject: {
      title: `Capstone Deliverable: ${rawCourse.title} Enterprise Solution`,
      description: `Design, engineer, and document a production-quality implementation of ${rawCourse.title} solving a real-world technological challenge.`,
      deliverables: [
        "Complete source code repository with unit and integration tests",
        "Technical architecture document detailing design choices and trade-offs",
        "Benchmark evaluation report measuring latency, accuracy, and resource consumption"
      ],
      rubric: [
        { criterion: "System Architecture & Design", points: 35, description: "Clarity, modularity, and scalability of the solution." },
        { criterion: "Technical Execution & Code Quality", points: 35, description: "Adherence to software engineering best practices, type safety, and test coverage." },
        { criterion: "Empirical Evaluation & Analysis", points: 30, description: "Comprehensive benchmarking, failure analysis, and honest reporting of limitations." }
      ]
    },
    references: [
      { title: "Deep Learning and Neural Foundations", author: "Goodfellow, Bengio, & Courville", year: 2016 },
      { title: "Attention Is All You Need", author: "Vaswani et al.", year: 2017 },
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", author: "Lewis et al.", year: 2020 }
    ],
    modules
  };
}

const fullCurriculum = {
  learningPaths: [
    {
      id: "path-beginner",
      slug: "beginner-academy",
      level: "beginner",
      title: "Discover AI — The Foundations of Intelligence",
      tagline: "Understand, explore, and utilize artificial intelligence in everyday life, science, and industry.",
      description: "A comprehensive pathway taking you from zero conceptual knowledge to strong AI literacy, programming proficiency in Python, and mathematical intuition.",
      targetAudience: "Aspiring engineers, students, researchers, domain specialists, and curious creators.",
      competencies: [
        "Conceptual AI intuition & historical evolution",
        "Prompt engineering & context calibration",
        "Python programming fluency for data tasks",
        "Linear algebra & calculus fundamentals for neural computing",
        "Foundational machine learning algorithms and statistical data analysis"
      ],
      estimatedWeeks: 12,
      courseSlugs: beginnerCourses.map(c => c.slug)
    },
    {
      id: "path-intermediate",
      slug: "intermediate-academy",
      level: "intermediate",
      title: "Build with AI — Engineering Intelligent Systems",
      tagline: "Develop, train, and orchestrate modern AI applications, neural networks, and RAG pipelines.",
      description: "Bridge the gap from understanding to engineering. Build neural networks in PyTorch, deploy RAG pipelines with vector databases, and construct autonomous tool-calling agents.",
      targetAudience: "Software developers, data engineers, STEM graduates, and technical builders.",
      competencies: [
        "PyTorch neural network architectures & self-attention",
        "Vector databases & dense semantic retrieval",
        "Production Retrieval-Augmented Generation (RAG)",
        "Autonomous multi-step AI agents and function dispatch",
        "Full-stack AI application development with streaming telemetry"
      ],
      estimatedWeeks: 16,
      courseSlugs: intermediateCourses.map(c => c.slug)
    },
    {
      id: "path-advanced",
      slug: "advanced-academy",
      level: "advanced",
      title: "Engineer Intelligence — Production Frontiers",
      tagline: "Fine-tune LLMs, design multi-agent swarms, scale GPU clusters, and harden AI security.",
      description: "For elite AI practitioners and infrastructure architects. Delve into LoRA/QLoRA fine-tuning, vLLM continuous batching, distributed FSDP, OpenAI Triton kernels, and adversarial security.",
      targetAudience: "Senior software engineers, AI architects, infrastructure leads, and research practitioners.",
      competencies: [
        "LLM fine-tuning with LoRA/QLoRA and Direct Preference Optimization (DPO)",
        "Advanced GraphRAG and context window compaction",
        "High-throughput inference engines with vLLM and TensorRT-LLM",
        "Distributed multi-GPU training with PyTorch FSDP & DeepSpeed",
        "Adversarial security, prompt injection defense, and automated evaluation"
      ],
      estimatedWeeks: 20,
      courseSlugs: advancedCourses.map(c => c.slug)
    }
  ],
  courses: [
    ...beginnerCourses.map(c => buildFullCourse(c, "beginner")),
    ...intermediateCourses.map(c => buildFullCourse(c, "intermediate")),
    ...advancedCourses.map(c => buildFullCourse(c, "advanced"))
  ]
};

const outputDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(outputDir, 'courses.json'), JSON.stringify(fullCurriculum, null, 2), 'utf-8');
console.log(`Successfully generated ${fullCurriculum.courses.length} comprehensive courses across 3 learning paths!`);

