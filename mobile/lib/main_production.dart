import 'utils/environment.dart';
import 'main.dart';

void main() {
  Environment.setEnvironment(
    const EnvironmentConfig(
        apiUrl: 'https://api.csgames.org/v1/management',
        gatewayUrl: 'https://api.csgames.org',
        stsUrl: 'https://api.csgames.org/v1/identity'
    ),
  );
  mainDelegate();
}