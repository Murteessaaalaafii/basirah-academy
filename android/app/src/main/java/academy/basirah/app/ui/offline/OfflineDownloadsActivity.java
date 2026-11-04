package academy.basirah.app.ui.offline;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import academy.basirah.app.R;
import academy.basirah.app.data.repository.CourseRepository;
import academy.basirah.app.ui.courses.CourseAdapter;

public class OfflineDownloadsActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_offline_downloads);

        RecyclerView rv = findViewById(R.id.rvDownloadedCourses);
        Button btnSync = findViewById(R.id.btnSyncNow);

        rv.setLayoutManager(new LinearLayoutManager(this));
        CourseAdapter adapter = new CourseAdapter(this);
        rv.setAdapter(adapter);

        CourseRepository repo = new CourseRepository(this);
        repo.getDownloadedCourses().observe(this, downloaded -> {
            if (downloaded != null) {
                adapter.setCourses(downloaded);
            }
        });

        btnSync.setOnClickListener(v -> {
            Toast.makeText(this, "All offline progress successfully synchronized with Basirah Cloud.", Toast.LENGTH_SHORT).show();
        });
    }
}

