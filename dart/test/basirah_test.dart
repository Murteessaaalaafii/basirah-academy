// Copyright (c) 2026 Basirah Academy. All rights reserved.
// Prismatic Intelligence Design System — AI Engineering SDK for Dart 3

import 'dart:convert';
import 'dart:io';
import '../lib/basirah.dart';

void main() async {
  int passed = 0;
  int failed = 0;

  void test(String name, void Function() fn) {
    try {
      fn();
      stdout.writeln('  [PASS] $name');
      passed++;
    } catch (e, stack) {
      stderr.writeln('  [FAIL] $name: $e');
      stderr.writeln(stack);
      failed++;
    }
  }

  Future<void> testAsync(String name, Future<void> Function() fn) async {
    try {
      await fn();
      stdout.writeln('  [PASS] $name');
      passed++;
    } catch (e, stack) {
      stderr.writeln('  [FAIL] $name: $e');
      stderr.writeln(stack);
      failed++;
    }
  }

  stdout.writeln('\n=== Basirah Academy Dart 3 Test Suite ===\n');

  // Test 1: Course Model Serialization
  test('Course Model Serialization & Pattern Matching', () {
    final course = Course(
      id: 'c-test-01',
      slug: 'test-course',
      title: 'Neural Matrix Dynamics',
      tagline: 'Linear transformations for learning networks',
      level: CourseLevel.advanced,
      estimatedHours: 20,
      overview: 'Rigorous exploration of tensor eigenvalues.',
      prerequisites: const ['Linear Algebra', 'Python'],
      modules: [
        const Module(
          title: 'Spectral Analysis',
          lessons: [
            Lesson(
              slug: 'eigenvalues-and-singular-values',
              title: 'Eigenvalues and SVD in Deep Learning',
              durationMinutes: 50,
              summary: 'Understand spectrum drift during gradient descent.',
              conceptsCovered: ['SVD', 'Condition Number', 'Spectral Norm'],
              labPrompt: 'Compute SVD of weight matrix.',
              quizQuestions: [
                QuizQuestion(
                  question: 'What does the condition number of a matrix indicate?',
                  options: ['Sensitivity to perturbations', 'Determinant square', 'Rank', 'Trace'],
                  correctIndex: 0,
                  explanation: 'High condition numbers lead to numerical instability in optimization.',
                )
              ],
            )
          ],
        )
      ],
      capstone: const CapstoneProject(
        title: 'Spectral Regularization Engine',
        description: 'Constrain Lipschitz constants via spectral norm power iteration.',
        rubricRequirements: ['Power iteration stability', 'Convergence tolerance'],
      ),
    );

    final json = course.toJson();
    final restored = Course.fromJson(json);

    assert(restored.slug == 'test-course', 'Slug matches');
    assert(restored.level == CourseLevel.advanced, 'Level pattern matches');
    assert(restored.modules.first.lessons.first.quizQuestions.first.correctIndex == 0, 'Quiz question verified');
  });

  // Test 2: Student Enrollment Progress Percentage Calculation
  test('Student Enrollment Progress Calculation', () {
    final enrollment = StudentEnrollment(
      courseSlug: 'transformers-and-llm-architecture',
      courseTitle: 'Transformer Engineering',
      level: 'advanced',
      enrolledAt: DateTime.now(),
      completedLessons: {'scaled-dot-product-attention', 'multi-head-projection', 'rotary-embeddings'},
    );

    final percent = enrollment.progressPercentage(6);
    assert(percent == 50.0, '3/6 lessons should be exactly 50%');
  });

  // Test 3: BasirahClient Offline Catalog & Search Filtering
  await testAsync('BasirahClient Offline Catalog & Filter', () async {
    final client = BasirahClient();
    final courses = await client.getCourses();
    assert(courses.isNotEmpty, 'Courses must not be empty');

    final beginnerCourses = await client.getCourses(level: CourseLevel.beginner);
    for (final c in beginnerCourses) {
      assert(c.level == CourseLevel.beginner, 'All must be beginner level');
    }

    final specificCourse = await client.getCourseBySlug(courses.first.slug);
    assert(specificCourse != null, 'Found course by slug');
    client.close();
  });

  // Test 4: Socratic AI Tutor Socratic Reasoning & Citations
  await testAsync('Socratic AI Tutor Responds with Citations', () async {
    final client = BasirahClient();
    final res = await client.askTutor('Why do we scale dot products in transformer attention?');
    assert(res.isSafe == true, 'Response must be marked safe');
    assert(res.citations.isNotEmpty, 'Citations must be grounded in curriculum');
    assert(res.response.contains('attention') || res.response.contains('dimension'), 'Response addresses topic');
    client.close();
  });

  // Test 5: Command Runner Execution
  await testAsync('BasirahCommandRunner runs without crashing', () async {
    final runner = BasirahCommandRunner();
    final healthCode = await runner.run(['health']);
    assert(healthCode == ExitCode.success, 'Health command returned 0');

    final helpCode = await runner.run(['--help']);
    assert(helpCode == ExitCode.success, 'Help returned 0');

    final unknownCode = await runner.run(['invalid_subcommand_xyz']);
    assert(unknownCode == ExitCode.usage, 'Unknown command returned usage exit code');
    runner.client.close();
  });

  stdout.writeln('\n----------------------------------------');
  stdout.writeln('Tests Run: ${passed + failed} | Passed: $passed | Failed: $failed');
  stdout.writeln('----------------------------------------\n');

  if (failed > 0) {
    exitCode = 1;
  }
}
