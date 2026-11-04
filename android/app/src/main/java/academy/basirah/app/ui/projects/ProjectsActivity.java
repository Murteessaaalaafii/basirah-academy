package academy.basirah.app.ui.projects;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;
import academy.basirah.app.ui.assignment.AssignmentActivity;

public class ProjectsActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_projects);

        Button btnWorkspace = findViewById(R.id.btnOpenProjectWorkspace);
        btnWorkspace.setOnClickListener(v -> {
            Intent intent = new Intent(ProjectsActivity.this, AssignmentActivity.class);
            intent.putExtra("project_title", "End-to-End Hybrid RAG with Cross-Encoder Reranking");
            startActivity(intent);
        });
    }
}

