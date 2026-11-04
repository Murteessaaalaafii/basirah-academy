package academy.basirah.app.ui.dashboard;

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
import academy.basirah.app.ui.certificates.CertificatesActivity;
import academy.basirah.app.ui.offline.OfflineDownloadsActivity;

public class DashboardFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);

        TextView tvWelcome = view.findViewById(R.id.tvDashWelcome);
        Button btnCerts = view.findViewById(R.id.btnViewCertificates);
        Button btnDownloads = view.findViewById(R.id.btnViewDownloads);

        if (getActivity() != null) {
            SharedPreferences prefs = getActivity().getSharedPreferences("basirah_prefs", android.content.Context.MODE_PRIVATE);
            String name = prefs.getString("user_name", "Amina Al-Mansoor");
            tvWelcome.setText("Welcome back, " + name + ".");
        }

        btnCerts.setOnClickListener(v -> startActivity(new Intent(getActivity(), CertificatesActivity.class)));
        btnDownloads.setOnClickListener(v -> startActivity(new Intent(getActivity(), OfflineDownloadsActivity.class)));

        return view;
    }
}

