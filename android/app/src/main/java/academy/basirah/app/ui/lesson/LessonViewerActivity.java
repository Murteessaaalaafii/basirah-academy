package academy.basirah.app.ui.lesson;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;
import academy.basirah.app.data.repository.CourseRepository;
import academy.basirah.app.ui.quiz.QuizActivity;

public class LessonViewerActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson_viewer);

        String courseSlug = getIntent().getStringExtra("course_slug");
        String courseTitle = getIntent().getStringExtra("course_title");

        TextView tvTitle = findViewById(R.id.tvLessonTitle);
        Button btnOpenQuiz = findViewById(R.id.btnOpenQuiz);
        Button btnMarkComplete = findViewById(R.id.btnMarkComplete);

        if (courseTitle != null) {
            tvTitle.setText(courseTitle + " — Laboratory 1.1");
        }

        btnOpenQuiz.setOnClickListener(v -> {
            Intent intent = new Intent(LessonViewerActivity.this, QuizActivity.class);
            intent.putExtra("course_slug", courseSlug);
            startActivity(intent);
        });

        btnMarkComplete.setOnClickListener(v -> {
            CourseRepository repo = new CourseRepository(this);
            repo.recordLessonProgress(courseSlug != null ? courseSlug : "intro-ai", "les-101", true, 90);
            Toast.makeText(this, "Progress saved to local Room database (Synced)", Toast.LENGTH_SHORT).show();
            finish();
        });
    }
}

