package academy.basirah.app.ui.courses;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import academy.basirah.app.R;
import academy.basirah.app.data.repository.CourseRepository;

public class CoursesFragment extends Fragment {
    private CourseAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_courses, container, false);

        RecyclerView rvCourses = view.findViewById(R.id.rvCourses);
        rvCourses.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new CourseAdapter(requireContext());
        rvCourses.setAdapter(adapter);

        CourseRepository repository = new CourseRepository(requireContext());
        repository.getAllCourses().observe(getViewLifecycleOwner(), courses -> {
            if (courses != null) {
                adapter.setCourses(courses);
            }
        });

        return view;
    }
}

