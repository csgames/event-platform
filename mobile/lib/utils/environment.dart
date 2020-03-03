import 'package:meta/meta.dart';

class Environment {
    static EnvironmentConfig _config;

    static void setEnvironment(EnvironmentConfig environmentConfig) {
        Environment._config = environmentConfig;
    }

    static get apiUrl {
        return _config.apiUrl;
    }

    static get gatewayUrl {
        return _config.gatewayUrl;
    }

    static get stsUrl {
        return _config.stsUrl;
    }
}

class EnvironmentConfig {
    final String apiUrl;
    final String gatewayUrl;
    final String stsUrl;

    const EnvironmentConfig({
        @required this.apiUrl,
        @required this.gatewayUrl,
        @required this.stsUrl
    });
}
