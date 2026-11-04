package academy.basirah.app.ui.tutor;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import academy.basirah.app.R;

public class AITutorFragment extends Fragment {
    private LinearLayout messagesContainer;
    private ScrollView scrollChat;
    private EditText etInput;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_ai_tutor, container, false);

        messagesContainer = view.findViewById(R.id.chatMessagesContainer);
        scrollChat = view.findViewById(R.id.scrollChat);
        etInput = view.findViewById(R.id.etTutorInput);
        Button btnSend = view.findViewById(R.id.btnSendTutor);

        btnSend.setOnClickListener(v -> {
            String query = etInput.getText().toString().trim();
            if (!query.isEmpty()) {
                addMessage("Learner", query, false);
                etInput.setText("");

                // Simulate Socratic RAG Guidance
                new Handler(Looper.getMainLooper()).postDelayed(() -> {
                    String response = generateTutorReply(query);
                    addMessage("Basirah Socratic Engine", response, true);
                }, 600);
            }
        });

        return view;
    }

    private void addMessage(String sender, String text, boolean isTutor) {
        if (getContext() == null) return;

        CardView card = new CardView(requireContext());
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(0, 0, 0, 24);
        card.setLayoutParams(params);
        card.setRadius(28f);
        card.setCardElevation(4f);
        card.setCardBackgroundColor(ContextCompat.getColor(requireContext(), 
                isTutor ? R.color.deep_space : R.color.royal_cobalt));

        LinearLayout layout = new LinearLayout(requireContext());
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(32, 28, 32, 28);

        TextView tvSender = new TextView(requireContext());
        tvSender.setText(sender);
        tvSender.setTextSize(11f);
        tvSender.setTextColor(ContextCompat.getColor(requireContext(), 
                isTutor ? R.color.crystal_cyan : R.color.champagne_gold));
        tvSender.setTypeface(null, android.graphics.Typeface.BOLD);
        layout.addView(tvSender);

        TextView tvContent = new TextView(requireContext());
        tvContent.setText(text);
        tvContent.setTextSize(13f);
        tvContent.setTextColor(ContextCompat.getColor(requireContext(), R.color.pearl_white));
        tvContent.setLineSpacing(6f, 1f);
        layout.addView(tvContent);

        card.addView(layout);
        messagesContainer.addView(card);

        scrollChat.post(() -> scrollChat.fullScroll(View.FOCUS_DOWN));
    }

    private String generateTutorReply(String query) {
        String q = query.toLowerCase();
        if (q.contains("rag") || q.contains("vector")) {
            return "In Retrieval-Augmented Generation, we mitigate hallucinations by grounding the LLM in external vector indexes.\n\nKey Step: Combine dense vector cosine search with BM25 lexical search using Reciprocal Rank Fusion (RRF).\n\nCitation: Course: Retrieval-Augmented Generation (Lesson 2.1)";
        } else if (q.contains("gradient") || q.contains("backprop")) {
            return "Gradient descent updates parameters in the direction of steepest loss decrease:\n\nw_{t+1} = w_t - η * ∇L(w_t)\n\nTip: Use Gradient Clipping to avoid exploding gradients in deep networks.\n\nCitation: Course: Deep Learning Fundamentals (Lesson 1.1)";
        }
        return "To master this concept from first principles: What mathematical guarantees govern this system, and how would you verify it with a minimal 5-line PyTorch test?";
    }
}

