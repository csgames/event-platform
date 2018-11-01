import 'package:PolyHxApp/redux/actions/login-actions.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/components/pagetransformer/eventpageitem.dart';
import 'package:PolyHxApp/components/pagetransformer/pagetransformer.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/actions/event-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/utils/routes.dart';
import 'package:redux/redux.dart';

class EventList extends StatelessWidget {
  Map<String, dynamic> _values;

  Widget _buildEventCards(_EventListPageViewModel model) {
    if (!model.hasErrors) {
      return PageTransformer(
        pageViewBuilder: (_, visibilityResolver) {
          return PageView.builder(
            controller: PageController(viewportFraction: 0.85),
            itemCount: model.events != null ? model.events.length : 0,
            itemBuilder: (_, index) {
              final item = model.events[index];
              final pageVisibility = visibilityResolver.resolvePageVisibility(index);
              return StoreConnector<AppState, VoidCallback>(
                converter: (store) => () => store.dispatch(SetCurrentEventAction(item)),
                builder: (BuildContext context, VoidCallback setCurrentEvent) {
                  return EventPageItem(
                    item: item,
                    pageVisibility: pageVisibility,
                    onTap: () {
                      setCurrentEvent();
                      Navigator.pushNamed(context, Routes.EVENT);
                    }
                  );
                }
              );
            }
          );
        }
      );
    } else {
      return Text(_values['error']);
    }
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _EventListPageViewModel>(
      onInit: (store) async {
        _values = LocalizationService.of(context).eventList;
        IsLoggedInAction action = IsLoggedInAction();
        store.dispatch(action);
        action.completer.future.then((isLoggedIn) {
          final eventState = store.state.eventState;
          if (isLoggedIn && eventState.events.isEmpty && !eventState.hasErrors) {
            store.dispatch(LoadEventsAction());
          } else if (!isLoggedIn) {
            Navigator.pushReplacementNamed(context, Routes.LOGIN);
          }
        });
      },
      converter: (store) => _EventListPageViewModel.fromStore(store),
      builder: (BuildContext _, _EventListPageViewModel model) {
        return model.isLoading
          ? Scaffold(body: Center(child: LoadingSpinner()))
          : Scaffold(
              appBar: AppBar(
                title: Text(_values == null ? LocalizationService.of(context).eventList['title'] : _values['title']),
                actions: <Widget>[
                  IconButton(
                    icon: Icon(FontAwesomeIcons.signOutAlt),
                    color: Colors.white,
                    onPressed: () {
                      model.logOut(context);
                      model.reset();
                    }
                  )
                ]
              ),
              body: Center(
                child: SizedBox.fromSize(
                  child: _buildEventCards(model)
                )
              )
            );
      }
    );
  }
}

class _EventListPageViewModel {
  List<Event> events;
  bool isLoading;
  bool hasErrors;
  Function logOut;
  Function reset;

  _EventListPageViewModel(this.events, this.isLoading, this.hasErrors, this.logOut, this.reset);

  _EventListPageViewModel.fromStore(Store<AppState> store) {
    events = store.state.eventState.events;
    isLoading = store.state.eventState.isLoading;
    hasErrors = store.state.eventState.hasErrors;
    logOut = (context) => store.dispatch(LogOut(context));
    reset = () => store.dispatch(ResetAction());
  }
}
