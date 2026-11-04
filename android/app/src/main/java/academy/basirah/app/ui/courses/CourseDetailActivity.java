package academy.basirah.app.ui.courses;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;
import academy.basirah.app.data.repository.CourseRepository;
import academy.basirah.app.ui.lesson.LessonViewerActivity;

public class CourseDetailActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_course_detail);

        String slug = getIntent().getStringExtra("course_slug");
        String title = getIntent().getStringExtra("course_title");
        String overview = getIntent().getStringExtra("course_overview");
        String level = getIntent().getStringExtra("course_level");
        int hours = getIntent().getIntExtra("course_hours", 20);

        TextView tvLevel = findViewById(R.id.tvDetailLevel);
        TextView tvTitle = findViewById(R.id.tvDetailTitle);
        TextView tvHours = findViewById(R.id.tvDetailHours);
        TextView tvOverview = findViewById(R.id.tvDetailOverview);
        Button btnStart = findViewById(R.id.btnStartCourse);
        Button btnDownload = findViewById(R.id.btnDownloadCourse);

        if (title != null) tvTitle.setText(title);
        if (level != null) tvLevel.setText(level.toUpperCase() + " PATHWAY");
        if (overview != null) tvOverview.setText(overview);
        tvHours.setText(hours + " Hours • 3 Modules • 6 Lessons");

        btnStart.setOnClickListener(v -> {
            Intent intent = new Intent(CourseDetailActivity.this, LessonViewerActivity.class);
            intent.putExtra("course_slug", slug);
            intent.putExtra("course_title", title);
            startActivity(intent);
        });

        btnDownload.setOnClickListener(v -> {
            CourseRepository repo = new CourseRepository(this);
            repo.toggleDownload(slug, true);
            Toast.makeText(this, "Course saved for offline access", Toast.LENGTH_SHORT).show();
        });
    }
}

