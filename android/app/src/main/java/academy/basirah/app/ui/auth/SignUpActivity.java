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

public class SignUpActivity extends AppCompatActivity {
    private EditText etFullName, etEmail, etPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        etFullName = findViewById(R.id.etFullName);
        etEmail = findViewById(R.id.etSignUpEmail);
        etPassword = findViewById(R.id.etSignUpPassword);
        Button btnSubmit = findViewById(R.id.btnSubmitSignUp);
        TextView tvGoToSignIn = findViewById(R.id.tvGoToSignIn);

        btnSubmit.setOnClickListener(v -> {
            String name = etFullName.getText().toString().trim();
            String email = etEmail.getText().toString().trim();

            SharedPreferences prefs = getSharedPreferences("basirah_prefs", MODE_PRIVATE);
            prefs.edit()
                    .putString("user_email", email.isEmpty() ? "student@basirah.academy" : email)
                    .putString("user_name", name.isEmpty() ? "Learner" : name)
                    .putString("user_level", "beginner")
                    .apply();

            Toast.makeText(this, "Account created successfully", Toast.LENGTH_SHORT).show();
            startActivity(new Intent(SignUpActivity.this, MainActivity.class));
            finish();
        });

        tvGoToSignIn.setOnClickListener(v -> {
            startActivity(new Intent(SignUpActivity.this, SignInActivity.class));
            finish();
        });
    }
}

