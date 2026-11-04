package academy.basirah.app.ui.certificates;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;

public class CertificatesActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_certificates);

        Button btnShare = findViewById(R.id.btnShareCert);
        btnShare.setOnClickListener(v -> {
            Intent sendIntent = new Intent();
            sendIntent.setAction(Intent.ACTION_SEND);
            sendIntent.putExtra(Intent.EXTRA_TEXT, "I just earned my verified credential in Python Programming Fundamentals at Basirah Academy! Verification: https://basirah.academy/verify/BAS-CERT-8812");
            sendIntent.setType("text/plain");
            startActivity(Intent.createChooser(sendIntent, "Share Credential"));
        });
    }
}

