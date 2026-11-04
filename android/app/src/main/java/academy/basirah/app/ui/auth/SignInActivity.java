package academy.basirah.app.ui.auth;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import academy.basirah.app.R;
import academy.basirah.app.ui.main.MainActivity;

public class SignInActivity extends AppCompatActivity {
    private EditText etEmail, etPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signin);

        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        Button btnSubmit = findViewById(R.id.btnSubmitSignIn);
        Button btnDemo = findViewById(R.id.btnDemoStudent);
        TextView tvGoToSignUp = findViewById(R.id.tvGoToSignUp);

        btnSubmit.setOnClickListener(v -> performLogin(etEmail.getText().toString().trim()));

        btnDemo.setOnClickListener(v -> performLogin("student@basirah.academy"));

        tvGoToSignUp.setOnClickListener(v -> {
            startActivity(new Intent(SignInActivity.this, SignUpActivity.class));
            finish();
        });
    }

    private void performLogin(String email) {
        SharedPreferences prefs = getSharedPreferences("basirah_prefs", MODE_PRIVATE);
        prefs.edit()
                .putString("user_email", email.isEmpty() ? "student@basirah.academy" : email)
                .putString("user_name", "Amina Al-Mansoor")
                .putString("user_level", "intermediate")
                .apply();

        Toast.makeText(this, "Welcome to Basirah Academy", Toast.LENGTH_SHORT).show();
        startActivity(new Intent(SignInActivity.this, MainActivity.class));
        finish();
    }
}

