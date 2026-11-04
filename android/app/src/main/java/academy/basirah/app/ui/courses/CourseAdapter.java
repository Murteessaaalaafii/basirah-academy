package academy.basirah.app.ui.courses;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;
import academy.basirah.app.R;
import academy.basirah.app.data.model.CourseEntity;

public class CourseAdapter extends RecyclerView.Adapter<CourseAdapter.CourseViewHolder> {
    private final Context context;
    private List<CourseEntity> courses = new ArrayList<>();

    public CourseAdapter(Context context) {
        this.context = context;
    }

    public void setCourses(List<CourseEntity> newCourses) {
        this.courses = newCourses;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CourseViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_course_card, parent, false);
        return new CourseViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CourseViewHolder holder, int position) {
        CourseEntity course = courses.get(position);
        holder.tvLevel.setText(course.getLevel().toUpperCase());
        holder.tvHours.setText(course.getEstimatedHours() + "h Estimated");
        holder.tvTitle.setText(course.getTitle());
        holder.tvTagline.setText(course.getTagline());

        holder.btnAction.setOnClickListener(v -> {
            Intent intent = new Intent(context, CourseDetailActivity.class);
            intent.putExtra("course_slug", course.getSlug());
            intent.putExtra("course_title", course.getTitle());
            intent.putExtra("course_overview", course.getOverview());
            intent.putExtra("course_level", course.getLevel());
            intent.putExtra("course_hours", course.getEstimatedHours());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return courses != null ? courses.size() : 0;
    }

    static class CourseViewHolder extends RecyclerView.ViewHolder {
        TextView tvLevel, tvHours, tvTitle, tvTagline;
        Button btnAction;

        public CourseViewHolder(@NonNull View itemView) {
            super(itemView);
            tvLevel = itemView.findViewById(R.id.tvCardLevel);
            tvHours = itemView.findViewById(R.id.tvCardHours);
            tvTitle = itemView.findViewById(R.id.tvCardTitle);
            tvTagline = itemView.findViewById(R.id.tvCardTagline);
            btnAction = itemView.findViewById(R.id.btnCardAction);
        }
    }
}

