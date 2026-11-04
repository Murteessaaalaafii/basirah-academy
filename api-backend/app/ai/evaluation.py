import time
from typing import Dict, Any, List

class AIEvaluationTracker:
    def __init__(self):
        self.metrics = {
            "total_requests": 0,
            "total_tokens": 0,
            "estimated_cost_usd": 0.0,
            "average_latency_ms": 0.0,
            "feedback_positive": 0,
            "feedback_negative": 0,
            "feedback_records": []
        }
        self._latencies: List[float] = []

    def record_request(self, tokens: int, latency_ms: float, model: str):
        self.metrics["total_requests"] += 1
        self.metrics["total_tokens"] += tokens
        self._latencies.append(latency_ms)
        self.metrics["average_latency_ms"] = round(sum(self._latencies) / len(self._latencies), 2)
        
        # Approximate Gemini Flash token cost: ~$0.075 per 1M tokens
        self.metrics["estimated_cost_usd"] = round((self.metrics["total_tokens"] / 1_000_000) * 0.075, 5)

    def record_feedback(self, user_id: str, message_id: str, rating: str, category: str = "", notes: str = ""):
        if rating.lower() in ["positive", "up", "helpful"]:
            self.metrics["feedback_positive"] += 1
        else:
            self.metrics["feedback_negative"] += 1

        self.metrics["feedback_records"].append({
            "userId": user_id,
            "messageId": message_id,
            "rating": rating,
            "category": category,
            "notes": notes,
            "timestamp": time.time()
        })

    def get_summary(self) -> Dict[str, Any]:
        return {
            **self.metrics,
            "recent_feedbacks_count": len(self.metrics["feedback_records"])
        }

evaluation_tracker = AIEvaluationTracker()

