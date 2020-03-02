import 'utils/environment.dart';
import 'main.dart';

void main() {
  Environment.setEnvironment(
    const EnvironmentConfig(
        apiUrl: 'https://api.csgames.recursyve.dev/v1/management',
        gatewayUrl: 'https://api.csgames.recursyve.dev',
        stsUrl: 'https://api.csgames.recursyve.dev/v1/identity'
    ),
  );
  mainDelegate();
}