import re
from typing import Tuple, List

# Patterns indicative of prompt injection, jailbreaks, or instruction override attempts
INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions",
    r"disregard\s+(all\s+)?(previous|prior)\s+rules",
    r"you\s+are\s+now\s+in\s+developer\s+mode",
    r"dan\s+mode",
    r"bypass\s+all\s+(filters|rules|safety)",
    r"system\s*prompt\s*reveal",
    r"reveal\s+your\s+(hidden|internal|system)\s+instructions",
    r"jailbreak",
    r"sudo\s+mode",
    r"act\s+as\s+an\s+unfiltered\s+ai"
]

COMPILED_INJECTIONS = [re.compile(p, re.IGNORECASE) for p in INJECTION_PATTERNS]

class SafetyModerator:
    @staticmethod
    def audit_prompt(prompt: str) -> Tuple[bool, str]:
        """
        Audits user input for safety violations, adversarial injections, or malformed queries.
        Returns (is_safe: bool, reason: str).
        """
        if not prompt or not prompt.strip():
            return False, "Query cannot be empty."

        clean_text = prompt.strip()
        
        # Check query length
        if len(clean_text) > 4000:
            return False, "Input query exceeds maximum allowed length of 4000 characters."

        # Check for adversarial injection signatures
        for pattern in COMPILED_INJECTIONS:
            if pattern.search(clean_text):
                return False, "Security Notice: Your query contains patterns flagged as potential prompt injection or system override. Basirah Academy enforces strict architectural safety."

        return True, "Safe"

    @staticmethod
    def sanitize_output(output_text: str) -> str:
        """
        Ensures response does not leak confidential system tokens or keys.
        """
        # Redact any accidental API key or secret leakage
        sanitized = re.sub(r"(AIza[0-9A-Za-z-_]{35})", "[REDACTED_API_KEY]", output_text)
        sanitized = re.sub(r"(sk-[A-Za-z0-9]{32,})", "[REDACTED_SECRET]", sanitized)
        return sanitized

