package academy.basirah.app.ui.assignment;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;

public class AssignmentActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_assignment);

        String title = getIntent().getStringExtra("project_title");
        TextView tvTitle = findViewById(R.id.tvAssignmentTitle);
        EditText etInput = findViewById(R.id.etSubmissionInput);
        Button btnSubmit = findViewById(R.id.btnSubmitAssignment);

        if (title != null) {
            tvTitle.setText(title);
        }

        btnSubmit.setOnClickListener(v -> {
            String submission = etInput.getText().toString().trim();
            if (submission.isEmpty()) {
                Toast.makeText(this, "Please provide your code or repository link.", Toast.LENGTH_SHORT).show();
                return;
            }

            Toast.makeText(this, "Capstone deliverable submitted to Basirah Academic Review Board.", Toast.LENGTH_LONG).show();
            finish();
        });
    }
}

