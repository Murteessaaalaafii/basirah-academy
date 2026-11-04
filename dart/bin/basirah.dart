// Copyright (c) 2026 Basirah Academy. All rights reserved.
// Prismatic Intelligence Design System — AI Engineering SDK for Dart 3

import 'dart:io';
import '../lib/basirah.dart';

Future<void> main(List<String> args) async {
  final runner = BasirahCommandRunner();
  try {
    final status = await runner.run(args);
    exitCode = status;
  } catch (error, stack) {
    stderr.writeln('Fatal runtime error: $error');
    stderr.writeln(stack);
    exitCode = ExitCode.software;
  } finally {
    runner.client.close();
    await stdout.flush();
    await stderr.flush();
  }
}

