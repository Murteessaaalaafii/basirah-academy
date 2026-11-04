package academy.basirah.app.ui.quiz;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;
import academy.basirah.app.data.repository.CourseRepository;

public class QuizActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);

        RadioGroup rg = findViewById(R.id.rgOptions);
        RadioButton rbOption2 = findViewById(R.id.rbOption2);
        TextView tvExplanation = findViewById(R.id.tvExplanation);
        Button btnSubmit = findViewById(R.id.btnSubmitQuiz);
        String courseSlug = getIntent().getStringExtra("course_slug");

        btnSubmit.setOnClickListener(v -> {
            int checkedId = rg.getCheckedRadioButtonId();
            if (checkedId == -1) {
                Toast.makeText(this, "Please select an answer", Toast.LENGTH_SHORT).show();
                return;
            }

            tvExplanation.setVisibility(View.VISIBLE);
            if (checkedId == rbOption2.getId()) {
                Toast.makeText(this, "Correct! Demonstrated 100% competency.", Toast.LENGTH_LONG).show();
                CourseRepository repo = new CourseRepository(this);
                repo.recordLessonProgress(courseSlug != null ? courseSlug : "default", "q1", true, 100);
            } else {
                Toast.makeText(this, "Incorrect. Review the explanation above.", Toast.LENGTH_LONG).show();
            }
            btnSubmit.setText("Finish Assessment");
            btnSubmit.setOnClickListener(v2 -> finish());
        });
    }
}

