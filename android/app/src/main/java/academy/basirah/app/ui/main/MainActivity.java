package academy.basirah.app.ui.main;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import academy.basirah.app.R;
import academy.basirah.app.ui.courses.CoursesFragment;
import academy.basirah.app.ui.dashboard.DashboardFragment;
import academy.basirah.app.ui.profile.ProfileFragment;
import academy.basirah.app.ui.tutor.AITutorFragment;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomNavigationView bottomNav = findViewById(R.id.bottomNavigation);
        bottomNav.setOnItemSelectedListener(item -> {
            Fragment selected = null;
            int itemId = item.getItemId();

            if (itemId == R.id.nav_home) {
                selected = new HomeFragment();
            } else if (itemId == R.id.nav_courses) {
                selected = new CoursesFragment();
            } else if (itemId == R.id.nav_dashboard) {
                selected = new DashboardFragment();
            } else if (itemId == R.id.nav_tutor) {
                selected = new AITutorFragment();
            } else if (itemId == R.id.nav_profile) {
                selected = new ProfileFragment();
            }

            if (selected != null) {
                getSupportFragmentManager().beginTransaction()
                        .replace(R.id.fragmentContainer, selected)
                        .commit();
                return true;
            }
            return false;
        });

        // Set default fragment
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragmentContainer, new HomeFragment())
                    .commit();
        }
    }
}

