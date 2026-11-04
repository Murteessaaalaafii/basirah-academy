import os
import time
import json
from typing import List, Dict, Any, Optional
from ..config import settings
from .safety import SafetyModerator
from .rag_engine import rag_engine
from .prompts import SYSTEM_BASE_TUTOR_PROMPT

class AIGateway:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.default_model = settings.DEFAULT_MODEL
        self._genai_client = None

        if self.api_key:
            try:
                from google import genai
                self._genai_client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"[AIGateway] Warning: Failed to initialize Google GenAI client: {e}")

    def generate_tutor_response(
        self,
        query: str,
        chat_history: Optional[List[Dict[str, str]]] = None,
        course_slug: Optional[str] = None,
        lesson_slug: Optional[str] = None,
        level_filter: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Orchestrates safe Socratic AI response with RAG curriculum grounding and citations.
        """
        start_time = time.time()
        chat_history = chat_history or []

        # 1. Safety Audit
        is_safe, safety_reason = SafetyModerator.audit_prompt(query)
        if not is_safe:
            return {
                "role": "assistant",
                "content": f"Safety Notice: {safety_reason}",
                "citations": [],
                "tokensUsed": 0,
                "latencyMs": round((time.time() - start_time) * 1000, 2),
                "model": "safety-filter",
                "status": "flagged"
            }

        # 2. Retrieve Relevant Curriculum Chunks via RAG
        citations = rag_engine.search(query, top_k=3, level_filter=level_filter)
        
        # 3. Assemble Context & Grounding
        context_text = ""
        if citations:
            context_text = "\n\n### Retrieved Basirah Academy Curriculum Context:\n"
            for c in citations:
                context_text += f"- [{c['courseTitle']} > {c['lessonTitle']}]: {c['excerpt']}\n"

        system_instruction = SYSTEM_BASE_TUTOR_PROMPT + context_text

        # 4. Invoke LLM or Fallback Simulator
        response_text = ""
        tokens_used = 0
        model_name = self.default_model

        if self._genai_client and self.api_key:
            try:
                # Call Gemini API
                full_prompt = f"{system_instruction}\n\nLearner Query: {query}"
                resp = self._genai_client.models.generate_content(
                    model=self.default_model,
                    contents=full_prompt
                )
                response_text = resp.text
                tokens_used = getattr(resp, 'usage_metadata', {}).get('total_token_count', len(response_text) // 4)
            except Exception as err:
                print(f"[AIGateway] Live inference fallback due to: {err}")
                response_text = self._simulate_pedagogical_response(query, citations)
                tokens_used = len(response_text) // 4
                model_name = "basirah-socratic-local-engine"
        else:
            # Deterministic, pedagogical local engine
            response_text = self._simulate_pedagogical_response(query, citations)
            tokens_used = len(response_text) // 4
            model_name = "basirah-socratic-local-engine"

        # 5. Output Sanitization
        clean_response = SafetyModerator.sanitize_output(response_text)
        latency_ms = round((time.time() - start_time) * 1000, 2)

        return {
            "role": "assistant",
            "content": clean_response,
            "citations": citations,
            "tokensUsed": tokens_used,
            "latencyMs": latency_ms,
            "model": model_name,
            "status": "success"
        }

    def _simulate_pedagogical_response(self, query: str, citations: List[Dict[str, Any]]) -> str:
        """
        Produces high-quality, technically precise Socratic tutoring responses when running locally or offline.
        """
        clean_q = query.lower()

        if "gradient descent" in clean_q or "backprop" in clean_q or "optimization" in clean_q:
            return (
                "### Understanding Gradient Descent & Optimization Mechanics\n\n"
                "In neural computing, **gradient descent** is the mathematical engine that iteratively minimizes empirical risk (the loss function $\\mathcal{L}$). Let's inspect the underlying dynamics:\n\n"
                "1. **The Vector Derivative:** At each parameter weight vector $\\mathbf{w}$, the gradient $\\nabla_{\\mathbf{w}} \\mathcal{L}$ indicates the direction of steepest *ascent* in loss space. Thus, to minimize loss, we step in the opposite direction:\n"
                "   $$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta \\cdot \\nabla_{\\mathbf{w}} \\mathcal{L}(\\mathbf{w}_t)$$\n"
                "   where $\\eta$ is the learning rate.\n\n"
                "2. **Failure Modes to Monitor:**\n"
                "   - **Vanishing Gradients:** In deep networks with saturating activations (sigmoid/tanh), gradients shrink exponentially as they propagate backward.\n"
                "   - **Exploding Gradients:** Large initializations can cause parameter overflow (`NaN`). Regularize with Gradient Clipping: `torch.nn.utils.clip_grad_norm_`.\n\n"
                "**Guiding Question:** If you observe that your training loss oscillates wildly between epochs without steadily decreasing, which hyperparameter would you tune first, and why?"
            )
        elif "rag" in clean_q or "vector" in clean_q or "embedding" in clean_q:
            return (
                "### Retrieval-Augmented Generation (RAG) Architecture\n\n"
                "RAG grounds generative language models in deterministic, external factual repositories to eliminate hallucinations and outdated knowledge.\n\n"
                "**Core Pipeline Stages:**\n"
                "1. **Chunking & Ingestion:** Raw documents are partitioned using recursive character splitting or semantic boundary detection (typical chunk sizes: 256–512 tokens with 10% overlap).\n"
                "2. **Vector Space Indexing:** High-dimensional dense embeddings (e.g., 768 or 1536 dimensions) are stored in an Approximate Nearest Neighbor (ANN) index such as HNSW (Hierarchical Navigable Small World).\n"
                "3. **Hybrid Retrieval:** Blending dense vector semantic similarity (Cosine Distance) with sparse lexical search (BM25) provides robust keyword exactness alongside semantic breadth.\n"
                "4. **Cross-Encoder Reranking:** A secondary reranker scores the top candidates before injecting them into the LLM context window.\n\n"
                "Which stage of your RAG pipeline are you currently architecting or debugging?"
            )
        elif "transformer" in clean_q or "attention" in clean_q or "llm" in clean_q:
            return (
                "### Scaled Dot-Product Attention & Transformer Mechanics\n\n"
                "The core of modern LLMs relies on the multi-head self-attention equation formulated by Vaswani et al. (2017):\n\n"
                "$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n\n"
                "- **Queries ($Q$) & Keys ($K$):** Projected vectors whose dot product captures token pairwise affinities.\n"
                "- **Scaling Factor ($\\sqrt{d_k}$):** Prevents the dot products from growing excessively large in high dimensions, which would push the softmax function into regions with vanishing gradients.\n"
                "- **Values ($V$):** The contextual representations weighted by the attention distribution.\n\n"
                "**Try This:** In PyTorch, how would you verify that your attention mask correctly conceals future tokens during causal autoregressive pre-training?"
            )
        else:
            citation_note = ""
            if citations:
                top_source = citations[0]
                citation_note = f"\n\n*Relevant Basirah Course Reference: **{top_source['courseTitle']}** ({top_source['lessonTitle']})*"

            return (
                f"### Basirah Engineering Guidance: {query.strip()}\n\n"
                "To master this concept from first principles:\n\n"
                "1. **Identify the Core Invariant:** What are the mathematical and computational guarantees underlying this operation?\n"
                "2. **Trace the Data Flow:** Track how inputs, intermediate representations (tensors/tokens), and gradients flow through the system.\n"
                "3. **Design a Minimal Reproducible Test:** Write a compact, 10-line Python or PyTorch script that isolates and validates the expected behavior before integrating it into a large-scale architecture.\n\n"
                "Tell me more about your specific goal or code snippet, and we will dissect it step by step."
                f"{citation_note}"
            )

ai_gateway = AIGateway()

