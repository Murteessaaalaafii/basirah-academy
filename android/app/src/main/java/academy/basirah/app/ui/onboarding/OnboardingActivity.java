package academy.basirah.app.ui.onboarding;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;
import academy.basirah.app.ui.auth.SignInActivity;
import academy.basirah.app.ui.auth.SignUpActivity;

public class OnboardingActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_onboarding);

        Button btnGetStarted = findViewById(R.id.btnGetStarted);
        Button btnSignInExisting = findViewById(R.id.btnSignInExisting);

        btnGetStarted.setOnClickListener(v -> {
            markOnboardingComplete();
            startActivity(new Intent(OnboardingActivity.this, SignUpActivity.class));
            finish();
        });

        btnSignInExisting.setOnClickListener(v -> {
            markOnboardingComplete();
            startActivity(new Intent(OnboardingActivity.this, SignInActivity.class));
            finish();
        });
    }

    private void markOnboardingComplete() {
        SharedPreferences prefs = getSharedPreferences("basirah_prefs", MODE_PRIVATE);
        prefs.edit().putBoolean("onboarding_complete", true).apply();
    }
}

