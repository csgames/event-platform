class UrlEncodedParams {
  Map<String, String> _params = Map();
  Map<String, List<String>> _paramsList = Map();

  void set(String key, String value) {
    _params[key] = value;
  }

  void add(String key, String value) {
    _paramsList.putIfAbsent(key, () => []);
    _paramsList[key].add(value);
  }

  void remove(String key) {
    _params.remove(key);
  }

  String toString() {
    var acc = "";
    _params.forEach((String k, String v) {
      v ??= "";
      if (acc.length > 0) {
        acc += '&' + k + '=' + v;
      } else {
        acc = k + '=' + v;
      }
    });
    _paramsList.forEach((k, v) {
      v.forEach((p) {
        if (acc.length > 0) {
          acc += '&' + k + '=' + p;
        } else {
          acc = k + '=' + p;
        }
      });
    });
    return acc;
  }
}
