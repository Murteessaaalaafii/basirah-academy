package academy.basirah.app.data.repository;

import android.content.Context;
import androidx.lifecycle.LiveData;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import academy.basirah.app.data.local.BasirahDatabase;
import academy.basirah.app.data.local.CourseDao;
import academy.basirah.app.data.local.ProgressDao;
import academy.basirah.app.data.model.CourseEntity;
import academy.basirah.app.data.model.OfflineProgressEntity;

public class CourseRepository {
    private final CourseDao courseDao;
    private final ProgressDao progressDao;
    private final ExecutorService executor;

    public CourseRepository(Context context) {
        BasirahDatabase db = BasirahDatabase.getInstance(context);
        this.courseDao = db.courseDao();
        this.progressDao = db.progressDao();
        this.executor = Executors.newSingleThreadExecutor();

        // Seed initial foundational courses if local database is empty
        executor.execute(() -> {
            if (courseDao.getCourseBySlug("introduction-to-artificial-intelligence") == null) {
                seedInitialCourses();
            }
        });
    }

    private void seedInitialCourses() {
        List<CourseEntity> list = new ArrayList<>();
        list.add(new CourseEntity("beg-01", "introduction-to-artificial-intelligence", "beginner",
                "Introduction to Artificial Intelligence", "Principles, evolution, and future horizons of machine intelligence.",
                "Explore how AI evolved from symbolic logic to modern statistical neural systems.", 12, 3, 6, true));
        list.add(new CourseEntity("beg-03", "prompt-engineering-fundamentals", "beginner",
                "Prompt Engineering Fundamentals", "Master structured prompting and few-shot calibration.",
                "Go beyond simple chat into chain-of-thought and deterministic schema formatting.", 14, 3, 6, true));
        list.add(new CourseEntity("int-04", "deep-learning-fundamentals", "intermediate",
                "Deep Learning Fundamentals", "Perceptrons, backpropagation, and PyTorch essentials.",
                "Understand the mathematical foundations of deep neural networks.", 28, 3, 6, true));
        list.add(new CourseEntity("int-10", "retrieval-augmented-generation", "intermediate",
                "Retrieval-Augmented Generation", "Grounding LLMs with external knowledge and dense retrieval.",
                "Master dense vector embeddings, hybrid search with BM25, and reranking.", 28, 3, 6, true));
        list.add(new CourseEntity("adv-02", "large-language-model-engineering", "advanced",
                "Large Language Model Engineering", "LoRA, QLoRA, DPO, and alignment.",
                "Explore how state-of-the-art LLMs are adapted and fine-tuned.", 36, 3, 6, false));
        courseDao.insertCourses(list);
    }

    public LiveData<List<CourseEntity>> getAllCourses() {
        return courseDao.getAllCourses();
    }

    public LiveData<List<CourseEntity>> getCoursesByLevel(String level) {
        return courseDao.getCoursesByLevel(level);
    }

    public LiveData<List<CourseEntity>> getDownloadedCourses() {
        return courseDao.getDownloadedCourses();
    }

    public void recordLessonProgress(String courseSlug, String lessonId, boolean isCompleted, int score) {
        executor.execute(() -> {
            OfflineProgressEntity progress = new OfflineProgressEntity(
                    courseSlug, lessonId, isCompleted, score, System.currentTimeMillis(), false
            );
            progressDao.insertProgress(progress);
        });
    }

    public void toggleDownload(String courseSlug, boolean download) {
        executor.execute(() -> {
            CourseEntity course = courseDao.getCourseBySlug(courseSlug);
            if (course != null) {
                course.setDownloaded(download);
                courseDao.updateCourse(course);
            }
        });
    }
}

