package academy.basirah.app.data.api;

import java.util.List;
import java.util.Map;
import academy.basirah.app.data.model.CourseEntity;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface BasirahApiService {
    @GET("api/v1/courses")
    Call<List<CourseEntity>> getCourses(@Query("level") String level);

    @GET("api/v1/courses/{slug}")
    Call<Map<String, Object>> getCourseDetail(@Path("slug") String slug);

    @POST("api/v1/tutor/chat")
    Call<Map<String, Object>> chatWithTutor(@Body Map<String, Object> payload);

    @POST("api/v1/student/progress")
    Call<Map<String, Object>> syncProgress(@Body Map<String, Object> payload);
}

