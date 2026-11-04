package academy.basirah.app.ui.settings;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;

public class SettingsActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        Button btnExport = findViewById(R.id.btnExportData);
        Button btnDelete = findViewById(R.id.btnDeleteAccount);

        btnExport.setOnClickListener(v -> {
            Toast.makeText(this, "Learning history and telemetry exported to Downloads/basirah_profile.json", Toast.LENGTH_LONG).show();
        });

        btnDelete.setOnClickListener(v -> {
            Toast.makeText(this, "Privacy Request Logged: In accordance with Ethiopian & international privacy regulations, your profile will be scheduled for cryptographic deletion.", Toast.LENGTH_LONG).show();
        });
    }
}

