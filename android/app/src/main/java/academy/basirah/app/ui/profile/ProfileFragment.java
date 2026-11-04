package academy.basirah.app.ui.profile;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import academy.basirah.app.R;
import academy.basirah.app.ui.auth.SignInActivity;
import academy.basirah.app.ui.certificates.CertificatesActivity;
import academy.basirah.app.ui.projects.ProjectsActivity;
import academy.basirah.app.ui.settings.SettingsActivity;

public class ProfileFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);

        TextView tvName = view.findViewById(R.id.tvProfileName);
        TextView tvEmail = view.findViewById(R.id.tvProfileEmail);
        Button btnCerts = view.findViewById(R.id.btnProfileCertificates);
        Button btnProjects = view.findViewById(R.id.btnProfileProjects);
        Button btnSettings = view.findViewById(R.id.btnProfileSettings);
        Button btnLogout = view.findViewById(R.id.btnProfileLogout);

        if (getActivity() != null) {
            SharedPreferences prefs = getActivity().getSharedPreferences("basirah_prefs", Context.MODE_PRIVATE);
            tvName.setText(prefs.getString("user_name", "Amina Al-Mansoor"));
            tvEmail.setText(prefs.getString("user_email", "student@basirah.academy"));
        }

        btnCerts.setOnClickListener(v -> startActivity(new Intent(getActivity(), CertificatesActivity.class)));
        btnProjects.setOnClickListener(v -> startActivity(new Intent(getActivity(), ProjectsActivity.class)));
        btnSettings.setOnClickListener(v -> startActivity(new Intent(getActivity(), SettingsActivity.class)));

        btnLogout.setOnClickListener(v -> {
            if (getActivity() != null) {
                SharedPreferences prefs = getActivity().getSharedPreferences("basirah_prefs", Context.MODE_PRIVATE);
                prefs.edit().clear().apply();
                Intent intent = new Intent(getActivity(), SignInActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
            }
        });

        return view;
    }
}

